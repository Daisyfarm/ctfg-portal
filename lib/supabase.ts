import { createClient } from '@supabase/supabase-js';

let sb: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!sb) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error("Supabase env vars missing");
    }

    sb = createClient(url, key);
  }

  return sb;
}
