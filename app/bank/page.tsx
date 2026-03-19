"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, ArrowLeft } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1484183365048602776/vlKwPtv3GkJ2DSn6vE1coJZf71ETVeJVMNXP_Su47bVevQZv5dmI3Z3bB-JSwIRPTtQ-";

export default function BankPage() {
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState('');
  const [targetUsername, setTargetUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => { 
    async function getBalance() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
      if (data) { setBalance(data.balance); setUsername(data.username); }
    }
    getBalance();
  }, []);

  const handleTransfer = async (e: any) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.rpc('transfer_money', { sender_id: user?.id, target_username: targetUsername, amount_to_send: parseInt(amount), transfer_note: note });

    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      setMsg({ type: 'success', text: 'Transfer Successful!' });
      
      await fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              content: `💰 **BANK TRANSFER**\n**${username}** just sent **$${parseInt(amount).toLocaleString()}** to **${targetUsername}**!\n*Note: ${note || "No note provided"}*`
          })
      });

      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px' }}><ArrowLeft size={18} /> Dashboard</button>
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '30px', borderRadius: '20px', marginBottom: '30px', textAlign: 'center' }}>
          <p style={{ opacity: 0.7, fontSize: '12px' }}>AVAILABLE FUNDS</p>
          <h2 style={{ fontSize: '36px', margin: 0 }}>${balance.toLocaleString()}</h2>
        </div>
        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '20px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#22c55e' }}><Send size={18} /> Send Money</h3>
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Recipient Username" required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} onChange={e => setTargetUsername(e.target.value)} />
            <input type="number" placeholder="Amount ($)" required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} onChange={e => setAmount(e.target.value)} />
            <input type="text" placeholder="Note" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} onChange={e => setNote(e.target.value)} />
            {msg.text && <p style={{ color: msg.type === 'error' ? '#ef4444' : '#22c55e', fontSize: '14px' }}>{msg.text}</p>}
            <button type="submit" style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Transfer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
