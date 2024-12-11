"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface TeamCardProps {
  name: string;
  playerCount: number;
  tournament: string;
  isAdmin?: boolean; // Flag to indicate admin view
  onEdit?: () => void; // Admin-only action
  onDelete?: () => void; // Admin-only action
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  playerCount,
  tournament,
  isAdmin = false, // Default to client view
  onEdit,
  onDelete,
}) => {
  const encodedTournament = encodeURIComponent(tournament);
  const encodedName = encodeURIComponent(name);

  return (
    <div className="relative overflow-hidden border-t-2 rounded-lg group bg-card card-hover border-darkGray">
      {/* Glowing Effect (Under the Card) */}
      <div className="absolute transition-opacity duration-300 rounded-lg opacity-0 -inset-1 bg-gradient-to-r from-lightGray to-darkGray group-hover:opacity-20 blur-lg"></div>

      {/* Background Section */}
      <div className="relative h-20 bg-black">
        <Image
          src="/images/TEAM_BG.png"
          alt="Team Background"
          fill
          className="object-cover object-center opacity-80 blur-xs"
        />

        {/* Team Logo */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16">
            <Image
              src="/images/CODM_LOGO.png"
              alt={`${name} logo`}
              width={64}
              height={64}
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Team Name and Player Count */}
      <div className="p-4 text-center">
        <h3 className="text-base font-semibold transition-colors duration-200 lg:text-sm text-purple group-hover:text-lightGrayGray">
          {name}
        </h3>
        <p className="text-sm lg:text-xs text-muted-foreground">
          {playerCount} Players
        </p>

        {/* Admin Buttons (Edit/Delete) */}
        {isAdmin && (
          <div className="flex justify-center gap-2 mt-4">
            <Button size="sm" onClick={onEdit} className="hover:bg-primary/90">
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
              className="hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
