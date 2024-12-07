"use client";
import React, { useState } from "react";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TournamentTabs from "@/components/tournament/TournamentTabs";
import MatchesFilter from "@/components/match/MatchesFilter";
import MatchesList from "@/components/match/MatchesList";
import TeamList from "@/components/team/TeamList";
import TeamLeaderboard from "@/components/team/TeamLeaderboard";
import PlayerLeaderboard from "@/components/player/PlayerLeaderboard";
import { TabsContent } from "@/components/ui/tabs";
import { Team } from "@/types/Team";

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

  const [teams] = useState<Team[]>([
    {
      name: "DISCIPLES OF MAYHEM",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 67,
      kills: 393,
    },
    {
      name: "QUITE ONE ELITE",
      logo: "/images/MF_LOGO.png",
      playerCount: 5,
      rw: 73,
      kills: 356,
    },
    {
      name: "VENGEANCE SEEKERS",
      logo: "/images/CR_LOGO.jpg",
      playerCount: 5,
      rw: 43,
      kills: 306,
    },
    {
      name: "GRUMBLING GANGSTERS",
      playerCount: 5,
      logo: "/images/ASCEND.png",
      rw: 48,
      kills: 296,
    },
    {
      name: "GRUMBLING GANGSTERS 2.0",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 28,
      kills: 162,
    },
    {
      name: "TOXIQUE GIRLS",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 25,
      kills: 147,
    },
    {
      name: "BTV",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 23,
      kills: 139,
    },
    {
      name: "TEAM MAIRALA",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 27,
      kills: 104,
    },
    {
      name: "THE MIGHTY FORCE",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 12,
      kills: 81,
    },
    {
      name: "ASTRAL LEGIONS",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 4,
      kills: 47,
    },
    {
      name: "TEAM OMEGA",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 3,
      kills: 45,
    },
    {
      name: "LIONS ROAR",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 9,
      kills: 43,
    },
    {
      name: "TEAM EPSILON",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 0,
      kills: 43,
    },
    {
      name: "GANGS OF COD",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 0,
      kills: 18,
    },
    {
      name: "BLOOD CULT",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 7,
      kills: 10,
    },
    {
      name: "TEAM ALPHA",
      logo: "/images/CODM_LOGO.png",
      playerCount: 5,
      rw: 0,
      kills: 0,
    },
  ]);

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
      <div className="w-full py-3 bg-background">
        <div className="max-w-4xl px-4 mx-auto">
          <TournamentTabs defaultTab="teams">
            <TabsContent value="matches">
              <MatchesFilter
                options={["ALL MATCHES", "UPCOMING", "FINISHED"]}
                defaultFilter="ALL MATCHES"
                onFilterChange={setFilter}
              />
              <MatchesList matches={filteredMatches} />
            </TabsContent>
            <TabsContent value="teams">
              <TeamList teams={teams} tournament="STRIKERLEAGUE1.0" />
            </TabsContent>
            <TabsContent value="leaderboards">
              <TeamLeaderboard teams={teams} status={tournament.status} />
              <PlayerLeaderboard players={players} status={tournament.status} />
            </TabsContent>
          </TournamentTabs>
        </div>
      </div>
    </div>
  );
}
