import { createClient } from '@supabase/supabase-js';

// Ensure you define these variables in your Vercel project settings or .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment keys are missing. Please check your configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
