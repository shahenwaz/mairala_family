import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Team from "@/lib/team";

// GET method
// GET method
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const tournamentId = searchParams.get("tournamentId");
    const teamId = searchParams.get("id"); // Using `_id`

    if (!tournamentId) {
      return NextResponse.json(
        { error: "Tournament ID is required" },
        { status: 400 }
      );
    }

    let query: any = { tournamentId };
    if (teamId) query._id = teamId; // Fetch by `_id`

    const teams = teamId
      ? await Team.findOne(query).lean() // Use `findOne` for unique `_id`
      : await Team.find(query).lean(); // Use `find` to get all teams for the tournament

    if (!teams || (Array.isArray(teams) && teams.length === 0)) {
      // Return an empty array when no teams are found
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("GET: Error fetching teams:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST method to create a TEAM
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { teamName, tournamentId } = body;

    if (!teamName || !tournamentId) {
      return NextResponse.json(
        { error: "Team name and tournament ID are required." },
        { status: 400 }
      );
    }

    const newTeam = new Team({ teamName, tournamentId });
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
