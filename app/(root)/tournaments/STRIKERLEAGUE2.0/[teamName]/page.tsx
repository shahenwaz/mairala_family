"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TeamHeader from "@/components/team/TeamHeader";
import PlayerList from "@/components/player/PlayerList";
import MatchesList from "@/components/match/MatchesList";

// Define types
interface Tournament {
  title: string;
  logo: string;
  startDate: string;
  endDate: string;
  status: string;
  background: string;
}

interface TeamDetails {
  _id: string;
  name: string;
  logo: string;
  tournament: Tournament;
}

interface Player {
  _id: string;
  playerName: string;
  kills: number;
}

const TeamInfoPage = () => {
  const params = useParams();
  const router = useRouter();

  // Use `_id` instead of `teamName`
  const teamId = typeof params.teamName === "string" ? params.teamName : "";
  const tournamentId =
    typeof params.tournamentId === "string" ? params.tournamentId : "";

  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (teamId && tournamentId) {
      fetchTeamData();
    }
  }, [teamId, tournamentId]);

  const fetchTeamData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch team details by `_id` (teamId)
      const { data: team } = await axios.get<TeamDetails>(
        `/api/teams?id=${encodeURIComponent(teamId)}`
      );
      setTeamDetails(team);

      // Fetch players for the team
      const { data: playerData } = await axios.get<Player[]>(
        `/api/players?teamId=${team._id}`
      );
      setPlayers(playerData);
    } catch (err) {
      console.error("Error fetching team or player data:", err);
      setError("Failed to load team or player data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            onClick={() =>
              router.push(
                `/tournaments/${encodeURIComponent(
                  teamDetails.tournament.title.replace(/\s+/g, "")
                )}`
              )
            }
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
          <TeamHeader name={teamDetails.name} logo={teamDetails.logo} />

          {/* Player List */}
          <PlayerList players={players} />

          {/* Matches Section */}
          <h2 className="mt-8 text-xl lg:text-2xl font-bold text-center text-purple lg:text-start">
            Matches
          </h2>
          <MatchesList matches={[]} filterByTeam={teamDetails.name} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoPage;
