import React from "react";
import MatchCard from "./MatchCard";

interface Match {
  team1: string;
  team2: string;
  team1logo: string;
  team2logo: string;
  score: string;
  round: string;
  date: string;
}

interface MatchesListProps {
  matches: Match[];
  filterByTeam?: string; // Optional team filter
}

const MatchesList: React.FC<MatchesListProps> = ({ matches, filterByTeam }) => {
  const filteredMatches = filterByTeam
    ? matches.filter(
        (match) => match.team1 === filterByTeam || match.team2 === filterByTeam
      )
    : matches;

  return (
    <div className="flex flex-col gap-6 mt-4">
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))
      ) : (
        <p className="text-center text-lightGray">
          No matches available for this team.
        </p>
      )}
    </div>
  );
};

export default MatchesList;
