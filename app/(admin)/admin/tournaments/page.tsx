"use client";

import React from "react";
import { Card } from "@/components/ui/card";

const TournamentsPage = () => {
  const tournaments = [
    {
      id: "1",
      uniqueId: "ST010",
      title: "Champions League",
      prizePool: 50000,
      status: "Ongoing",
    },
    {
      id: "2",
      uniqueId: "ST011",
      title: "Masters Tournament",
      prizePool: 30000,
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
          <Card key={tournament.id} className="p-4 space-y-4 bg-card">
            <h3 className="text-lg font-bold">{tournament.title}</h3>
            <p className="text-sm text-muted-foreground">{tournament.status}</p>
            <p className="text-sm text-muted-foreground">
              Prize Pool: {tournament.prizePool} TK
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TournamentsPage;
