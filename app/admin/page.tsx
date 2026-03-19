"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Users, ArrowLeft, Check, X, Banknote } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function AdminPanel() {
  const [players, setPlayers] = useState<any[]>([]);
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // Fetch All Players
    const { data: pData } = await supabase.from('profiles').select('*').order('balance', { ascending: false });
    setPlayers(pData || []);

    // Fetch Pending Jobs (Jobs submitted by players but not paid yet)
    const { data: jData } = await supabase
      .from('contracts')
      .select('*, profiles(username)')
      .eq('status', 'pending');
    setPendingJobs(jData || []);
    
    setLoading(false);
  };

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      const { data: profile } = await supabase.from('profiles').select('rank').eq('id', user.id).single();
      if (profile?.rank !== 'Admin') {
        alert("ACCESS DENIED");
        window.location.href = '/dashboard';
      } else {
        fetchData();
      }
    }
    checkAdmin();
  }, []);

  const adjustMoney = async (id: string, currentBalance: number, amount: number, reason: string) => {
    await supabase.from('profiles').update({ balance: currentBalance + amount }).eq('id', id);
    await supabase.from('transactions').insert([{
        user_id: id,
        amount: Math.abs(amount),
        type: amount > 0 ? 'income' : 'expense',
        description: reason
    }]);
    fetchData();
  };

  const approveJob = async (job: any) => {
    // 1. Pay the player
    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', job.assigned_to).single();
    await adjustMoney(job.assigned_to, profile.balance, job.payout, `Job Payout: ${job.title}`);
    
    // 2. Mark job as completed
    await supabase.from('contracts').update({ status: 'completed' }).eq('id', job.id);
    alert("Payment Sent!");
    fetchData();
  };

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Staff Portal...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <ShieldCheck color="#f97316" size={32} /> CTFG STAFF PORTAL
            </h1>
          </div>
          <button onClick={() => window.location.href = '/dashboard'} style={{ backgroundColor: '#1e293b', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} /> Dashboard
          </button>
        </div>

        {/* SECTION 1: PENDING JOB PAYOUTS */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '10px' }}><Banknote size={20}/> Payouts Awaiting Approval</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
            {pendingJobs.length === 0 && <p style={{color: '#475569'}}>No farmers are currently waiting for payment.</p>}
            {pendingJobs.map(job => (
              <div key={job.id} style={{ backgroundColor: '#131926', padding: '20px', borderRadius: '20px', border: '1px solid #22c55e44', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{job.title}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Worker: <b>{job.profiles?.username}</b> • Payout: <span style={{color:'#22c55e'}}>${job.payout.toLocaleString()}</span></p>
                </div>
                <button onClick={() => approveJob(job)} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Approve & Pay</button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: PLAYER MANAGEMENT */}
        <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#94a3b8' }}>Player List</h2>
        <div style={{ backgroundColor: '#131926', borderRadius: '24px', border: '1px solid #1e293b', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#1a2233', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
              <tr>
                <th style={{ padding: '20px' }}>Farmer</th>
                <th style={{ padding: '20px' }}>Bank Balance</th>
                <th style={{ padding: '20px', textAlign: 'right' }}>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '20px', fontWeight: 'bold' }}>{p.username} <span style={{fontSize:'10px', color:'#475569'}}>({p.rank})</span></td>
                  <td style={{ padding: '20px', fontFamily: 'monospace', color: '#22c55e', fontWeight: 'bold' }}>${p.balance.toLocaleString()}</td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <button onClick={() => adjustMoney(p.id, p.balance, 10000, "Admin Bonus")} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px', fontSize: '11px', fontWeight: 'bold' }}>+10K</button>
                    <button onClick={() => adjustMoney(p.id, p.balance, -5000, "Admin Fine")} style={{ backgroundColor: '#ef4444', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>-5K</button>
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
