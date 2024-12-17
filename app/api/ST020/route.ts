import { NextResponse } from "next/server";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { app } from "@/lib/firebase";
import { Tournament, Team, Player } from "@/types/tournament";

export async function GET() {
  const db = getFirestore(app);
  const staticTournamentId = "ST020"; // Static document ID

  try {
    const tournamentRef = doc(db, "tournaments", staticTournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    if (!tournamentSnap.exists()) {
      return NextResponse.json(
        { success: false, message: "Tournament not found" },
        { status: 404 }
      );
    }

    const tournamentData = tournamentSnap.data() as Tournament;

    const teamsRef = collection(db, "tournaments", staticTournamentId, "teams");
    const teamsSnap = await getDocs(teamsRef);

    const teams: Team[] = [];
    const players: Player[] = [];

    for (const teamDoc of teamsSnap.docs) {
      const teamData = teamDoc.data();

      teams.push({
        teamName: teamData.teamName || "Unknown Team",
        teamLogo: teamData.teamLogo || "",
        playerCount: teamData.playerCount ?? 0,
        roundWon: teamData.roundWon ?? 0,
        teamKills: teamData.teamKills ?? 0,
      });

      const playersRef = collection(
        db,
        "tournaments",
        staticTournamentId,
        "teams",
        teamDoc.id,
        "players"
      );
      const playersSnap = await getDocs(playersRef);

      playersSnap.docs.forEach((playerDoc) => {
        const playerData = playerDoc.data();

        players.push({
          playerName: playerData.playerName || "Unnamed Player",
          playerKills: playerData.playerKills ?? 0,
          teamName: teamData.teamName || "Unknown Team",
        });
      });
    }

    return NextResponse.json({
      success: true,
      tournament: tournamentData,
      teams,
      players,
    });
  } catch (error) {
    console.error("Firestore error:", error);

    // Properly cast 'error' to the Error type
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}
