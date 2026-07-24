"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Shield, Radio, DollarSign, User, FileText, MapPin, AlertTriangle, Send, Fuel, Users, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
        if (data) setUserProfile(data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield color="#4a7ab5" /> Command Dashboard
          </h1>
          <p style={{ fontSize: '12px', color: '#4a7ab5', margin: '5px 0 0' }}>SATELLITE UPLINK: MONTANA / IDAHO DIVISION | SYSTEM INTEGRITY: ACTIVE</p>
        </div>
        <button 
          onClick={async () => { await sb.auth.signOut(); window.location.href = '/'; }}
          style={{ background: '#222', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <LogOut size={16} /> Disconnect
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Establishing Secure Link...</div>
      ) : (
        <>
          <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px', marginBottom: '30px', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', fontSize: '14px', fontWeight: 'bold' }}>
              <Radio size={18} /> LIVE DISPATCH BROADCAST
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#ddd' }}>&ldquo;Standby&rdquo; — Sector 4-G Plowing Ops Protected.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px' }}>
              <div style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Operative Profile</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} color="#4a7ab5" /> {userProfile?.username || 'Samuel_Founder'}
              </div>
              <div style={{ fontSize: '13px', color: '#aaa', marginTop: '5px' }}>Rank: <strong style={{ color: '#fff' }}>{userProfile?.rank || 'Executive'}</strong></div>
              <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '8px' }}>EID Status: Verified</div>
            </div>

            <div style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px' }}>
              <div style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Treasury Reserves</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarSign size={24} /> {userProfile?.funds ? userProfile.funds.toLocaleString() : '9,459,000'}
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px' }}>Daisy Hill Farming Network Fund</div>
            </div>
          </div>

          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Operational Navigation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
            <button onClick={() => window.location.href = '/dispatch'} style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #4a7ab5', padding: '15px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
              <Send size={18} color="#4a7ab5" /> Request Dispatch
            </button>
            <button onClick={() => window.location.href = '/contracts'} style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #4a7ab5', padding: '15px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
              <FileText size={18} color="#f59e0b" /> View Contracts
            </button>
            <button onClick={() => window.location.href = '/land'} style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #4a7ab5', padding: '15px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
              <MapPin size={18} color="#22c55e" /> Land Registry
            </button>
            <button onClick={() => window.location.href = '/alert'} style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #ef4444', padding: '15px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
              <AlertTriangle size={18} color="#ef4444" /> Emergency Alerts
            </button>
          </div>
        </>
      )}

      <div style={{ marginTop: '50px', borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center', fontSize: '11px', color: '#666' }}>
        DAISY HILL FARMING NETWORK | SECURE TERMINAL V2.0.26
      </div>
    </div>
  );
}
