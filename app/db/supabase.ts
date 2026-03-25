import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key from your Supabase Project Settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const sb = createClient(supabaseUrl, supabaseAnonKey);
