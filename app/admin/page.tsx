"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, ArrowLeft, Plus, Banknote } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

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

  useEffect(() => { 
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: p } = await supabase.from('profiles').select('rank').eq('id', user?.id).single();
      if (p?.rank !== 'Admin') window.location.href = '/dashboard';
      else fetchData();
    }
    checkAdmin();
  }, []);

  const createJob = async (e: any) => {
    e.preventDefault();
    const payoutNum = parseInt(newJob.payout);
    
    // 1. Save to Database
    await supabase.from('contracts').insert([{ title: newJob.title, payout: payoutNum, status: 'available' }]);
    
    // 2. Try to alert Discord (but don't crash if it fails)
    try {
        await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content: `📢 **NEW CONTRACT: ${newJob.title}** ($${payoutNum.toLocaleString()})` })
        });
    } catch (err) { console.log("Discord failed but DB updated"); }

    setNewJob({ title: '', payout: '' });
    alert("Job Posted Successfully!");
    fetchData();
  };

  const approveJob = async (job: any) => {
    const { data: p } = await supabase.from('profiles').select('balance').eq('id', job.assigned_to).single();
    await supabase.from('profiles').update({ balance: p.balance + job.payout }).eq('id', job.assigned_to);
    await supabase.from('transactions').insert([{ user_id: job.assigned_to, amount: job.payout, type: 'income', description: `Job: ${job.title}` }]);
    await supabase.from('contracts').update({ status: 'completed' }).eq('id', job.id);
    
    try {
        await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ content: `✅ **PAYROLL:** Paid $${job.payout.toLocaleString()} to ${job.profiles?.username}` })
        });
    } catch (err) { }

    alert("Payment Sent!");
    fetchData();
  };

  if (loading) return <div style={{padding:'50px', color:'white'}}>Loading...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{fontSize:'24px'}}>Staff Office</h1>
        <button onClick={() => window.location.href='/dashboard'} style={{marginBottom:'20px', background:'#1e293b', border:'none', color:'white', padding:'8px 15px', borderRadius:'10px'}}>Back</button>

        <div style={{ backgroundColor: '#131926', padding: '20px', borderRadius: '20px', marginBottom: '20px' }}>
          <h2 style={{fontSize:'16px', margin:'0 0 10px 0'}}>Post Job</h2>
          <form onSubmit={createJob} style={{display:'flex', gap:'10px'}}>
            <input type="text" placeholder="Title" required style={{flex:2, padding:'10px', borderRadius:'8px', background:'#0b0f1a', color:'white', border:'1px solid #334155'}} value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
            <input type="number" placeholder="$" required style={{flex:1, padding:'10px', borderRadius:'8px', background:'#0b0f1a', color:'white', border:'1px solid #334155'}} value={newJob.payout} onChange={e => setNewJob({...newJob, payout: e.target.value})} />
            <button type="submit" style={{background:'#22c55e', color:'white', border:'none', padding:'10px 15px', borderRadius:'10px', fontWeight:'bold'}}>Post</button>
