"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, LogOut, Clock } from 'lucide-react';

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
      
      setP(prof || { username: 'Farmer', balance: 0, rank: 'Member' });
      setTx(t || []);

      const r = await fetch('/api/server').then(res => res.json()).catch(() => null);
      if (r?.server) setS(r.server);
    } catch (e) { console.log(e); }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'15px' }}>
      <div style={{ maxWidth:'500px',margin:'0 auto' }}>
        <div style={{ display:'flex',gap:'8px',marginBottom:'15px',justifyContent:'center' }}>
          <button onClick={() => window.location.reload()} style={{background:'#1e293b',color:'white',border:'none',padding:'10px',borderRadius:'10px'}}><RefreshCcw size={16}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={{background:'#6366f1',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Bank</button>
          <button onClick={()=>window.location.href='/land'} style={{background:'#f97316',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold'}}>Land</button>
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'#ef4444',color:'white',border:'none',padding:'10px',borderRadius:'10px'}}><LogOut size={16}/></button>
        </div>
        
        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)',padding:'30px',borderRadius:'20px',textAlign:'center',marginBottom:'15px' }}>
          <p style={{fontSize:'12px',fontWeight:'bold'}}>{p?.username} • {p?.rank}</p>
          <h2 style={{fontSize:'42px',margin:'5px 0'}}>${p?.balance?.toLocaleString()}</h2>
        </div>

        <div style={{ background:'#131926',padding:'15px',borderRadius:'15px',marginBottom:'15px',display:'flex',alignItems:'center',gap:'10px',border:'1px solid #1e293b' }}>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:s?'#22c55e':'#ef4444'}}></div>
          <p style={{margin:0,fontSize:'13px'}}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity}` : 'Server Offline'}</p>
        </div>

        <div style={{ background:'#131926',padding:'15px',borderRadius:'15px',border:'1px solid #1e293b' }}>
          <h3 style={{margin:'0 0 10px 0',fontSize:'13px'}}><Clock size={14}/> Activity</h3>
          {tx.map(t => (
            <div key={t.id} style={{display:'flex',justifyContent:'space-between',fontSize:'12px',padding:'5px 0',borderBottom:'1px solid #1e293b'}}>
              <span style={{color:'#94a3b8'}}>{t.description}</span><span style={{color:t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
