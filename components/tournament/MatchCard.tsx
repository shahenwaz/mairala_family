"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface MatchProps {
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  score: string;
  round: string;
  date: string;
}

const MatchCard: React.FC<MatchProps> = ({
  team1,
  team2,
  team1Logo,
  team2Logo,
  score,
  round,
  date,
}) => {
  return (
    <Card className="relative bg-card border-2 border-darkGray shadow-md transition-all duration-700 ease-in-out hover:border-primary rounded-lg w-full max-w-3xl mx-auto mb-4">
      {/* Round Tag */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm text-primary-foreground font-semibold shadow-md">
        {round}
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden p-4 gap-2">
        {/* Teams and Score */}
        <div className="flex justify-between items-center">
          {/* Team 1 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-darkGray bg-zinc-900 rounded-md p-2">
              <Image src={team1Logo} alt={team1} width={50} height={50} />
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center">
            <p className="text-2xl font-extrabold text-primary">{score}</p>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-darkGray bg-zinc-900 rounded-md p-2">
              <Image src={team2Logo} alt={team2} width={50} height={50} />
            </div>
          </div>
        </div>

        {/* Team Names */}
        <div className="flex justify-between items-center mt-1 mb-3">
          <h3 className="text-sm font-bold text-left text-foreground">
            {team1}
          </h3>
          <h3 className="text-sm font-bold text-right text-foreground">
            {team2}
          </h3>
        </div>

        {/* Match Date */}
        <div className="border border-primary absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-muted text-muted-foreground text-xs px-3 py-1 rounded-md shadow-md w-4/6 text-center">
          {date}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between p-4">
        {/* Team 1 */}
        <div className="flex items-center gap-3 w-2/5 justify-start">
          <div className="border-2 border-darkGray bg-zinc-900 rounded-md p-2">
            <Image src={team1Logo} alt={team1} width={60} height={60} />
          </div>
          <h3 className="text-sm font-bold text-foreground text-left flex-grow">
            {team1}
          </h3>
        </div>

        {/* Score */}
        <div className="w-1/5 flex items-center justify-center">
          <p className="text-2xl font-extrabold text-primary">{score}</p>
        </div>

        {/* Team 2 */}
        <div className="flex items-center gap-3 w-2/5 justify-end">
          <h3 className="text-sm font-bold text-foreground text-right flex-grow">
            {team2}
          </h3>
          <div className="border-2 border-darkGray bg-zinc-900 rounded-md p-2">
            <Image src={team2Logo} alt={team2} width={60} height={60} />
          </div>
        </div>

        {/* Match Date */}
        <div className="border border-primary absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-muted text-muted-foreground text-xs px-3 py-1 rounded-md shadow-md">
          {date}
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
