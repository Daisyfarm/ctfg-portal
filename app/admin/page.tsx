"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Radio, Megaphone, TrendingUp, Users, Banknote, Clock, Check, X, Truck, Tractor, Briefcase, Landmark, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]); const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]); const [syncs, setSyncs] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]); const [u, setU] = useState<any>(null);
  const [f, setF] = useState({ nt:'', radio:'' }); const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    const { data: s } = await sb.from('bank_sync').select('*, profiles(username)').eq('status', 'PENDING');
    const { data: a } = await sb.from('applications').select('*').eq('status', 'pending');
    setPs(p || []); setJs(j || []); setMkt(m || []); setSyncs(s || []); setApps(a || []); setLd(false);
  };

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('*').eq('id', user?.id).single().then(({data}) => {
        if (data?.rank !== 'Admin') window.location.href = '/dashboard';
        else { setU(data); ref(); }
      });
    });
  }, []);

  const doDispatch = async () => {
    await sb.from('dispatch').insert([{ message: f.radio, sender: u.username }]);
    await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ content: `🎙️ **RADIO DISPATCH**\n**${u.username}:** ${f.radio}` })});
    setF({...f, radio:''}); ref();
  };

  const doNews = async () => {
    await sb.from('news').insert([{ message: f.nt }]);
    setF({...f, nt:''}); alert("News Broadcasted!");
  };

  const doPrice = async (id: string, val: string) => {
    await sb.from('market_prices').update({ base_price: parseInt(val) }).eq('id', id);
    ref();
  };

  const manageApp = async (id: string, uid: string, status: string) => {
    await sb.from('applications').update({ status }).eq('id', id);
    if (status === 'approved') await sb.from('profiles').update({ rank: 'Member' }).eq('id', uid);
    alert(`Application ${status}.`); ref();
  };

  const doPay = async (j: any) => {
    const { data: pData } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: pData.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Payout: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAYROLL:** $${j.payout.toLocaleString()} paid to ${j.profiles.username}` })});
    ref();
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing Command Center...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', borderBottom:'2px solid #dc2626' }}>
        <span style={{color:'#dc2626', fontWeight:'900', fontSize:'20px'}}>CTFG STAFF COMMAND</span>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#333', color:'#fff', border:'none', padding:'5px 15px', fontWeight:'bold', cursor:'pointer'}}>EXIT</button>
      </div>

      <div style={{ padding:'40px', maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'2fr 1fr', gap:'30px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          
          {/* DISPATCH */}
          <div style={{ background:'#1a1a1a', padding:'25px', borderRadius:'4px', borderTop:'4px solid #dc2626' }}>
            <p style={{margin:'0 0 10px 0', color:'#dc2626', fontSize:'11px', fontWeight:'bold'}}>RADIO HANDSET</p>
            <div style={{ display:'flex', gap:'10px' }}>
              <input value={f.radio} onChange={e=>setF({...f, radio:e.target.value})} placeholder="Message all active operators..." style={{flex:1, padding:'12px', background:'#000', border:'1px solid #333', color:'#fff'}} />
              <button onClick={doDispatch} style={{background:'#dc2626', color:'#fff', border:'none', padding:'0 30px', fontWeight:'bold', cursor:'pointer'}}>SEND</button>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            <div style={{ background:'#222', padding:'20px', borderTop:'4px solid #22c55e' }}>
              <p style={{margin:0, color:'#22c55e', fontSize:'11px'}}>NEWS</p>
              <textarea value={f.nt} onChange={e=>setF({...f, nt:e.target.value})} style={{width:'100%', padding:'10px', background:'#111', border:'1px solid #333', color:'#fff', margin:'10px 0'}} />
              <button onClick={doNews} style={{width:'100%', padding:'10px', background:'#22c55e', color:'#000', border:'none', fontWeight:'bold'}}>PUSH</button>
            </div>
            <div style={{ background:'#222', padding:'20px', borderTop:'4px solid #4a7ab5' }}>
              <p style={{margin:0, color:'#4a7ab5', fontSize:'11px'}}>CROP PRICES</p>
              {mkt.map(m => (
                <div key={m.id} style={{display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'11px'}}>
                  <span>{m.crop_name}</span>
                  <input type="number" defaultValue={m.base_price} onBlur={(e)=>doPrice(m.id, e.target.value)} style={{width:'60px', background:'#111', color:'#22c55e', border:'none', textAlign:'right'}} />
                </div>
              ))}
            </div>
          </div>

          {/* APPLICATION REVIEW */}
          <div style={{ background:'#222', padding:'20px', borderTop:'4px solid #3b82f6' }}>
            <h3 style={{margin:0, fontSize:'14px', color:'#3b82f6'}}>Pending Membership Applications</h3>
            {apps.length === 0 ? <p style={{fontSize:'12px', color:'#555', marginTop:'10px'}}>No new applications.</p> : apps.map(a => (
              <div key={a.id} style={{ background:'#111', padding:'15px', marginTop:'10px', borderRadius:'4px' }}>
                <p style={{margin:0, fontSize:'14px'}}><b>Age:</b> {a.age} | <b>Exp:</b> {a.experience}</p>
                <p style={{fontSize:'12px', color:'#aaa', margin:'5px 0'}}>"{a.about_me}"</p>
                <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                  <button onClick={()=>manageApp(a.id, a.user_id, 'approved')} style={{background:'#22c55e', border:'none', padding:'5px 15px', color:'#000', fontWeight:'bold'}}>APPROVE</button>
                  <button onClick={()=>manageApp(a.id, a.user_id, 'denied')} style={{background:'#ef4444', border:'none', padding:'5px 15px', color:'#fff', fontWeight:'bold'}}>DENY</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: PAYROLL & REGISTRY */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ background:'#1a1a1a', padding:'20px', borderTop:'4px solid #f59e0b' }}>
            <p style={{margin:0, color:'#f59e0b', fontSize:'11px'}}>PENDING PAYROLL</p>
            {js.map(j => (
                <div key={j.id} style={{display:'flex', justifyContent:'space-between', background:'#111', padding:'10px', marginTop:'5px'}}>
                    <span style={{fontSize:'11px'}}>{j.profiles.username}</span>
                    <button onClick={()=>doPay(j)} style={{background:'#22c55e', border:'none', padding:'2px 8px', fontSize:'10px', fontWeight:'bold'}}>PAY ${j.payout}</button>
                </div>
            ))}
          </div>
          <div style={{ background:'#1a1a1a', padding:'20px' }}>
            <p style={{margin:0, color:'#555', fontSize:'11px'}}>MEMBER REGISTRY</p>
            {ps.map(p => <div key={p.id} style={{fontSize:'11px', display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #222'}}><span>{p.username}</span><span style={{color:'#22c55e'}}>${p.balance?.toLocaleString()}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
