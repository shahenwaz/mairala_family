import React from "react";
import TournamentCard from "@/components/ui/TournamentCard";

const TournamentsPage = () => {
  const tournaments = [
    {
      title: "Weekly Tournament",
      prizePool: "25,000",
      status: "Ongoing",
      mvp: "TBD",
      topTeams: [
        { logo: "/images/team1.png", name: "Black Ninja", prize: "$7500" },
        { logo: "/images/team2.png", name: "White Max", prize: "$6500" },
        { logo: "/images/team3.png", name: "Violet Gamers", prize: "$5500" },
      ],
    },
    {
      title: "Lucky Card",
      prizePool: "50,000",
      status: "Finalized",
      startDate: "2024-01-01",
      endDate: "2024-01-07",
      mvp: "Black Ninja",
      topTeams: [
        { logo: "/images/team1.png", name: "Black Ninja", prize: "$7500" },
        { logo: "/images/team2.png", name: "White Max", prize: "$6500" },
        { logo: "/images/team3.png", name: "Violet Gamers", prize: "$5500" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-sm text-muted uppercase mb-2">
        OUR TOURNAMENTS
      </h2>
      <h1 className="text-center text-3xl font-bold text-primary mb-6">
        CALL OF DUTY MOBILE
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament, index) => (
          <TournamentCard key={index} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
