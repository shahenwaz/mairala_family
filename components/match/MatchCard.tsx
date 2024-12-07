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
    <Card className="relative w-full max-w-3xl mx-auto mb-4 transition-all duration-700 ease-in-out border-2 rounded-lg shadow-md bg-card border-darkGray hover:border-primary">
      {/* Round Tag */}
      <div className="absolute px-4 py-1 text-sm font-semibold transform -translate-x-1/2 rounded-full shadow-md -top-3 left-1/2 bg-primary text-primary-foreground">
        {round}
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-2 p-4 md:hidden">
        {/* Teams and Score */}
        <div className="flex items-center justify-between">
          {/* Team 1 */}
          <div className="flex flex-col items-center">
            <div className="p-2 border-2 rounded-md border-darkGray bg-zinc-900">
              <Image src={team1Logo} alt={team1} width={50} height={50} />
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center justify-center">
            <p className="text-2xl font-extrabold text-primary">{score}</p>
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center">
            <div className="p-2 border-2 rounded-md border-darkGray bg-zinc-900">
              <Image src={team2Logo} alt={team2} width={50} height={50} />
            </div>
          </div>
        </div>

        {/* Team Names */}
        <div className="flex items-center justify-between mt-1 mb-3">
          <h3 className="text-xs font-semibold text-left text-foreground">
            {team1}
          </h3>
          <h3 className="text-xs font-semibold text-right text-foreground">
            {team2}
          </h3>
        </div>

        {/* Match Date */}
        <div className="absolute w-4/6 px-3 py-1 text-xs text-center transform -translate-x-1/2 border rounded-md shadow-md border-primary -bottom-3 left-1/2 bg-muted text-muted-foreground">
          {date}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="items-center justify-between hidden p-4 md:flex">
        {/* Team 1 */}
        <div className="flex items-center justify-start w-2/5 gap-3">
          <div className="p-2 border-2 rounded-md border-darkGray bg-zinc-900">
            <Image src={team1Logo} alt={team1} width={60} height={60} />
          </div>
          <h3 className="flex-grow text-sm font-bold text-left text-foreground">
            {team1}
          </h3>
        </div>

        {/* Score */}
        <div className="flex items-center justify-center w-1/5">
          <p className="text-2xl font-extrabold text-primary">{score}</p>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-end w-2/5 gap-3">
          <h3 className="flex-grow text-sm font-bold text-right text-foreground">
            {team2}
          </h3>
          <div className="p-2 border-2 rounded-md border-darkGray bg-zinc-900">
            <Image src={team2Logo} alt={team2} width={60} height={60} />
          </div>
        </div>

        {/* Match Date */}
        <div className="absolute px-3 py-1 text-xs transform -translate-x-1/2 border rounded-md shadow-md border-primary -bottom-3 left-1/2 bg-muted text-muted-foreground">
          {date}
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
