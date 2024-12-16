"use client";
import React, { useEffect, useState } from "react";
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

export default function Tournament2Page() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const staticTournamentId = "ST020";

  useEffect(() => {
    const fetchTournamentData = async () => {
      const db = getFirestore(app);
      setIsLoading(true);

      try {
        const tournamentRef = doc(db, "tournaments", staticTournamentId);
        const tournamentSnap = await getDoc(tournamentRef);

        if (!tournamentSnap.exists()) {
          console.error("Tournament not found");
          setTournament(null);
          return;
        }

        const tournamentData = tournamentSnap.data() as Tournament;

        const teamsRef = collection(
          db,
          "tournaments",
          staticTournamentId,
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
            teamLogo: teamData.teamLogo || "",
            playerCount: teamData.playerCount ?? 0,
            roundWon: teamData.roundWon ?? 0,
            teamKills: teamData.teamKills ?? 0,
          });

          const playersRef = collection(
            db,
            "tournaments",
            staticTournamentId,
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

        setTournament(tournamentData);
        setTeams(teamsData);
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
        setTournament(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 sm:space-y-4 bg-background animate-fadeIn">
        <div className="relative w-16 h-16 sm:w-12 sm:h-12 border-4 border-t-primary border-gray-700 rounded-full animate-spin"></div>
        <p className="text-lg sm:text-md font-medium text-gray-400 animate-pulse">
          Loading tournament details...
        </p>
        <h1 className="text-2xl sm:text-xl lg:text-3xl font-bold text-accent animate-bounce">
          PLEASE KEEP PATIENCE !!!
        </h1>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">
          Tournament Not Found
        </h1>
        <p className="text-lg text-gray-500">Please check back later!</p>
      </div>
    );
  }

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
              <h1 className="text-center text-lg text-muted-foreground">
                Matches will be shown here!
              </h1>
            </TabsContent>
            <TabsContent value="teams">
              <TeamList teams={teams} />
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
