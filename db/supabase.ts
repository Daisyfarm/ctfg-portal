import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This check helps you see in the Vercel logs if the keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("SUPABASE ERROR: Missing environment variables!");
}

export const sb = createClient(supabaseUrl, supabaseAnonKey);
