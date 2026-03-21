"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Radio, Megaphone, TrendingUp, ArrowLeft, Users, Banknote, Clock, 
  Cloud, LogOut, Briefcase, Landmark, Tractor, Map, Truck, Send, Check
} from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]); const [js, setJs] = useState<any[]>([]);
  const [mkt, setMkt] = useState<any[]>([]); const [syncs, setSyncs] = useState<any[]>([]);
  const [f, setF] = useState({ jt:'', jp:'', nt:'', af:'', ap:'', radio:'' });
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username)').eq('status', 'pending');
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    const { data: s } = await sb.from('bank_sync').select('*, profiles(username)').eq('status', 'PENDING');
    setPs(p || []); setJs(j || []); setMkt(m || []); setSyncs(s || []); setLd(false);
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

  const doDispatch = async () => {
    const { data: { user } } = await sb.auth.getUser();
    await sb.from('dispatch').insert([{ message: f.radio, sender: user?.email }]);
    alertD(`🎙️ **RADIO DISPATCH**\n**Admin:** ${f.radio}`); setF({...f, radio:''}); alert("Broadcast Sent!");
  };

  const doNews = async () => {
    await sb.from('news').insert([{ message: f.nt }]);
    alertD(`📰 **COMMUNITY UPDATE:** ${f.nt}`); setF({...f, nt:''}); alert("News Updated!");
  };

  const doPrice = async (id: string, val: string) => {
    await sb.from('market_prices').update({ base_price: parseInt(val) }).eq('id', id);
    ref();
  };

  const doSync = async (id: string) => {
    await sb.from('bank_sync').update({ status: 'COMPLETED' }).eq('id', id);
    alert("Transfer Verified."); ref();
  };

  const doPay = async (j: any) => {
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance: u.balance + j.payout }).eq('id', j.assigned_to);
    await sb.from('transactions').insert([{ user_id: j.assigned_to, amount: j.payout, type: 'income', description: `Payout: ${j.title}` }]);
    await sb.from('contracts').update({ status: 'completed' }).eq('id', j.id);
    alertD(`✅ **PAYROLL:** $${j.payout} paid to ${j.profiles.username}`); ref();
  };

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Establishing Admin Command...</div>;
  const sBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #dc2626' }}>
        <span style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic'}}>CTFG STAFF COMMAND</span>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#333', color:'#fff', border:'none', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>EXIT TO DASHBOARD</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px'}}>OPERATIONS</p>
          <button style={sBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={sBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sBtn} onClick={()=>window.location.href='/sync'}><Clock size={16}/> Bank Sync</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px'}}>SYSTEM</p>
          <button style={{...sBtn, background:'#333', color:'#fff'}}><ShieldCheck size={16} color="#dc2626"/> Staff Panel</button>
          <button style={sBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Logout</button>
        </div>

        <div style={{ flex:1, background:'#1a1a1a', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            
            {/* RADIO DISPATCH HANDSET */}
            <div style={{ background:'#222', padding:'25px', borderRadius:'4px', borderTop:'4px solid #dc2626', marginBottom:'30px' }}>
              <h3 style={{margin:'0 0 15px 0', fontSize:'16px', color:'#dc2626'}}><Radio size={18} style={{verticalAlign:'middle'}}/> Broadcast to Network</h3>
              <div style={{ display:'flex', gap:'10px' }}>
                <input value={f.radio} onChange={e=>setF({...f, radio:e.target.value})} placeholder="Type command here..." style={{flex:1, padding:'12px', background:'#000', border:'1px solid #333', color:'#fff'}} />
                <button onClick={doDispatch} style={{background:'#dc2626', color:'#fff', border:'none', padding:'0 30px', fontWeight:'bold', cursor:'pointer'}}>SEND</button>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'40px' }}>
              {/* NEWS BROADCASTER */}
              <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #22c55e' }}>
                <p style={{margin:'0 0 10px 0', color:'#22c55e', fontSize:'11px', fontWeight:'bold'}}>DASHBOARD ANNOUNCEMENT</p>
                <textarea value={f.nt} onChange={e=>setF({...f, nt:e.target.value})} placeholder="Public news..." style={{width:'100%', padding:'10px', background:'#111', border:'1px solid #333', color:'#fff', marginBottom:'10px', minHeight:'60px'}} />
                <button onClick={doNews} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold'}}>POST NEWS</button>
              </div>

              {/* MARKET CONTROL */}
              <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <p style={{margin:'0 0 10px 0', color:'#4a7ab5', fontSize:'11px', fontWeight:'bold'}}>CROP PRICING</p>
                <div style={{ maxHeight:'100px', overflowY:'auto' }}>
                    {mkt.map(m => (
                        <div key={m.id} style={{display:'flex', justifyContent:'space-between', marginBottom:'5px', fontSize:'12px'}}>
                            <span>{m.crop_name}</span>
                            <input type="number" defaultValue={m.base_price} onBlur={(e)=>doPrice(m.id, e.target.value)} style={{width:'80px', background:'#111', border:'1px solid #333', color:'#22c55e', textAlign:'right'}} />
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* PENDING ACTIONS */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #f59e0b' }}>
                    <h3 style={{margin:'0 0 15px 0', fontSize:'14px'}}>Pending Payroll</h3>
                    {js.map(j => <div key={j.id} style={{display:'flex', justifyContent:'space-between', background:'#111', padding:'10px', marginBottom:'5px'}}><span style={{fontSize:'12px'}}>{j.profiles.username}</span><button onClick={()=>doPay(j)} style={{background:'#22c55e', border:'none', color:'#fff', padding:'2px 8px', fontSize:'10px'}}>PAY ${j.payout}</button></div>)}
                </div>
                <div style={{ background:'#222', padding:'20px', borderRadius:'4px', borderTop:'4px solid #3b82f6' }}>
                    <h3 style={{margin:'0 0 15px 0', fontSize:'14px'}}>Pending Syncs</h3>
                    {syncs.map(s => <div key={s.id} style={{display:'flex', justifyContent:'space-between', background:'#111', padding:'10px', marginBottom:'5px'}}><span style={{fontSize:'12px'}}>{s.profiles.username}</span><button onClick={()=>doSync(s.id)} style={{background:'#3b82f6', border:'none', color:'#fff', padding:'2px 8px', fontSize:'10px'}}>APPROVE ${s.amount}</button></div>)}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
