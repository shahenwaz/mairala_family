"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TeamHeader from "@/components/team/TeamHeader";
import PlayerList from "@/components/player/PlayerList";

interface TeamDetails {
  _id: string;
  teamName: string;
  logo: string;
  tournament: {
    title: string;
    logo: string;
    startDate: string;
    endDate: string;
    status: string;
    background: string;
  };
}

interface Player {
  _id: string;
  playerName: string;
  playerKills: number;
}

const TeamInfoPage = () => {
  const { teamName, tournamentId } = useParams();
  const router = useRouter();

  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const { data: team } = await axios.get<TeamDetails>(
          `/api/teams?tournamentId=${tournamentId}&teamName=${teamName}`
        );
        setTeamDetails(team);

        const { data: playerData } = await axios.get<Player[]>(
          `/api/players?teamId=${team._id}`
        );
        setPlayers(playerData);
      } catch (error) {
        console.error("Error fetching team or player data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamName, tournamentId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!teamDetails) {
    return <div>Team not found.</div>;
  }

  return (
    <div>
      {/* Tournament Details */}
      <TournamentDetails {...teamDetails.tournament} />
      <div className="w-full max-w-3xl min-h-screen mx-auto bg-background text-foreground">
        <div className="container px-4 py-2">
          {/* Back Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 mx-auto my-4 text-xs font-medium transition border rounded-md lg:text-sm text-lightGray border-lightGray hover:bg-primary hover:text-primary-foreground"
            onClick={() => router.push(`/tournaments/${tournamentId}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            BACK TO TEAMS
          </button>

          {/* Team Header */}
          <TeamHeader teamName={teamDetails.teamName} logo={teamDetails.logo} />

          {/* Player List */}
          <PlayerList players={players} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoPage;
