"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, LogOut, ShieldCheck } from 'lucide-react';

const sb = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[
