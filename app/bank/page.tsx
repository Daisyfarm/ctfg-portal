"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeftRight, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, Landmark, ChevronDown, Download, Upload, Clock, AlertCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function BankSync() {
  const [u, setU] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [amt, setAmt] = useState("");
  const [fId, setFId] = useState("");
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: syncs } = await sb.from('bank_sync').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5);
        setHistory(syncs || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleSync = async (type: 'TO_GAME' | 'TO_PORTAL') => {
    const value = parseInt(amt);
    if (!value || value <= 0) return alert("Enter a valid amount.");
    if (type === 'TO_GAME' && u.balance < value) return alert("Insufficient Portal balance.");

    if (type === 'TO_GAME') {
        await sb.from('profiles').update({ balance: u.balance - value }).eq('id', u.id);
        await sb.from('transactions').insert([{ user_id: u.id, amount: value, type: 'expense', description: 'Bank Sync: Withdrew to Montana Game' }]);
    }

    await sb.from('bank_sync').insert([{ user_id: u.id, amount: value, type: type, farm_id: parseInt(fId), status: 'PENDING' }]);

    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🏦 **WIRE TRANSFER REQUEST**\n**${u.username}** requested to move **$${value.toLocaleString()}** to Farm ID **#${fId}**.\n*Status: Awaiting Admin Verification (48h)*` 
    })});

    alert("Request Logged. Please allow 48-72 hours for funds to be verified.");
    load(); setAmt("");
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Treasury...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/sync'}><ArrowLeftRight size={16}/> Bank Sync</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'700px', margin:'0 auto' }}>
            <h1 style={{fontSize:'32px', textTransform:'uppercase', margin:0}}>Bank Sync Terminal</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>AUTHORIZE THE TRANSFER OF CAPITAL BETWEEN THE WEB PORTAL AND YOUR IN-GAME FARM.</p>

            <div style={{ background:'rgba(245,158,11,0.1)', border:'1px solid #f59e0b', padding:'15px', borderRadius:'4px', color:'#f59e0b', display:'flex', alignItems:'center', gap:'15px', marginBottom:'25px' }}>
              <Clock size={24} />
              <p style={{margin:0, fontSize:'13px'}}><b>NOTICE:</b> All transfers undergo a security audit. Allow up to 72 hours for funds to clear in-game.</p>
            </div>

            <div style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <div style={{marginBottom:'15px'}}>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>IN-GAME FARM ID (SEE FARMS MENU)</label>
                    <input type="number" value={fId} onChange={e=>setFId(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="e.g. 1" />
                </div>
                <div style={{marginBottom:'25px'}}>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>TRANSFER AMOUNT ($)</label>
                    <input type="number" value={amt} onChange={e=>setAmt(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="0.00" />
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'15px' }}>
                    <button onClick={()=>handleSync('TO_GAME')} style={{padding:'15px', background:'#22c55e', color:'#000', border:'none', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                        <Download size={18}/> WITHDRAW TO GAME
                    </button>
                    <button onClick={()=>handleSync('TO_PORTAL')} style={{padding:'15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                        <Upload size={18}/> DEPOSIT TO PORTAL
                    </button>
                </div>
            </div>

            {/* SYNC HISTORY */}
            <div style={{ marginTop:'40px' }}>
                <h3 style={{fontSize:'14px', color:'#4a7ab5', marginBottom:'15px'}}>SYNC QUEUE STATUS</h3>
                <div style={{ background:'#222', borderRadius:'4px', overflow:'hidden' }}>
                    {history.map(item => (
                        <div key={item.id} style={{ display:'flex', justifyContent:'space-between', padding:'15px', borderBottom:'1px solid #111', fontSize:'13px' }}>
                            <div>
                                <span style={{ fontWeight:'bold' }}>${item.amount.toLocaleString()}</span>
                                <p style={{ margin:0, fontSize:'10px', color:'#555' }}>{item.type === 'TO_GAME' ? 'Withdrawal to Server' : 'Deposit to Portal'}</p>
                            </div>
                            <div style={{ textAlign:'right' }}>
                                <span style={{ fontSize:'10px', fontWeight:'bold', padding:'4px 8px', borderRadius:'3px', background: item.status === 'COMPLETED' ? '#22c55e22' : '#f59e0b22', color: item.status === 'COMPLETED' ? '#22c55e' : '#f59e0b' }}>{item.status}</span>
                                <p style={{ margin:'5px 0 0 0', fontSize:'10px', color:'#333' }}>{new Date(item.created_at).toLocaleDateString()}</p>
                            </div>
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
