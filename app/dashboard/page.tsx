"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, Wallet, ShieldCheck, LogOut } from 'lucide-react';

// CONNECT TO YOUR DATABASE
const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'sb_publishable_JtnzF6YKCXc5u2XC_LE_Iw_fCU4rK8h' 
);

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/'; 
        return;
      }

      // Get the farmer's balance and rank from the database
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(data);
      setLoading(false);
    }
    getProfile();
  }, []);

  if (loading) return (
    <div style={{backgroundColor:'#0f172a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>
      Loading Farm Data...
    </div>
  );

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', backgroundColor: '#131926', padding: '20px', borderRadius: '20px', border: '1px solid #1e293b' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0 }}>Welcome, <span style={{ color: '#22c55e' }}>{profile?.username || 'Farmer'}</span></h1>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Rank: {profile?.rank || 'New Farmer'}</p>
          </div>
          <button 
            onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} 
            style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout
          </button>
        </div>

        {/* BANK CARD */}
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '60px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid #22c55e44' }}>
          <Wallet size={40} style={{ marginBottom: '10px', opacity: 0.7 }} />
          <p style={{ opacity: 0.8, fontSize: '14px', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>TOTAL BANK BALANCE</p>
          <h2 style={{ fontSize: '72px', margin: 0, fontFamily: 'monospace', fontWeight: 'bold' }}>
            ${profile?.balance?.toLocaleString() || '0'}
          </h2>
        </div>

        {/* SERVER STATUS */}
        <div style={{ marginTop: '30px', backgroundColor: '#131926', padding: '20px', borderRadius: '20px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>CTFG Server #1: <span style={{ color: '#22c55e' }}>ONLINE</span></p>
        </div>

      </div>
    </div>
  );
}
