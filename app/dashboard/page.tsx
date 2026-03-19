"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setP(data);
    } catch (e) { console.log(e); }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'20px' }}>
      <div style={{ maxWidth:'500px',margin:'0 auto',textAlign:'center' }}>
        <div style={{ display:'flex',justifyContent:'center',gap:'10px',marginBottom:'20px' }}>
          <button onClick={load} style={{background:'#1e293b',color:'white',border:'none',padding:'10px',borderRadius:'10px'}}><RefreshCcw size={18}/></button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Bank</button>
          <button onClick={()=>window.location.href='/land'} style={{background:'#f97316',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Land</button>
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'#ef4444',color:'white',border:'none',padding:'10px',borderRadius:'10px'}}><LogOut size={18}/></button>
        </div>

        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)',padding:'40px',borderRadius:'30px',marginBottom:'20px' }}>
          <p style={{fontSize:'12px',fontWeight:'bold'}}>{p?.username} • {p?.rank}</p>
          <h2 style={{fontSize:'48px',margin:'10px 0'}}>${p?.balance?.toLocaleString() || '0'}</h2>
        </div>

        <p style={{color:'#475569',fontSize:'12px'}}>CTFG Portal Stable Mode</p>
      </div>
    </div>
  );
}
