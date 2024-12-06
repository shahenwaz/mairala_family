"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  logo: string;
  playerCount: number;
  tournament: string;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  logo,
  playerCount,
  tournament,
}) => {
  const encodedName = encodeURIComponent(name);

  return (
    <Link
      href={`/tournaments/${tournament}/${encodedName}`}
      className="relative group bg-card rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 overflow-hidden border-t-2 border-darkGray"
    >
      {/* Glowing Effect (Under the Card) */}
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-lightGray to-darkGray opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>

      {/* Background Section */}
      <div className="relative h-20 bg-black">
        {/* Background Image */}
        <Image
          src="/images/TEAM_BG.png"
          alt="Team Background"
          fill
          className="object-cover object-center opacity-60 blur-xs"
        />

        {/* Team Logo (Independent and Sharp) */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-16 h-16 flex items-center justify-center">
            <Image
              src={logo}
              alt={`${name} logo`}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Team Name and Player Count */}
      <div className="p-4 text-center">
        <h3 className="text-base lg:text-sm font-semibold text-purple group-hover:text-lightGrayGray transition-colors duration-200">
          {name}
        </h3>
        <p className="text-sm lg:text-xs text-muted-foreground">
          {playerCount} Players
        </p>
      </div>
    </Link>
  );
};

export default TeamCard;
