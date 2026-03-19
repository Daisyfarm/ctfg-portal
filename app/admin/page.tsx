"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]);
  const [js, setJs] = useState<any[]>([]);
  const [f, setF] = useState({ t: '', p: '' });
  const [s, setS] = useState("");

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPs(p || []); setJs(j || []);
  };

  useEffect(() => {
    const c = async () => {
      const { data: { user } } = await sb.auth.getUser();
      const { data: r } = await sb.from('profiles').select('rank').eq('id', user?.id).single();
      if (r?.rank !== 'Admin') window.location.href = '/dashboard';
      else ref();
    };
    c();
  }, []);

  const post = async (e: any) => {
    e.preventDefault();
    setS("Posting...");
    await sb.from('contracts').insert([{ title: f.t, payout: parseInt(f.p), status: 'available' }]);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `📢 **NEW JOB:** ${f.t} ($${f.p})` }) }).catch(()=>0);
    setF({ t: '', p: '' }); setS("✅ Posted!"); ref();
  };

  const pay = async (j: any) => {
    setS("Paying...");
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAID:** $${j.payout} to ${j.profiles?.username}` }) }).catch(()=>0);
    setS("✅ Paid!"); ref();
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
          <h2 style={{margin:0}}>Staff Office</h2>
          <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b',color:'#fff',border:'none',padding:'5px 15px',borderRadius:'5px',cursor:'pointer'}}>Back</button>
        </div>
        {s && <div style={{ background:'#22c55e22', color:'#22c55e', padding:'10px', borderRadius:'10px', marginBottom:'15px', textAlign:'center', border:'1px solid #22c55e' }}>{s}</div>}
        <div style={{ background:'#131926', padding:'
