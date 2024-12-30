import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Attempt to fetch data from the 'test_table' Supabase table
    const { data, error } = await supabase.from("test_table").select("*");

    if (error) {
      throw new Error((error as { message: string }).message); // Explicitly type error
    }

    res.status(200).json({ data });
  } catch (error) {
    // Handle errors safely
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
}
