"use client";
import { useEffect, useState } from 'react';
// Changed to relative path for better Vercel build stability
import { sb } from '../../lib/supabase';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function AdminBank() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const DISCORD_URL = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      
      const { data: p } = await sb.from('profiles').select('rank').eq('id', user.id).single();
      if (p?.rank !== 'Admin') return window.location.href = '/dashboard';

      const { data, error } = await sb.from('transactions').select('*, profiles(username, balance)').eq('status', 'pending');
      if (error) console.error(error);
      
      setReqs(data || []);
      setLd(false);
    } catch (err) {
      setLd(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id: string, userId: string, amt: number, bal: number, name: string, action: 'completed' | 'denied') => {
    if (action === 'completed') {
      await sb.from('profiles').update({ balance: bal - amt }).eq('id', userId);
    }
    
    await sb.from('transactions').update({ status: action }).eq('id', id);

    await fetch(DISCORD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "CTFG Bank Authority",
        embeds: [{
          title: action === 'completed' ? "✅ SYNC APPROVED" : "❌ SYNC DENIED",
          description: `**User:** ${name}\n**Amount:** $${amt.toLocaleString()}\n**Action:** ${action.toUpperCase()}`,
          color: action === 'completed' ? 2253662 : 14423100,
          timestamp: new Date()
        }]
      })
    });
    load();
  };

  if (ld) return <div style={{background:'#0a0a0a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>AUTHORIZING...</div>;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', padding: '40px' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#444', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}><ArrowLeft size={16}/> BACK</button>
      
      <div style={{display:'flex', alignItems:'center', gap:'10px', borderBottom:'2px solid #dc2626', paddingBottom:'20px', marginBottom:'40px'}}>
        <ShieldAlert size={30} color="#dc2626"/>
        <h1 style={{margin:0}}>CTFG ADMIN BANK</h1>
      </div>

      {reqs.map((r: any) => (
        <div key={r.id} style={{ background: '#111', padding: '20px', marginBottom: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid #222', borderRadius:'8px' }}>
          <div>
            <p style={{margin:0, color:'#555', fontSize:'10px', letterSpacing:'1px'}}>OPERATOR</p>
            <p style={{fontSize:'18px', fontWeight:'bold', margin:0}}>{r.profiles?.username || 'Unknown'}</p>
          </div>
          
          <div style={{textAlign:'center'}}>
            <p style={{margin:0, color:'#555', fontSize:'10px', letterSpacing:'1px'}}>AMOUNT</p>
            <p style={{fontSize:'22px', fontWeight:'bold', color:'#eab308', margin:0}}>${r.amount?.toLocaleString()}</p>
          </div>

          <div style={{display:'flex', gap:'10px'}}>
            <button 
              onClick={()=>handleAction(r.id, r.user_id, r.amount, r.profiles?.balance || 0, r.profiles?.username || 'User', 'completed')} 
              style={{background:'#22c55e', color:'#000', padding:'10px 20px', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}
            >APPROVE</button>
            <button 
              onClick={()=>handleAction(r.id, r.user_id, r.amount, r.profiles?.balance || 0, r.profiles?.username || 'User', 'denied')} 
              style={{background:'#dc2626', color:'#fff', padding:'10px 20px', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}
            >DENY</button>
          </div>
        </div>
      ))}

      {reqs.length === 0 && (
        <div style={{textAlign:'center', padding:'100px 0', color:'#333'}}>
          <p>No pending bank requests found.</p>
        </div>
      )}
    </div>
  );
}
