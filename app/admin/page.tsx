"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]);
  const [js, setJs] = useState<any[]>([]);
  const [t, setT] = useState("");
  const [p, setP] = useState("");

  const ref = async () => {
    const { data: pr } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: job } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPs(pr || []); setJs(job || []);
  };

  useEffect(() => { ref(); }, []);

  const post = async () => {
    await sb.from('contracts').insert([{ title: t, payout: parseInt(p), status: 'available' }]);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `📢 **NEW JOB:** ${t} ($${p})` }) }).catch(()=>0);
    setT(""); setP(""); alert("Posted!"); ref();
  };

  const pay = async (j: any) => {
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAID:** $${j.payout} to ${j.profiles.username}` }) }).catch(()=>0);
    alert("Paid!"); ref();
  };

  return (
    <div style={{ background:'#000', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <h2>CTFG Staff Office</h2>
      <button onClick={()=>window.location.href='/dashboard'}>Back</button>
      <div style={{ margin:'20px 0', padding:'10px', border:'1px solid #333' }}>
        <input placeholder="Title" value={t} onChange={e=>setT(e.target.value)} />
        <input placeholder="Payout" type="number" value={p} onChange={e=>setP(e.target.value)} />
        <button onClick={post}>Post Job</button>
      </div>
      <h3>Pending</h3>
      {js.map(j => (
        <div key={j.id} style={{ border:'1px solid #333', padding:'10px', marginBottom:'5px' }}>
          {j.profiles.username}: {j.title} <button onClick={()=>pay(j)}>Pay ${j.payout}</button>
        </div>
      ))}
      <h3>Farmers</h3>
      {ps.map(f => <div key={f.id}>{f.username}: ${f.balance}</div>)}
    </div>
  );
}
