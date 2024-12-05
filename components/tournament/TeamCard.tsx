"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  logo: string;
  playerCount: number;
  tournament: string; // Pass the tournament slug for dynamic routes
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  logo,
  playerCount,
  tournament,
}) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/tournaments/${tournament}/${name}`)}
      className="bg-card border border-muted rounded-md shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.02] transition-transform duration-200 p-4"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-md border border-darkGray">
          <Image
            src={logo}
            alt={`${name} Logo`}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <h3 className="text-base font-semibold text-primary">{name}</h3>
        <p className="text-sm text-muted-foreground">{playerCount} Players</p>
      </div>
    </Card>
  );
};

export default TeamCard;
