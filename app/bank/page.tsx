"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, Wallet, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function BankTransfer() {
  const [balance, setBalance] = useState(0);
  const [targetUsername, setTargetUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => { fetchBalance(); }, []);

  const fetchBalance = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('profiles').select('balance').eq('id', user?.id).single();
    if (data) setBalance(data.balance);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    const { data: { user } } = await supabase.auth.getUser();

    // Call the SQL Function (RPC)
    const { error } = await supabase.rpc('transfer_money', {
      sender_id: user?.id,
      target_username: targetUsername,
      amount_to_send: parseInt(amount),
      transfer_note: note
    });

    if (error) {
      setMsg({ type: 'error', text: error.message });
    } else {
      setMsg({ type: 'success', text: `Success! $${amount} sent to ${targetUsername}.` });
      setAmount('');
      setTargetUsername('');
      setNote('');
      fetchBalance();
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px' }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div style={{ background: 'linear-gradient(135deg, #166534 0%, #064e3b 100%)', padding: '30px', borderRadius: '24px', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <p style={{ opacity: 0.8, fontSize: '12px', fontWeight: 'bold', margin: 0 }}>CURRENT FUNDS</p>
          <h2 style={{ fontSize: '42px', margin: 0 }}>${balance.toLocaleString()}</h2>
        </div>

        <div style={{ backgroundColor: '#131926', padding: '30px', borderRadius: '32px', border: '1px solid #1e293b' }}>
          <h3 style={{ margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Send size={20} color="#22c55e" /> Wire Transfer
          </h3>

          <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" placeholder="Recipient Username (e.g., Samuel_Founder)" required
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }}
              onChange={(e) => setTargetUsername(e.target.value)} value={targetUsername}
            />
            <input 
              type="number" placeholder="Amount to send ($)" required
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }}
              onChange={(e) => setAmount(e.target.value)} value={amount}
            />
            <input 
              type="text" placeholder="Note (e.g., Harvest Pay)" 
              style={{ padding: '14px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }}
              onChange={(e) => setNote(e.target.value)} value={note}
            />

            {msg.text && (
              <div style={{ padding: '15px', borderRadius: '12px', backgroundColor: msg.type === 'error' ? '#ef444422' : '#22c55e22', color: msg.type === 'error' ? '#ef4444' : '#22c55e', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {msg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                {msg.text}
              </div>
            )}

            <button disabled={loading} style={{ padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              {loading ? 'Processing...' : 'Confirm Transfer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
