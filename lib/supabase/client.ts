import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Supabase is OPTIONAL. When the env vars are absent, getSupabase() returns null
// and the whole app runs on local device storage. Nothing here throws at import
// time or when the keys are missing.

let cached: SupabaseClient | null | undefined;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    cached = null;
    return null;
  }
  try {
    cached = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  } catch {
    cached = null;
  }
  return cached;
}
