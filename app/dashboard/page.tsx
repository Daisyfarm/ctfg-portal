"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../lib/supabase"; 
import { LogOut, Landmark, Flower2, Hourglass, CheckCircle2 } from 'lucide-react';

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

  if (ld || !p) return <div style={{background:'#1c1c1c',color:'#f5f5dc',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'serif'}}>INITIALIZING NETWORK...</div>;

  return (
    <div style={{ background:'#1c1c1c', minHeight:'100vh', color:'#f5f5dc', fontFamily:'serif' }}>
      <div style={{ background:'#262626', padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'3px double #d4af37' }}>
        <div>
          <h2 style={{margin:0, fontSize:'18px', letterSpacing:'2px'}}>DAISY'S DREAM FARM NETWORK</h2>
          <p style={{margin:0, fontSize:'9px', color:'#d4af37'}}>HARVESTING EXCELLENCE</p>
        </div>
        <div style={{display:'flex', gap:'15px'}}>
          <button onClick={()=>window.location.href='/bank'} style={{background:'none', border:'1px solid #d4af37', color:'#f5f5dc', padding:'5px 15px', cursor:'pointer', fontSize:'11px'}}><Landmark size={14}/> THE VAULT</button>
          {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#d4af37', color:'#1c1c1c', border:'none', padding:'6px 15px', cursor:'pointer', fontWeight:'bold', fontSize:'11px'}}>AUTHORITY</button>}
          <button onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')} style={{background:'none', border:'none', color:'#888', cursor:'pointer'}}><LogOut size={18}/></button>
        </div>
      </div>

      <div style={{ maxWidth:'600px', margin:'60px auto', textAlign:'center' }}>
        <Flower2 size={32} color="#d4af37" style={{marginBottom:'20px'}}/>
        <p style={{margin:0, color:'#555', fontSize:'11px', letterSpacing:'2px'}}>OPERATOR: {p.username.toUpperCase()}</p>
        <h1 style={{fontSize:'64px', color:'#8da989', margin:'10px 0'}}>${p.balance?.toLocaleString()}</h1>
        
        <div style={{marginTop:'40px'}}>
          <p style={{color:'#444', fontSize:'10px', letterSpacing:'1px', borderBottom:'1px solid #333', paddingBottom:'5px'}}>RECENT LOGS</p>
          {tx.map((t:any) => (
            <div key={t.id} style={{ padding:'12px 0', borderBottom:'1px solid #262626', display:'flex', justifyContent:'space-between' }}>
              <span style={{fontSize:'13px', color:'#777'}}>{t.status === 'pending' ? <Hourglass size={12}/> : <CheckCircle2 size={12}/>} SYNC</span>
              <span style={{fontWeight:'bold', color: t.status === 'pending' ? '#d4af37' : '#8da989'}}>${t.amount?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
