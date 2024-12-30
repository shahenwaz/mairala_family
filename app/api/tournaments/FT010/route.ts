import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function GET() {
  try {
    // Fetch tournament details for ST020
    const { data: tournament, error: tournamentError } = await supabaseServer
      .from("tournaments")
      .select("*")
      .eq("id", "FT010")
      .single();

    if (tournamentError || !tournament) {
      return NextResponse.json({
        success: false,
        message: "Tournament not found.",
      });
    }

    // Fetch teams associated with the tournament
    const { data: teams, error: teamsError } = await supabaseServer
      .from("teams")
      .select("*")
      .eq("tournament_id", "FT010");

    if (teamsError) {
      return NextResponse.json({
        success: false,
        message: "Error fetching teams.",
      });
    }

    // Fetch players and include teamname
    const { data: players, error: playersError } = await supabaseServer
      .from("players")
      .select("*, teams(teamname)")
      .in(
        "team_id",
        teams.map((team) => team.id)
      );

    if (playersError) {
      return NextResponse.json({
        success: false,
        message: "Error fetching players.",
      });
    }

    // Map `players` to include `teamname` directly
    const enrichedPlayers = players.map((player) => ({
      ...player,
      teamname: player.teams.teamname,
    }));

    return NextResponse.json({
      success: true,
      tournament,
      teams,
      players: enrichedPlayers,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred.",
      error,
    });
  }
}
