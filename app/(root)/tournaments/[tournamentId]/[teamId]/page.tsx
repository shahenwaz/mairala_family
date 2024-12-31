"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TeamHeader from "@/components/team/TeamHeader";
import PlayerList from "@/components/player/PlayerList";
import { supabaseClient } from "@/lib/supabaseClient";
import { Team } from "@/types/tournament";
import { CrosshairIcon } from "lucide-react";

const TeamInfoPage = () => {
  const { teamId, tournamentId } = useParams(); // Get teamId and tournamentId from the dynamic route
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

    fetchTeamData();
  }, [teamId, tournamentId]); // Refetch data when teamId or tournamentId changes

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-background animate-fadeIn">
        <div className="w-16 h-16 border-4 border-t-primary border-gray-700 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-400 animate-pulse">
          Loading team details...
        </p>
      </div>
    );
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
        {/* Team Header */}
        <TeamHeader teamname={teamData.teamname} teamlogo={teamData.teamlogo} />

        {/* Player List */}
        <PlayerList players={teamData.players} />

        {/* Total Team Kills */}
        <div className="flex items-center justify-between p-4 mt-4 text-lg font-semibold rounded-lg bg-card card-hover">
          <div className="flex items-center gap-2">
            <CrosshairIcon className="text-primary" />
            <span>Total Team Kills:</span>
          </div>
          <span className="text-purple">{teamData.teamkills}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoPage;
