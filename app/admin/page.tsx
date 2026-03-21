"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Plus, Gavel, Megaphone, TrendingUp, ArrowLeft, Users, Banknote, Clock, Cloud, LogOut, Briefcase, Landmark, Tractor, Map } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]); const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]); const [aucs, setAucs] = useState<any[]>([]);
  const [f, setF] = useState({ jt:'', jp:'', nt:'', af:'', ap:'' });
  const [ld, setLd] = useState(true);
  const [w, setW] = useState("");

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    const { data: a } = await sb.from('auctions').select('*, profiles(username)').eq('is_active', true);
    setPs(p || []); setJs(j || []); setMkt(m || []); setAucs(a || []); setLd(false);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
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
    alertD(`📢 **NEW JOB:** ${f.jt} ($${f.jp})`); setF({...f, jt:'', jp:''}); alert("Job Posted!"); ref();
  };

  const doNews = async () => {
    await sb.from('news').insert([{ message: f.nt }]);
    alertD(`📰 **COMMUNITY UPDATE:** ${f.nt}`); setF({...f, nt:''}); alert("News Updated!");
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
    alertD(`✅ **PAYROLL:** $${j.payout} paid to ${j.profiles.username} for ${j.title}`); ref();
  };

  if (ld) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Establishing Secure Admin Link...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #dc2626' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#dc2626"/> Montana: {w || '--°F'}</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>Finances</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>Market</span>
          </div>
        </div>
        <div style={{background:'#dc2626', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', borderRadius:'3px'}}>STAFF COMMAND</div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Management</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Account</p>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'#1a1a1a', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{margin:'0 0 30px 0', fontSize:'32px'}}>Staff Command Center</h1>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'40px' }}>
              
              {/* NEWS CARD */}
              <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #22c55e' }}>
                <p style={{margin:'0 0 10px 0', color:'#22c55e', fontSize:'11px', fontWeight:'bold'}}><Megaphone size={14}/> GLOBAL ANNOUNCEMENT</p>
                <textarea value={f.nt} onChange={e=>setF({...f, nt:e.target.value})} placeholder="Broadcast a message to all Dashboards..." style={{width:'100%', padding:'10px', background:'#111', border:'1px solid #333', color:'#fff', minHeight:'60px', marginBottom:'10px'}} />
                <button onClick={doNews} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold', cursor:'pointer', fontSize:'11px'}}>UPDATE NETWORK NEWS</button>
              </div>

              {/* MARKET CARD */}
              <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <p style={{margin:'0 0 10px 0', color:'#4a7ab5', fontSize:'11px', fontWeight:'bold'}}><TrendingUp size={14}/> MARKET CONTROLS</p>
                <div style={{ maxHeight:'120px', overflowY:'auto' }}>
                    {mkt.map(m => (
                        <div key={m.id} style={{display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'12px'}}>
                            <span>{m.crop_name}</span>
                            <input type="number" defaultValue={m.base_price} onBlur={(e)=>doPrice(m.id, e.target.value)} style={{width:'80px', background:'#111', border:'1px solid #333', color:'#22c55e', textAlign:'center'}} />
                        </div>
                    ))}
                </div>
              </div>

            </div>

            {/* PENDING PAYROLL */}
            <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #f59e0b', marginBottom:'40px' }}>
                <h3 style={{margin:'0 0 15px 0', fontSize:'16px', display:'flex', alignItems:'center', gap:'10px'}}><Banknote size={20} color="#f59e0b"/> Pending Payroll Approval</h3>
                {js.length === 0 ? <p style={{fontSize:'12px', color:'#555'}}>No work orders awaiting payment.</p> : js.map(j => (
                    <div key={j.id} style={{ display:'flex', justifyContent:'space-between', padding:'15px', background:'#1a1a1a', marginBottom:'10px', borderRadius:'4px', alignItems:'center' }}>
                        <div>
                            <span style={{fontWeight:'bold'}}>{j.profiles?.username}</span>
                            <p style={{margin:0, fontSize:'12px', color:'#888'}}>Task: {j.title}</p>
                        </div>
                        <button onClick={()=>doPay(j)} style={{padding:'8px 20px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'2px', fontSize:'11px'}}>APPROVE ${j.payout?.toLocaleString()}</button>
                    </div>
                ))}
            </div>

            {/* FARMER REGISTRY */}
            <h3 style={{fontSize:'14px', color:'#555', marginBottom:'15px', textTransform:'uppercase'}}><Users size={16} style={{verticalAlign:'middle'}}/> Network Operator Registry</h3>
            <div style={{ background:'#222', borderRadius:'4px', overflow:'hidden' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
                    <thead style={{ background:'#111', fontSize:'11px', color:'#555' }}>
                        <tr>
                            <th style={{padding:'15px 20px'}}>OPERATOR</th>
                            <th style={{padding:'15px 20px'}}>RANK</th>
                            <th style={{padding:'15px 20px'}}>CAPITAL</th>
                            <th style={{padding:'15px 20px'}}>UID</th>
                        </tr>
                    </thead>
                    <tbody style={{fontSize:'13px'}}>
                        {ps.map((p, i) => (
                            <tr key={p.id} style={{ borderBottom:'1px solid #111', background: i % 2 === 0 ? '#1a1a1a' : '#222' }}>
                                <td style={{padding:'15px 20px', fontWeight:'bold'}}>{p.username}</td>
                                <td style={{padding:'15px 20px'}}><span style={{color:'#4a7ab5', fontWeight:'bold'}}>{p.rank}</span></td>
                                <td style={{padding:'15px 20px', color:'#22c55e', fontFamily:'monospace'}}>${p.balance?.toLocaleString()}</td>
                                <td style={{padding:'15px 20px', fontSize:'10px', color:'#444'}}>{p.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
