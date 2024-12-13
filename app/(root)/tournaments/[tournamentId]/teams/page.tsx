"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamList from "@/components/team/TeamList";
import { useParams } from "next/navigation";
import { Team, Player } from "@/types/Team";

export default function TournamentPage() {
  const params = useParams();
  const tournamentId =
    typeof params?.tournamentId === "string" ? params.tournamentId : "";

  const [teams, setTeams] = useState<Team[]>([]);

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

  return (
    <div className="w-full py-3 bg-background">
      <div className="max-w-4xl px-4 mx-auto">
        {teams.length === 0 ? (
          <div className="text-center text-muted">No teams available.</div>
        ) : (
          <TeamList teams={teams} tournamentId={tournamentId} />
        )}
      </div>
    </div>
  );
}
