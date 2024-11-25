import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Team {
  logo: string;
  name: string;
  prize: string;
}

interface TournamentCardProps {
  title: string;
  prizePool: string;
  status: string;
  startDate?: string;
  endDate?: string;
  mvp?: string;
  topTeams: Team[];
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  title,
  prizePool,
  status,
  startDate,
  endDate,
  mvp = "TBD",
  topTeams,
}) => {
  return (
    <Card className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <CardHeader className="pb-4 flex justify-between items-center">
        <Badge variant="outline" className="text-sm capitalize">
          {status}
        </Badge>
        <span className="font-bold text-lg text-primary">
          {prizePool} Coins
        </span>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl font-bold text-foreground mb-2">
          {title}
        </CardTitle>
        {status === "Finalized" && (
          <p className="text-muted text-sm">
            {startDate} - {endDate}
          </p>
        )}
        <div className="mt-4">
          <h4 className="text-sm text-muted">MVP:</h4>
          <div className="text-md font-bold text-primary">{mvp}</div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm text-muted">Top Teams:</h4>
          <ul className="mt-2 space-y-2">
            {topTeams.map((team, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-8 h-8 rounded-full border border-border"
                  />
                  <span className="text-foreground font-medium">
                    {team.name}
                  </span>
                </div>
                <span className="text-primary font-bold">{team.prize}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <a
          href={`/tournaments/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-primary font-medium hover:underline transition-colors"
        >
          View Details
        </a>
      </CardFooter>
    </Card>
  );
};

export default TournamentCard;
