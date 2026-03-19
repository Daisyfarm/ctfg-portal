"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const start = async () => {
      try {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) { window.location.href = '/'; return; }
        
        const { data, error } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
        if (error) setErr(error.message);
        setP(data || { username: 'Farmer', balance: 0 });
      } catch (e: any) {
        setErr(e.message);
      }
    };
    start();
  }, []);

  if (err
