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
