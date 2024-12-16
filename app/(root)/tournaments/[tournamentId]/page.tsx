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
import TeamList from "@/components/team/TeamList";
import TeamLeaderboard from "@/components/team/TeamLeaderboard";
import PlayerLeaderboard from "@/components/player/PlayerLeaderboard";
import { TabsContent } from "@/components/ui/tabs";

interface Tournament {
  tourTitle: string;
  tourLogo: string;
  startDate: string;
  endDate: string;
  tourStatus: "Ongoing" | "Finalized";
  tourBG: string;
}

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

export default function TournamentPage() {
  const { tournamentId } = useParams();
  const router = useRouter();

  const decodedTournamentId = decodeURIComponent(tournamentId as string);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const db = getFirestore(app);
      setIsLoading(true);

      try {
        const tournamentDocRef = doc(db, "tournaments", decodedTournamentId);
        const tournamentSnapshot = await getDoc(tournamentDocRef);

        if (tournamentSnapshot.exists()) {
          setTournament(tournamentSnapshot.data() as Tournament);

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
              teamName,
              teamLogo: teamData.teamLogo,
              playerCount: teamData.playerCount ?? 0,
              roundWon: teamData.roundWon ?? 0,
              teamKills: teamData.teamKills ?? 0,
            });

            const playersRef = collection(
              db,
              "tournaments",
              decodedTournamentId,
              "teams",
              teamDoc.id,
              "players"
            );
            const playersSnapshot = await getDocs(playersRef);

            playersSnapshot.docs.forEach((playerDoc) => {
              const playerData = playerDoc.data();
              playersData.push({
                playerName: playerData.playerName || "Unnamed Player",
                playerKills: playerData.playerKills ?? 0,
                teamName,
              });
            });
          }

          setTeams(teamsData);
          setPlayers(playersData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching tournament:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (decodedTournamentId) fetchTournamentData();
  }, [decodedTournamentId]);

  useEffect(() => {
    if (notFound) {
      router.push("/tournaments/not-found");
    }
  }, [notFound, router]);

  if (isLoading) {
    return <div className="text-center py-10">Loading tournament...</div>;
  }

  if (!tournament) return null;

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
              <h1>Matches Will be shown here!</h1>
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
