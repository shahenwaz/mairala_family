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

export default function TournamentPage() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Static tournament ID (ST020) for StrikerLeague2.0
  const staticTournamentId = "ST020";

  useEffect(() => {
    const fetchTournamentData = async () => {
      const db = getFirestore(app);
      setIsLoading(true);

      try {
        // Fetch tournament details
        const tournamentDocRef = doc(db, "tournaments", staticTournamentId);
        const tournamentSnapshot = await getDoc(tournamentDocRef);

        if (tournamentSnapshot.exists()) {
          setTournament(tournamentSnapshot.data() as Tournament);

          // Fetch teams data
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
              teamLogo: teamData.teamLogo,
              playerCount: teamData.playerCount ?? 0,
              roundWon: teamData.roundWon ?? 0,
              teamKills: teamData.teamKills ?? 0,
            });

            // Fetch players for each team
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

          setTeams(teamsData);
          setPlayers(playersData);
        } else {
          console.error("Tournament not found");
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 sm:space-y-4 bg-background animate-fadeIn">
        {/* Rotating Gradient Spinner */}
        <div className="relative w-16 h-16 sm:w-12 sm:h-12">
          <div className="absolute w-full h-full border-4 border-t-purple border-r-darkGray border-b-purple border-l-darkGray rounded-full animate-spin"></div>
        </div>

        {/* Loading Message - Primary */}
        <p className="md:text-xl text-md font-bold text-lightGray tracking-wide animate-pulse mb-10">
          Loading tournament details...
        </p>

        {/* Patience Message - Highlighted */}
        <h1 className="text-2xl lg:text-4xl font-extrabold text-accent animate-bounce text-center">
          PLEASE KEEP PATIENCE !!!
        </h1>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="text-center py-10 text-red-500">Tournament not found</div>
    );
  }

  return (
    <div>
      {/* Tournament Details */}
      <TournamentDetails
        tourTitle={tournament.tourTitle}
        tourLogo={tournament.tourLogo}
        startDate={tournament.startDate}
        endDate={tournament.endDate}
        tourStatus={tournament.tourStatus}
        tourBG={tournament.tourBG}
      />

      {/* Tabs for Teams, Matches, and Leaderboards */}
      <div className="w-full py-3 bg-background">
        <div className="max-w-4xl px-4 mx-auto">
          <TournamentTabs defaultTab="teams">
            {/* Matches Tab */}
            <TabsContent value="matches">
              <h1 className="text-center text-lg text-muted-foreground">
                Matches will be shown here!
              </h1>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams">
              <TeamList teams={teams} />
            </TabsContent>

            {/* Leaderboards Tab */}
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
