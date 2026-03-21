"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Radio, Megaphone, TrendingUp, ArrowLeft, Users, Banknote, Clock, Cloud, LogOut, Briefcase, Landmark, Tractor, Map, History, Send } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]); const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]); const [u, setU] = useState<any>(null);
  const [f, setF] = useState({ jt:'', jp:'', nt:'', radio:'' });
  const [dLog, setDLog] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    const { data: rd } = await sb.from('dispatch').select('*').order('created_at', { ascending: false }).limit(10);
    setPs(p || []); setJs(j || []); setMkt(m || []); setDLog(rd || []); setLd(false);
  };

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: r } = await sb.from('profiles').select('*').eq('id', user.id).single();
        if (r?.rank !== 'Admin') window.location.href = '/dashboard';
        else { setU(r); ref(); }
      }
    };
    check();
  }, []);

  const sendDispatch = async () => {
    if (!f.radio) return;
    await sb.from('dispatch').insert([{ message: f.radio, sender: u.username }]);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🎙️ **RADIO DISPATCH**\n**${u.username}:** ${f.radio}` })});
    setF({...f, radio:''}); ref();
  };

  const doNews = async () => {
    await sb.from('news').insert([{ message: f.nt }]);
    setF({...f, nt:''}); alert("News Updated!");
  };

  const doPrice = async (id: string, val: string) => {
    await sb.from('market_prices').update({ base_price: parseInt(val) }).eq('id', id);
    ref();
  };

  const doPay = async (j: any) => {
    const { data: uAcc } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: uAcc.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Admin Payout: ${j.title}` }]);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **PAYROLL AUTHORIZED:** $${j.payout.toLocaleString()} paid to ${j.profiles.username}` })});
    ref();
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Establishing Admin Frequency...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'15px 25px', display:'flex', justifyContent:'space-between', borderBottom:'2px solid #dc2626' }}>
        <span style={{color:'#dc2626', fontWeight:'900', fontSize:'20px', fontStyle:'italic'}}>CTFG COMMAND CENTER</span>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#333', color:'#fff', border:'none', padding:'5px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>EXIT TO DASHBOARD</button>
      </div>

      <div style={{ padding:'40px', maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'2fr 1fr', gap:'30px' }}>
        
        {/* LEFT COLUMN: CONTROLS */}
        <div style={{ display:'flex', flexDirection:'column', gap:'30px' }}>
          
          {/* RADIO HANDSET */}
          <div style={{ background:'#1a1a1a', padding:'30px', borderRadius:'4px', borderTop:'4px solid #dc2626', boxShadow:'0 10px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{margin:'0 0 20px 0', fontSize:'18px', color:'#dc2626', display:'flex', alignItems:'center', gap:'10px'}}><Radio size={24} className="animate-pulse"/> Broadcast Command</h3>
            <div style={{ display:'flex', gap:'10px' }}>
              <input value={f.radio} onChange={e=>setF({...f, radio:e.target.value})} placeholder="Message all active operators..." style={{flex:1, padding:'15px', background:'#000', border:'1px solid #333', color:'#fff', fontSize:'16px', borderRadius:'4px'}} />
              <button onClick={sendDispatch} style={{background:'#dc2626', color:'#fff', border:'none', padding:'0 40px', fontWeight:'bold', cursor:'pointer', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px'}}><Send size={18}/> SEND</button>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            {/* NEWS CONTROL */}
            <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #22c55e' }}>
              <p style={{margin:'0 0 15px 0', color:'#22c55e', fontSize:'11px', fontWeight:'bold'}}>GLOBAL NEWS FEED</p>
              <textarea value={f.nt} onChange={e=>setF({...f, nt:e.target.value})} placeholder="Dashboard announcement..." style={{width:'100%', padding:'10px', background:'#111', border:'1px solid #333', color:'#fff', marginBottom:'10px', borderRadius:'4px'}} />
              <button onClick={doNews} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold', borderRadius:'4px'}}>PUSH UPDATE</button>
            </div>

            {/* PAYROLL */}
            <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #f59e0b' }}>
              <p style={{margin:'0 0 15px 0', color:'#f59e0b', fontSize:'11px', fontWeight:'bold'}}>PENDING PAYROLL</p>
              {js.length === 0 ? <p style={{fontSize:'12px', color:'#555'}}>Payroll is clear.</p> : js.map(j => (
                  <div key={j.id} style={{display:'flex', justifyContent:'space-between', background:'#111', padding:'10px', marginBottom:'5px', borderRadius:'4px', alignItems:'center'}}>
                      <span style={{fontSize:'12px'}}>{j.profiles.username}</span>
                      <button onClick={()=>doPay(j)} style={{background:'#22c55e', border:'none', color:'#fff', padding:'5px 10px', fontSize:'10px', fontWeight:'bold', borderRadius:'2px'}}>PAY ${j.payout}</button>
                  </div>
              ))}
            </div>
          </div>

          {/* MARKET MANAGER */}
          <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
            <p style={{margin:'0 0 15px 0', color:'#4a7ab5', fontSize:'11px', fontWeight:'bold'}}>MARKET PRICE MANIPULATION</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px' }}>
                {mkt.map(m => (
                    <div key={m.id} style={{ background:'#111', padding:'10px', borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <span style={{fontSize:'11px', color:'#aaa'}}>{m.crop_name}</span>
                        <input type="number" defaultValue={m.base_price} onBlur={(e)=>doPrice(m.id, e.target.value)} style={{width:'60px', background:'transparent', border:'none', borderBottom:'1px solid #333', color:'#22c55e', textAlign:'right', fontWeight:'bold'}} />
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGS & REGISTRY */}
        <div style={{ display:'flex', flexDirection:'column', gap:'30px' }}>
          
          {/* DISPATCH LOG */}
          <div style={{ background:'#1a1a1a', padding:'20px', borderRadius:'4px', height:'400px', display:'flex', flexDirection:'column', border:'1px solid #333' }}>
            <p style={{margin:'0 0 15px 0', color:'#dc2626', fontSize:'11px', fontWeight:'bold', display:'flex', alignItems:'center', gap:'8px'}}><History size={14}/> COMMS ARCHIVE</p>
            <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'15px' }}>
                {dLog.map(log => (
                    <div key={log.id} style={{ borderLeft:'2px solid #333', paddingLeft:'10px' }}>
                        <p style={{margin:0, fontSize:'10px', color:'#555'}}>{new Date(log.created_at).toLocaleTimeString()}</p>
                        <p style={{margin:0, fontSize:'13px', color:'#ccc'}}><b style={{color:'#fff'}}>{log.sender}:</b> {log.message}</p>
                    </div>
                ))}
            </div>
          </div>

          {/* REGISTRY */}
          <div style={{ background:'#1a1a1a', padding:'20px', borderRadius:'4px', border:'1px solid #333' }}>
            <p style={{margin:'0 0 15px 0', color:'#888', fontSize:'11px', fontWeight:'bold'}}>MEMBER REGISTRY</p>
            {ps.map(p => (
                <div key={p.id} style={{display:'flex', justifyContent:'space-between', fontSize:'12px', padding:'8px 0', borderBottom:'1px solid #222'}}>
                    <span>{p.username}</span>
                    <span style={{color:'#22c55e', fontWeight:'bold'}}>${p.balance?.toLocaleString()}</span>
                </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
