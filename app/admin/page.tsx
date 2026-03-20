"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Plus, Gavel, Megaphone, TrendingUp, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]); const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]); const [aucs, setAucs] = useState<any[]>([]);
  const [f, setF] = useState({ jt:'', jp:'', nt:'', af:'', ap:'' });
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    const { data: a } = await sb.from('auctions').select('*, profiles(username)').eq('is_active', true);
    setPs(p || []); setJs(j || []); setMkt(m || []); setAucs(a || []); setLd(false);
  };

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await sb.auth.getUser();
      const { data: r } = await sb.from('profiles').select('rank').eq('id', user?.id).single();
      if (r?.rank !== 'Admin') window.location.href = '/dashboard';
      else ref();
    };
    check();
  }, []);

  const alertD = (msg: string) => fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: msg }) }).catch(()=>0);

  const doJob = async () => {
    await sb.from('contracts').insert([{ title: f.jt, payout: parseInt(f.jp), status: 'available' }]);
    alertD(`📢 **NEW JOB:** ${f.jt} ($${f.jp})`); setF({...f, jt:'', jp:''}); ref();
  };

  const doNews = async () => {
    await sb.from('news').insert([{ message: f.nt }]);
    alertD(`📰 **NEWS:** ${f.nt}`); setF({...f, nt:''}); alert("News Posted!");
  };

  const doPrice = async (id: string, val: string) => {
    await sb.from('market_prices').update({ base_price: parseInt(val) }).eq('id', id);
    ref();
  };

  const doPay = async (j: any) => {
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Job: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    alertD(`✅ **PAID:** $${j.payout} to ${j.profiles.username}`); ref();
  };

  const doAuc = async () => {
    await sb.from('auctions').insert([{ field_number: parseInt(f.af), highest_bid: parseInt(f.ap), is_active: true }]);
    alertD(`🔨 **AUCTION STARTED:** Field ${f.af} (Starts $${f.ap})`); setF({...f, af:'', ap:''}); ref();
  };

  const endAuc = async (a: any) => {
    if (!a.highest_bidder_id) return alert("No bids yet!");
    await sb.from('land_registry').update({ owner_id: a.highest_bidder_id }).eq('field_number', a.field_number);
    const { data: winner } = await sb.from('profiles').select('balance').eq('id', a.highest_bidder_id).single();
    await sb.from('profiles').update({ balance: winner.balance - a.highest_bid }).eq('id', a.highest_bidder_id);
    await sb.from('auctions').update({ is_active: false }).eq('id', a.id);
    alertD(`🏁 **SOLD!** Field ${a.field_number} sold to **${a.profiles.username}** for $${a.highest_bid.toLocaleString()}!`);
    ref();
  };

  if (ld) return <div style={{color:'#fff',background:'#0b0f1a',height:'100vh',padding:'20px'}}>Syncing...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'15px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b', color:'#fff', padding:'5px 15px', borderRadius:'5px', marginBottom:'15px'}}>Back</button>
        
        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #22c55e', marginBottom:'15px' }}>
          <p style={{margin:0, color:'#22c55e', fontSize:'12px'}}>POST NEWS</p>
          <input value={f.nt} onChange={e=>setF({...f, nt:e.target.value})} placeholder="Announcement..." style={{width:'70%', padding:'8px'}} />
          <button onClick={doNews}>Update</button>
        </div>

        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #3b82f6', marginBottom:'15px' }}>
          <p style={{margin:0, color:'#3b82f6', fontSize:'12px'}}>MARKET PRICES</p>
          {mkt.map(m => (
            <div key={m.id} style={{display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'11px'}}>
              <span>{m.crop_name}</span>
              <input type="number" defaultValue={m.base_price} onBlur={(e)=>doPrice(m.id, e.target.value)} style={{width:'60px', background:'#000', color:'#22c55e'}} />
            </div>
          ))}
        </div>

        <div style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #facc15', marginBottom:'15px' }}>
          <p style={{margin:0, color:'#facc15', fontSize:'12px'}}>START AUCTION</p>
          <input placeholder="Field #" value={f.af} onChange={e=>setF({...f, af:e.target.value})} style={{width:'60px'}} />
          <input placeholder="$ Start" value={f.ap} onChange={e=>setF({...f, ap:e.target.value})} style={{width:'100px'}} />
          <button onClick={doAuc}>Start</button>
        </div>

        <h3>Pending Pay</h3>
        {js.map(j => <div key={j.id} style={{background:'#131926', padding:'10px', marginBottom:'5px', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}>{j.profiles.username}: {j.title} <button onClick={()=>doPay(j)}>Pay ${j.payout}</button></div>)}

        <h3>Active Auctions</h3>
        {aucs.map(a => <div key={a.id} style={{background:'#131926', padding:'10px', marginBottom:'5px', border:'1px solid #facc15', borderRadius:'10px', display:'flex', justifyContent:'space-between'}}>Field {a.field_number}: ${a.highest_bid} <button onClick={()=>endAuc(a)}>Sold!</button></div>)}

        <h3 style={{marginTop:'20px'}}>Farmers</h3>
        {ps.map(f => <div key={f.id} style={{fontSize:'12px'}}>{f.username}: ${f.balance?.toLocaleString()} ({f.rank})</div>)}
      </div>
    </div>
  );
}
