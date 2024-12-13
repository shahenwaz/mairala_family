"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface TeamCardProps {
  _id: string;
  teamName: string;
  playerCount: number;
  tournamentId: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  _id,
  teamName = "Unnamed Team",
  playerCount = 0,
  tournamentId,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  const teamLink = isAdmin
    ? `/admin/tournaments/${encodeURIComponent(
        tournamentId
      )}/${encodeURIComponent(_id)}`
    : `/tournaments/${encodeURIComponent(tournamentId)}/${encodeURIComponent(
        _id
      )}`;

  return (
    <Link href={teamLink}>
      <div className="relative overflow-hidden border-t-2 rounded-lg group bg-card card-hover border-darkGray">
        <div className="relative h-20 bg-black">
          {/* Background Section */}
          <Image
            src="/images/TEAM_BG.png"
            alt={`${teamName} Background`}
            fill
            className="object-cover object-center opacity-80 blur-xs"
          />

          {/* Team Logo */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16">
              <Image
                src="/images/CODM_LOGO.png"
                alt={`${teamName} Logo`}
                width={64}
                height={64}
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Team Details */}
        <div className="p-4 text-center">
          <h3 className="text-base font-semibold text-purple group-hover:text-lightGrayGray">
            {teamName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {playerCount} {playerCount === 1 ? "Player" : "Players"}
          </p>

          {/* Admin Buttons */}
          {isAdmin && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onEdit?.();
                }}
                className="hover:bg-primary/90"
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete?.();
                }}
                className="hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
