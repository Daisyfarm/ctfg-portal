"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
    setP(prof); setTx(t || []);
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d.server)).catch(()=>null);
  };
  useEffect(() => { load(); }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',padding:'20px'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'white', padding:'15px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto', textAlign:'center' }}>
        <h1 style={{ color:'#22c55e', margin:0 }}>CTFG PORTAL</h1>
        <p style={{ fontSize:'12px', color:'#94a3b8' }}>{p.username} • {p.rank}</p>

        <div style={{ background:'#166534', padding:'30px', borderRadius:'20px', margin:'15px 0' }}>
          <p style={{ margin:0, fontSize:'10px', opacity:0.8 }}>BANK BALANCE</p>
          <h2 style={{ margin:0, fontSize:'42px' }}>${p.balance?.toLocaleString()}</h2>
        </div>

        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px', border:'1px solid #1e293b' }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:s?'#22c55e':'#ef4444' }}></div>
          <p style={{ margin:0, fontSize:'12px' }}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity}` : 'Montana Server Offline'}</p>
        </div>

        <div style={{ background:'#131
