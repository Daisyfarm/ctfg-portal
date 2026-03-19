"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Bank() {
  const [bal, setBal] = useState(0);
  const [un, setUn] = useState('');
  const [target, setTarget] = useState('');
  const [amt, setAmt] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const getB = async () => {
      const { data: { user } } = await sb.auth.getUser();
      const { data } = await sb.from('profiles').select('*').eq('id', user?.id).single();
      if (data) { setBal(data.balance); setUn(data.username); }
    };
    getB();
  }, []);

  const send = async (e: any) => {
    e.preventDefault();
    const { data: { user } } = await sb.auth.getUser();
    const { error } = await sb.rpc('transfer_money', { sender_id: user?.id, target_username: target, amount_to_send: parseInt(amt), transfer_note: note });
    if (error) alert(error.message);
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `💰 **TRANSFER:** **${un}** sent **$${amt}** to **${target}**` }) });
      alert("Sent!"); window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ background:'#0b0f1a',minHeight:'100vh',color:'white',fontFamily:'sans-serif',padding:'40px' }}>
      <div style={{ maxWidth:'400px',margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none',color:'#94a3b8',border:'none',cursor:'pointer',marginBottom:'20px'}}><ArrowLeft/> Back</button>
        <div style={{ background:'linear-gradient(135deg,#166534,#064e3b)',padding:'20px',borderRadius:'20px',textAlign:'center',marginBottom:'20px' }}>
          <p style={{fontSize:'12px'}}>BALANCE</p>
          <h2>${bal.toLocaleString()}</h2>
        </div>
        <form onSubmit={send} style={{ background:'#131926',padding:'20px',borderRadius:'20px',display:'flex',flexDirection:'column',gap:'10px' }}>
          <input placeholder="Recipient Username" required style={{padding:'10px',borderRadius:'8px',background:'#0b0f1a',color:'white',border:'1px solid #334155'}} onChange={e=>setTarget(e.target.value)} />
          <input placeholder="Amount" type="number" required style={{padding:'10px',borderRadius:'8px',background:'#0b0f1a',color:'white',border:'1px solid #334155'}} onChange={e=>setAmt(e.target.value)} />
          <input placeholder="Note" style={{padding:'10px',borderRadius:'8px',background:'#0b0f1a',color:'white',border:'1px solid #334155'}} onChange={e=>setNote(e.target.value)} />
          <button type="submit" style={{background:'#22c55e',color:'white',border:'none',padding:'15px',borderRadius:'10px',fontWeight:'bold'}}>Send Money</button>
        </form>
      </div>
    </div>
  );
}
