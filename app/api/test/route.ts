import { NextResponse } from "next/server";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

export async function GET() {
  const db = getFirestore(app);

  try {
    console.log("Testing Firestore connection...");
    const testRef = doc(db, "tournaments", "ST020");
    const testSnap = await getDoc(testRef);

    if (testSnap.exists()) {
      console.log("Test Data:", testSnap.data());
      return NextResponse.json({ success: true, data: testSnap.data() });
    } else {
      return NextResponse.json({ success: false, message: "No data found" });
    }
  } catch (error) {
    console.error("Error testing Firestore:", error);

    // Cast 'error' to Error and access 'message' safely
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
