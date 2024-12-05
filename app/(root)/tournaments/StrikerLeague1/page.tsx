"use client";
import React, { useState } from "react";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import MatchesFilter from "@/components/tournament/MatchesFilter";
import MatchesList from "@/components/tournament/MatchesList";
import TeamList from "@/components/tournament/TeamList";
import TeamLeaderboard from "@/components/tournament/TeamLeaderboard";
import PlayerLeaderboard from "@/components/tournament/PlayerLeaderboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Gamepad2, Users, Trophy } from "lucide-react";

export default function StrikerLeague1() {
  const tournament = {
    title: "STRIKER LEAGUE 1.0",
    logo: "/images/SND_SLS1_LOGO.png",
    startDate: "15/03/2024",
    endDate: "01/04/2024",
    status: "Finalized" as "Ongoing" | "Finalized", // Ensure the status matches the required type
    background: "/images/CODM_BG1.jpg",
  };

  // Add dummy matches data
  const matches = [
    {
      team1: "SKY HUNTER",
      team2: "THE TOUGHER",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "0 : 0",
      round: "ROUND ROBIN",
      date: "3 DECEMBER 2024, 8:30 PM BST",
      status: "UPCOMING" as const, // Ensure the status matches the MatchProps type
    },
    {
      team1: "KILLER 7 ULTIMATE",
      team2: "BLACK MAX",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "5 : 3",
      round: "QUARTER-FINAL",
      date: "2 DECEMBER 2024, 6:00 PM BST",
      status: "FINISHED" as const, // Ensure the status matches the MatchProps type
    },
    {
      team1: "RACCOONS",
      team2: "HUMBLE GUYS",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "4 : 5",
      round: "GRAND FINALE",
      date: "1 DECEMBER 2024, 7:30 PM BST",
      status: "FINISHED" as const, // Ensure the status matches the MatchProps type
    },
  ];

  // State for Filter
  const [filter, setFilter] = useState<"ALL MATCHES" | "UPCOMING" | "FINISHED">(
    "ALL MATCHES"
  );

  const filteredMatches = matches.filter((match) => {
    if (filter === "ALL MATCHES") return true;
    return match.status === filter;
  });

  const teams = [
    {
      rank: 1,
      name: "DISCIPLES OF MAYHEM",
      logo: "/images/CODM_LOGO.png",
      rw: 67,
      kills: 393,
    },
    {
      rank: 2,
      name: "QUITE ONE ELITE",
      logo: "/images/CODM_LOGO.png",
      rw: 73,
      kills: 356,
    },
    {
      rank: 3,
      name: "VENGEANCE SEEKERS",
      logo: "/images/CODM_LOGO.png",
      rw: 43,
      kills: 306,
    },
    {
      rank: 4,
      name: "GRUMBLING GANGSTERS",
      logo: "/images/CODM_LOGO.png",
      rw: 48,
      kills: 296,
    },
    {
      rank: 5,
      name: "GRUMBLING GANGSTERS 2.0",
      logo: "/images/CODM_LOGO.png",
      rw: 28,
      kills: 162,
    },
    {
      rank: 6,
      name: "TOXIQUE GIRLS",
      logo: "/images/CODM_LOGO.png",
      rw: 25,
      kills: 147,
    },
    {
      rank: 7,
      name: "BTV",
      logo: "/images/CODM_LOGO.png",
      rw: 23,
      kills: 139,
    },
    {
      rank: 8,
      name: "TEAM MAIRALA",
      logo: "/images/CODM_LOGO.png",
      rw: 27,
      kills: 104,
    },
    {
      rank: 9,
      name: "THE MIGHTY FORCE",
      logo: "/images/CODM_LOGO.png",
      rw: 12,
      kills: 81,
    },
    {
      rank: 10,
      name: "ASTRAL LEGIONS",
      logo: "/images/CODM_LOGO.png",
      rw: 4,
      kills: 47,
    },
    {
      rank: 11,
      name: "TEAM OMEGA",
      logo: "/images/CODM_LOGO.png",
      rw: 3,
      kills: 45,
    },
    {
      rank: 12,
      name: "LIONS ROAR",
      logo: "/images/CODM_LOGO.png",
      rw: 9,
      kills: 43,
    },
    {
      rank: 13,
      name: "TEAM EPSILON",
      logo: "/images/CODM_LOGO.png",
      rw: 0,
      kills: 43,
    },
    {
      rank: 14,
      name: "GANGS OF COD",
      logo: "/images/CODM_LOGO.png",
      rw: 0,
      kills: 18,
    },
    {
      rank: 15,
      name: "BLOOD CULT",
      logo: "/images/CODM_LOGO.png",
      rw: 7,
      kills: 10,
    },
    {
      rank: 16,
      name: "TEAM ALPHA",
      logo: "/images/CODM_LOGO.png",
      rw: 0,
      kills: 0,
    },
  ];

  const players = [
    { name: "Adeus", team: "Disciples of Mayhem", kills: 107 },
    { name: "BATMAN_on_DRUG", team: "Grumbling Gangsters", kills: 92 },
    { name: "U_SO_CUTE", team: "Quite One Elite", kills: 79 },
    { name: "Purinz", team: "Disciples of Mayhem", kills: 76 },
    { name: "NanosecYT", team: "Quite One Elite", kills: 75 },
    { name: "Carnage", team: "Quite One Elite", kills: 74 },
    { name: "GG✯NOOB", team: "Grumbling Gangsters", kills: 73 },
    { name: "Hate", team: "Disciples of Mayhem", kills: 72 },
    { name: "COFFIN6IX9INE", team: "Vengeance Seekers", kills: 64 },
    { name: "QΞ卩tomi匚", team: "Quite One Elite", kills: 64 },
    { name: "QΞLordX", team: "Quite One Elite", kills: 62 },
    { name: "No.skil.No.win", team: "Vengeance Seekers", kills: 60 },
    { name: "WaHiD彡", team: "Vengeance Seekers", kills: 60 },
    { name: "Haru.op<3", team: "Vengeance Seekers", kills: 53 },
    { name: "MEMBO×BRAND", team: "Vengeance Seekers", kills: 53 },
  ];

  return (
    <div>
      <TournamentDetails {...tournament} />
      <div className="w-full bg-background py-3">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs defaultValue="matches" className="w-full">
            {/* Tabs List */}
            <TabsList className="flex justify-center gap-2 md:gap-6 bg-card rounded-lg shadow-md sm:p-3 md:p-4">
              <TabsTrigger
                value="matches"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                <Gamepad2 className="w-3 h-3 md:w-5 md:h-5 mr-1" />
                MATCHES
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                <Users className="w-3 h-3 md:w-5 md:h-5 mr-1" />
                TEAMS
              </TabsTrigger>
              <TabsTrigger
                value="leaderboards"
                className="text-[10px] md:text-sm font-semibold hover:text-primary focus:text-primary active:text-primary transition-all md:bg-muted md:text-muted-foreground md:hover:bg-primary md:hover:text-primary-foreground md:focus:bg-primary md:focus:text-primary-foreground md:active:bg-primary/80 md:active:text-primary-foreground"
              >
                <Trophy className="w-3 h-3 md:w-5 md:h-5 mr-1" />
                LEADERBOARDS
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="matches">
              {/* Matches Filter */}
              <MatchesFilter
                options={["ALL MATCHES", "UPCOMING", "FINISHED"]}
                defaultFilter="ALL MATCHES"
                onFilterChange={setFilter} // No type conflict anymore
              />

              {/* Matches List */}
              <MatchesList matches={filteredMatches} />
            </TabsContent>

            <TabsContent value="teams">
              <TeamList
                teams={[
                  {
                    name: "DISCIPLES OF MAYHEM",
                    logo: "/images/CODM_LOGO.png",
                    playerCount: 6,
                  },
                  {
                    name: "QUITE ONE ELITE",
                    logo: "/images/CODM_LOGO.png",
                    playerCount: 6,
                  },
                  {
                    name: "VENGEANCE SEEKERS",
                    logo: "/images/CODM_LOGO.png",
                    playerCount: 6,
                  },
                  // Add more teams here
                ]}
                tournament="StrikerLeague1"
              />
            </TabsContent>
            <TabsContent value="leaderboards">
              <TeamLeaderboard teams={teams} status={tournament.status} />
              <PlayerLeaderboard players={players} status={tournament.status} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
