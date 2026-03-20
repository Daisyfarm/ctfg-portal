"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { RefreshCcw, LogOut, Clock, Cloud } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [w, setW] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(pr); setTx(t || []);
      // Fetch Server
      fetch('/api/server').then(r=>r.json()).then(d=>setS(d.server)).catch(()=>0);
      // Fetch Montana Weather (Fahrenheit)
      fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit')
        .then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    };
    load();
  }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Syncing...</div>;
  const btn = { padding:'10px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0, fontSize:'22px' }}>CTFG PORTAL</h1>
      
      <div style={{ display:'flex', justifyContent:'center', gap:'10px', margin:'10px 0' }}>
        <div style={{ background:'#131926', padding:'5px 10px', borderRadius:'10px', border:'1px solid #1e293b', display:'flex', alignItems:'center', gap:'5px', fontSize:'11px' }}>
          <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: s?'#22c55e':'#ef4444' }}></div>
          <span>{s ? `${s.slots.used}/${s.slots.capacity}` : 'Offline'}</span>
        </div>
        <div style={{ background:'#131926', padding:'5px 10px', borderRadius:'10px', border:'1px solid #1e293b', display:'flex', alignItems:'center', gap:'5px', fontSize:'11px' }}>
          <Cloud size={14} color="#3b82f6" /> <span>{w || 'Loading...'}</span>
        </div>
      </div>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'25px', borderRadius:'20px', margin:'0 auto 15px', maxWidth:'400px' }}>
        <p style={{ margin:0, fontSize:'11px' }}>{p.username} • {p.rank}</p>
        <h2 style={{ margin:0, fontSize:'40px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'5px', flexWrap:'wrap', marginBottom:'15px' }}>
        <button style={btn} onClick={()=>window.location.href='/bank'}>Bank</button>
        <button style={btn} onClick={()=>window.location.href='/land'}>Land</button>
        <button style={{...btn, background:'#6366f1'}} onClick={()=>window.location.href='/map'}>Map</button>
        <button style={btn} onClick={()=>window.location.href='/contracts'}>Jobs</button>
        {p.rank==='Admin'&&<button style={{...btn,background:'#dc2626'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
        <button style={{...btn,background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b' }}>
        <p style={{ margin:'0 0 8px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}><Clock size={12} style={{verticalAlign:'middle'}}/> ACTIVITY</p>
        {tx.map(t => (
          <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', borderBottom:'1px solid #0b0f1a', padding:'5px 0' }}>
            <span style={{color:'#94a3b8'}}>{t.description}</span><span>${t.amount?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
