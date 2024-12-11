"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
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
    title: "STRIKER LEAGUE 2.0",
    logo: "/images/SND_SLS2_LOGO.png",
    startDate: "11/12/2024",
    endDate: "30/12/2024",
    status: "Ongoing" as "Ongoing" | "Finalized",
    background: "/images/CODM_BG3.jpg",
  };

  const matches = [
    {
      team1: "SKY HUNTER",
      team2: "THE TOUGHER",
      team1Logo: "/images/CODM_LOGO.png",
      team2Logo: "/images/CODM_LOGO.png",
      score: "0 : 0",
      round: "ROUND ROBIN",
      date: "3 DECEMBER 2024, 8:30 PM BST",
      status: "UPCOMING" as const,
    },
    // Additional matches...
  ];

  const [filter, setFilter] = useState<"ALL MATCHES" | "UPCOMING" | "FINISHED">(
    "ALL MATCHES"
  );

  const filteredMatches = matches.filter((match) => {
    if (filter === "ALL MATCHES") return true;
    return match.status === filter;
  });

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data }: { data: Team[] } = await axios.get(
          `/api/teams?tournamentId=STRIKERLEAGUE2.0`
        );

        // Add default values for missing fields
        const teamsWithDefaults = data.map((team) => ({
          ...team,
          rw: team.rw ?? 0, // Default rounds won
          kills: team.kills ?? 0, // Default kills
        }));

        setTeams(teamsWithDefaults);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const players = [
    { name: "Adeus", team: "Disciples of Mayhem", kills: 107 },
    // Additional players...
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
              <TeamList teams={teams} tournamentId="STRIKERLEAGUE2.0" />
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
