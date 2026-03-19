"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, ArrowLeft, Plus, Banknote } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HOOK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [players, setPlayers] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [job, setJob] = useState({ t: '', p: '' });
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const { data: p } = await supabase.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await supabase.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPlayers(p || []);
    setPending(j || []);
    setLoading(false);
  };

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: prof } = await supabase.from('profiles').select('rank').eq('id', user?.id).single();
      if (prof?.rank !== 'Admin') window.location.href = '/dashboard';
      else refresh();
    };
    check();
  }, []);

  const postJob = async (e: any) => {
    e.preventDefault();
    await supabase.from('contracts').insert([{ title: job.t, payout: parseInt(job.p), status: 'available' }]);
    try { await fetch(HOOK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `📢 **NEW JOB:** ${job.t} ($${job.p})` }) }); } catch (e) {}
    setJob({ t: '', p: '' });
    alert("Posted!");
    refresh();
  };

  const pay = async (j: any) => {
    const { data: u } = await supabase.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await supabase.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await supabase.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await supabase.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    try { await fetch(HOOK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAID:** $${j.payout} to ${j.profiles?.username}` }) }); } catch (e) {}
    alert("Paid!");
    refresh();
  };

  if (loading) return <div style={{color:'white', padding:'50px'}}>Loading Staff Portal...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{fontSize:'22px'}}>CTFG Staff Office</h1>
        <button onClick={() => window.location.href='/dashboard'} style={{background:'#1e293b', border:'none', color:'white', padding:'8px 15px', borderRadius:'8px', marginBottom:'20px'}}>Back</button>

        <div style={{ background:'#131926', padding:'20px', borderRadius:'20px', marginBottom:'20px', border:'1px solid #1e293b' }}>
          <p style={{margin:'0 0 10px 0', fontSize:'14px', color:'#22c55e'}}>Post Job</p>
          <form onSubmit={postJob} style={{display:'flex', gap:'10px'}}>
            <input type="text" placeholder="Title" required style={{flex:2, padding:'10px', borderRadius:'8px', background:'#0b0f1a', color:'white', border:'1px solid #334155'}} value={job.t} onChange={e => setJob({...job, t: e.target.value})} />
            <input type="number" placeholder="$" required style={{flex:1, padding:'10px', borderRadius:'8px', background:'#0b0f1a', color:'white', border:'1px solid #334155'}} value={job.
