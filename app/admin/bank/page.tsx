"use client";
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase'; 
import { CheckCircle2, XCircle, Clock, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function AdminBank() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  // YOUR SECURE WEBHOOK
  const DISCORD_URL = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';

      const { data: profile } = await sb.from('profiles').select('rank').eq('id', user.id).single();
      if (profile?.rank !== 'Admin') return window.location.href = '/dashboard';

      const { data } = await sb.from('transactions')
        .select('*, profiles(username, balance)')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
        
      setReqs(data || []);
      setLd(false);
    } catch (err) {
      setLd(false);
    }
  };

  useEffect(() => { load(); }, []);

  const notifyDiscord = async (user: string, amount: number, action: string) => {
    const isApp = action === 'completed';
    await fetch(DISCORD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "CTFG Bank Authority",
        avatar_url: "https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png",
        embeds: [{
          title: isApp ? "✅ SYNC APPROVED" : "❌ SYNC DENIED",
          description: `**Operator:** ${user}\n**Amount:** $${amount.toLocaleString()}\n**Result:** ${isApp ? 'Funds removed from Portal' : 'Request Voided'}`,
          color: isApp ? 2253662 : 14423100,
          timestamp: new Date()
        }]
      })
    });
  };

  const handleAction = async (id: string, userId: string, amount: number, currentBalance: number, username: string, action: 'completed' | 'denied') => {
    if (action === 'completed') {
      const { error: balErr } = await sb.from('profiles').update({ balance: currentBalance - amount }).eq('id', userId);
      if (balErr) return alert("Error updating balance!");
    }

    const { error: txErr } = await sb.from('transactions').update({ status: action }).eq('id', id);

    if (!txErr) {
      await notifyDiscord(username, amount, action);
      alert(`${username}'s request is ${action}`);
      load();
    }
  };

  if (ld) return <div style={{background:'#0a0a0a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace'}}>ENCRYPTING CONNECTION...</div>;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'sans-serif' }}>
      <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', display: 'flex', alignItems:'center', gap:'8px', marginBottom:'20px', fontSize:'12px', fontWeight:'bold' }}>
        <ArrowLeft size={14} /> EXIT TERMINAL
      </button>

      <div style={{ display:'flex', alignItems:'center', gap:'15px', borderBottom:'2px solid #dc2626', paddingBottom:'20px', marginBottom:'40px' }}>
        <ShieldAlert size={32} color="#dc2626" />
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>CTFG ADMIN BANK</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {reqs.map(r => (
          <div key={r.id} style={{ background: '#111', border: '1px solid #222', padding: '25px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>OPERATOR</p>
              <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>{r.profiles?.username}</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Portal: ${r.profiles?.balance?.toLocaleString()}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>REQUEST</p>
              <p style={{ margin: '5px 0', fontSize: '24px', fontWeight: 'bold', color: '#eab308' }}>${r.amount?.toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleAction(r.id, r.user_id, r.amount, r.profiles.balance, r.profiles.username, 'completed')} style={{ background: '#22c55e', color: '#000', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>APPROVE</button>
              <button onClick={() => handleAction(r.id, r.user_id, r.amount, r.profiles.balance, r.profiles.username, 'denied')} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>DENY</button>
            </div>
          </div>
        ))}
        {reqs.length === 0 && <p style={{ textAlign:'center', color: '#444', marginTop: '50px' }}>No pending requests.</p>}
      </div>
    </div>
  );
}
