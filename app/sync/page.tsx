"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeftRight, Cloud, LogOut, Briefcase, Map, Landmark, Tractor, ChevronDown, RefreshCcw, Send, Download, Upload } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function BankSync() {
  const [u, setU] = useState<any>(null);
  const [amt, setAmt] = useState("");
  const [fId, setFId] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  const handleSync = async (type: 'TO_GAME' | 'TO_PORTAL') => {
    const value = parseInt(amt);
    if (!value || value <= 0) return alert("Enter amount.");
    if (type === 'TO_GAME' && u.balance < value) return alert("Insufficient Portal balance.");

    // 1. Deduct from Website Balance immediately if sending to game
    if (type === 'TO_GAME') {
        await sb.from('profiles').update({ balance: u.balance - value }).eq('id', u.id);
        await sb.from('transactions').insert([{ user_id: u.id, amount: value, type: 'expense', description: 'Transferred to In-Game Farm' }]);
    }

    // 2. Add to Sync Queue for the Server Mod to read
    await sb.from('bank_sync').insert([{ user_id: u.id, amount: value, type: type, farm_id: parseInt(fId) }]);

    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🏦 **BANK SYNC REQUEST**\n**${u.username}** requested to move **$${value.toLocaleString()}** ${type === 'TO_GAME' ? 'into the Game' : 'to the Portal'}.` 
    })});

    alert("Transfer Pending. The server will sync your funds in the next 5-10 minutes.");
    load(); setAmt("");
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Establishing Financial Link...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
        <div style={{textAlign:'right'}}>
            <p style={{margin:0, fontSize:'10px', color:'#888'}}>PORTAL BALANCE</p>
            <p style={{margin:0, color:'#22c55e', fontWeight:'bold'}}>${u.balance?.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/sync'}><ArrowLeftRight size={16}/> Bank Sync</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'40px' }}>
          <div style={{ maxWidth:'600px', margin:'0 auto' }}>
            <h1 style={{fontSize:'32px', textTransform:'uppercase'}}>Automated Bank Sync</h1>
            <p style={{color:'#aaa', marginBottom:'30px'}}>Move your capital between the CTFG Web Portal and the Montana Judith Plains Game Server.</p>

            <div style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <div style={{ marginBottom:'20px' }}>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>FARM ID (FROM IN-GAME MENU)</label>
                    <input type="number" value={fId} onChange={e=>setFId(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="e.g. 1" />
                </div>
                <div style={{ marginBottom:'25px' }}>
                    <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>AMOUNT TO TRANSFER ($)</label>
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

            <div style={{ marginTop:'30px', padding:'20px', background:'rgba(245,158,11,0.1)', border:'1px solid #f59e0b', color:'#f59e0b', fontSize:'12px', borderRadius:'4px' }}>
                <b>NOTICE:</b> Transfers are processed by the CTFG Automated Bridge. This usually takes 1 save-cycle (approx. 5 minutes). Do not leave the game server until the transfer is verified.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
