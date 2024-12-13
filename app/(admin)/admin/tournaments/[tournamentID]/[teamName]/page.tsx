"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import PlayerList from "@/components/player/PlayerList";
import TeamHeader from "@/components/team/TeamHeader";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);

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

  const handleAddOrEditPlayer = async () => {
    try {
      if (!teamDetails?._id) {
        console.error("Error: Team ID is missing.");
        return;
      }

      if (currentPlayerId) {
        await axios.put(`/api/players`, {
          playerId: currentPlayerId,
          playerName: currentPlayerName,
        });
      } else {
        await axios.post(`/api/players`, {
          playerName: currentPlayerName,
          teamId: teamDetails._id,
        });
      }

      fetchTeamDetails();
      setIsDialogOpen(false);
      resetPlayerForm();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error saving player.";
      console.error("Error saving player:", errorMessage);
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    try {
      await axios.delete(`/api/players?playerId=${playerId}`);
      fetchTeamDetails();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleAddKills = async (playerId: string, kills: number) => {
    try {
      await axios.patch(`/api/players`, { playerId, kills });
      fetchTeamDetails();
    } catch (error) {
      console.error("Error adding kills:", error);
    }
  };

  const resetPlayerForm = () => {
    setCurrentPlayerId(null);
    setCurrentPlayerName("");
  };

  if (isLoading) return <div className="text-center font-bold">Loading...</div>;
  if (error) return <div className="text-center font-bold">Error: {error}</div>;
  if (!teamDetails)
    return <div className="text-center font-bold">Team not found.</div>;

  return (
    <div className="w-full max-w-3xl min-h-screen mx-auto bg-background text-foreground">
      {/* Team Header */}
      <TeamHeader teamName={teamDetails.teamName} />

      <div className="container px-4 py-2">
        <div className="flex justify-center mb-4">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="mt-3 card-hover font-semibold"
          >
            ADD PLAYER
          </Button>
        </div>

        {/* Player List */}
        <PlayerList
          players={players}
          onDeletePlayer={handleDeletePlayer}
          onAddKills={handleAddKills}
          onEditPlayer={(playerId, playerName) => {
            setCurrentPlayerId(playerId);
            setCurrentPlayerName(playerName);
            setIsDialogOpen(true);
          }}
        />

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogTitle className="mb-4 text-xl font-bold text-center text-purple">
              {currentPlayerId ? "Edit Player" : "Add Player"}
            </DialogTitle>
            <p className="mb-2 text-center text-sm text-white">
              Team:{" "}
              <span className="font-bold text-primary">
                {teamDetails.teamName}
              </span>
            </p>
            <input
              type="text"
              value={currentPlayerName}
              onChange={(e) => setCurrentPlayerName(e.target.value)}
              placeholder="Enter player name"
              className="w-full px-3 py-2 mb-4 border rounded-md border-muted focus:outline-primary"
            />
            <Button
              onClick={handleAddOrEditPlayer}
              className="w-full py-2 text-center card-hover font-semibold"
            >
              {currentPlayerId ? "Save Changes" : "Add Player"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminTeamInfoPage;
