import { createClient } from '@supabase/supabase-js';

// Fallback to placeholders prevents build-time crashes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const sb = createClient(supabaseUrl, supabaseAnonKey);
