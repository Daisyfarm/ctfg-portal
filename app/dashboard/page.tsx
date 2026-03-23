Adding a Transfer feature is the final piece of a true economy. It allows your operators to trade, pay each other for services, or pool resources—all without you needing to manually intervene in the Admin Panel.

To make this work safely, we need to handle three things:

Check: Does the sender have enough money?

Move: Subtract from the sender and add to the receiver.

Log: Create two transaction records (one for each person).

🛠️ The Transfer UI for the Dashboard (app/dashboard/page.tsx)
Add this section below your Balance Card. It includes a "Recipient ID" field and an "Amount" field.

TypeScript
"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { Send, User, AlertCircle, CheckCircle2 } from 'lucide-react';

// ... Keep your existing imports and Profile/Transaction fetching code ...

export default function Dashboard() {
  const [recipientId, setRecipientId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    const { data: { user } } = await sb.auth.getUser();

    if (!user || isNaN(amount) || amount <= 0) return;
    if (profile.balance < amount) {
      setStatus({ type: 'error', msg: 'Insufficient Credits' });
      return;
    }

    // 1. Deduct from Sender
    await sb.from('profiles').update({ balance: profile.balance - amount }).eq('id', user.id);
    
    // 2. Add to Recipient
    const { data: recp } = await sb.from('profiles').select('balance').eq('id', recipientId).single();
    if (!recp) {
      setStatus({ type: 'error', msg: 'Recipient ID Not Found' });
      return;
    }
    await sb.from('profiles').update({ balance: recp.balance + amount }).eq('id', recipientId);

    // 3. Log for both
    await sb.from('transactions').insert([
      { profile_id: user.id, amount: -amount, description: `Transfer to ${recipientId.substring(0,5)}...` },
      { profile_id: recipientId, amount: amount, description: `Transfer from ${profile.username}` }
    ]);

    setStatus({ type: 'success', msg: 'Transfer Complete' });
    setTransferAmount('');
    setRecipientId('');
    // Refresh your data here...
  };

  return (
    <div style={{ /* Existing Styles */ }}>
      {/* ... Existing Balance Card ... */}

      {/* NEW: TRANSFER CONSOLE */}
      <div style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid #d4af37', padding: '30px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Send size={18} color="#d4af37" />
          <h3 style={{ margin: 0, fontSize: '14px', letterSpacing: '2px' }}>INITIATE TRANSFER</h3>
        </div>

        <form onSubmit={handleTransfer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="RECIPIENT OPERATOR ID" 
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            style={{ background: '#000', border: '1px solid #333', padding: '12px', color: '#fff', fontSize: '12px' }}
          />
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '12px', color: '#444' }}>$</span>
            <input 
              type="number" 
              placeholder="0.00" 
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              style={{ background: '#000', border: '1px solid #333', padding: '12px 12px 12px 25px', color: '#d4af37', width: '100%' }}
            />
          </div>
          <button style={{ background: '#d4af37', color: '#000', border: 'none', padding: '0 25px', fontWeight: 'bold', cursor: 'pointer' }}>
            SEND
          </button>
        </form>

        {status.msg && (
          <div style={{ marginTop: '15px', color: status.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {status.type === 'error' ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
            {status.msg}
          </div>
        )}
      </div>

      {/* ... Existing History Table ... */}
    </div>
  );
}
