"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TeamHeader from "@/components/team/TeamHeader";
import PlayerList from "@/components/player/PlayerList";
import BackToTeamsButton from "@/components/team/BackToTeamsButton";
import TeamLoadingState from "@/components/team/TeamLoadingState";
import { supabaseClient } from "@/lib/supabaseClient";
import { Team } from "@/types/tournament";
import { CrosshairIcon } from "lucide-react";

const TeamInfoPage = () => {
  const params = useParams();
  const teamId = Array.isArray(params.teamId)
    ? params.teamId[0]
    : params.teamId; // Ensure teamId is a string
  const tournamentId = Array.isArray(params.tournamentId)
    ? params.tournamentId[0]
    : params.tournamentId; // Ensure tournamentId is a string

  const [teamData, setTeamData] = useState<Team | null>(null); // Explicit type for teamData
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const { data: team, error } = await supabaseClient
          .from("teams")
          .select(
            `
              id,
              teamname,
              teamlogo,
              teamkills,
              players (playername, playerkills)
            `
          )
          .eq("id", teamId)
          .eq("tournament_id", tournamentId) // Ensure the team belongs to the correct tournament
          .single();

        if (error) {
          console.error("Error fetching team data:", error.message);
          setTeamData(null);
        } else {
          setTeamData(team as Team); // Cast data to Team type
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setTeamData(null);
      } finally {
        setLoading(false);
      }
    };

    if (teamId && tournamentId) {
      fetchTeamData();
    }
  }, [teamId, tournamentId]); // Refetch data when teamId or tournamentId changes

  if (loading) {
    return <TeamLoadingState />;
  }

  if (!teamData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">Team Not Found</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl min-h-screen mx-auto bg-background text-foreground">
      <div className="container px-4 py-2">
        {/* Back to Teams Button */}
        <BackToTeamsButton tournamentId={tournamentId!} />

        {/* Team Header */}
        <TeamHeader teamname={teamData.teamname} teamlogo={teamData.teamlogo} />

        {/* Player List */}
        <PlayerList players={teamData.players} />

        {/* Total Team Kills */}
        <div className="flex items-center justify-between p-4 mt-4 mb-6 text-lg font-semibold rounded-lg bg-card card-hover">
          <div className="flex items-center gap-2">
            <CrosshairIcon className="text-primary" />
            <span className="text-destructive">Total Team Kills:</span>
          </div>
          <span className="text-purple">{teamData.teamkills}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoPage;
