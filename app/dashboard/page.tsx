"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) return window.location.href = '/';
        
        // 1. Load Profile (The most important part)
        const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
        setP(prof || { username: 'Farmer', balance: 0, rank: 'Farmer' });

        // 2. Load Activity (Quietly)
        const { data: history } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
        setTx(history || []);
      } catch (e) { console.log("Load error bypassed"); }
    };
    load();
  }, []);

  const checkServer = () => {
    fetch('/api/server').then(r => r.json()).then(d => { if(d?.server) setS(d.server); }).catch(() => alert("Server not responding"));
  };

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to CTFG...</div>;

  const bStyle = { padding:'10px 12px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'bold' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0 }}>CTFG PORTAL</h1>
      <p style={{ fontSize:'12px', color:'#94a3b8' }}>{p.username} • {p.rank}</p>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'35px', borderRadius:'25px', margin:'20px auto', maxWidth:'400px', boxShadow:'0 10px 20px rgba(0,0,0,0.4)' }}>
        <h2 style={{ margin:0, fontSize:'45px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto 15px', border:'1px solid #1e293b' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: s ? '#22c55e' : '#444' }}></div>
            <p style={{ margin:0, fontSize:'12px' }}>{s ? `${s.slots.used}/${s.slots.capacity} Online` : 'Montana Server'}</p>
          </div>
          <button onClick={checkServer} style={{ background:'#0b0f1a', color:'#22c55e', border:'1px solid #22c55e', borderRadius:'5px', fontSize:'10px', padding:'3px 8px', cursor:'pointer' }}>Refresh Status</button>
        </div>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}>RECENT ACTIVITY</p>
        {tx.map(t => (
          <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', borderBottom:'1px solid #0b0f1a', padding:'6px 0' }}>
            <span>{t.description}</span><span style={{color: t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount?.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', marginTop:'20px' }}>
        <button style={bStyle} onClick={()=>window.location.href='/bank'}>Bank</button>
        <button style={bStyle} onClick={()=>window.location.href='/land'}>Land</button>
        <button style={bStyle} onClick={()=>window.location.href='/contracts'}>Jobs</button>
        {p.rank==='Admin' && <button style={{...bStyle,background:'#475569'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
        <button style={{...bStyle,background:'#ef4444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
      </div>
    </div>
  );
}
