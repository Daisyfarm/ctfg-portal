"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      
      // Load Profile & Activity
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: history } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      
      setP(prof);
      setTx(history || []);

      // Load Montana Server (Safe Fetch)
      fetch('/api/server').then(r => r.json()).then(d => { if(d?.server) setS(d.server); }).catch(() => null);
    }
    load();
  }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Syncing CTFG...</div>;

  const btn = { padding:'10px 12px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'12px', fontWeight:'bold' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0 }}>CTFG PORTAL</h1>
      <p style={{ fontSize:'12px', color:'#94a3b8' }}>{p.username} • {p.rank}</p>

      {/* SERVER STATUS */}
      <div style={{ background:'#131926', padding:'10px', borderRadius:'15px', margin:'15px auto', display:'inline-flex', alignItems:'center', gap:'10px', border:'1px solid #1e293b' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: s ? '#22c55e' : '#ef4444' }}></div>
        <p style={{ margin:0, fontSize:'12px' }}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity}` : 'Montana Offline'}</p>
      </div>

      {/* BANK CARD */}
      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'20px', margin:'0 auto 15px', maxWidth:'400px', boxShadow:'0 10px 20px rgba(0,0,0,0.4)' }}>
        <p style={{ margin:0, fontSize:'10px', opacity:0.8 }}>BALANCE</p>
        <h2 style={{ margin:0, fontSize:'42px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      {/* ACTIVITY */}
      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}>ACTIVITY</p>
        {tx.length === 0 ? <p style={{fontSize:'10px', color:'#475569', margin:0}}>No history found.</p> : tx.map(t => (
          <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', borderBottom:'1px solid #0b0f1a', padding:'5px 0' }}>
            <span>{t.description}</span><span style={{color: t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount?.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop:'20px', display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap' }}>
        <button style={btn} onClick={()=>window.location.href='/bank'}>Bank</button>
        <button style={btn} onClick={()=>window.location.href='/land'}>Land</button>
        <button style={btn} onClick={()=>window.location.href='/contracts'}>Jobs</button>
        {p.rank==='Admin' && <button style={{...btn, background:'#475569'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
        <button style={{...btn, background:'#ef4444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
      </div>
    </div>
  );
}
