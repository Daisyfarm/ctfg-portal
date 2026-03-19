"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
      setLoading(false);
    }
    getProfile();
  }, []);

  if (loading) return <div style={{backgroundColor:'#0f172a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading CTFG Farm Data...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', backgroundColor: '#131926', padding: '20px', borderRadius: '20px' }}>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Welcome, <span style={{ color: '#22c55e' }}>{profile?.username}</span></h1>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer' }}>Logout</button>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '60px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <Wallet size={40} style={{ marginBottom: '10px', opacity: 0.7 }} />
          <p style={{ opacity: 0.8, fontSize: '14px', fontWeight: 'bold', margin: 0 }}>TOTAL BANK BALANCE</p>
          <h2 style={{ fontSize: '72px', margin: 0, fontFamily: 'monospace' }}>${profile?.balance?.toLocaleString() || '0'}</h2>
        </div>
      </div>
    </div>
  );
}
