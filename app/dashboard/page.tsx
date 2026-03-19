"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, Users, LogOut, ShieldCheck, FileText } from 'lucide-react';

const sb = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dashboard() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const fetchData = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (prof) setP(prof);

      const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
      setTx(t || []);

      const r = await fetch('/api/server').then(res => res.json()).catch(() => null);
      if (r?.server) setS(r.server);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Syncing CTFG...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'20px' }}>
      <div style={{ maxWidth:'600px',margin:'0 auto' }}>
        
        {/* NAV BAR */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
           <button onClick={fetchData} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><RefreshCcw size={18}/></button>
           <button onClick={() => window.location.href = '/contracts'} style={{ backgroundColor: '#6366f1', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Jobs</button>
           <button onClick={() => window.location.href = '/bank'} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Bank</button>
           <button onClick={() => window.location.href = '/land'} style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Land</button>
           
           {/* THE GATE: HUB OR APPLY */}
           {(p?.rank === 'Admin' || p?.rank === 'Member') ? (
             <button onClick={() => window.location.href = '/community'} style={{ backgroundColor: '#475569', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Hub</button>
           ) : (
             <button onClick={() => window.location.href = '/apply'} style={{ backgroundColor: '#f59e0b', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Apply</button>
           )}

           {p?.rank === 'Admin' && <button onClick={() => window.location.href = '/admin'} style={{ backgroundColor: '#dc2626', border: 'none', color: 'white', padding: '10px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px' }}>Staff</button>}
           <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '10px' }}><LogOut size={18}/></button>
        </div>

        {/* BANK CARD */}
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '40px', borderRadius: '30px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
          <p style={{ opacity: 0.8, fontSize: '12px', fontWeight: 'bold', margin: 0 }}>{p?.username} • {p?.rank}</p>
          <h2 style={{ fontSize: '50px', margin: '10px 0', fontFamily: 'monospace' }}>${p?.balance?.toLocaleString()}</h2>
        </div>

        {/* LIVE SERVER */}
        <div style={{ background: '#131926', padding: '20px', borderRadius: '24px', border: '1px solid #1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s ? '#22c55e' : '#ef4444', boxShadow: s ? '0 0 10px #22c55e' : 'none' }}></div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{s ? s.name : 'Server Offline'}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{s ? `${s.slots.used}/${s.slots.capacity} Players • ${s.mapName}` : 'Check back later'}</p>
          </div>
          <Tractor size={20} color={s ? '#22c55e' : '#334155'}/>
        </div>

        {/* RECENT ACTIVITY */}
        <div style={{ background: '#131926', padding: '20px', borderRadius: '20px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color="#22c55e"/> Activity</h3>
          {tx.length === 0 && <p style={{ color: '#475569', fontSize: '12px' }}>No history yet.</p>}
          {tx.map(t => (
            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#94a3b8' }}>{t.description}</span>
              <span style={{ fontWeight: 'bold', color: t.type === 'income' ? '#22c55e' : '#ef4444' }}>${t.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
