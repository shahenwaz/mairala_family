import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Team from "@/lib/team";

// GET method
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const tournamentId = searchParams.get("tournamentId");

    if (!tournamentId) {
      return NextResponse.json(
        { error: "Tournament ID is required" },
        { status: 400 }
      );
    }

    const teams = await Team.find({ tournamentId });
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST endpoint allows adding new teams
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { teamId, name, tournamentId, playerCount, rw = 0, kills = 0 } = body;

    if (!teamId || !name || !tournamentId || playerCount === undefined) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newTeam = new Team({
      teamId,
      name,
      tournamentId,
      rw,
      kills,
      playerCount,
    });
    await newTeam.save();

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// The PUT endpoint is used for editing existing teams
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const updatedTeam = await Team.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
