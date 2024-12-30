"use client";
import React from "react";
import TeamCard from "@/components/team/TeamCard";
import { Team } from "@/types/tournament";

interface TeamListProps {
  teams: Team[];
}

const TeamList: React.FC<TeamListProps> = ({ teams }) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mb-8 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard
          key={team.teamname}
          teamname={team.teamname}
          teamlogo={team.teamlogo}
          playercount={team.playercount}
        />
      ))}
    </div>
  );
};

export default TeamList;
