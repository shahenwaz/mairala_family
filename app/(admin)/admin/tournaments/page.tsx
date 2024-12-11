"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const TournamentsPage = () => {
  const tournaments = [
    {
      id: "1",
      uniqueId: "ST020",
      title: "STRIKER LEAGUE 2.0",
      prizePool: 10000,
      status: "Ongoing",
    },
    {
      id: "2",
      uniqueId: "ST010",
      title: "STRIKER LEAGUE 1.O",
      prizePool: 5000,
      status: "Finalized",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-center text-3xl font-extrabold mb-6">
        Manage Tournaments
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Link
            key={tournament.id}
            href={`/admin/tournaments/${tournament.uniqueId}/teams`}
          >
            <Card className="p-4 space-y-4 bg-card cursor-pointer card-hover">
              <h3 className="text-lg font-bold">{tournament.title}</h3>
              <p className="text-sm text-muted-foreground">
                {tournament.status}
              </p>
              <p className="text-sm text-muted-foreground">
                Prize Pool: {tournament.prizePool} TK
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
