"use client";

import { useParams, useRouter } from "next/navigation";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TeamHeader from "@/components/team/TeamHeader";
import PlayerList from "@/components/player/PlayerList";
import MatchesList from "@/components/match/MatchesList";

const TeamInfoPage = () => {
  const { teamName } = useParams();
  const router = useRouter();

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
      title: "STRIKER LEAGUE 2.0",
      logo: "/images/SND_SLS2_LOGO.png",
      startDate: "11/12/2024",
      endDate: "30/12/2024",
      status: "Ongoing",
      background: "/images/CODM_BG3.jpg",
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
      <div className="w-full max-w-3xl min-h-screen mx-auto bg-background text-foreground">
        <div className="container px-4 py-2">
          <button
            className="flex items-center gap-2 px-4 py-2 mx-auto my-4 text-xs font-medium transition border rounded-md lg:text-sm text-lightGray border-lightGray hover:bg-primary hover:text-primary-foreground"
            onClick={() =>
              router.push(
                `/tournaments/${encodeURIComponent(
                  teamInfo.tournament.title.replace(/\s+/g, "")
                )}`
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            BACK TO TEAMS
          </button>
          <TeamHeader name={teamInfo.name} logo={teamInfo.logo} />
          <PlayerList players={teamInfo.players} />
          <h2 className="mt-8 text-xl lg:text-2xl font-bold text-center text-purple lg:text-start">
            Matches
          </h2>
          <MatchesList matches={matches} filterByTeam={teamInfo.name} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoPage;
