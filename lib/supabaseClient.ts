import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

// For client-side use (browser-safe keys)
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// For server-side use (secure service role key)
const SUPABASE_SERVICE_KEY = process.env
  .NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;

// Client-side instance
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Server-side instance
export const supabaseServer = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
