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
  teamName: string;
  rw: number;
  teamKills: number;
}

interface TeamLeaderboardProps {
  teams: Team[];
  status: "Ongoing" | "Finalized";
}

const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({ teams, status }) => {
  const [sortBy, setSortBy] = useState<"rw" | "kills">("kills");
  const [sortedTeams, setSortedTeams] = useState<Team[]>([]);

  // Determine the table header color based on the tournament status
  const tableHeaderColor =
    status === "Ongoing" ? "bg-yellow-400" : "bg-primary";

  // Sort teams dynamically based on the selected criteria
  useEffect(() => {
    const sorted = [...teams].sort((a, b) =>
      sortBy === "kills" ? b.teamKills - a.teamKills : b.rw - a.rw
    );

    setSortedTeams(sorted);
  }, [sortBy, teams]);

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-lg md:text-2xl font-bold text-purple text-center">
          TEAM LEADERBOARD
        </h2>
        <div className="relative z-10">
          <Select onValueChange={(value) => setSortBy(value as "kills" | "rw")}>
            <SelectTrigger className="w-[120px] md:w-[180px] border border-primary rounded-lg font-bold text-xs md:text-base hover:bg-muted/80 focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card text-foreground shadow-lg rounded-md">
              <SelectItem value="kills">Kills</SelectItem>
              <SelectItem value="rw">Rounds Won</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table className="w-full border border-muted rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow className={`${tableHeaderColor} text-primary-foreground`}>
            <TableCell className="px-4 py-3 font-bold text-xs text-center">
              #
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs">
              TEAM NAME
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs text-center">
              RW
            </TableCell>
            <TableCell className="px-4 py-3 font-bold text-xs text-center">
              KILLS
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTeams.map((team, index) => (
            <TableRow
              key={team.teamName}
              className={`${
                index % 2 === 0 ? "bg-muted/20" : "bg-background"
              } hover:bg-muted/50 transition-all rounded-md shadow-sm my-2`}
            >
              <TableCell className="px-4 py-3 font-bold text-center">
                {index + 1}
              </TableCell>
              <TableCell className="px-4 py-3 font-semibold">
                {team.teamName || "Unnamed Team"}
              </TableCell>
              <TableCell className="px-4 py-3 font-bold text-center">
                {team.rw}
              </TableCell>
              <TableCell className="px-4 py-3 font-bold text-center">
                {team.teamKills}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamLeaderboard;
