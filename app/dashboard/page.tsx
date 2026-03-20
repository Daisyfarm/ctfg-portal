"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Clock, Cloud, Megaphone, TrendingUp, Wallet, Landmark } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [news, setNews] = useState("");
  const [market, setMarket] = useState<any[]>([]);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
    const { data: n } = await sb.from('news').select('message').order('created_at', { ascending: false }).limit(1);
    const { data: m } = await sb.from('market_prices').select('*');
    setP(pr); setTx(t || []); setNews(n?.[0]?.message || "Welcome!"); setMarket(m || []);
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
  };
  useEffect(() => { load(); }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Syncing CTFG...</div>;
  const btn = { padding:'8px 12px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0, fontSize:'22px' }}>CTFG PORTAL</h1>
      
      {/* NEWS & STATUS */}
      <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid #22c55e', padding:'10px', borderRadius:'15px', maxWidth:'450px', margin:'10px auto', fontSize:'12px' }}>
        📢 <b>Latest:</b> {news}
      </div>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'25px', borderRadius:'20px', margin:'0 auto 15px', maxWidth:'450px' }}>
        <p style={{ margin:0, fontSize:'11px' }}>{p.username} • {p.rank}</p>
        <h2 style={{ margin:0, fontSize:'40px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      {/* ECONOMY / MARKET BOX */}
      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'450px', margin:'0 auto 15px', border:'1px solid #1e293b', textAlign:'left' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'12px', color:'#22c55e', fontWeight:'bold' }}><TrendingUp size={14} style={{verticalAlign:'middle'}}/> MONTANA CROP MARKET</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
          {market.map(m => (
            <div key={m.id} style={{ fontSize:'11px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #0b0f1a', padding:'3px 0' }}>
              <span>{m.crop_name}</span><span style={{color:'#22c55e'}}>${m.base_price} <small>↑</small></span>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ display:'flex', justifyContent:'center', gap:'5px', flexWrap:'wrap', marginBottom:'15px' }}>
        <button style={btn} onClick={()=>window.location.href='/bank'}>Bank</button>
        <button style={btn} onClick={()=>window.location.href='/land'}>Land</button>
        <button style={{...btn, background:'#6366f1'}} onClick={()=>window.location.href='/map'}>Live Map</button>
        <button style={btn} onClick={()=>window.location.href='/contracts'}>Jobs</button>
        <button style={{...btn, background:'#7c3aed'}} onClick={()=>window.location.href='/loans'}>Loan</button>
        {p.rank==='Admin' && <button style={{...btn,background:'#dc2626'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
        <button style={{...btn, background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'450px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}><Clock size={12} style={{verticalAlign:'middle'}}/> ACTIVITY</p>
        {tx.map(t => <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', padding:'5px 0' }}><span>{t.description}</span><span style={{color:'#22c55e'}}>${t.amount}</span></div>)}
      </div>
    </div>
  );
}
