"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Plus, Banknote, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]);
  const [js, setJs] = useState<any[]>([]);
  const [t, setT] = useState("");
  const [p, setP] = useState("");
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: pData } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: jData } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPs(pData || []); setJs(jData || []); setLd(false);
  };

  useEffect(() => {
    const c = async () => {
      const { data: { user } } = await sb.auth.getUser();
      const { data: prof } = await sb.from('profiles').select('rank').eq('id', user?.id).single();
      if (prof?.rank !== 'Admin') window.location.href = '/dashboard';
      else ref();
    };
    c();
  }, []);

  const post = async () => {
    await sb.from('contracts').insert([{ title: t, payout: parseInt(p), status: 'available' }]);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `📢 **NEW CONTRACT:** ${t} ($${p})\nClaim it: https://ctfg-portal.vercel.app/contracts` }) }).catch(()=>0);
    setT(""); setP(""); alert("Job Posted!"); ref();
  };

  const pay = async (j: any) => {
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAID:** Samuel approved $${j.payout} for ${j.profiles.username}!` }) }).catch(()=>0);
    alert("Paid!"); ref();
  };

  if (ld) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',padding:'20px'}}>Verifying...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px' }}>
          <h2 style={{margin:0}}>Staff Office</h2>
          <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b', color:'#fff', border:'none', padding:'8px 15px', borderRadius:'8px', cursor:'pointer'}}>Back</button>
        </div>

        <div style={{ background:'#131926', padding:'20px', borderRadius:'20px', marginBottom:'20px', border:'1px solid #1e293b' }}>
          <p style={{margin:'0 0 10px 0', fontSize:'14px', color:'#22c55e'}}>Post New Contract</p>
          <div style={{ display:'flex', gap:'10px' }}>
            <input placeholder="Title" value={t} onChange={e=>setT(e.target.value)} style={{flex:2, padding:'10px', borderRadius:'8px', background:'#0b0f1a', color:'#fff', border:'1px solid #334155'}} />
            <input placeholder="$" type="number" value={p} onChange={e=>setP(e.target.value)} style={{flex:1, padding:'10px', borderRadius:'8px', background:'#0b0f1a', color:'#fff', border:'1px solid #334155'}} />
            <button onClick={post} style={{background:'#22c55e', color:'#fff', border:'none', padding:'10px 15px', borderRadius:'10px', fontWeight:'bold', cursor:'pointer'}}>Post</button>
          </div>
        </div>

        <h3>Pending Payouts</h3>
        {js.map(j => (
          <div key={j.id} style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #22c55e44', display:'flex', justifyContent:'space-between', marginBottom:'10px', alignItems:'center' }}>
            <span style={{fontSize:'13px'}}><b>{j.profiles.username}</b>: {j.title}</span>
            <button onClick={()=>pay(j)} style={{background:'#22c55e', border:'none', color:'#fff', padding:'8px 12px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>Pay ${j.payout}</button>
          </div>
        ))}

        <h3 style={{marginTop:'30px'}}>Fleet Registry</h3>
        <div style={{ background:'#131926', borderRadius:'15px', border:'1px solid #1e293b', overflow:'hidden' }}>
          {ps.map(f => (
            <div key={f.id} style={{ padding:'12px 20px', borderBottom:'1px solid #1e293b', display:'flex', justifyContent:'space-between', fontSize:'13px' }}>
              <span>{f.username} ({f.rank})</span>
              <span style={{color:'#22c55e', fontWeight:'bold'}}>${f.balance.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
