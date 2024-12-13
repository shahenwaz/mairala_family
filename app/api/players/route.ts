import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Player from "@/lib/player";
import Team from "@/lib/team";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const players = await Player.find({ teamId }).lean();
    return NextResponse.json(players || [], { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("GET: Error fetching players:", errorMessage);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST: Add a player
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { playerName, teamId } = body;

    if (!playerName || !teamId) {
      return NextResponse.json(
        { error: "Player name and team ID are required." },
        { status: 400 }
      );
    }

    const newPlayer = await Player.create({ playerName, teamId });

    await Team.findByIdAndUpdate(teamId, { $inc: { playerCount: 1 } });

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("POST: Error adding player:", errorMessage);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}

// PATCH: Add kills to a player
export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { playerId, kills } = body;

    if (!playerId || kills === undefined) {
      return NextResponse.json(
        { error: "Player ID and kills are required." },
        { status: 400 }
      );
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { $inc: { kills } },
      { new: true }
    );

    await Team.findByIdAndUpdate(updatedPlayer.teamId, {
      $inc: { teamKills: kills },
    });

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("PATCH: Error updating kills:", errorMessage);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
