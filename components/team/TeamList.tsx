"use client";
import React from "react";
import TeamCard from "@/components/team/TeamCard";
import { Team } from "@/types/Team";

interface TeamListProps {
  teams: Team[];
  tournamentId: string; // Explicitly include this prop
}

const TeamList: React.FC<TeamListProps> = ({ teams, tournamentId }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mb-8 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard
          key={team.name}
          name={team.name}
          playerCount={team.playerCount}
          tournament={tournamentId.replace(/\s+/g, "")} // Pass the tournamentId as a sanitized string
        />
      ))}
    </div>
  );
};

export default TeamList;
