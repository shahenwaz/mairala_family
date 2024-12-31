"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TournamentTabs from "@/components/tournament/TournamentTabs";
import TeamList from "@/components/team/TeamList";
import TeamLeaderboard from "@/components/team/TeamLeaderboard";
import PlayerLeaderboard from "@/components/player/PlayerLeaderboard";
import TournamentLoadingState from "@/components/tournament/TournamentLoadingState";
import { TabsContent } from "@/components/ui/tabs";
import { Tournament, Team, Player } from "@/types/tournament"; // Shared types

const TournamentPage = () => {
  const params = useParams();
  const tournamentId = params.tournamentId as string; // Explicitly cast tournamentId to string

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTournamentData = async () => {
      if (!tournamentId) return; // Ensure tournamentId is defined
      setIsLoading(true);
      try {
        const response = await fetch(`/api/tournaments/${tournamentId}`); // Fetch data dynamically
        const data = await response.json();

        if (data.success) {
          setTournament(data.tournament);
          setTeams(data.teams);
          setPlayers(data.players);
        } else {
          console.error(data.message);
          setTournament(null);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
        setTournament(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournamentData();
  }, [tournamentId]); // Refetch data when the `tournamentId` changes

  if (isLoading) {
    return <TournamentLoadingState />;
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
      {/* Tournament Header Section */}
      <TournamentDetails
        tourTitle={tournament.tourtitle}
        tourLogo={tournament.tourlogo}
        startDate={tournament.startdate}
        endDate={tournament.enddate}
        tourStatus={tournament.tourstatus}
        tourBG={tournament.tourbg}
      />

      {/* Tournament Tabs Section */}
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
              <TeamList teams={teams} tournamentId={tournamentId} />
            </TabsContent>

            {/* Leaderboards Tab */}
            <TabsContent value="leaderboards">
              <TeamLeaderboard
                teams={teams}
                tourStatus={tournament.tourstatus}
              />
              <PlayerLeaderboard
                players={players}
                tourStatus={tournament.tourstatus}
              />
            </TabsContent>
          </TournamentTabs>
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;
