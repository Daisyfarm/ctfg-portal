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
      
      setP(r || { username: 'Farmer', balance: 0, rank: 'Member' });
      setTx(t || []);

      // Improved Safe Fetch
      try {
        const res = await fetch('/api/server');
        const d = await res.json();
        if (d && d.server) setS(d.server);
      } catch (e) { console.log("Server offline"); }
    };
    l();
  }, []);

  if (!p) return <div style={{color:'#fff',background:'#0b0f1a',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', fontFamily:'sans-serif', padding:'15px', textAlign:'center' }}>
      <h1 style={{color:'#22c55e', margin:0, fontSize:'24px'}}>CTFG PORTAL</h1>
      
      <div style={{margin:'10px 0', fontSize:'12px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
        <div style={{width:'10px', height:'10px', borderRadius:'50%', background: s ? '#22c55e' : '#ef4444'}}></div>
        <span>{s ? `${s.name}: ${s.slots?.used || 0}/${s.slots?.capacity || 0}` : 'Montana Server Offline'}</span>
      </div>

      <div style={{background:'linear-gradient(135deg,#166534,#064e3b)', padding:'25px', borderRadius:'20px', margin:'15px auto', maxWidth:'400px', boxShadow:'0 4px 15px rgba(0,0,0,0.5)'}}>
        <p style={{margin:0, fontSize:'10px', fontWeight:'bold'}}>{p.username} • {p.rank}</p>
        <h2 style={{margin:0, fontSize:'36px'}}>${p.balance?.toLocaleString() || '0'}</h2>
      </div>

      <div style={{background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b'}}>
        <p style={{margin:'0 0 8px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold'}}>RECENT ACTIVITY</p>
        {tx.length > 0 ? tx.map(t => (
          <div key={t.id} style={{display:'flex', justifyContent:'space-between', fontSize:'11px', padding:'5px 0', borderBottom:'1px solid #0b0f1a'}}>
            <span>{t.description}</span>
            <span style={{color: t.type === 'income' ? '#22c55e' : '#ef4444'}}>${t.amount?.toLocaleString() || '0'}</span>
          </div>
        )) : <p style={{fontSize:'10px', color:'#475569'}}>No history found.</p>}
      </div>

      <div style={{marginTop:'20px', display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap'}}>
        <button onClick={()=>window.location.href='/bank'} style={{padding:'10px 15px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', cursor:'pointer'}}>Bank</button>
        <button onClick={()=>window.location.href='/land'} style={{padding:'10px 15px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', cursor:'pointer'}}>Land</button>
        <button onClick={()=>window.location.href='/contracts'} style={{padding:'10px 15px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', cursor:'pointer'}}>Jobs</button>
        {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{padding:'10px 15px', background:'#475569', color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', cursor:'pointer'}}>Staff</button>}
        <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{padding:'10px 15px', background:'#ef4444', color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', cursor:'pointer'}}>Logout</button>
      </div>
    </div>
  );
}
