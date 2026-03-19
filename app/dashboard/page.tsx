"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, LogOut, Briefcase } from 'lucide-react';

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
      try { 
        const r = await fetch('/api/server'); 
        if (r.ok) { const d = await r.json(); setS(d.server); }
      } catch (e) { setS(null); }
    } catch (e) { console.error(e); }
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'20px' }}>
      <div style={{ maxWidth:'600px',margin:'0 auto' }}>
        <div style={{ display:'flex',gap:'8px',marginBottom:'20px',justifyContent:'center',flexWrap:'wrap' }}>
          <button onClick={() => window.location.reload()} style={{background:'#1e293b',color:'white',border:'none',padding:'10px',borderRadius:'10px'}}><RefreshCcw size={18}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={{background:'#6366f1',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Bank</button>
          <button onClick={()=>window.location.href='/land'} style={{background:'#f97316',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Land</button>
          {p?.rank==='Admin'&&<button onClick={()=>window.location.href='/admin'} style={{background:'#475569',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Staff</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'#ef4444',color:'white',border:'none',padding:'10px',borderRadius:'10px'}}><LogOut size={18}/></button>
        </div>

        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)',padding:'40px',borderRadius:'30px',textAlign:'center',marginBottom:'20px',boxShadow:'0 10px 30px rgba(0,0,0,0.3)' }}>
          <p style={{fontSize:'12px',fontWeight:'bold'}}>{p?.username} • {p?.rank}</p>
          <h2 style={{fontSize:'48px',margin:'10px 0'}}>${p?.balance?.toLocaleString()}</h2>
        </div>

        <div style={{ background:'#131926',padding:'20px',borderRadius:'20px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'15px',border:'1px solid #1e293b' }}>
          <div style={{width:'10px',height:'10px',borderRadius:'50%',background:s?'#22c55e':'#ef4444',boxShadow:s?'0 0 10px #22c55e':'none'}}></div>
          <div style={{flex:1}}>
            <p style={{margin:0,fontSize:'14px',fontWeight:'bold'}}>{s ? s.name : 'CTFG Server Offline'}</p>
            <p style={{margin:0,fontSize:'12px',color:'#94a3b8'}}>{s ? `${s.slots.used}/${s.slots.capacity} Players Online` : 'Check Discord for status'}</p>
          </div>
          <Tractor size={20} color={s?'#22c55e':'#334155'}/>
        </div>

        <div style={{ background:'#131926',padding:'20px',borderRadius:'20px',border:'1px solid #1e293b' }}>
          <h3 style={{margin:'0 0 10px 0',fontSize:'14px',display:'flex',alignItems:'center',gap:'8px'}}><Clock size={16} color="#22c55e"/> Activity</h3>
          {tx.length === 0 && <p style={{color:'#475569',fontSize:'12px'}}>No history yet.</p>}
          {tx.map(t => (
            <div key={t.id} style={{display:'flex',justifyContent:'space-between',fontSize:'13px',padding:'8px 0',borderBottom:'1px solid #1e293b'}}>
              <span style={{color:'#94a3b8'}}>{t.description}</span>
              <span style={{fontWeight:'bold',color:t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
