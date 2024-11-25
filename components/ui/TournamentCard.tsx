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
  logo: string; // Path to team logo
  name: string;
  prize: string; // Prize amount
}

interface TournamentCardProps {
  title: string;
  prizePool: string;
  status: string; // Example: "Ongoing", "Finalized", etc.
  startDate?: string; // Start date (optional)
  endDate?: string; // End date (optional)
  mvp?: string; // MVP name
  topTeams: Team[]; // List of top teams
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
    <Card className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
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
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-foreground">{team.name}</span>
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
          className="text-primary hover:underline"
        >
          View Details
        </a>
      </CardFooter>
    </Card>
  );
};

export default TournamentCard;
