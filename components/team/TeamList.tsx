"use client";
import React from "react";
import TeamCard from "@/components/team/TeamCard";
import { Team } from "@/types/Team";

interface TeamListProps {
  teams: Team[] | null; // Adjust to accept `null` or empty
  tournamentId: string;
  isAdmin?: boolean;
  onEditTeam?: (team: Team) => void;
  onDeleteTeam?: (teamId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({
  teams = [], // Default to empty array if null
  tournamentId,
  isAdmin = false,
  onEditTeam,
  onDeleteTeam,
}) => {
  if (!Array.isArray(teams) || teams.length === 0) {
    return (
      <div className="text-center mt-6 text-muted">
        <p>No teams have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 mb-8 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <TeamCard
          key={team._id}
          _id={team._id}
          teamName={team.teamName || "Unnamed Team"}
          playerCount={team.playerCount || 0}
          tournamentId={tournamentId.replace(/\s+/g, "")}
          isAdmin={isAdmin}
          onEdit={isAdmin ? () => onEditTeam?.(team) : undefined}
          onDelete={isAdmin ? () => onDeleteTeam?.(team._id) : undefined}
        />
      ))}
    </div>
  );
};

export default TeamList;
