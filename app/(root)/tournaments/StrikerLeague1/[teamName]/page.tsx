"use client";

import { useParams } from "next/navigation";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TeamHeader from "@/components/team/TeamHeader";
import PlayerList from "@/components/player/PlayerList";
import MatchesList from "@/components/tournament/MatchesList";

const TeamInfoPage = () => {
  const { teamName } = useParams();

  const decodedTeamName =
    typeof teamName === "string"
      ? decodeURIComponent(teamName)
      : Array.isArray(teamName)
      ? decodeURIComponent(teamName[0])
      : "Unknown Team";

  const teamInfo = {
    name: decodedTeamName,
    logo: "/images/CODM_LOGO.png",
    players: [
      { name: "Player 1", kills: 50 },
      { name: "Player 2", kills: 45 },
      { name: "Player 3", kills: 30 },
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

  // Matches (dummy data for now)
  const matches = [
    {
      team1: "SKY HUNTER",
      team2: "THE TOUGHER",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "0 : 0",
      round: "ROUND ROBIN",
      date: "3 DECEMBER 2024, 8:30 PM BST",
      status: "UPCOMING",
    },
    {
      team1: "KILLER 7 ULTIMATE",
      team2: "BLACK MAX",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "5 : 3",
      round: "QUARTER-FINAL",
      date: "2 DECEMBER 2024, 6:00 PM BST",
      status: "FINISHED",
    },
    {
      team1: "DISCIPLES OF MAYHEM",
      team2: "QUITE ONE ELITE",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/MF_LOGO.png",
      score: "3 : 4",
      round: "SEMI-FINAL",
      date: "2 DECEMBER 2024, 8:00 PM BST",
      status: "FINISHED",
    },
  ];

  return (
    <div>
      <TournamentDetails {...teamInfo.tournament} />
      <div className="min-h-screen bg-background text-foreground w-full max-w-3xl mx-auto">
        <div className="container px-4 py-2">
          <TeamHeader name={teamInfo.name} logo={teamInfo.logo} />
          <PlayerList players={teamInfo.players} />
          <h2 className="text-2xl font-bold text-purple mt-8">Matches</h2>
          <MatchesList matches={matches} filterByTeam={teamInfo.name} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoPage;
