"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setP(data || { username: 'Farmer', balance: 0 });
    }
    load();
  }, []);

  if (!p) return <div style={{padding:'20px'}}>Loading Samuel's Farm...</div>;

  return (
    <div style={{ padding:'40px', textAlign:'center', fontFamily:'sans-serif' }}>
      <h1 style={{ color:'#22c55e' }}>CTFG PORTAL ONLINE</h1>
      <p>Welcome, {p.username}</p>
      <div style={{ background:'#166534', padding:'40px', borderRadius:'20px', margin:'20px auto', maxWidth:'300px' }}>
        <h2 style={{ fontSize:'40px' }}>${p.balance?.toLocaleString()}</h2>
      </div>
      <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
        <button onClick={()=>window.location.href='/bank'} style={{padding:'10px'}}>Bank</button>
        <button onClick={()=>window.location.href='/land'} style={{padding:'10px'}}>Land</button>
        <button onClick={()=>window.location.href='/contracts'} style={{padding:'10px'}}>Jobs</button>
        <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{padding:'10px'}}>Logout</button>
      </div>
    </div>
  );
}
