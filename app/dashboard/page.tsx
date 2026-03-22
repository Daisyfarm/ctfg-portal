"use client";
import { useEffect, useState } from 'react';
// Changed from '@/lib/supabase' to relative path for better build compatibility
import { sb } from '../../lib/supabase';
import { LogOut, CheckCircle2, Hourglass } from 'lucide-react';

export default function Dash() {
  const [p, setP] = useState<any>(null); 
  const [tx, setTx] = useState<any[]>([]); 
  const [ld, setLd] = useState(true);

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const [prRes, txRes] = await Promise.all([
        sb.from('profiles').select('*').eq('id', user.id).single(),
        sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5)
      ]);
      setP(prRes.data); setTx(txRes.data || []); setLd(false);
    } catch (e) { setLd(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSync = async (e: any) => {
    e.preventDefault();
    const amt = Number(e.target.amount.value);
    if (!p || amt > p.balance) return alert("Insufficient Portal Funds!");
    const { error } = await sb.from('transactions').insert([{ user_id: p.id, amount: amt, status: 'pending', type: 'sync' }]);
    if (!error) { alert("Sync Request Sent to Admin!"); e.target.reset(); load(); }
  };

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>LOADING...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'sans-serif' }}>
      <div style={{ background:'#222', padding:'15px 30px', display:'flex', justifyContent:'space-between', borderBottom:'2px solid #4a7ab5' }}>
        <h2 style={{margin:0, fontSize:'18px'}}>CTFG PORTAL</h2>
        <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
          {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#dc2626', color:'#fff', border:'none', padding:'5px 15px', cursor:'pointer', fontWeight:'bold', borderRadius:'4px'}}>ADMIN PANEL</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'none', border:'none', color:'#888', cursor:'pointer'}}><LogOut size={18}/></button>
        </div>
      </div>
      <div style={{ maxWidth:'800px', margin:'40px auto', padding:'0 20px' }}>
        <div style={{ background:'#222', padding:'30px', borderRadius:'8px', borderLeft:'5px solid #4a7ab5', marginBottom:'20px' }}>
          <p style={{margin:0, color:'#888', fontSize:'12px'}}>WELCOME, {p.username}</p>
          <h1 style={{fontSize:'42px', color:'#22c55e', margin:'10px 0'}}>${p.balance?.toLocaleString()}</h1>
        </div>
        <div style={{ background:'#222', padding:'25px', borderRadius:'8px' }}>
          <h3>REQUEST GAME SYNC</h3>
          <form onSubmit={handleSync} style={{display:'flex', gap:'10px'}}>
            <input name="amount" type="number" placeholder="Enter Amount..." style={{flex:1, padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} required />
            <button style={{background:'#22c55e', color:'#000', border:'none', padding:'0 30px', fontWeight:'bold', cursor:'pointer'}}>SEND REQUEST</button>
          </form>
        </div>
        <div style={{ marginTop:'40px' }}>
          <p style={{color:'#555', fontWeight:'bold', fontSize:'12px'}}>RECENT LOGS</p>
          {tx.map((t:any) => (
            <div key={t.id} style={{ background:'#1a1a1a', padding:'15px', marginBottom:'10px', display:'flex', justifyContent:'space-between', borderRadius:'4px' }}>
              <span>{t.status === 'pending' ? <Hourglass size={14} color="#eab308"/> : <CheckCircle2 size={14} color="#22c55e"/>} {t.type.toUpperCase()}</span>
              <span style={{fontWeight:'bold', color: t.status === 'pending' ? '#eab308' : '#22c55e'}}>${t.amount?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
