"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, LogOut, ShieldCheck, FileText } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [m, setM] = useState(false);

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(pr || { username: 'Farmer', balance: 0, rank: 'Farmer' });
      setTx(t || []);
      setM(true);
      fetch('/api/server').then(r=>r.json()).then(d=>{if(d?.server) setS(d.server)}).catch(()=>null);
    } catch (e) { console.log(e); }
  };

  useEffect(() => { load(); }, []);

  if (!m || !p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing CTFG Portal...</div>;

  const btn = { padding:'10px 12px', background:'#1e293b', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'11px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px' };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif', textAlign:'center' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <h1 style={{ color:'#22c55e', fontStyle:'italic', margin:'0 0 15px 0', fontSize:'22px' }}>CTFG PORTAL</h1>

        <div style={{ display:'flex', justifyContent:'center', gap:'5px', flexWrap:'wrap', marginBottom:'15px' }}>
          <button onClick={() => window.location.reload()} style={btn}><RefreshCcw size={14}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={btn}><Briefcase size={14}/> Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={btn}><Send size={14}/> Bank</button>
          <button onClick={()=>window.location.href='/land'} style={btn}><Map size={14}/> Land</button>
          <button onClick={()=>window.location.href='/map'} style={{...btn, background:'#6366f1'}}><Map size={14}/> Live Map</button>
          {p.rank === 'Farmer' ? 
            <button onClick={()=>window.location.href='/apply'} style={{...btn, background:'#f59e0b'}}><FileText size={14}/> Apply</button> :
            <button onClick={()=>window.location.href='/community'} style={{...btn, background:'#475569'}}><Tractor size={14}/> Hub</button>
          }
          {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{...btn, background:'#dc2626'}}><ShieldCheck size={14}/> Staff</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{...btn, background:'#444'}}><LogOut size={14}/></button>
        </div>

        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'25px', marginBottom:'15px', boxShadow:'0 10px 20px rgba(0,0,0,0.4)' }}>
          <p style={{ margin:0, fontSize:'11px', fontWeight:'bold' }}>{p.username} • {p.rank}</p>
          <h2 style={{ margin:'5px 0 0 0', fontSize:'45px' }}>${p.balance?.toLocaleString()}</h2>
        </div>

        <div style={{ background:'#131926', padding:'12px', borderRadius:'15px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px', border:'1px solid #1e293b' }}>
          <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: s?'#22c55e':'#ef4444', boxShadow: s?'0 0 10px #22c55e':'none' }}></div>
          <p style={{ margin:0, fontSize:'12px' }}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity} Online` : 'Montana Server Offline'}</p>
        </div>

        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', textAlign:'left', border:'1px solid #1e293b' }}>
          <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px' }}><Clock size={14}/> RECENT ACTIVITY</p>
          {tx.length === 0 ? <p style={{fontSize:'10px', color:'#475569'}}>No history found.</p> : tx.map(t => (
            <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', borderBottom:'1px solid #0b0f1a', padding:'6px 0' }}>
              <span style={{color:'#94a3b8'}}>{t.description}</span>
              <span style={{color: t.type==='income'?'#22c55e':'#ef4444', fontWeight:'bold'}}>${t.amount?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
