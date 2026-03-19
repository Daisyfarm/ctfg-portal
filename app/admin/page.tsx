"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Plus, Banknote, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [nw, setNw] = useState({ t: '', p: '' });
  const [ld, setLd] = useState(true);

  const refresh = async () => {
    const { data: pData } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: jData } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPs(pData || []); setJobs(jData || []); setLd(false);
  };
  useEffect(() => { refresh(); }, []);

  const postJob = async (e: any) => {
    e.preventDefault();
    await sb.from('contracts').insert([{ title: nw.t, payout: parseInt(nw.p), status: 'available' }]);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `📢 **NEW JOB:** ${nw.t} ($${nw.p})` }) });
    setNw({ t: '', p: '' }); refresh();
  };

  const pay = async (j: any) => {
    const { data: p } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: p.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAID:** $${j.payout} to ${j.profiles.username}` }) });
    refresh();
  };

  if (ld) return <div style={{color:'white',padding:'20px'}}>Loading...</div>;

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'20px' }}>
      <div style={{ maxWidth:'600px',margin:'0 auto' }}>
        <h2>Staff Office</h2>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b',color:'white',border:'none',padding:'8px 15px',borderRadius:'8px',marginBottom:'20px'}}>Back</button>
        <div style={{ background:'#131926',padding:'20px',borderRadius:'20px',marginBottom:'20px',border:'1px solid #1e293b' }}>
          <form onSubmit={postJob} style={{display:'flex',gap:'10px'}}>
            <input placeholder="Title" required style={{flex:2,padding:'10px',borderRadius:'8px',background:'#0b0f1a',color:'white',border:'1px solid #334155'}} value={nw.t} onChange={e=>setNw({...nw,t:e.target.value})} />
            <input placeholder="$" type="number" required style={{flex:1,padding:'10px',borderRadius:'8px',background:'#0b0f1a',color:'white',border:'1px solid #334155'}} value={nw.p} onChange={e=>setNw({...nw,p:e.target.value})} />
            <button type="submit" style={{background:'#22c55e',color:'white',border:'none',padding:'10px 15px',borderRadius:'10px'}}>Post</button>
          </form>
        </div>
        <h3>Pending Payouts</h3>
        {jobs.map(j => (
          <div key={j.id} style={{ background:'#131926',padding:'15px',borderRadius:'15px',marginBottom:'10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span>{j.profiles.username}: {j.title}</span>
            <button onClick={()=>pay(j)} style={{background:'#22c55e',border:'none',color:'white',padding:'8px 12px',borderRadius:'8px'}}>Pay</button>
          </div>
        ))}
      </div>
    </div>
  );
}
