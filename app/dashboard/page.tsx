"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [m, setM] = useState(false);

  useEffect(() => {
    setM(true);
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(pr); setTx(t || []);
      fetch('/api/server').then(r=>r.json()).then(d=>{if(d) setS(d)}).catch(()=>0);
    };
    load();
  }, []);

  if (!m || !p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing CTFG...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0 }}>CTFG PORTAL</h1>
      
      {/* LIVE SERVER STATUS */}
      <div style={{ background:'#131926', padding:'12px', borderRadius:'15px', margin:'15px auto', maxWidth:'400px', border:'1px solid #1e293b', textAlign:'left' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px' }}>
          <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: s?.slots?.used > 0 ? '#22c55e' : '#444' }}></div>
          <p style={{ margin:0, fontSize:'13px', fontWeight:'bold' }}>{s?.server?.name || 'Connecting...'}: {s?.slots?.used || 0}/{s?.slots?.capacity || 0}</p>
        </div>
        {s?.slots?.players?.filter((p:any) => p.isUsed).map((pl:any) => (
          <p key={pl.name} style={{ margin:0, fontSize:'11px', color:'#22c55e' }}>🚜 {pl.name} (Online: {pl.uptime}m)</p>
        ))}
      </div>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'20px', margin:'0 auto 15px', maxWidth:'400px' }}>
        <p style={{ margin:0, fontSize:'11px' }}>{p.username} • {p.rank}</p>
        <h2 style={{ margin:0, fontSize:'42px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', marginBottom:'20px' }}>
        <button onClick={()=>window.location.href='/bank'} style={{padding:'8px 15px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'8px'}}>Bank</button>
        <button onClick={()=>window.location.href='/land'} style={{padding:'8px 15px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'8px'}}>Land</button>
        <button onClick={()=>window.location.href='/map'} style={{padding:'8px 15px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'8px'}}>Live Map</button>
        <button onClick={()=>window.location.href='/contracts'} style={{padding:'8px 15px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'8px'}}>Jobs</button>
        {p.rank==='Admin' && <button onClick={()=>window.location.href='/admin'} style={{padding:'8px 15px',background:'#dc2626',color:'#fff',border:'none',borderRadius:'8px'}}>Staff</button>}
      </div>
    </div>
  );
}
