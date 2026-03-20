"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Clock, Cloud, Megaphone, Send, Map, BookOpen, LogOut, ShieldCheck } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [news, setNews] = useState("");

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
    const { data: n } = await sb.from('news').select('message').order('created_at', { ascending: false }).limit(1);
    setP(pr); setTx(t || []); setNews(n?.[0]?.message || "Welcome to CTFG!");
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
  };
  useEffect(() => { load(); }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Loading...</div>;
  const btn = { padding:'8px 12px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:'0 0 10px 0' }}>CTFG PORTAL</h1>
      
      <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginBottom:'15px' }}>
        <div style={{ background:'#131926', padding:'10px', borderRadius:'12px', border:'1px solid #1e293b', textAlign:'left', minWidth:'120px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: s?.slots?.used > 0 ? '#22c55e' : '#444' }}></div>
            <span style={{fontSize:'11px', fontWeight:'bold'}}>CTFG: {s?.slots?.used || 0}/{s?.slots?.capacity || 0}</span>
          </div>
        </div>
        <div style={{ background:'#131926', padding:'10px', borderRadius:'12px', border:'1px solid #1e293b', display:'flex', alignItems:'center', gap:'8px' }}>
          <Cloud size={14} color="#3b82f6" /> <span style={{fontSize:'11px', fontWeight:'bold'}}>{w || '--°F'}</span>
        </div>
      </div>

      {/* NEW ANNOUNCEMENT BOX - This is what was missing! */}
      <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid #22c55e', padding:'12px', borderRadius:'15px', maxWidth:'450px', margin:'0 auto 20px', display:'flex', alignItems:'center', gap:'10px' }}>
        <Megaphone size={18} color="#22c55e" />
        <p style={{ margin:0, fontSize:'13px', textAlign:'left', color:'#22c55e', fontWeight:'bold' }}>{news}</p>
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
        {p.rank==='Admin' && <button style={{...btn,background:'#dc2626'}} onClick={()=>window.location.href='/admin'}><ShieldCheck size={14}/> Staff</button>}
        <button style={{...btn, background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={14}/></button>
      </div>
    </div>
  );
}
