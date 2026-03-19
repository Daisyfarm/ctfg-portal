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
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      const { data: h } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(prof || { username: 'Farmer', balance: 0, rank: 'Member' });
      setTx(h || []);
      fetch('/api/server').then(res => res.json()).then(data => { if (data?.server) setS(data.server); }).catch(() => null);
    };
    load();
  }, []);

  if (!m || !p) return <div style={{padding:'20px',textAlign:'center'}}>Syncing with CTFG...</div>;

  return (
    <div style={{ padding:'20px', fontFamily:'sans-serif', textAlign:'center', maxWidth:'500px', margin:'0 auto' }}>
      <h1 style={{ color:'#22c55e' }}>CTFG PORTAL</h1>
      <div style={{ background:'#131926', padding:'10px', borderRadius:'10px', marginBottom:'15px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: s ? '#22c55e' : '#ef4444' }}></div>
        <p style={{ margin:0, fontSize:'12px' }}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity}` : 'Montana Offline'}</p>
      </div>
      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'20px', marginBottom:'15px' }}>
        <p style={{ margin:0, fontSize:'12px' }}>{p.username} • {p.rank}</p>
        <h2 style={{ margin:0, fontSize:'40px' }}>${p.balance?.toLocaleString()}</h2>
      </div>
      <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginBottom:'20px' }}>
        <button onClick={()=>window.location.href='/bank'}>Bank</button>
        <button onClick={()=>window.location.href='/land'}>Land</button>
        <button onClick={()=>window.location.href='/contracts'}>Jobs</button>
        {p.rank==='Admin' && <button onClick={()=>window.location.href='/admin'}>Staff</button>}
      </div>
      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', textAlign:'left' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'12px', color:'#22c55e' }}>ACTIVITY</p>
        {tx.map(t => (
          <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', padding:'5px 0', borderBottom:'1px solid #0b0f1a' }}>
            <span>{t.description}</span><span>${t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
