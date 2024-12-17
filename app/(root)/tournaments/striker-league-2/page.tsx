"use client";
import React, { useEffect, useState } from "react";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TournamentTabs from "@/components/tournament/TournamentTabs";
import TeamList from "@/components/team/TeamList";
import TeamLeaderboard from "@/components/team/TeamLeaderboard";
import PlayerLeaderboard from "@/components/player/PlayerLeaderboard";
import { TabsContent } from "@/components/ui/tabs";
import { Tournament, Team, Player } from "@/types/tournament"; // Shared types

export default function Tournament2Page() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/ST020");
        const data = await response.json();

        if (!data.success) {
          console.error(data.message);
          setTournament(null);
        } else {
          setTournament(data.tournament);
          setTeams(data.teams);
          setPlayers(data.players);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
        setTournament(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-background animate-fadeIn">
        <div className="w-16 h-16 border-4 border-t-primary border-gray-700 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-400 animate-pulse">
          Loading tournament details...
        </p>
        <h1 className="text-2xl font-bold text-accent animate-bounce">
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
