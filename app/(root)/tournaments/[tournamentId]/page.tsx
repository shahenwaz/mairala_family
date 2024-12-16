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

  interface Team {
    teamName: string;
    teamLogo: string;
    playerCount: number;
    roundWon: number;
    teamKills: number;
  }

  interface Player {
    playerName: string;
    playerKills: number;
    teamName: string;
  }

  useEffect(() => {
    const fetchTournamentData = async () => {
      const db = getFirestore(app);
      console.log("Fetching tournamentId:", decodedTournamentId); // Debugging

      try {
        // Fetch Tournament Details
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

        // Fetch Teams and Players
        const teamsRef = collection(
          db,
          "tournaments",
          decodedTournamentId,
          "teams"
        );
        const teamsSnapshot = await getDocs(teamsRef);

        const teamsData: Team[] = [];
        const playersData: Player[] = [];

        for (const teamDoc of teamsSnapshot.docs) {
          const teamData = teamDoc.data();
          const teamName = teamData.teamName || "Unknown Team";

          teamsData.push({
            teamName: teamData.teamName,
            teamLogo: teamData.teamLogo,
            playerCount: teamData.playerCount ?? 0,
            roundWon: teamData.roundWon ?? 0,
            teamKills: teamData.teamKills ?? 0,
          });

          // Fetch Players under each team
          const playersRef = collection(
            db,
            "tournaments",
            decodedTournamentId,
            "teams",
            teamDoc.id, // Access specific team document
            "players"
          );
          const playersSnapshot = await getDocs(playersRef);

          playersSnapshot.docs.forEach((playerDoc) => {
            const playerData = playerDoc.data();
            playersData.push({
              playerName: playerData.playerName || "Unnamed Player",
              playerKills: playerData.playerKills ?? 0,
              teamName: teamName, // Attach the current teamName
            });
          });
        }

        console.log("Teams Data:", teamsData);
        console.log("Players Data:", playersData);

        setTeams(teamsData);
        setPlayers(playersData);
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
                tourStatus={tournament.tourStatus}
              />
            </TabsContent>
          </TournamentTabs>
        </div>
      </div>
    </div>
  );
}
