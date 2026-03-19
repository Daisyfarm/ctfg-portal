"use client";
import { useEffect, useState } from 'react';
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
      if (!user) { window.location.href = '/'; return; }

      // Load Profile
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (prof) setP(prof);

      // Load Transactions
      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      if (t) setTx(t);

      // Load Server - This is the part that usually crashes, so we wrap it tight
      try {
        const r = await fetch('/api/server');
        const d = await r.json();
        if (d && d.server) setS(d.server);
      } catch (err) { console.log("Server status skip"); }

    } catch (e) { console.log("Critical load error skip"); }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Loading CTFG Portal...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'15px' }}>
      <div style={{ maxWidth:'500px',margin:'0 auto' }}>
        
        {/* BUTTONS */}
        <div style={{ display:'flex',gap:'8px',marginBottom:'15px',justifyContent:'center',flexWrap:'wrap' }}>
          <button onClick={() => window.location.reload()} style={{background:'#1e293b',color:'white',border:'none',padding:'10px',borderRadius:'10px',cursor:'pointer'}}><RefreshCcw size={16}/></button>
          <button onClick={()=>window.location.href='/contracts'} style={{background:'#6366f1',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'pointer'}}>Jobs</button>
          <button onClick={()=>window.location.href='/bank'} style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px',fontWeight:'bold',cursor:'
