"use client";

import React from "react";
import TeamCard from "@/components/team/TeamCard";
import { Team } from "@/types/Team";

interface TeamListProps {
  teams: Team[];
  tournamentId: string;
  isAdmin?: boolean; // Flag to indicate admin view
  onEditTeam?: (team: Team) => void; // Admin action: Edit
  onDeleteTeam?: (teamId: string) => void; // Admin action: Delete
}

const TeamList: React.FC<TeamListProps> = ({
  teams,
  tournamentId,
  isAdmin = false, // Default to client view
  onEditTeam,
  onDeleteTeam,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mb-8 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard
          key={team.teamId}
          name={team.name}
          playerCount={team.playerCount}
          tournament={tournamentId.replace(/\s+/g, "")}
          isAdmin={isAdmin} // Enable admin mode
          onEdit={isAdmin ? () => onEditTeam?.(team) : undefined}
          onDelete={isAdmin ? () => onDeleteTeam?.(team.teamId) : undefined}
        />
      ))}
    </div>
  );
};

export default TeamList;
