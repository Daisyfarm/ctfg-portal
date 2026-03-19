"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [view, setView] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) return window.location.href = '/';
        const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
        const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
        setP(prof || { username: 'Farmer', balance: 0, rank: 'Member' });
        setTx(t || []);
        setView(true);
        // Safe Server Status Load
        fetch('/api/server').then(r=>r.json()).then(d=>{if(d?.server) setS(d.server)}).catch(()=>null);
      } catch (e) { console.log(e); setView(true); }
    };
    load();
  }, []);

  if (!view) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Starting CTFG Portal...</div>;

  const btn = { padding:'10px 15px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'12px', fontWeight:'bold' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0 }}>CTFG PORTAL</h1>
      <p style={{ fontSize:'12px', color:'#94a3b8' }}>{p?.username} • {p?.rank}</p>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'35px', borderRadius:'25px', margin:'20px auto', maxWidth:'400px', boxShadow:'0 10px 30px rgba(0,0,0,0.4)' }}>
        <h2 style={{ margin:0, fontSize:'45px' }}>${p?.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ background:'#131926', padding:'12px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto 20px', border:'1px solid #1e293b', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
        <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: s ? '#22c55e' : '#ef4444' }}></div>
        <p style={{ margin:0, fontSize:'12px' }}>{s ? `${s.name}: ${s.slots?.used || 0}/${s.slots?.capacity || 0}` : 'Montana Offline'}</p>
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', marginBottom:'20px' }}>
        <button style={btn} onClick={()=>window.location.href='/bank'}>Bank</button>
        <button style={btn} onClick={()=>window.location.href='/land'}>Land</button>
        <button style={btn} onClick={()=>window.location.href='/contracts'}>Jobs</button>
        <button style={{...btn, background:'#6366f1'}} onClick={()=>window.location.href='/map'}>Live Map</button>
        {p?.rank==='Admin' && <button style={{...btn,background:'#dc2626'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
        <button style={{...btn,background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}>ACTIVITY</p>
        {tx.map(t => (
          <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', borderBottom:'1px solid #0b0f1a', padding:'5px 0' }}>
            <span>{t.description}</span><span style={{color: t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
