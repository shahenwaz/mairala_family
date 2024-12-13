"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface Player {
  _id: string;
  playerName: string;
  playerKills: number;
}

interface PlayerListProps {
  players: Player[];
  onDeletePlayer: (playerId: string) => void;
  onAddKills: (playerId: string, kills: number) => void;
  onEditPlayer: (playerId: string, playerName: string) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onDeletePlayer,
  onAddKills,
  onEditPlayer,
}) => {
  const sortedPlayers = players.sort((a, b) => b.playerKills - a.playerKills);
  const totalKills = players.reduce(
    (sum, player) => sum + player.playerKills,
    0
  );

  if (!players || players.length === 0) {
    return (
      <div className="text-center mt-4 text-lightGray">
        <p>No players have been added yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 mt-6 text-xl lg:text-2xl font-bold text-center text-purple lg:text-start">
        Players
      </h2>
      <ul className="space-y-4">
        {sortedPlayers.map((player) => (
          <li
            key={player._id}
            className="flex items-center justify-between p-4 overflow-hidden rounded-lg bg-card card-hover"
          >
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{player.playerName}</span>
              <span className="text-primary">
                Kills: <span className="text-white">{player.playerKills}</span>
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onAddKills(player._id, 1)}>
                +1 Kill
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEditPlayer(player._id, player.playerName)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDeletePlayer(player._id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between p-4 mt-4 text-lg font-semibold rounded-lg bg-card card-hover">
        <span className="text-accent">Total Team Kills:</span>
        <span className="text-purple">{totalKills}</span>
      </div>
    </div>
  );
};

export default PlayerList;
