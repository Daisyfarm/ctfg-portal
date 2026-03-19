"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, LogOut, Send, Map } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [server, setServer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      
      // Get Profile Data
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (p) setProfile(p);

      // Get Server Status
      const res = await fetch('/api/server');
      const sData = await res.json();
      setServer(sData?.server || null);
    } catch (e) {
      console.error("Dashboard Load Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>Syncing CTFG Data...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* NAV BUTTONS */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
           <button onClick={() => window.location.reload()} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><RefreshCcw size={18}/></button>
           <button onClick={() => window.location.href = '/bank'} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold' }}>Bank</button>
           <button onClick={() => window.location.href = '/land'} style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '10px 15px', borderRadius: '10px', fontWeight: 'bold' }}>Land</button>
           <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '10px' }}><LogOut size={18}/></button>
        </div>

        {/* BALANCE CARD */}
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '40px', borderRadius: '30px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
          <p style={{ opacity: 0.8, fontSize: '12px', fontWeight: 'bold', margin: 0 }}>{profile?.username || "Farmer"} • {profile?.rank || "Member"}</p>
          <h2 style={{ fontSize: '50px', margin: '10px 0', fontFamily: 'monospace' }}>${profile?.balance?.toLocaleString() || '0'}</h2>
        </div>

        {/* LIVE SERVER STATUS CARD */}
        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: server ? '#22c55e' : '#ef4444', borderRadius: '50%', boxShadow: server ? '0 0 10px #22c55e' : 'none' }}></div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{server?.name || "CTFG Server #1 Offline"}</h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
                {server ? `${server.slots?.used || 0} / ${server.slots?.capacity || 0} Players Online` : "Connection to game server lost."}
              </p>
              {server && <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#22c55e', fontWeight: 'bold' }}>MAP: {server.mapName}</p>}
            </div>
            <Tractor size={32} color={server ? "#22c55e" : "#334155"} />
          </div>
        </div>
      </div>
    </div>
  );
}
