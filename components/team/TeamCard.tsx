"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TeamCardProps {
  id: string; // team ID
  tournamentId: string; // tournament ID
  teamname: string;
  teamlogo: string;
  playercount: number;
}

const TeamCard: React.FC<TeamCardProps> = ({
  id,
  tournamentId,
  teamname,
  teamlogo,
  playercount,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/tournaments/${tournamentId}/${id}`)} // Navigate to dynamic team page
      className="relative overflow-hidden border-t-2 rounded-lg group bg-card card-hover border-darkGray cursor-pointer"
    >
      {/* Glowing Effect */}
      <div className="absolute transition-opacity duration-300 rounded-lg opacity-0 -inset-1 bg-gradient-to-r from-lightGray to-darkGray group-hover:opacity-20 blur-lg"></div>

      {/* Background Section */}
      <div className="relative h-20 bg-black">
        {/* Background Image */}
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
              src={teamlogo}
              alt={`${teamname} logo`}
              width={64}
              height={64}
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Team Name and Player Count */}
      <div className="p-4 text-center">
        <h3 className="text-base font-semibold transition-colors duration-200 lg:text-sm text-purple group-hover:text-lightGrayGray">
          {teamname}
        </h3>
        <p className="text-sm lg:text-xs text-muted-foreground">
          {playercount} Players
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
