import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Team {
  name: string;
  prize: string;
}

interface TournamentCardProps {
  prizePool: string;
  status: "Finalized" | "Ongoing";
  title: string;
  mvp: string;
  mvpKills: number;
  teams: Team[];
  colorScheme: "green" | "yellow";
  onViewDetails: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  prizePool,
  status,
  title,
  mvp,
  mvpKills,
  teams,
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
    <div className="bg-card shadow-md rounded-md p-6 space-y-6 w-full max-w-sm animate-fadeIn transition-transform hover:scale-[1.02]">
      {/* Prize Pool */}
      <div className="flex justify-center items-center space-x-2">
        <Trophy className="text-primary w-5 h-5" />
        <span className="text-sm font-bold text-primary">{prizePool}</span>
        <Trophy className="text-primary w-5 h-5" />
      </div>

      {/* Title */}
      <h3 className={`text-xl font-extrabold ${titleColor} text-center`}>
        {title}
      </h3>

      {/* Badge */}
      <div className="flex justify-center">
        <Badge className={`rounded-md font-bold px-3 py-1 ${badgeColor}`}>
          {status}
        </Badge>
      </div>

      {/* MVP */}
      <div className="bg-background rounded-md p-4 text-center">
        <p className="text-sm font-bold text-muted-foreground">
          MVP: <span className="text-foreground">{mvp}</span> ({mvpKills} kills)
        </p>
      </div>

      {/* Top Teams */}
      <div className="space-y-2">
        {teams.map((team, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={defaultLogos[index]} alt={team.name} />
              </Avatar>
              <span className="text-foreground font-bold">{team.name}</span>
            </div>
            <span className="text-muted-foreground font-bold">
              {team.prize}
            </span>
          </div>
        ))}
      </div>

      {/* View Details Button */}
      <div className="flex justify-center">
        <Button
          onClick={onViewDetails}
          className="font-bold w-2/3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-all duration-300 hover:scale-105"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default TournamentCard;
