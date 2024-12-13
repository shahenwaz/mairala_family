"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TournamentDetails from "@/components/tournament/TournamentDetails";
import TournamentTabs from "@/components/tournament/TournamentTabs";
import MatchesFilter from "@/components/match/MatchesFilter";
import MatchesList from "@/components/match/MatchesList";
import TeamList from "@/components/team/TeamList";
import TeamLeaderboard from "@/components/team/TeamLeaderboard";
import PlayerLeaderboard from "@/components/player/PlayerLeaderboard";
import { TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { Team, Player } from "@/types/Team";

export default function TournamentPage() {
  const params = useParams();
  const tournamentId =
    typeof params?.tournamentId === "string" ? params.tournamentId : "";

  const tournament = {
    title: "STRIKER LEAGUE 2.0",
    logo: "/images/SND_SLS2_LOGO.png",
    startDate: "11/12/2024",
    endDate: "30/12/2024",
    status: "Ongoing" as "Ongoing" | "Finalized",
    background: "/images/CODM_BG3.jpg",
  };

  const [teams, setTeams] = useState<Team[]>([]);
  const [filter, setFilter] = useState<"ALL MATCHES" | "UPCOMING" | "FINISHED">(
    "ALL MATCHES"
  );

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data }: { data: Team[] } = await axios.get(
          `/api/teams?tournamentId=${tournamentId}`
        );

        setTeams(
          data.map((team) => ({
            ...team,
            rw: team.rw ?? 0,
            teamKills: team.teamKills ?? 0,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
    fetchTeams();
  }, [tournamentId]);

  const fetchPlayers = async () => {
    try {
      const { data: playersData }: { data: Player[] } = await axios.get(
        `/api/players?tournamentId=${tournamentId}`
      );

      const { data: teamsData }: { data: Team[] } = await axios.get(
        `/api/teams?tournamentId=${tournamentId}`
      );

      const teamsById = teamsData.reduce(
        (acc: Record<string, string>, team: Team) => ({
          ...acc,
          [team._id]: team.teamName,
        }),
        {}
      );

      // Add teamName to players
      return playersData.map((player) => ({
        ...player,
        teamName: teamsById[player.teamId] || "Unknown Team",
      }));
    } catch (error) {
      console.error("Failed to fetch players:", error);
      return [];
    }
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
  ];

  const filteredMatches = matches.filter((match) => {
    if (filter === "ALL MATCHES") return true;
    return match.status === filter;
  });

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
              <TeamList teams={teams} tournamentId={tournamentId} />
            </TabsContent>
            <TabsContent value="leaderboards">
              <TeamLeaderboard teams={teams} status={tournament.status} />
              <PlayerLeaderboard
                fetchPlayers={fetchPlayers}
                status={tournament.status}
              />
            </TabsContent>
          </TournamentTabs>
        </div>
      </div>
    </div>
  );
}
