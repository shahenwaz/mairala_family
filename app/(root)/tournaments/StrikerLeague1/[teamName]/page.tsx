"use client";
import { useParams } from "next/navigation";
import TournamentDetails from "@/components/tournament/TournamentDetails";

const TeamDetailsPage = () => {
  const params = useParams();
  const { teamName } = params;

  // Example team data
  const teamDetails = {
    name: teamName,
    logo: "/images/CODM_LOGO.png",
    players: [
      { name: "Player 1", kills: 50 },
      { name: "Player 2", kills: 45 },
      // Add more players
    ],
    tournament: {
      title: "STRIKER LEAGUE 1.0",
      logo: "/images/SND_SLS1_LOGO.png",
      startDate: "15/03/2024",
      endDate: "01/04/2024",
      status: "Finalized",
      background: "/images/CODM_BG1.jpg",
    },
  };

  return (
    <div>
      <TournamentDetails {...teamDetails.tournament} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-primary">{teamDetails.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {teamDetails.players.map((player, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <p className="text-lg font-bold text-primary">{player.name}</p>
              <p className="text-sm text-muted-foreground">
                Kills: {player.kills}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
