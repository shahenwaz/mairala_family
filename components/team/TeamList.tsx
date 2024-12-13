// components/tournament/TeamList.tsx
"use client";

import React from "react";
import TeamCard from "@/components/team/TeamCard";
import { Team } from "@/types/Team";

interface TeamListProps {
  teams: Team[];
  tournament: string;
}

const TeamList: React.FC<TeamListProps> = ({ teams, tournament }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mb-8 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard
          key={team.name}
          name={team.name}
          logo={team.logo}
          playerCount={team.playerCount}
          tournament={tournament.replace(/\s+/g, "")}
        />
      ))}
    </div>
  );
};

export default TeamList;
