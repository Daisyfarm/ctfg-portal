"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, Users, LogOut, ShieldCheck } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [server, setServer] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (p) setProfile(p);

      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setTxs(t || []);

      const res = await fetch('/api/server');
      const sData = await res.json();
      setServer(sData?.server || null);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>Syncing CTFG Portal...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* TOP NAV BUTTONS */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
           <button onClick={fetchData} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><RefreshCcw size={18}/></button>
           <button onClick={() => window.location.href = '/contracts'} style={{ backgroundColor: '#6366f1', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Jobs</button>
           <button onClick={() => window.location.href = '/bank'} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Bank</button>
           <button onClick={() => window.location.href = '/land'} style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Land</button>
           <button onClick={() => window.location.href = '/community'} style={{ backgroundColor: '#475569', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Hub</button>
           {profile?.rank === 'Admin' && <button onClick={() => window.location.href = '/admin'} style={{ backgroundColor: '#dc2626', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Staff</button>}
        </div>

        {/* BANK CARD */}
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '40px', borderRadiu
