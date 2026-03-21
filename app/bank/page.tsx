"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Send, Landmark, Clock, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, ChevronDown } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Bank() {
  const [p, setP] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [target, setTarget] = useState('');
  const [amt, setAmt] = useState('');
  const [note, setNote] = useState('');
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    setP(prof); setTx(t || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  const send = async (e: any) => {
    e.preventDefault();
    const { data: { user } } = await sb.auth.getUser();
    const { error } = await sb.rpc('transfer_money', { sender_id: user?.id, target_username: target, amount_to_send: parseInt(amt), transfer_note: note });
    if (error) alert(error.message);
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `💰 **WIRE TRANSFER**\n**${p.username}** sent **$${parseInt(amt).toLocaleString()}** to **${target}**.` }) });
      alert("Transfer Authorized."); load(); setTarget(""); setAmt(""); setNote("");
    }
  };

  if (ld || !p) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Verifying Financial Credentials...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> Montana: {w || '--°F'}</span>
            <span style={{color:'#4a7ab5'}}>Finances</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>Market</span>
          </div>
        </div>
        {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/sell'}><TrendingUp size={16}/> Crop Sales</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Account</p>
          <button style={{...sideBtn}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, position:'relative', overflow:'hidden', background:'#1a1a1a' }}>
          <div style={{ padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'30px' }}>
                <div>
                    <p style={{margin:0, color:'#4a7ab5', fontWeight:'bold', fontSize:'12px', textTransform:'uppercase'}}>Central Finance</p>
                    <h1 style={{margin:0, fontSize:'32px'}}>Bank Account</h1>
                </div>
                <div style={{textAlign:'right'}}>
                    <p style={{margin:0, color:'#888', fontSize:'11px'}}>AVAILABLE CAPITAL</p>
                    <h2 style={{margin:0, color:'#22c55e', fontSize:'36px', fontFamily:'monospace'}}>${p.balance?.toLocaleString()}</h2>
                </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'30px' }}>
              
              {/* TRANSFER FORM */}
              <div style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <h3 style={{margin:'0 0 20px 0', fontSize:'18px', display:'flex', alignItems:'center', gap:'10px'}}><Send size={20} color="#4a7ab5"/> Wire Transfer</h3>
                <form onSubmit={send} style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                  <div>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>RECIPIENT USERNAME</label>
                    <input required value={target} onChange={e=>setTarget(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="e.g. Samuel_Founder" />
                  </div>
                  <div>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>TRANSFER AMOUNT ($)</label>
                    <input type="number" required value={amt} onChange={e=>setAmt(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="0.00" />
                  </div>
                  <div>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>MEMO / REFERENCE</label>
                    <input value={note} onChange={e=>setNote(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="Reason for transfer" />
                  </div>
                  <button type="submit" style={{padding:'15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', marginTop:'10px', textTransform:'uppercase', fontSize:'12px'}}>Authorize Transaction</button>
                </form>
              </div>

              {/* QUICK INFO */}
              <div style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #7c3aed' }}>
                <h3 style={{margin:'0 0 20px 0', fontSize:'18px', display:'flex', alignItems:'center', gap:'10px'}}><Landmark size={20} color="#7c3aed"/> Loan Center</h3>
                <p style={{fontSize:'13px', color:'#888', lineHeight:'1.6'}}>Need capital for new equipment? The CTFG Loan Center offers competitive rates for verified members.</p>
                <button onClick={()=>window.location.href='/loans'} style={{width:'100%', padding:'12px', background:'#333', color:'#fff', border:'1px solid #444', fontWeight:'bold', cursor:'pointer', marginTop:'20px'}}>ENTER LOAN OFFICE</button>
              </div>
            </div>

            {/* LEDGER */}
            <div style={{ marginTop:'40px' }}>
                <h3 style={{fontSize:'14px', color:'#4a7ab5', marginBottom:'15px', textTransform:'uppercase'}}><Clock size={16} style={{verticalAlign:'middle'}}/> System Audit Logs</h3>
                <div style={{ background:'#222', borderRadius:'4px', overflow:'hidden' }}>
                    {tx.map((t, index) => (
                        <div key={t.id} style={{ display:'flex', justifyContent:'space-between', padding:'15px 20px', borderBottom: index === tx.length - 1 ? 'none' : '1px solid #111', fontSize:'13px', background: index % 2 === 0 ? '#1a1a1a' : '#222' }}>
                            <div>
                                <span style={{fontWeight:'bold'}}>{t.description}</span>
                                <p style={{margin:'5px 0 0 0', fontSize:'10px', color:'#555'}}>{new Date(t.created_at).toLocaleString()}</p>
                            </div>
                            <span style={{fontWeight:'bold', color: t.type === 'income' ? '#22c55e' : '#ff4d4d', fontFamily:'monospace', fontSize:'14px'}}>
                                {t.type === 'income' ? '+' : '-'}${t.amount?.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
