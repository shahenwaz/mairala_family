"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import PlayerList from "@/components/player/PlayerList";
import TeamHeader from "@/components/team/TeamHeader";
import { Player, Team } from "@/types/Team";

const TeamInfoPage = () => {
  const params = useParams();

  const tournamentId = Array.isArray(params?.tournamentId)
    ? params.tournamentId[0]
    : params.tournamentId || "";

  const teamId = Array.isArray(params?.teamName)
    ? params.teamName[0]
    : params.teamName || "";

  const [teamDetails, setTeamDetails] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team details and players
  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (!tournamentId || !teamId) {
        setError("Missing tournamentId or teamId in the route parameters.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch team details
        const { data: teamData } = await axios.get<Team>(
          `/api/teams?tournamentId=${encodeURIComponent(
            tournamentId
          )}&id=${encodeURIComponent(teamId)}`
        );

        if (!teamData || !teamData._id) {
          throw new Error("Invalid or missing team data from the API.");
        }

        setTeamDetails({
          ...teamData,
          teamName: teamData.teamName || "Unnamed Team",
        });

        // Fetch players for the team
        const { data: playersData } = await axios.get<Player[]>(
          `/api/players?teamId=${encodeURIComponent(teamData._id)}`
        );

        setPlayers(Array.isArray(playersData) ? playersData : []);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while fetching team data.";
        setError(errorMessage);
        console.error("Error fetching team details or players:", errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamDetails();
  }, [tournamentId, teamId]);

  // Loading, error, and empty states
  if (isLoading) return <div className="text-center font-bold">Loading...</div>;
  if (error)
    return <div className="text-center font-bold text-red-500">{error}</div>;
  if (!teamDetails)
    return <div className="text-center font-bold">Team not found.</div>;

  return (
    <div className="w-full max-w-3xl min-h-screen mx-auto bg-background text-foreground">
      {/* Team Header */}
      <TeamHeader teamName={teamDetails.teamName} />

      <div className="container px-4 py-2">
        {/* Player List */}
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default TeamInfoPage;
