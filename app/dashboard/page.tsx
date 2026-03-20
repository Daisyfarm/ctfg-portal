"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Cloud, LogOut, BookOpen } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [w, setW] = useState("");

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
    setP(data);
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit')
      .then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
  };
  useEffect(() => { load(); }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;

  const btn = { padding:'8px 15px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'12px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:'0 0 20px 0' }}>CTFG PORTAL</h1>
      
      <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginBottom:'20px' }}>
        {/* SERVER BOX */}
        <div style={{ background:'#131926', padding:'10px 15px', borderRadius:'12px', border:'1px solid #1e293b', textAlign:'left' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: s?.slots?.used > 0 ? '#22c55e' : '#444' }}></div>
            <span style={{fontSize:'12px', fontWeight:'bold'}}>CTFG: {s?.slots?.used || 0}/{s?.slots?.capacity || 0}</span>
          </div>
          {s?.slots?.players?.filter((pl:any)=>pl.isUsed).map((pl:any)=>(
            <p key={pl.name} style={{margin:'5px 0 0 0', fontSize:'10px', color:'#22c55e'}}>🚜 {pl.name} ({pl.uptime}m)</p>
          ))}
        </div>

        {/* WEATHER BOX (The New One!) */}
        <div style={{ background:'#1d4ed8', padding:'10px 15px', borderRadius:'12px', border:'1px solid #3b82f6', display:'flex', alignItems:'center', gap:'10px' }}>
          <Cloud size={16} color="#fff" />
          <span style={{fontSize:'12px', fontWeight:'bold'}}>{w || '--°F'} Montana</span>
        </div>
      </div>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'25px', margin:'0 auto 20px', maxWidth:'450px' }}>
        <p style={{ margin:0, fontSize:'11px' }}>{p.username} • {p.rank}</p>
        <h2 style={{ margin:0, fontSize:'48px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', marginBottom:'20px' }}>
        <button style={btn} onClick={()=>window.location.href='/bank'}><Send size={14}/> Bank</button>
        <button style={btn} onClick={()=>window.location.href='/land'}><Map size={14}/> Land</button>
        <button style={{...btn, background:'#6366f1'}} onClick={()=>window.location.href='/map'}><Map size={14}/> Live Map</button>
        <button style={btn} onClick={()=>window.location.href='/contracts'}><Clock size={14}/> Jobs</button>
        <button style={btn} onClick={()=>window.location.href='/rules'}><BookOpen size={14}/> Rules</button>
        {p.rank==='Admin' && <button style={{...btn,background:'#dc2626'}} onClick={()=>window.location.href='/admin'}><Tractor size={14}/> Staff</button>}
        <button style={{...btn, background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={14}/> Logout</button>
      </div>
    </div>
  );
}
