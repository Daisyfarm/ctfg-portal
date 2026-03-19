"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/'; return; }
    
    // Fetch directly from the profiles table
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) setProfile(data);
    setLoading(false);
  };

  useEffect(() => { getProfile(); }, []);

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
           <button onClick={getProfile} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
             <RefreshCcw size={20} /> Refresh Balance
           </button>
           <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>Logout</button>
<button 
  onClick={() => window.location.href = '/bank'} 
  style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}
>
  Send Money  <button 
  onClick={() => window.location.href = '/land'} 
  style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
>
  Buy Land
</button>
</button>        </div>

        <h1 style={{ fontSize: '24px' }}>Welcome, <span style={{ color: '#22c55e' }}>{profile?.username || "ID NOT FOUND"}</span></h1>
        
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '50px', borderRadius: '30px', margin: '20px 0', boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}>
          <Wallet size={32} style={{ marginBottom: '10px' }} />
          <h2 style={{ fontSize: '64px', margin: 0 }}>${profile?.balance?.toLocaleString() || '0'}</h2>
        </div>

        <p style={{ fontSize: '10px', color: '#475569' }}>Project Connected: dlwhztcqntalrhfrefsk</p>
      </div>
    </div>
  );
}
