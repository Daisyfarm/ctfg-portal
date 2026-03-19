"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, LogOut, Clock, Briefcase } from 'lucide-react';

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

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>Loading CTFG Data...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* BUTTON NAVIGATION BAR */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
           <button onClick={() => window.location.reload()} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
             <RefreshCcw size={18}/>
           </button>

           <button onClick={() => window.location.href = '/contracts'} style={{ backgroundColor: '#6366f1', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
             <Briefcase size={18}/> Jobs
           </button>

           <button onClick={() => window.location.href = '/bank'} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
             Bank
           </button>

           <button onClick={() => window.location.href = '/land'} style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
             Land
           </button>

           <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
             <LogOut size={18}/>
           </button>
        </div>

        {/* PROFILE CARD */}
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '40px', borderRadius: '30px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
          <p style={{ opacity: 0.8, fontSize: '12px', fontWeight: 'bold', margin: 0 }}>{profile?.username} • {profile?.rank}</p>
          <h2 style={{ fontSize: '50px', margin: '10px 0', fontFamily: 'monospace' }}>${profile?.balance?.toLocaleString()}</h2>
        </div>

        {/* SERVER STATUS */}
        <div style={{ backgroundColor: '#131926', padding: '20px', borderRadius: '24px', border: '1px solid #1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: server ? '#22c55e' : '#ef4444', borderRadius: '50%', boxShadow: server ? '0 0 10px #22c55e' : 'none' }}></div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{server?.name || "Server Offline"}</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>{server ? `${server.slots?.used || 0}/${server.slots?.capacity || 0} Players • ${server.mapName}` : "Offline"}</p>
          </div>
          <Tractor size={24} color="#22c55e" />
        </div>

        {/* RECENT ACTIVITY */}
        <div style={{ backgroundColor: '#131926', padding: '20px', borderRadius: '24px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}><Clock size={16} color="#22c55e"/> Recent Activity</h3>
          {txs.length === 0 && <p style={{color: '#475569', fontSize: '12px'}}>No history yet.</p>}
          {txs.map((tx) => (
            <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e293b', fontSize: '13px' }}>
              <span>{tx.description}</span>
              <span style={{ fontWeight: 'bold', color: tx.type === 'income' ? '#22c55e' : '#ef4444' }}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
