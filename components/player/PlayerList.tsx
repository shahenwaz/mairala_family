"use client";
import React from "react";

interface Player {
  _id: string;
  playerName: string;
  playerKills: number;
}

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const sortedPlayers = players.sort((a, b) => b.playerKills - a.playerKills);
  const totalKills = players.reduce(
    (sum, player) => sum + player.playerKills,
    0
  );

  if (!players || players.length === 0) {
    return (
      <div className="text-center mt-4 text-muted">
        <p>No players have been added to this team yet.</p>
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
            <span className="text-lg font-semibold">{player.playerName}</span>
            <span className="text-primary">
              Kills: <span className="text-white">{player.playerKills}</span>
            </span>
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
