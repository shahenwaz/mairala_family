"use client";
import React from "react";
import TeamCard from "./TeamCard";

interface TeamListProps {
  teams: Array<{
    name: string;
    logo: string;
    playerCount: number;
  }>;
  tournament: string;
}

const TeamList: React.FC<TeamListProps> = ({ teams, tournament }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-8">
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          name={team.name}
          logo={team.logo}
          playerCount={team.playerCount}
          tournament={tournament}
        />
      ))}
    </div>
  );
};

export default TeamList;
