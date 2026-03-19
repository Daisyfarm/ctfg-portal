"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setP(data || { username: 'Farmer', balance: 0 });
    };
    load();
  }, []);

  if (!p) return <div style={{color:'white',padding:'20px',background:'#0b0f1a',height:'100vh'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'white', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e' }}>CTFG PORTAL</h1>
      <p>Welcome, <b>{p.username}</b></p>
      <div style={{ background:'#166534', padding:'30px', borderRadius:'20px', margin:'20px auto', maxWidth:'300px' }}>
        <p style={{ margin:0, fontSize:'12px' }}>BALANCE</p>
        <h2 style={{ margin:0, fontSize:'36px' }}>${p.balance?.toLocaleString()}</h2>
      </div>
      <div style={{ display:'flex', justifyContent:'center', gap:'10px', flexWrap:'wrap' }}>
        <button onClick={()=>window.location.href='/bank'} style={{padding:'10px 20px',background:'#1e293b',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Bank</button>
        <button onClick={()=>window.location.href='/land'} style={{padding:'10px 20px',background:'#1e293b',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Land</button>
        <button onClick={()=>window.location.href='/contracts'} style={{padding:'10px 20px',background:'#1e293b',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Jobs</button>
        <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{padding:'10px 20px',background:'#ef4444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Logout</button>
      </div>
    </div>
  );
}
