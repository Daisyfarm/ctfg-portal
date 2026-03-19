"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: history } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      
      setP(prof);
      setTx(history || []);
    };
    load();
  }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading CTFG...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'white', padding:'20px', fontFamily:'sans-serif', textAlign:'center' }}>
      <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:0 }}>CTFG PORTAL</h1>
      <p style={{ fontSize:'12px', color:'#94a3b8' }}>Welcome, {p.username} ({p.rank})</p>

      <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'25px', margin:'20px auto', maxWidth:'400px' }}>
        <p style={{ margin:0, fontSize:'10px', fontWeight:'bold' }}>TOTAL BALANCE</p>
        <h2 style={{ margin:0, fontSize:'48px' }}>${p.balance?.toLocaleString()}</h2>
      </div>

      <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', maxWidth:'400px', margin:'0 auto', textAlign:'left', border:'1px solid #1e293b' }}>
        <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}>ACTIVITY</p>
        {tx.map(t => (
          <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', borderBottom:'1px solid #0b0f1a', padding:'5px 0' }}>
            <span>{t.description}</span>
            <span style={{color: t.type === 'income' ? '#22c55e' : '#ef4444'}}>${t.amount?.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop:'20px', display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap' }}>
        <button onClick={()=>window.location.href='/bank'} style={{padding:'10px 15px',background:'#1e293b',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Bank</button>
        <button onClick={()=>window.location.href='/land'} style={{padding:'10px 15px',background:'#1e293b',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Land</button>
        <button onClick={()=>window.location.href='/contracts'} style={{padding:'10px 15px',background:'#1e293b',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Jobs</button>
        {p.rank==='Admin' && <button onClick={()=>window.location.href='/admin'} style={{padding:'10px 15px',background:'#475569',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Staff</button>}
        <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{padding:'10px 15px',background:'#ef4444',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Logout</button>
      </div>
    </div>
  );
}
