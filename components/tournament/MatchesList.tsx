import React from "react";
import MatchCard from "./MatchCard";

interface Match {
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  score: string;
  round: string;
  date: string;
}

interface MatchesListProps {
  matches: Match[];
}

const MatchesList: React.FC<MatchesListProps> = ({ matches }) => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {matches.length > 0 ? (
        matches.map((match, index) => <MatchCard key={index} {...match} />)
      ) : (
        <p className="text-center text-muted-foreground">
          No matches available for this filter.
        </p>
      )}
    </div>
  );
};

export default MatchesList;
