"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Users, ArrowLeft, Check, Plus, Banknote } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function AdminPanel() {
  const [players, setPlayers] = useState<any[]>([]);
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [newJob, setNewJob] = useState({ title: '', payout: '' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: pData } = await supabase.from('profiles').select('*').order('balance', { ascending: false });
    setPlayers(pData || []);
    const { data: jData } = await supabase.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPendingJobs(jData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const createJob = async (e: any) => {
    e.preventDefault();
    await supabase.from('contracts').insert([{ title: newJob.title, payout: parseInt(newJob.payout), status: 'available' }]);
    setNewJob({ title: '', payout: '' });
    alert("New Job Posted to the Board!");
    fetchData();
  };

  const approveJob = async (job: any) => {
    const { data: p } = await supabase.from('profiles').select('balance').eq('id', job.assigned_to).single();
    await supabase.from('profiles').update({ balance: p.balance + job.payout }).eq('id', job.assigned_to);
    await supabase.from('transactions').insert([{ user_id: job.assigned_to, amount: job.payout, type: 'income', description: `Job Payout: ${job.title}` }]);
    await supabase.from('contracts').update({ status: 'completed' }).eq('id', job.id);
    alert("Payment Sent!");
    fetchData();
  };

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Loading Staff Portal...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>CTFG Staff Office</h1>
          <button onClick={() => window.location.href = '/dashboard'} style={{ background: '#1e293b', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}>Back</button>
        </div>

        {/* 1. CREATE A JOB */}
        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', margin: '0 0 15px 0', color: '#22c55e' }}><Plus size={18}/> Post a New Contract</h2>
          <form onSubmit={createJob} style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Job Title" required style={{ flex: 2, padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
            <input type="number" placeholder="Payout $" required style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} value={newJob.payout} onChange={e => setNewJob({...newJob, payout: e.target.value})} />
            <button type="submit" style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Post Job</button>
          </form>
        </div>

        {/* 2. PENDING PAYOUTS */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}><Banknote size={18}/> Pending Payouts</h2>
          {pendingJobs.length === 0 && <p style={{color:'#475569'}}>No one is waiting for pay.</p>}
          {pendingJobs.map(job => (
            <div key={job.id} style={{ backgroundColor: '#131926', padding: '20px', borderRadius: '20px', border: '1px solid #22c55e44', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span><b>{job.profiles?.username}</b> finished <i>{job.title}</i></span>
              <button onClick={() => approveJob(job)} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '10px', fontWeight: 'bold' }}>Pay ${job.payout.toLocaleString()}</button>
            </div>
          ))}
        </div>

        {/* 3. PLAYER LIST */}
        <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>Farmer Registry</h2>
        <div style={{ backgroundColor: '#131926', borderRadius: '20px', border: '1px solid #1e293b', overflow: 'hidden' }}>
          {players.map(p => (
            <div key={p.id} style={{ padding: '15px 20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
              <span>{p.username} ({p.rank})</span>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${p.balance.toLocaleString()}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
