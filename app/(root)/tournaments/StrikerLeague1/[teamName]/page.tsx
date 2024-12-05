"use client";
import { useParams } from "next/navigation";
import TournamentDetails from "@/components/tournament/TournamentDetails";

const TeamDetailsPage = () => {
  const { teamName } = useParams();

  // Ensure teamName is a string
  const decodedTeamName =
    typeof teamName === "string"
      ? decodeURIComponent(teamName)
      : Array.isArray(teamName)
      ? decodeURIComponent(teamName[0])
      : "Unknown Team";

  const teamDetails = {
    name: decodedTeamName,
    logo: "/images/CODM_LOGO.png",
    players: [
      { name: "Player 1", kills: 50 },
      { name: "Player 2", kills: 45 },
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
      <div className="w-full bg-background py-3">
        <div className="max-w-4xl mx-auto px-4">
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
    </div>
  );
};

export default TeamDetailsPage;
