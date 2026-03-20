"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Clock, Cloud, Megaphone, TrendingUp, Send, Map, BookOpen, LogOut, ShieldCheck, Briefcase, Landmark, Tractor, Trophy, RefreshCcw } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [news, setNews] = useState("");
  const [mkt, setMkt] = useState<any[]>([]);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
    const { data: n } = await sb.from('news').select('message').order('created_at', { ascending: false }).limit(1);
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    setP(pr); setTx(t || []); setNews(n?.[0]?.message || "Welcome to CTFG!"); setMkt(m || []);
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
  };
  useEffect(() => { load(); }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing Portal...</div>;
  const btn = { padding:'10px 10px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'4px' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0, fontSize:'22px' }}>CTFG PORTAL</h1>
        
        <div style={{ display:'flex', justifyContent:'center', gap:'10px', margin:'10px 0' }}>
          <div style={{ background:'#131926', padding:'5px 10px', borderRadius:'10px', border:'1px solid #1e293b', display:'flex', alignItems:'center', gap:'5px', fontSize:'10px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: s?.slots?.used > 0 ? '#22c55e' : '#444' }}></div>
            <span>CTFG: {s?.slots?.used || 0}/{s?.slots?.capacity || 0}</span>
          </div>
          <div style={{ background:'#131926', padding:'5px 10px', borderRadius:'10px', border:'1px solid #1e293b', display:'flex', alignItems:'center', gap:'5px', fontSize:'10px' }}>
            <Cloud size={12} color="#3b82f6" /> <span>{w || '--°F'} Montana</span>
          </div>
        </div>

        <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid #22c55e', padding:'10px', borderRadius:'12px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'8px' }}>
          <Megaphone size={16} color="#22c55e" />
          <p style={{ margin:0, fontSize:'11px', textAlign:'left' }}>{news}</p>
        </div>

        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'25px', borderRadius:'20px', margin:'0 auto 15px', maxWidth:'400px', boxShadow:'0 10px 20px rgba(0,0,0,0.4)' }}>
          <p style={{ margin:0, fontSize:'11px' }}>{p.username} • {p.rank}</p>
          <h2 style={{ margin:0, fontSize:'44px' }}>${p.balance?.toLocaleString()}</h2>
        </div>

        <div style={{ background:'#131926', padding:'12px', borderRadius:'15px', marginBottom:'15px', border:'1px solid #1e293b', textAlign:'left' }}>
          <p style={{ margin:'0 0 8px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}><TrendingUp size={12}/> CROP MARKET</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            {mkt.map(m => (
              <div key={m.id} style={{ fontSize:'10px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #0b0f1a', padding:'2px 0' }}>
                <span style={{color:'#94a3b8'}}>{m.crop_name}</span><span style={{color:'#22c55e'}}>${m.base_price}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'center', gap:'5px', flexWrap:'wrap', marginBottom:'15px' }}>
          <button style={btn} onClick={()=>window.location.href='/bank'}><Send size={12}/> Bank</button>
          <button style={btn} onClick={()=>window.location.href='/land'}><Landmark size={12}/> Land</button>
          <button style={{...btn, background:'#6366f1'}} onClick={()=>window.location.href='/map'}><Map size={12}/> Map</button>
          <button style={btn} onClick={()=>window.location.href='/contracts'}><Briefcase size={12}/> Jobs</button>
          <button style={btn} onClick={()=>window.location.href='/fleet'}><Tractor size={12}/> Fleet</button>
          <button style={{...btn, background:'#eab308'}} onClick={()=>window.location.href='/leaderboard'}><Trophy size={12}/> Top 10</button>
          <button style={{...btn, background:'#7c3aed'}} onClick={()=>window.location.href='/loans'}><Landmark size={12}/> Loan</button>
          <button style={btn} onClick={()=>window.location.href='/rules'}><BookOpen size={12}/> Rules</button>
          {p.rank==='Admin' && <button style={{...btn,background:'#dc2626'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
          <button style={{...btn, background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={12}/></button>
        </div>

        <div style={{ background:'#131926', padding:'12px', borderRadius:'15px', textAlign:'left', border:'1px solid #1e293b' }}>
          <p style={{ margin:'0 0 8px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}><Clock size={12}/> ACTIVITY</p>
          {tx.map(t => <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', padding:'4px 0', borderBottom:'1px solid #0b0f1a' }}><span>{t.description}</span><span style={{color:'#22c55e'}}>${t.amount?.toLocaleString()}</span></div>)}
        </div>
      </div>
    </div>
  );
}
