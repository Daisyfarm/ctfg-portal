"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);

  useEffect(() => {
    const l = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: r } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(r); setTx(t || []);
      fetch('/api/server').then(res=>res.json()).then(d=>setS(d.server)).catch(()=>0);
    };
    l();
  }, []);

  if (!p) return <div style={{color:'#fff',background:'#0b0f1a',height:'100vh',padding:'20px'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'#fff',fontFamily:'sans-serif',padding:'15px',textAlign:'center' }}>
      <h1 style={{color:'#22c55e',margin:0,fontSize:'24px'}}>CTFG PORTAL</h1>
      <div style={{margin:'10px 0',fontSize:'12px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
        <div style={{width:'10px',height:'10px',borderRadius:'50%',background:s?'#22c55e':'#ef4444'}}></div>
        <span>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity}` : 'Montana Offline'}</span>
      </div>
      <div style={{background:'linear-gradient(135deg,#166534,#064e3b)',padding:'25px',borderRadius:'20px',margin:'15px auto',maxWidth:'400px'}}>
        <p style={{margin:0,fontSize:'10px',fontWeight:'bold'}}>{p.username} • {p.rank}</p>
        <h2 style={{margin:0,fontSize:'36px'}}>${p.balance?.toLocaleString()}</h2>
      </div>
      <div style={{background:'#131926',padding:'10px',borderRadius:'15px',maxWidth:'400px',margin:'0 auto',textAlign:'left',border:'1px solid #1e293b'}}>
        <p style={{margin:'0 0 5px 0',fontSize:'10px',color:'#22c55e'}}>ACTIVITY</p>
        {tx.map(t => <div key={t.id} style={{display:'flex',justifyContent:'space-between',fontSize:'10px',padding:'4px 0',borderBottom:'1px solid #0b0f1a'}}><span>{t.description}</span><span style={{color:t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount}</span></div>)}
      </div>
      <div style={{marginTop:'15px',display:'flex',justifyContent:'center',gap:'5px',flexWrap:'wrap'}}>
        <button onClick={()=>window.location.href='/bank'} style={{padding:'8px 12px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'5px',fontSize:'11px'}}>Bank</button>
        <button onClick={()=>window.location.href='/land'} style={{padding:'8px 12px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'5px',fontSize:'11px'}}>Land</button>
        <button onClick={()=>window.location.href='/contracts'} style={{padding:'8px 12px',background:'#1e293b',color:'#fff',border:'none',borderRadius:'5px',fontSize:'11px'}}>Jobs</button>
        {p.rank==='Admin'&&<button onClick={()=>window.location.href='/admin'} style={{padding:'8px 12px',background:'#475569',color:'#fff',border:'none',borderRadius:'5px',fontSize:'11px'}}>Staff</button>}
        <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{padding:'8px 12px',background:'#ef4444',color:'#fff',border:'none',borderRadius:'5px',fontSize:'11px'}}>Logout</button>
      </div>
    </div>
  );
}
