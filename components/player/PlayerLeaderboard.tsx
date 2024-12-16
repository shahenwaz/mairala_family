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
  playerName: string;
  teamName: string;
  playerKills: number | null | undefined;
}

interface PlayerLeaderboardProps {
  players: Player[];
  tourStatus: "Ongoing" | "Finalized";
}

const PlayerLeaderboard: React.FC<PlayerLeaderboardProps> = ({
  players,
  tourStatus,
}) => {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [showAll, setShowAll] = useState(false); // State to control rows visibility

  // Sort players by kills on component load
  useEffect(() => {
    const sorted = [...players].sort(
      (a, b) => (b.playerKills ?? 0) - (a.playerKills ?? 0)
    ); // Default to 0 for null/undefined
    setSortedPlayers(sorted);
  }, [players]);

  // Determine the table header color based on the status
  const tableHeaderColor =
    tourStatus === "Ongoing" ? "bg-yellow-400" : "bg-primary";

  // Determine the team name color based on the status
  const teamNameColor =
    tourStatus === "Ongoing" ? "text-yellow-400" : "text-primary";

  return (
    <div className="mt-8 space-y-6">
      {/* Heading */}
      <h2 className="text-xl font-bold text-center md:text-2xl text-purple">
        PLAYER LEADERBOARD
      </h2>

      {/* Table */}
      <Table className="w-full overflow-hidden border rounded-lg border-muted">
        <TableHeader>
          <TableRow className={`${tableHeaderColor} text-primary-foreground`}>
            <TableCell className="px-4 py-3 text-xs font-bold text-center md:text-sm lg:text-base">
              #
            </TableCell>
            <TableCell className="px-4 py-3 text-xs font-bold md:text-sm lg:text-base">
              PLAYER NAME
            </TableCell>
            <TableCell className="px-4 py-3 text-xs font-bold text-center md:text-sm lg:text-base">
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
                <TableCell className="px-4 py-3 text-xs font-bold text-center md:text-sm lg:text-base">
                  {index + 1} {/* Dynamic rank */}
                </TableCell>
                <TableCell className="px-4 py-3 text-xs md:text-sm lg:text-base">
                  <p className="font-extrabold text-foreground">
                    {player.playerName} {/* Fetch playerName */}
                  </p>
                  <p
                    className={`font-semibold italic ${teamNameColor} text-[10px] md:text-xs`}
                  >
                    {player.teamName} {/* Team Name */}
                  </p>
                </TableCell>
                <TableCell className="px-4 py-3 text-xs font-bold text-center md:text-sm lg:text-base">
                  {player.playerKills ?? 0} {/* Show 0 if undefined */}
                </TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>

      {/* Toggle Section */}
      <div className="flex justify-center transition-all duration-1000">
        <div
          className="text-xs font-semibold transition-all duration-300 cursor-pointer md:text-sm text-purple hover:text-lightGray"
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
