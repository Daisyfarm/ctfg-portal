"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Radio, Megaphone, TrendingUp, ArrowLeft, Users, Banknote, Clock, Cloud, LogOut, Briefcase, Landmark, Tractor, Map } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]); const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]); const [u, setU] = useState<any>(null);
  const [f, setF] = useState({ jt:'', jp:'', nt:'', radio:'' });
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    setPs(p || []); setJs(j || []); setMkt(m || []); setLd(false);
  };

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await sb.auth.getUser();
      const { data: r } = await sb.from('profiles').select('*').eq('id', user?.id).single();
      if (r?.rank !== 'Admin') window.location.href = '/dashboard';
      else { setU(r); ref(); }
    };
    check();
  }, []);

  const sendDispatch = async () => {
    await sb.from('dispatch').insert([{ message: f.radio, sender: u.username }]);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🎙️ **RADIO DISPATCH**\n**${u.username}:** ${f.radio}` })});
    setF({...f, radio:''}); alert("Dispatch Broadcasted!");
  };

  const doNews = async () => {
    await sb.from('news').insert([{ message: f.nt }]);
    alert("News Updated!");
  };

  const doPay = async (j: any) => {
    const { data: uAcc } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: uAcc.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAID:** $${j.payout} to ${j.profiles.username}` })});
    ref();
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Command Terminal...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', borderBottom:'2px solid #dc2626' }}>
        <span style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic'}}>CTFG STAFF</span>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#333', color:'#fff', border:'none', padding:'5px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer'}}>EXIT TO DASHBOARD</button>
      </div>

      <div style={{ padding:'40px', maxWidth:'1000px', margin:'0 auto', width:'100%' }}>
        
        {/* DISPATCH CONTROL */}
        <div style={{ background:'#1a1a1a', padding:'25px', borderRadius:'4px', borderTop:'4px solid #dc2626', marginBottom:'30px' }}>
          <h3 style={{margin:'0 0 15px 0', fontSize:'16px', color:'#dc2626', display:'flex', alignItems:'center', gap:'10px'}}><Radio size={20}/> Radio Dispatch Handset</h3>
          <div style={{ display:'flex', gap:'10px' }}>
            <input value={f.radio} onChange={e=>setF({...f, radio:e.target.value})} placeholder="Type command to all active operators..." style={{flex:1, padding:'12px', background:'#000', border:'1px solid #333', color:'#fff', borderRadius:'4px'}} />
            <button onClick={sendDispatch} style={{background:'#dc2626', color:'#fff', border:'none', padding:'0 30px', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}>BROADCAST</button>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
          <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #22c55e' }}>
            <p style={{margin:'0 0 10px 0', color:'#22c55e', fontSize:'11px', fontWeight:'bold'}}>DASHBOARD NEWS</p>
            <input value={f.nt} onChange={e=>setF({...f, nt:e.target.value})} placeholder="General news..." style={{width:'100%', padding:'10px', background:'#111', border:'1px solid #333', color:'#fff', marginBottom:'10px'}} />
            <button onClick={doNews} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold'}}>UPDATE</button>
          </div>

          <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #f59e0b' }}>
            <p style={{margin:'0 0 10px 0', color:'#f59e0b', fontSize:'11px', fontWeight:'bold'}}>PAYROLL</p>
            {js.map(j => (
                <div key={j.id} style={{display:'flex', justifyContent:'space-between', background:'#111', padding:'10px', marginBottom:'5px'}}>
                    <span style={{fontSize:'12px'}}>{j.profiles.username}</span>
                    <button onClick={()=>doPay(j)} style={{background:'#22c55e', border:'none', color:'#fff', padding:'2px 10px', fontSize:'10px', fontWeight:'bold'}}>PAY ${j.payout}</button>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
