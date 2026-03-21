"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Bank() {
  const [bal, setBal] = useState(0);
  const [amt, setAmt] = useState("");
  const [fId, setFId] = useState("");

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('balance').eq('id', user?.id).single().then(({data}) => setBal(data?.balance || 0));
    });
  }, []);

  const requestSync = async (e: any) => {
    e.preventDefault();
    const { data: { user } } = await sb.auth.getUser();
    if (bal < parseInt(amt)) return alert("Insufficient funds.");

    // Deduct and Queue
    await sb.from('profiles').update({ balance: bal - parseInt(amt) }).eq('id', user?.id);
    await sb.from('bank_sync').insert([{ user_id: user?.id, amount: parseInt(amt), type: 'TO_GAME', farm_id: parseInt(fId), status: 'PENDING' }]);
    
    alert("Transfer Request Received. Funds will clear in 48-72 hours.");
    window.location.reload();
  };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', padding:'40px', fontFamily:'Arial' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#aaa', cursor:'pointer', marginBottom:'20px'}}>← BACK</button>
        <h1 style={{fontSize:'32px'}}>Financial Wire Transfer</h1>

        <div style={{ background:'rgba(245,158,11,0.1)', border:'1px solid #f59e0b', padding:'20px', borderRadius:'4px', color:'#f59e0b', display:'flex', gap:'15px', marginBottom:'30px' }}>
          <Clock size={24} />
          <div>
            <p style={{margin:0, fontWeight:'bold'}}>ACH TRANSFER NOTICE</p>
            <p style={{margin:0, fontSize:'13px'}}>Please allow 48 to 72 hours for funds to be verified by a Network Admin. Do not submit multiple requests.</p>
          </div>
        </div>

        <form onSubmit={requestSync} style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
          <div style={{marginBottom:'15px'}}>
            <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>IN-GAME FARM ID</label>
            <input type="number" required value={fId} onChange={e=>setFId(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} />
          </div>
          <div style={{marginBottom:'20px'}}>
            <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>TRANSFER AMOUNT ($)</label>
            <input type="number" required value={amt} onChange={e=>setAmt(e.target.value)} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} />
          </div>
          <button type="submit" style={{width:'100%', padding:'15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>AUTHORIZE WITHDRAWAL</button>
        </form>
      </div>
    </div>
  );
}
