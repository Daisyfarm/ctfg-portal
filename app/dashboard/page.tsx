"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(prof); setTx(t || []); setOk(true);
      fetch('/api/server').then(r=>r.json()).then(d=>{if(d?.server)setS(d.server)}).catch(()=>0);
    };
    load();
  }, []);

  if (!ok) return <div style={{background:'#000',color:'#fff',height:'100vh',padding:'20px'}}>Syncing CTFG...</div>;

  const b = { padding:'10px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontSize:'22px' }}>CTFG PORTAL</h1>
      
      <div style={{ background:'#131926', padding:'8px', borderRadius:'12px', display:'inline-flex', alignItems:'center', gap:'8px', margin:'10px 0' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:s?'#22c55e':'#ef4444' }}></div>
        <p style={{ margin:0, fontSize:'11px' }}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity}` : 'Montana Offline'}</p>
      </div>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'25px', borderRadius:'20px', margin:'0 auto 15px', maxWidth:'400px' }}>
        <p style={{ margin:0, fontSize:'11px' }}>{p.username} • {p.rank}</p>
        <h2 style={{ margin:0, fontSize:'36px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left' }}>
        {tx.map(t => <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'10px', padding:'5px 0', borderBottom:'1px solid #0b0f1a' }}><span>{t.description}</span><span style={{color:'#22c55e'}}>${t.amount}</span></div>)}
      </div>

      <div style={{ display:'flex', justifyContent:'center', gap:'5px', marginTop:'20px' }}>
        <button style={b} onClick={()=>window.location.href='/bank'}>Bank</button>
        <button style={b} onClick={()=>window.location.href='/land'}>Land</button>
        <button style={b} onClick={()=>window.location.href='/contracts'}>Jobs</button>
        <button style={b} onClick={()=>window.location.href='/map'}>Map</button>
        {p.rank==='Admin' && <button style={{...b, background:'#dc2626'}} onClick={()=>window.location.href='/admin'}>Staff</button>}
        <button style={{...b, background:'#444'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
      </div>
    </div>
  );
}
