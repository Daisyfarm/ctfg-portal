"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, BookOpen, LogOut, ShieldCheck } from 'lucide-react';

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
      const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setP(pr); setTx(t || []);
      fetch('/api/server').then(res=>res.json()).then(d=>setS(d.server)).catch(()=>null);
    } catch (e) { console.log(e); }
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Syncing CTFG Portal...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'white', padding:'15px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto', textAlign:'center' }}>
        
        {/* NAV BUTTONS */}
        <div style={{ display:'flex', gap:'8px', marginBottom:'15px', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={() => window.location.reload()} style={{background:'#1e293b', color:'white', border:'none', padding:'10px', borderRadius:'10px', cursor:'pointer'}}><RefreshCcw size={16}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={{background:'#6366f1', color:'white', border:'none', padding:'10px 12px', borderRadius:'10px', fontWeight:'bold', fontSize:'12px'}}>Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e', color:'white', border:'none', padding:'10px 12px', borderRadius:'10px', fontWeight:'bold', fontSize:'12px'}}>Bank</button>
          <button onClick={()=>window.location.href='/land'} style={{background:'#f97316', color:'white', border:'none', padding:'10px 12px', borderRadius:'10px', fontWeight:'bold', fontSize:'12px'}}>Land</button>
          <button onClick={()=>window.location.href='/rules'} style={{background:'#475569', color:'white', border:'none', padding:'10px 12px', borderRadius:'10px', fontWeight:'bold', fontSize:'12px'}}>Rules</button>
          {(p?.rank==='Admin'||p?.rank==='Member') && <button onClick={()=>window.location.href='/community'} style={{background:'#3b82f6', color:'white', border:'none', padding:'10px 12px', borderRadius:'10px', fontWeight:'bold', fontSize:'12px'}}>Hub</button>}
          {p?.rank==='Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', color:'white', border:'none', padding:'10px 12px', borderRadius:'10px', fontWeight:'bold', fontSize:'12px'}}>Staff</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'#ef4444', color:'white', border:'none', padding:'10px', borderRadius:'10px'}}><LogOut size={16}/></button>
        </div>

        {/* BANK CARD */}
        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)', padding:'30px', borderRadius:'20px', textAlign:'center', marginBottom:'15px', boxShadow:'0 10px 30px rgba(0,0,0,0.3)' }}>
          <p style={{fontSize:'12px', fontWeight:'bold'}}>{p?.username} • {p?.rank}</p>
          <h2 style={{fontSize:'42px', margin:'10px 0'}}>${p?.balance?.toLocaleString() || '0'}</h2>
        </div>

        {/* SERVER STATUS */}
        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'10px', border:'1px solid #1e293b' }}>
          <div style={{width:'8px', height:'8px', borderRadius:'50%', background:s?'#22c55e':'#ef4444', boxShadow:s?'0 0 8px #22c55e':'none'}}></div>
          <p style={{margin:0, fontSize:'13px'}}>{s ? `${s.name}: ${s.slots.used}/${s.slots.capacity} Online` : 'Montana Server Offline'}</p>
        </div>

        {/* ACTIVITY */}
        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #1e293b', textAlign:'left' }}>
          <p style={{margin:'0 0 10px 0', fontSize:'13px'}}><Clock size={14} style={{verticalAlign:'middle'}}/> Recent Activity</p>
          {tx.map(t => (
            <div key={t.id} style={{display:'flex', justifyContent:'space-between', fontSize:'11px', padding:'5px 0', borderBottom:'1px solid #0b0f1a'}}>
              <span style={{color:'#94a3b8'}}>{t.description}</span><span style={{fontWeight:'bold', color:t.type==='income'?'#22c55e':'#ef4444'}}>${t.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
