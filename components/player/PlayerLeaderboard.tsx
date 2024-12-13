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
  fetchPlayers: () => Promise<Player[]>; // Fetch function to retrieve player data dynamically
  status: "Ongoing" | "Finalized";
}

const PlayerLeaderboard: React.FC<PlayerLeaderboardProps> = ({
  fetchPlayers,
  status,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAndSortPlayers = async () => {
      try {
        const playersData = await fetchPlayers();
        setPlayers(playersData);

        // Sort players by kills
        const sorted = [...playersData].sort((a, b) => b.kills - a.kills);
        setSortedPlayers(sorted);
      } catch (error) {
        console.error("Error fetching players for leaderboard:", error);
      }
    };

    fetchAndSortPlayers();
  }, [fetchPlayers]);

  // Determine table header and team name colors based on status
  const tableHeaderColor =
    status === "Ongoing" ? "bg-yellow-400" : "bg-primary";
  const teamNameColor =
    status === "Ongoing" ? "text-yellow-400" : "text-primary";

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
                    {player.name}
                  </p>
                  <p
                    className={`font-semibold italic ${teamNameColor} text-[10px] md:text-xs`}
                  >
                    {player.team}
                  </p>
                </TableCell>
                <TableCell className="px-4 py-3 text-xs font-bold text-center md:text-sm lg:text-base">
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
