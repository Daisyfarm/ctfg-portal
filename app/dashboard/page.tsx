Since you already have the connection logic handled (the lib/supabase.ts file with your keys), we need to make sure the Dashboard and Bank pages are clean, professional, and don't double-define the Supabase client.

Here is the complete, final code for your main files. I have stripped out the hardcoded keys and linked them to your sb export to ensure Vercel doesn't throw that "Redefinition" error.

1. The Main Dashboard (app/dashboard/page.tsx)
This is your "Command Center." I've kept it lightweight to ensure the build passes.

TypeScript
"use client";
import { useEffect, useState } from 'react';
import { sb } from '@/lib/supabase'; // This matches your new connection file
import { 
  LayoutDashboard, Map as MapIcon, Briefcase, LogOut, Cloud, 
  Radio, BarChart3, Truck, CheckCircle2, Hourglass, User 
} from 'lucide-react';

export default function Dash() {
  const [p, setP] = useState<any>(null); 
  const [tx, setTx] = useState<any[]>([]); 
  const [radio, setRadio] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';

      const [prRes, txRes, rdRes] = await Promise.all([
        sb.from('profiles').select('*').eq('id', user.id).single(),
        sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
        sb.from('dispatch').select('*').order('created_at', { ascending: false }).limit(1)
      ]);

      setP(prRes.data); 
      setTx(txRes.data || []); 
      setRadio(rdRes.data?.[0] || { message: 'Standby', sender: 'Dispatch' }); 
      setLd(false);
    } catch (err) {
      setLd(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSync = async (e: any) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    if (!amount || amount <= 0 || amount > p?.balance) return alert("Invalid amount or insufficient funds.");

    const { error } = await sb.from('transactions').insert([
      { user_id: p.id, amount: Number(amount), status: 'pending', type: 'sync_request' }
    ]);

    if (!error) {
        alert("Sync Request Sent!");
        e.target.reset();
        load(); 
    }
  };

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>SYNCING...</div>;
  
  const sBtn: any = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left', cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'10px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'25px', alignItems:'center' }}>
          <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{height:'35px'}} alt="Logo" />
          <span style={{fontSize:'12px', fontWeight:'bold', color:'#888'}}>CTFG PORTAL v1.0</span>
        </div>
        {p.rank === 'Admin' && (
          <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'8px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>
        )}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={{...sBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}><LayoutDashboard size={16}/> Dashboard</button>
          <button style={sBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Contracts</button>
          <button style={sBtn} onClick={()=>window.location.href='/logistics'}><Truck size={16}/> Logistics</button>
          <button style={sBtn} onClick={()=>window.location.href='/map'}><MapIcon size={16}/> Live Map</button>
          <div style={{marginTop:'20px', borderTop:'1px solid #333', paddingTop:'20px'}}>
             <button style={{...sBtn, color:'#dc2626'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
          </div>
        </div>

        <div style={{ flex:1, padding:'40px', position:'relative' }}>
          <div style={{ display:'flex', gap:'20px', marginBottom:'30px' }}>
            <div style={{ background:'#222', padding:'25px', borderRadius:'4px', flex:1, borderLeft:'4px solid #4a7ab5' }}>
              <p style={{margin:0, fontSize:'11px', color:'#888'}}>PORTAL BALANCE</p>
              <h1 style={{fontSize:'32px', color:'#22c55e', margin:'10px 0'}}>${p.balance?.toLocaleString()}</h1>
              <p style={{margin:0, fontSize:'12px', color:'#555'}}><User size={12} style={{display:'inline'}}/> {p.username}</p>
            </div>
            <div style={{ background:'#222', padding:'25px', borderRadius:'4px', flex:1, borderLeft:'4px solid #22c55e' }}>
              <p style={{margin:0, fontSize:'11px', color:'#22c55e', fontWeight:'bold'}}>QUICK SYNC</p>
              <form onSubmit={handleSync} style={{display:'flex', gap:'10px', marginTop:'15px'}}>
                <input name="amount" type="number" placeholder="Amount..." style={{flex:1, background:'#111', border:'1px solid #333', color:'#fff', padding:'8px'}} required />
                <button type="submit" style={{background:'#22c55e', color:'#000', border:'none', padding:'0 15px', fontWeight:'bold', cursor:'pointer'}}>SYNC</button>
              </form>
            </div>
          </div>

          <div style={{ background:'#222', padding:'20px', borderRadius:'4px' }}>
             <p style={{margin:'0 0 15px 0', fontSize:'11px', color:'#555', fontWeight:'bold'}}>RECENT ACTIVITY</p>
             {tx.map((t:any) => (
               <div key={t.id} style={{display:'flex', justifyContent:'space-between', padding:'12px', borderBottom:'1px solid #333'}}>
                 <span style={{fontSize:'13px'}}>{t.status === 'pending' ? <Hourglass size={14} color="#eab308"/> : <CheckCircle2 size={14} color="#22c55e"/>} {t.type}</span>
                 <span style={{fontWeight:'bold', color: t.status === 'pending' ? '#eab308' : '#22c55e'}}>${t.amount?.toLocaleString()}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
