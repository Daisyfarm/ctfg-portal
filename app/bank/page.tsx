"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, ArrowLeft } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

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
      setMsg({ type: 'success', text: 'Money Sent Successfully!' });
      
      // DISCORD TRANSFER ALERT
      await fetch(DISCORD_WEBHOOK, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              content: `💰 **BANK WIRE**\n**${username}** sent **$${parseInt(amount).toLocaleString()}** to **${targetUsername}**\n📝 *Note: ${note || "None"}*`
          })
      });

      setTimeout(() => window.location.href = '/dashboard', 2000);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px' }}><ArrowLeft size={18} /> Dashboard</button>
        
        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '30px', borderRadius: '24px', marginBottom: '30px', textAlign: 'center' }}>
          <p style={{ opacity: 0.7, fontSize: '11px', fontWeight: 'bold', margin: 0 }}>AVAILABLE CAPITAL</p>
          <h2 style={{ fontSize: '32px', margin: 0 }}>${balance.toLocaleString()}</h2>
        </div>

        <div style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#22c55e', fontSize: '18px' }}><Send size={18} /> New Wire Transfer</h3>
          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Recipient Username" required style={{ padding: '12px'
