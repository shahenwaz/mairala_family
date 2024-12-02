"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface Player {
  name: string;
  team: string;
  kills: number;
}

interface PlayerLeaderboardProps {
  players: Player[];
  status: "Ongoing" | "Finalized";
}

const PlayerLeaderboard: React.FC<PlayerLeaderboardProps> = ({
  players,
  status,
}) => {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [showAll, setShowAll] = useState(false); // State to control rows visibility

  // Sort players by kills on component load
  useEffect(() => {
    const sorted = [...players].sort((a, b) => b.kills - a.kills); // Sort by kills (descending)
    setSortedPlayers(sorted);
  }, [players]);

  // Determine the table header color based on the status
  const tableHeaderColor =
    status === "Ongoing" ? "bg-yellow-400" : "bg-primary";

  // Determine the team name color based on the status
  const teamNameColor =
    status === "Ongoing" ? "text-yellow-400" : "text-primary";

  return (
    <div className="mt-8 space-y-6">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-bold text-purple-400 text-center">
        PLAYER LEADERBOARD
      </h2>

      {/* Table */}
      <Table className="w-full border border-muted rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className={`${tableHeaderColor} text-primary-foreground`}>
            <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base text-center">
              #
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base">
              PLAYER NAME
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base text-center">
              KILLS
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player, index) =>
            (!showAll && index < 10) || showAll ? (
              <TableRow
                key={index}
                className={`${
                  (index + 1) % 2 === 0 ? "bg-muted/20" : "bg-background"
                } hover:bg-muted/50 transition-all rounded-md shadow-sm my-2`}
              >
                <TableCell className="px-4 py-3 font-bold text-center text-xs md:text-sm lg:text-base">
                  {index + 1} {/* Dynamic rank */}
                </TableCell>
                <TableCell className="px-4 py-3 text-xs md:text-sm lg:text-base">
                  <p className="font-extrabold text-foreground">
                    {player.name}
                  </p>
                  {/* Player Name */}
                  <p
                    className={`font-semibold italic ${teamNameColor} text-[10px] md:text-xs`}
                  >
                    {player.team} {/* Team Name */}
                  </p>
                </TableCell>
                <TableCell className="px-4 py-3 font-bold text-center text-xs md:text-sm lg:text-base">
                  {player.kills}
                </TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>

      {/* Toggle Section */}
      <div className="flex justify-center transition-all duration-1000">
        <div
          className="text-xs md:text-sm text-purple-500 font-semibold cursor-pointer hover:text-purple-300 transition-all duration-1000"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              MINIMIZE
              <span className="ml-2">&#9650;</span> {/* Upward triangle */}
            </>
          ) : (
            <>
              SEE ALL
              <span className="ml-2">&#9660;</span> {/* Downward triangle */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerLeaderboard;
