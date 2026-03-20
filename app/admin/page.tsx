"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Plus, Banknote, ArrowLeft, TrendingUp, Megaphone } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]);
  const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]);
  const [n, setN] = useState(""); // News input
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    setPs(p || []); setJs(j || []); setMkt(m || []); setLd(false);
  };
  useEffect(() => { ref(); }, []);

  const upNews = async () => {
    await sb.from('news').insert([{ message: n }]);
    setN(""); alert("News Posted!"); ref();
  };

  const upPrice = async (id: string, newPrice: string) => {
    await sb.from('market_prices').update({ base_price: parseInt(newPrice) }).eq('id', id);
    ref();
  };

  const pay = async (j: any) => {
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    alert("Paid!"); ref();
  };

  if (ld) return <div style={{color:'white',padding:'20px'}}>Loading Staff Portal...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <h2 style={{margin:0}}>Staff Office</h2>
          <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b', color:'#fff', border:'none', padding:'8px 15px', borderRadius:'8px', cursor:'pointer'}}>Back</button>
        </div>

        {/* NEWS BOX */}
        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #22c55e', marginBottom:'20px' }}>
          <p style={{margin:'0 0 10px 0', fontSize:'12px', color:'#22c55e'}}><Megaphone size={14}/> UPDATE COMMUNITY NEWS</p>
          <input value={n} onChange={e=>setN(e.target.value)} placeholder="Type news here..." style={{width:'100%', padding:'10px', background:'#0b0f1a', color:'#fff', border:'1px solid #333', borderRadius:'8px', marginBottom:'10px'}} />
          <button onClick={upNews} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>Post News</button>
        </div>

        {/* MARKET MANAGER */}
        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #3b82f6', marginBottom:'20px' }}>
          <p style={{margin:'0 0 10px 0', fontSize:'12px', color:'#3b82f6'}}><TrendingUp size={14}/> MANAGE CROP PRICES</p>
          {mkt.map(m => (
            <div key={m.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px', fontSize:'13px'}}>
              <span>{m.crop_name}</span>
              <input type="number" defaultValue={m.base_price} onBlur={(e)=>upPrice(m.id, e.target.value)} style={{width:'80px', background:'#0b0f1a', color:'#22c55e', border:'1px solid #333', textAlign:'center', borderRadius:'5px'}} />
            </div>
          ))}
        </div>

        {/* PENDING PAYOUTS */}
        <h3>Pending Payouts</h3>
        {js.map(j => (
          <div key={j.id} style={{ background:'#131926', padding:'15px', borderRadius:'15px', marginBottom:'10px', display:'flex', justifyContent:'space-between', border:'1px solid #22c55e44' }}>
            <span style={{fontSize:'13px'}}>{j.profiles?.username}: {j.title}</span>
            <button onClick={()=>pay(j)} style={{background:'#22c55e', border:'none', color:'#fff', padding:'5px 15px', borderRadius:'5px', fontWeight:'bold'}}>Pay ${j.payout}</button>
          </div>
        ))}

        <h3>Registry</h3>
        {ps.map(f => <div key={f.id} style={{fontSize:'12px', padding:'5px 0', borderBottom:'1px solid #131926'}}>{f.username}: ${f.balance?.toLocaleString()} ({f.rank})</div>)}
      </div>
    </div>
  );
}
