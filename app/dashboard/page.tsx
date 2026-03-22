"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../lib/supabase";
import { LogOut, CheckCircle2, Hourglass, Landmark, Flower2 } from 'lucide-react';

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
    if (!p || amt > p.balance) return alert("Insufficient Farm Credits!");
    const { error } = await sb.from('transactions').insert([{ user_id: p.id, amount: amt, status: 'pending', type: 'sync' }]);
    if (!error) { alert("Sync Request Logged!"); e.target.reset(); load(); }
  };

  if (ld || !p) return <div style={{background:'#1c1c1c',color:'#f5f5dc',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'serif'}}>INITIALIZING NETWORK...</div>;

  return (
    <div style={{ background:'#1c1c1c', minHeight:'100vh', color:'#f5f5dc', fontFamily:'serif' }}>
      {/* VINTAGE HEADER */}
      <div style={{ background:'#262626', padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'3px double #d4af37' }}>
        <div>
          <h2 style={{margin:0, fontSize:'20px', letterSpacing:'2px', color:'#f5f5dc'}}>DAISY'S DREAM FARM NETWORK</h2>
          <p style={{margin:0, fontSize:'10px', color:'#d4af37', letterSpacing:'1px'}}>OPERATING SINCE 2024 • HARVESTING EXCELLENCE</p>
        </div>
        <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
          <button onClick={()=>window.location.href='/bank'} style={{background:'none', border:'1px solid #d4af37', color:'#f5f5dc', padding:'5px 15px', cursor:'pointer', fontSize:'12px'}}><Landmark size={14}/> THE VAULT</button>
          {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#d4af37', color:'#1c1c1c', border:'none', padding:'6px 15px', cursor:'pointer', fontWeight:'bold', fontSize:'12px'}}>AUTHORITY</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'none', border:'none', color:'#888', cursor:'pointer'}}><LogOut size={18}/></button>
        </div>
      </div>

      <div style={{ maxWidth:'800px', margin:'40px auto', padding:'0 20px' }}>
        {/* BALANCE CARD */}
        <div style={{ background:'#262626', padding:'40px', borderRadius:'15px', border:'1px solid #333', textAlign:'center', marginBottom:'30px', boxShadow:'0 10px 30px rgba(0,0,0,0.5)' }}>
          <Flower2 size={32} color="#d4af37" style={{marginBottom:'10px'}}/>
          <p style={{margin:0, color:'#888', fontSize:'12px', letterSpacing:'2px'}}>OPERATOR: {p.username.toUpperCase()}</p>
          <h1 style={{fontSize:'54px', color:'#8da989', margin:'15px 0', fontFamily:'serif'}}>${p.balance?.toLocaleString()}</h1>
          <div style={{height:'1px', background:'#333', width:'100px', margin:'0 auto'}}></div>
        </div>

        {/* SYNC FORM */}
        <div style={{ background:'#262626', padding:'25px', borderRadius:'8px', border:'1px solid #333' }}>
          <h3 style={{marginTop:0, color:'#d4af37', fontSize:'14px'}}>REQUEST NETWORK SYNC</h3>
          <form onSubmit={handleSync} style={{display:'flex', gap:'10px'}}>
            <input name="amount" type="number" placeholder="Credits..." style={{flex:1, padding:'12px', background:'#111', border:'1px solid #444', color:'#f5f5dc', fontFamily:'serif'}} required />
            <button style={{background:'#8da989', color:'#1c1c1c', border:'none', padding:'0 30px', fontWeight:'bold', cursor:'pointer', fontFamily:'serif'}}>SUBMIT LOG</button>
          </form>
        </div>

        {/* RECENT LOGS */}
        <div style={{ marginTop:'40px' }}>
          <p style={{color:'#555', fontWeight:'bold', fontSize:'11px', letterSpacing:'1px', borderBottom:'1px solid #333', paddingBottom:'5px'}}>TRANSACTION ARCHIVE</p>
          {tx.map((t:any) => (
            <div key={t.id} style={{ padding:'15px 0', borderBottom:'1px solid #262626', display:'flex', justifyContent:'space-between' }}>
              <span style={{fontSize:'14px', color:'#aaa'}}>{t.status === 'pending' ? '🕒' : '💎'} {t.type.toUpperCase()}</span>
              <span style={{fontWeight:'bold', color: t.status === 'pending' ? '#eab308' : '#8da989'}}>${t.amount?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
