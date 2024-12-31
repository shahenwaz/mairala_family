import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  context: { params: Promise<{ tournamentId: string }> }
) {
  try {
    // Await params from context
    const { tournamentId } = await context.params;

    if (!tournamentId) {
      return NextResponse.json({
        success: false,
        message: "Tournament ID is required.",
      });
    }

    // Fetch tournament details
    const { data: tournament, error: tournamentError } = await supabaseServer
      .from("tournaments")
      .select("*")
      .eq("id", tournamentId)
      .single();

    if (tournamentError || !tournament) {
      return NextResponse.json({
        success: false,
        message: "Tournament not found.",
      });
    }

    // Fetch teams for the tournament
    const { data: teams, error: teamsError } = await supabaseServer
      .from("teams")
      .select("*")
      .eq("tournament_id", tournamentId);

    if (teamsError) {
      return NextResponse.json({
        success: false,
        message: "Error fetching teams.",
      });
    }

    // Fetch players and include team names
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

    // Enrich players with team names
    const enrichedPlayers = players.map((player) => ({
      ...player,
      teamname: player.teams?.teamname || "Unknown Team",
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
