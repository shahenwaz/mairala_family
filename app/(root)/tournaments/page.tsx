"use client";

import React from "react";
import TournamentCard from "@/components/tournament/TournamentCard";
import { useRouter } from "next/navigation";

const TournamentsPage = () => {
  const router = useRouter();

  const tournaments = [
    {
      prizePool: "10000 TK",
      status: "Ongoing" as const,
      title: "STRIKER LEAGUE 2.0",
      mvp: "TO BE DECIDED",
      mvpKills: 0,
      teams: [
        { name: "CHAMPION", prize: "7000 TK" },
        { name: "RUNNER-UP", prize: "3000 TK" },
        { name: "MVP", prize: "500 TK" },
      ],
      colorScheme: "yellow" as const,
      route: "/tournaments/STRIKERLEAGUE2.0",
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
        { name: "MF | SID (MVP)", prize: "0 TK" },
      ],
      colorScheme: "green" as const,
      route: "/tournaments/FRIENDLYTOUR1.0",
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
        { name: "ADEUS (MVP)", prize: "500 TK" },
      ],
      colorScheme: "green" as const,
      route: "/tournaments/STRIKERLEAGUE1.0",
    },
  ];

  return (
    <div className="container px-4 py-10 mx-auto space-y-8">
      <div>
        {/* Subtitle */}
        <h2 className="mb-2 text-sm font-bold text-center text-muted-foreground">
          OUR TOURNAMENTS
        </h2>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-center sm:text-3xl md:text-4xl text-foreground">
          CALL OF DUTY MOBILE
        </h1>
      </div>

      {/* Tournament Cards */}
      <div className="grid items-center justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 place-items-center">
        {tournaments.map((tournament, index) => (
          <TournamentCard
            key={index}
            {...tournament}
            onViewDetails={() => router.push(tournament.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
