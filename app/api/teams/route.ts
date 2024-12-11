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
      console.error("GET: Missing tournamentId");
      return NextResponse.json(
        { error: "Tournament ID is required" },
        { status: 400 }
      );
    }

    const teams = await Team.find({ tournamentId });
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("GET: Error fetching teams:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST method for creating a team
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, tournamentId } = body;

    if (!name || !tournamentId) {
      return NextResponse.json(
        { error: "Team name and tournament ID are required." },
        { status: 400 }
      );
    }

    const newTeam = new Team({ name, tournamentId });
    await newTeam.save();

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error("POST: Error creating team:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT endpoint
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      console.error("PUT: Missing team ID");
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const updatedTeam = await Team.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTeam) {
      console.error("PUT: Team not found");
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    console.error("PUT: Error updating team:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE endpoint
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      console.error("DELETE: Missing team ID");
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      console.error("DELETE: Team not found");
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Team deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE: Error deleting team:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
