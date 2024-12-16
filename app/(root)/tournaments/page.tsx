"use client";

import React, { useEffect, useState } from "react";
import TournamentCard from "@/components/tournament/TournamentCard";
import { useRouter } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";

const TournamentsPage = () => {
  const router = useRouter();
  const [dynamicRoutes, setDynamicRoutes] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchTournamentIds = async () => {
      const db = getFirestore(app);
      const tournamentsRef = collection(db, "tournaments");

      const snapshot = await getDocs(tournamentsRef);

      const routes: { [key: string]: string } = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        routes[data.tourTitle] = `/tournaments/${doc.id}`;
      });

      setDynamicRoutes(routes);
    };

    fetchTournamentIds();
  }, []);

  const tournaments = [
    {
      prizePool: "10000 TK",
      tourStatus: "Ongoing" as const,
      tourTitle: "STRIKER LEAGUE 2.0",
      tourMvp: "TO BE DECIDED",
      mvpKills: 0,
      tourTop: [
        { teamName: "CHAMPION", teamPrize: "7000 TK" },
        { teamName: "RUNNER-UP", teamPrize: "3000 TK" },
        { teamName: "MVP", teamPrize: "500 TK" },
      ],
      colorScheme: "yellow" as const,
    },
    {
      prizePool: "1000 TK",
      tourStatus: "Finalized" as const,
      tourTitle: "FRIENDLY TOUR 1.0",
      tourMvp: "MF | SID",
      mvpKills: 55,
      tourTop: [
        { teamName: "BITCHES", teamPrize: "1000 TK" },
        { teamName: "AVENGERS", teamPrize: "0 TK" },
        { teamName: "MF | SID (MVP)", teamPrize: "0 TK" },
      ],
      colorScheme: "green" as const,
    },
    {
      prizePool: "5000 TK",
      tourStatus: "Finalized" as const,
      tourTitle: "STRIKER LEAGUE 1.0",
      tourMvp: "ADEUS",
      mvpKills: 107,
      tourTop: [
        { teamName: "DISCIPLES OF MAYHEM", teamPrize: "3500 TK" },
        { teamName: "QUITE ONE ELITE", teamPrize: "1500 TK" },
        { teamName: "ADEUS (MVP)", teamPrize: "500 TK" },
      ],
      colorScheme: "green" as const,
    },
  ];

  return (
    <div className="container px-4 py-10 mx-auto space-y-8">
      <div>
        <h2 className="mb-2 text-sm font-bold text-center text-muted-foreground">
          OUR TOURNAMENTS
        </h2>
        <h1 className="text-2xl font-extrabold text-center sm:text-3xl md:text-4xl text-foreground">
          CALL OF DUTY MOBILE
        </h1>
      </div>

      <div className="grid items-center justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 place-items-center">
        {tournaments.map((tournament, index) => {
          const route =
            dynamicRoutes[tournament.tourTitle] || "/tournaments/not-found";

          return (
            <TournamentCard
              key={index}
              prizePool={tournament.prizePool}
              tourStatus={tournament.tourStatus}
              tourTitle={tournament.tourTitle}
              tourMvp={tournament.tourMvp}
              mvpKills={tournament.mvpKills}
              tourTop={tournament.tourTop}
              colorScheme={tournament.colorScheme}
              onViewDetails={() => router.push(route)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TournamentsPage;
