import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor } from 'lucide-react';

// This is the "Build-Safe" connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// We only initialize if the keys actually exist
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export default function CTFGPortal() {
    // ... everything else stays the same
