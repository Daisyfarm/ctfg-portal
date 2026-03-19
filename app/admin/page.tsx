"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Users, ArrowLeft, TrendingUp } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function AdminPanel() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('balance', { ascending: false });
    setPlayers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      
      const { data: profile } = await supabase.from('profiles').select('rank').eq('id', user.id).single();
      if (profile?.rank !== 'Admin') {
        alert("ACCESS DENIED: Staff Only");
        window.location.href = '/dashboard';
      } else {
        fetchPlayers();
      }
    }
    checkAdmin();
  }, []);

  const adjustMoney = async (id: string, currentBalance: number, amount: number) => {
    const { error } = await supabase.from('profiles').update({ balance: currentBalance + amount }).eq('id', id);
    if (!error) fetchPlayers();
  };

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Verifying Staff Credentials...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <ShieldCheck color="#f97316" size={32} /> CTFG STAFF PORTAL
            </h1>
            <p style={{ color: '#94a3b8', margin: '5px 0 0 0' }}>Manage community members and virtual economy</p>
          </div>
          <button onClick={() => window.location.href = '/dashboard'} style={{ backgroundColor: '#1e293b', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>

        <div style={{ backgroundColor: '#131926', borderRadius: '24px', border: '1px solid #1e293b', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#1a2233', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
              <tr>
                <th style={{ padding: '20px' }}>Farmer Username</th>
                <th style={{ padding: '20px' }}>Rank</th>
                <th style={{ padding: '20px' }}>Bank Balance</th>
                <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '20px', fontWeight: 'bold' }}>{p.username}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ backgroundColor: '#22c55e33', color: '#22c55e', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>{p.rank}</span>
                  </td>
                  <td style={{ padding: '20px', fontFamily: 'monospace', color: '#22c55e', fontWeight: 'bold' }}>${p.balance.toLocaleString()}</td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <button onClick={() => adjustMoney(p.id, p.balance, 10000)} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px', fontWeight: 'bold' }}>+10K</button>
                    <button onClick={() => adjustMoney(p.id, p.balance, -5000)} style={{ backgroundColor: '#ef4444', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>-5K</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
