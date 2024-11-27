"use client";

import React from "react";
import TournamentCard from "@/components/ui/TournamentCard";

const TournamentsPage = () => {
  const tournaments = [
    {
      prizePool: "10000 TK",
      status: "In Progress" as const,
      title: "STRIKER LEAGUE 2.0",
      mvp: "TO BE DECIDED",
      mvpKills: 0,
      teams: [
        { name: "CHAMPION", prize: "7000 TK" },
        { name: "RUNNER-UP", prize: "3000 TK" },
        { name: "MVP", prize: "500 TK" }, // This object will be used for MVP
      ],
      colorScheme: "yellow" as const,
    },
    {
      prizePool: "1000 TK",
      status: "Finalized" as const,
      title: "FRIENDLY TOUR 1.0",
      mvp: "MF | SID",
      mvpKills: 55,
      teams: [
        { name: "BITCHES", prize: "1000 TK" },
        { name: "AVENGERS", prize: "0 TK" },
        { name: "MF | SID (MVP)", prize: "0 TK" }, // This object will be used for MVP
      ],
      colorScheme: "green" as const,
    },
    {
      prizePool: "5000 TK",
      status: "Finalized" as const,
      title: "STRIKER LEAGUE 1.0",
      mvp: "ADEUS",
      mvpKills: 107,
      teams: [
        { name: "DISCIPLES OF MAYHEM", prize: "3500 TK" },
        { name: "QUITE ONE ELITE", prize: "1500 TK" },
        { name: "ADEUS (MVP)", prize: "500 TK" }, // This object will be used for MVP
      ],
      colorScheme: "green" as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div>
        {/* Subtitle */}
        <h2 className="text-center text-sm font-bold text-muted-foreground mb-2">
          OUR TOURNAMENTS
        </h2>

        {/* Title */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
          CALL OF DUTY MOBILE
        </h1>
      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 justify-center items-center place-items-center">
        {tournaments.map((tournament, index) => (
          <TournamentCard
            key={index}
            {...tournament}
            onViewDetails={() =>
              alert(`Viewing details for ${tournament.title}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
