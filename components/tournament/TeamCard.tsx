"use client";
import React from "react";
import Link from "next/link";

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
      className="relative group bg-card p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
    >
      {/* Glowing Border Effect */}
      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center space-y-3">
        {/* Team Logo */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-muted to-secondary flex items-center justify-center">
          <img
            src={logo}
            alt={`${name} logo`}
            className="h-16 w-16 rounded-full object-cover border-2 border-primary"
          />
        </div>

        {/* Team Name */}
        <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-200">
          {name}
        </h3>

        {/* Player Count */}
        <p className="text-sm text-muted-foreground">{playerCount} Players</p>

        {/* Hover Animation */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default TeamCard;
