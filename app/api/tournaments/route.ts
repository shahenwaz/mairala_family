import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Tournament from "@/lib/tournament";

// Fetch all tournaments
export async function GET(req: Request) {
  try {
    await dbConnect();
    const tournaments = await Tournament.find({});
    return NextResponse.json(tournaments); // `id` will now be included
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tournaments" },
      { status: 500 }
    );
  }
}

// Create a new tournament
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const tournament = new Tournament({
      ...body,
      colorScheme: body.status === "Ongoing" ? "yellow" : "green", // Set colorScheme dynamically
    });

    await tournament.save();
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tournament" },
      { status: 500 }
    );
  }
}

// Update a tournament
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, ...updateData } = await req.json();
    const tournament = await Tournament.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update tournament" },
      { status: 500 }
    );
  }
}

// Delete a tournament
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await Tournament.findByIdAndDelete(id);
    return NextResponse.json({ message: "Tournament deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete tournament" },
      { status: 500 }
    );
  }
}
