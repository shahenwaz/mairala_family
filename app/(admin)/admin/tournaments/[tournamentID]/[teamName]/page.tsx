"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import PlayerList from "@/components/player/PlayerList";
import { Player } from "@/types/Team";
import { Team } from "@/types/Team";

const AdminTeamInfoPage = () => {
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

  useEffect(() => {
    if (tournamentId && teamId) {
      fetchTeamDetails();
    } else {
      setError("Missing tournamentId or teamId in the route parameters.");
    }
  }, [tournamentId, teamId]);

  const fetchTeamDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
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

      const { data: playersData } = await axios.get<Player[]>(
        `/api/players?teamId=${encodeURIComponent(teamData._id)}`
      );

      setPlayers(Array.isArray(playersData) ? playersData : []);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching team data.";
      setError(errorMessage);
      console.error("Error fetching team details or players:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlayer = async () => {
    try {
      if (!teamDetails?._id) {
        console.error("Error: Team ID is missing.");
        return;
      }

      const newPlayer = {
        playerName: "New Player",
        teamId: teamDetails._id,
      };

      await axios.post(`/api/players`, newPlayer);
      fetchTeamDetails();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error adding player.";
      console.error("Error adding player:", errorMessage);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!teamDetails) return <div>Team not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Team Info: {teamDetails.teamName} ({teamDetails.playerCount || 0}{" "}
        Players)
      </h1>
      <p>Total Kills: {teamDetails.teamKills || 0}</p>
      {players.length === 0 ? (
        <div className="mt-6 text-center text-muted">
          <p>No players have been added to this team yet.</p>
          <Button onClick={handleAddPlayer} className="mt-4">
            Add First Player
          </Button>
        </div>
      ) : (
        <PlayerList players={players} />
      )}
    </div>
  );
};

export default AdminTeamInfoPage;
