"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Team {
  rank: number;
  name: string;
  logo: string;
  rw: number;
  kills: number;
}

interface TeamLeaderboardProps {
  teams: Team[];
}

const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({ teams }) => {
  const [sortBy, setSortBy] = useState<"rw" | "kills">("kills");
  const [sortedTeams, setSortedTeams] = useState<Team[]>(
    [...teams].sort((a, b) => b.kills - a.kills) // Initial sort by kills
  );

  // Sort teams dynamically based on the selected criteria
  useEffect(() => {
    const sorted = [...teams].sort((a, b) => {
      if (sortBy === "kills") {
        return b.kills - a.kills; // Sort by Kills in descending order
      }
      return b.rw - a.rw; // Sort by Rounds Won in descending order
    });

    // Update ranks dynamically
    sorted.forEach((team, index) => {
      team.rank = index + 1;
    });

    setSortedTeams(sorted);
  }, [sortBy, teams]);

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-lg md:text-2xl font-bold text-purple-400 text-center">
          TEAM LEADERBOARD
        </h2>

        {/* Filter */}
        <div className="relative z-10">
          <Select onValueChange={(value) => setSortBy(value as "kills" | "rw")}>
            <SelectTrigger className="w-[180px] border border-primary rounded-lg font-bold text-sm md:text-base hover:bg-muted/80 focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card text-foreground shadow-lg rounded-md">
              <SelectItem value="kills">Kills</SelectItem>
              <SelectItem value="rw">Rounds Won</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table className="w-full border border-muted rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className="bg-primary text-primary-foreground">
            <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base text-center">
              #
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs lg:text-base">
              TEAM NAME
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base text-center">
              RW
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base text-center">
              KILLS
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeams.map((team) => (
            <TableRow
              key={team.rank}
              className={`${
                team.rank % 2 === 0 ? "bg-muted/20" : "bg-background"
              } hover:bg-muted/50 transition-all rounded-md shadow-sm my-2`}
            >
              <TableCell className="px-4 py-3 font-bold text-center text-xs md:text-sm lg:text-base">
                {team.rank}
              </TableCell>
              <TableCell className="px-4 py-3 font-bold text-xs md:text-sm lg:text-base">
                <div className="flex items-center gap-3">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-8 w-8 object-contain rounded-full"
                  />
                  <span>{team.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 font-bold text-center text-xs md:text-sm lg:text-base">
                {team.rw}
              </TableCell>
              <TableCell className="px-4 py-3 font-bold text-center text-xs md:text-sm lg:text-base">
                {team.kills}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamLeaderboard;
