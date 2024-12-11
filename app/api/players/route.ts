import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Player from "@/lib/player";

// POST method: Create a player
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, teamId } = body;

    if (!name || !teamId) {
      return NextResponse.json(
        { error: "Player name and team ID are required." },
        { status: 400 }
      );
    }

    const newPlayer = new Player({ name, teamId });

    await newPlayer.save();

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error("POST: Error creating player:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH method: Update player kills
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

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error("PATCH: Error updating player kills:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
