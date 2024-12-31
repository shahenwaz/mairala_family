import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Banknote } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Team {
  teamName: string;
  teamPrize: string;
}

interface TournamentCardProps {
  prizePool: string;
  tourStatus: "Finalized" | "Ongoing";
  tourTitle: string;
  tourMvp: string;
  mvpKills: number;
  tourTop: Team[];
  colorScheme: "green" | "yellow";
  tournamentId: string; // Pass the dynamic ID
  onViewDetails: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  prizePool,
  tourStatus,
  tourTitle,
  tourMvp,
  mvpKills,
  tourTop,
  colorScheme,
  onViewDetails,
}) => {
  const defaultLogos = [
    "/images/CHAMP.png",
    "/images/RUNNER-UP.png",
    "/images/MVP.png",
  ];

  const badgeColor =
    colorScheme === "green"
      ? "bg-primary text-primary-foreground"
      : "bg-yellow-400 text-primary-foreground";

  const titleColor =
    colorScheme === "green" ? "text-primary" : "text-yellow-400";

  return (
    <div className="w-full max-w-sm p-6 space-y-6 rounded-md bg-card animate-fadeIn card-hover">
      {/* Prize Pool */}
      <div className="flex items-center justify-center space-x-2">
        <Banknote className="w-5 h-5 text-primary" />
        <span className="text-sm font-bold text-primary">{prizePool}</span>
        <Banknote className="w-5 h-5 text-primary" />
      </div>

      {/* Title */}
      <h3 className={`text-xl font-extrabold ${titleColor} text-center`}>
        {tourTitle}
      </h3>

      {/* Badge */}
      <div className="flex justify-center">
        <Badge className={`rounded-md font-bold px-3 py-1 ${badgeColor}`}>
          {tourStatus}
        </Badge>
      </div>

      {/* MVP */}
      <div className="p-4 text-center rounded-md bg-background">
        <p className="text-sm font-bold text-muted-foreground">
          MVP: <span className="text-foreground">{tourMvp}</span> ({mvpKills}{" "}
          kills)
        </p>
      </div>

      {/* Top Teams */}
      <div className="space-y-2">
        {tourTop.map((team, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={defaultLogos[index]} alt={team.teamName} />
              </Avatar>
              <span className="font-bold text-foreground">{team.teamName}</span>
            </div>
            <span className="font-bold text-muted-foreground">
              {team.teamPrize}
            </span>
          </div>
        ))}
      </div>

      {/* View Details Button */}
      <div className="flex justify-center">
        <Button
          onClick={onViewDetails}
          className="w-2/3 font-bold transition-all duration-300 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default TournamentCard;
