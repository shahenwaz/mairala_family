import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Player from "@/lib/player";
import Team from "@/lib/team";

// GET: Fetch all players for a team
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required." },
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

// POST: Add a new player
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

    // Increment the player count for the team
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

// PUT: Update player details
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { playerId, playerName } = body;

    if (!playerId || !playerName) {
      return NextResponse.json(
        { error: "Player ID and name are required." },
        { status: 400 }
      );
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { playerName },
      { new: true }
    );

    if (!updatedPlayer) {
      return NextResponse.json({ error: "Player not found." }, { status: 404 });
    }

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("PUT: Error updating player:", errorMessage);
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
      { $inc: { playerKills: kills } },
      { new: true }
    );

    if (!updatedPlayer) {
      return NextResponse.json({ error: "Player not found." }, { status: 404 });
    }

    // Increment the team's total kills
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

// DELETE: Remove a player
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const playerId = searchParams.get("playerId");

    if (!playerId) {
      return NextResponse.json(
        { error: "Player ID is required." },
        { status: 400 }
      );
    }

    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return NextResponse.json({ error: "Player not found." }, { status: 404 });
    }

    // Decrement the player count for the team
    await Team.findByIdAndUpdate(deletedPlayer.teamId, {
      $inc: { playerCount: -1 },
    });

    return NextResponse.json(
      { message: "Player deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("DELETE: Error deleting player:", errorMessage);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
