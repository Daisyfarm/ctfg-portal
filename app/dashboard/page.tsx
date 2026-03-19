"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, ShieldCheck } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/'; return; }
    
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) setProfile(data);
    setLoading(false);
  };

  useEffect(() => { getProfile(); }, []);

  if (loading) return (
    <div style={{backgroundColor:'#0f172a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <Tractor size={48} color="#22c55e" style={{marginBottom:'10px'}
