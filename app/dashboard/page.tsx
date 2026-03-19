"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, LogOut, ShieldCheck, FileText } from 'lucide-react';

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
      
      setP(prof || { username: 'Farmer', balance: 0, rank: 'Farmer' });
      setTx(t || []);

      const r = await fetch('/api/server').then(res => res.json()).catch(() => null);
      if (r?.server) setS(r.server);
    } catch (e) { console.log(e); }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Syncing CTFG...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'15px' }}>
      <div style={{ maxWidth:'600px',margin:'0 auto' }}>
        
        {/* NAV BUTTONS */}
        <div style={{ display:'flex',gap:'8px',marginBottom:'15px',justifyContent:'center',flexWrap:'wrap' }}>
          <button onClick={() => window.location.reload()} style={{background:'#1e293b',color:'white',border:'none',padding:'10px',borderRadius:'10px',cursor:'pointer'}}><RefreshCcw size={16}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={{background:'#6366f1',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Bank</button>
          <button onClick={()=>window.location.href='/land'} style={{background:'#f97316',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Land</button>
          
          {/* HUB OR APPLY GATE */}
          {(p?.rank === 'Admin' || p?.rank === 'Member') ? (
            <button onClick={()=>window.location.href='/community'} style={{background:'#475569',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Hub</button>
          ) : (
            <button onClick={()=>window.location.href='/apply'} style={{background:'#f59e0b',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Apply</button>
          )}

          {p?.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Staff</butto
