"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TournamentTabs from "@/components/tournament/TournamentTabs";
import MatchesFilter from "@/components/match/MatchesFilter";
import MatchesList from "@/components/match/MatchesList";
import TeamList from "@/components/team/TeamList";
import TeamLeaderboard from "@/components/team/TeamLeaderboard";
import PlayerLeaderboard from "@/components/player/PlayerLeaderboard";
import { TabsContent } from "@/components/ui/tabs";

export default function TournamentPage() {
  const { tournamentId } = useParams();
  const router = useRouter();

  const decodedTournamentId = decodeURIComponent(tournamentId as string);
  const [tournament, setTournament] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [filter, setFilter] = useState<"ALL MATCHES" | "UPCOMING" | "FINISHED">(
    "ALL MATCHES"
  );

  useEffect(() => {
    const fetchTournamentData = async () => {
      const db = getFirestore(app);
      console.log("Fetching tournamentId:", decodedTournamentId); // Debugging

      try {
        const tournamentDocRef = doc(db, "tournaments", decodedTournamentId);
        const tournamentSnapshot = await getDoc(tournamentDocRef);

        if (tournamentSnapshot.exists()) {
          console.log("Tournament data:", tournamentSnapshot.data());
          setTournament(tournamentSnapshot.data());
        } else {
          console.error("Tournament not found! ID:", decodedTournamentId);
          router.push("/tournaments/not-found");
          return;
        }

        // Fetch Matches
        const matchesRef = collection(
          db,
          "tournaments",
          decodedTournamentId,
          "matches"
        );
        const matchesSnapshot = await getDocs(matchesRef);
        setMatches(matchesSnapshot.docs.map((doc) => doc.data()));

        // Fetch Teams
        const teamsRef = collection(
          db,
          "tournaments",
          decodedTournamentId,
          "teams"
        );
        const teamsSnapshot = await getDocs(teamsRef);
        setTeams(
          teamsSnapshot.docs.map((doc) => ({
            teamName: doc.data().teamName,
            teamLogo: doc.data().teamLogo,
            playerCount: doc.data().playerCount || 0,
          }))
        );

        // Fetch Players
        const playersRef = collection(
          db,
          "tournaments",
          decodedTournamentId,
          "players"
        );
        const playersSnapshot = await getDocs(playersRef);
        setPlayers(playersSnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error("Error fetching tournament:", error);
      }
    };

    if (decodedTournamentId) fetchTournamentData();
  }, [decodedTournamentId, router]);

  if (!tournament)
    return <div className="text-center py-10">Loading tournament...</div>;

  return (
    <div>
      <TournamentDetails
        tourTitle={tournament.tourTitle}
        tourLogo={tournament.tourLogo}
        startDate={tournament.startDate}
        endDate={tournament.endDate}
        tourStatus={tournament.tourStatus}
        tourBG={tournament.tourBG}
      />

      <div className="w-full py-3 bg-background">
        <div className="max-w-4xl px-4 mx-auto">
          <TournamentTabs defaultTab="teams">
            <TabsContent value="matches">
              <MatchesFilter
                options={["ALL MATCHES", "UPCOMING", "FINISHED"]}
                defaultFilter="ALL MATCHES"
                onFilterChange={setFilter}
              />
              <MatchesList matches={matches} />
            </TabsContent>

            <TabsContent value="teams">
              <TeamList teams={teams} tournament={tournament.tourTitle} />
            </TabsContent>

            <TabsContent value="leaderboards">
              <TeamLeaderboard
                teams={teams}
                tourStatus={tournament.tourStatus}
              />
              <PlayerLeaderboard
                players={players}
                status={tournament.tourStatus}
              />
            </TabsContent>
          </TournamentTabs>
        </div>
      </div>
    </div>
  );
}
