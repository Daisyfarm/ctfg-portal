"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      
      setP(prof); setTx(t || []);

      // Safe Server Fetch
      try {
        const r = await fetch('/api/server');
        const d = await r.json();
        if (d?.server) setS(d.server);
      } catch (e) { setS(null); }

    } catch (e) { console.log(e); }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Loading CTFG...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'20px' }}>
      <div style={{ maxWidth:'600px',margin:'0 auto' }}>
        
        {/* NAV BAR */}
        <div style={{ display:'flex',gap:'8px',marginBottom:'20px',justifyContent:'center',flexWrap:'wrap' }}>
          <button onClick={load} style={{background:'#1e293b',color:'white',border:'none',padding:'10px',borderRadius:'10px',cursor:'pointer'}}><RefreshCcw size={18}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={{background:'#6366f1',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Bank</button>
          <button onClick={()=>window.location.href='/land'} style={{background:'#f97316',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Land</button>
          {p?.rank==='Admin'&&<button onClick={()=>window.location.href='/admin'} style={{background:'#475569',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Staff</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'#ef4444',color:'white',border:'none',padding:'10px',borderRadius:'10px',cursor:'pointer'}}><LogOut size={18}/></button>
        </div>

        {/* BANK CARD */}
        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)',padding:'40px',borderRadius:'30px',textAlign:'center',marginBottom:'20px',boxShadow:'0 10px 30px rgba(0,0,0,0.3)' }}>
          <p style={{fontSize:'12px',fontWeight:'bold',opacity:0.8}}>{p?.username} • {p?.rank}</p>
          <h2 style={{fontSize:'48px',margin:'10px 0'}}>${p?.balance?.toLocaleString() || '0'}</h2>
        </div>

        {/* SERVER STATUS */}
        <div style={{ background:'#131926',padding:'20px',borderRadius:'20px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'15px',border:'1px solid #1e293b' }}>
          <div style={{width:'10px',height:'10px',borderRadius:'50%',background:s?'#22c55e':'#ef4444',boxShadow:s?'0 0 10px #22c55e':'none'}}></div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:'14px',fontWeight:'bold'}}>{s ? s.name : 'Montana Server Offline'}</p>
            <p style={{margin:0,fontSize:'12px',color:'#94a3b8'}}>{s ? `${s.slots.used}/${s.slots.capacity} Players • ${s.mapName}` : 'No connection to game server'}</p>
          </div>
