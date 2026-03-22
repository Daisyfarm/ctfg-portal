"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Briefcase, 
  LogOut, 
  Cloud, 
  Radio, 
  BarChart3, 
  Truck, 
  CheckCircle2, 
  Hourglass,
  User
} from 'lucide-react';

// Initialize Supabase
const sb = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dash() {
  const [p, setP] = useState<any>(null); 
  const [tx, setTx] = useState<any[]>([]); 
  const [w, setW] = useState<string>("");
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

      fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit')
        .then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
        
      setLd(false);
    } catch (err) {
      setLd(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSyncRequest = async (e: any) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    if (!amount || amount <= 0) return alert("Enter valid amount");
    if (Number(amount) > (p?.balance || 0)) return alert("Insufficient funds in Portal.");

    const { error } = await sb.from('transactions').insert([
      { user_id: p.id, amount: Number(amount), status: 'pending', type: 'sync_request' }
    ]);

    if (error) {
        alert("Database Error: " + error.message);
    } else {
        alert(`Sync Request for $${Number(amount).toLocaleString()} Sent!`);
        e.target.reset();
        load(); 
    }
  };

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center', fontFamily:'monospace'}}>SYNCING CTFG NETWORK...</div>;
  
  const sBtn: any = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left', cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* NAVIGATION */}
      <div style={{ background:'#222', padding:'10px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'25px', alignItems:'center' }}>
          <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{height:'40px', borderRadius:'4px'}} alt="Logo" />
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> MONTANA: {w || '--°F'}</span>
          </div>
        </div>
        {p.rank === 'Admin' && (
          <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'8px 20px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>
        )}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000', overflowY:'auto' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', letterSpacing:'1px'}}>OPERATIONS</p>
          <button style={{...sBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}><LayoutDashboard size={16}/> Dashboard</button>
          <button style={sBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sBtn} onClick={()=>window.location.href='/logistics'}><Truck size={16} color="#3b82f6"/> Trucking</button>
          <button style={sBtn} onClick={()=>window.location.href='/map'}><MapIcon size={16}/> Live Map</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px'}}>FINANCE</p>
          <button style={sBtn} onClick={()=>window.location.href='/accounting'}><BarChart3 size={16}/> Accounting</button>
          <button style={{...sBtn, background:'#1a1a1a', marginTop:'20px', color:'#dc2626'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        <div style={{ flex:1, position:'relative', overflowY:'auto' }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'450px', objectFit:'cover', opacity:0.15, position:'absolute' }} alt="Background" />
          <div style={{ position:'relative', zIndex:1, padding:'40px' }}>
            <div style={{ background:'rgba(220,38,38,0.1)', border:'1px solid #dc2626', padding:'15px', borderRadius:'4px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'15px' }}>
              <Radio size={20} color="#dc2626" />
              <p style={{ margin:0, fontSize:'13px' }}><span style={{color:'#dc2626', fontWeight:'bold'}}>DISPATCH:</span> {radio?.message || "Standby"}</p>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'25px' }}>
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', minWidth:'380px', borderLeft:'6px solid #4a7ab5' }}>
                <p style={{ margin:0, fontSize:'11px', color:'#888' }}>PORTAL BALANCE</p>
                <h2 style={{ margin:'5px 0', fontSize:'22px' }}><User size={14} style={{display:'inline', marginRight:'5px'}} />{p?.username}</h2>
                <h1 style={{ fontSize:'48px', margin:0, color:'#22c55e', fontFamily:'monospace' }}>${p?.balance?.toLocaleString() || '0'}</h1>
              </div>

              <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', minWidth:'380px', borderLeft:'6px solid #22c55e' }}>
                <p style={{ margin:0, fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}>BANKING TERMINAL</p>
                <h3 style={{ margin:'5px 0 15px 0', fontSize:'16px' }}>REQUEST GAME SYNC</h3>
                <form onSubmit={handleSyncRequest} style={{ display:'flex', gap:'10px' }}>
                  <input name="amount" type="number" placeholder="AMOUNT..." style={{ flex:1, background:'#111', border:'1px solid #333', color:'#fff', padding:'10px', outline:'none', fontFamily:'monospace' }} required />
                  <button type="submit" style={{ background:'#22c55e', color:'#000', border:'none', padding:'0 20px', fontWeight:'bold', cursor:'pointer' }}>SYNC</button>
                </form>
              </div>

              <div style={{ background:'rgba(0,0,0,0.85)', padding:'25px', borderRadius:'4px', width:'100%', maxWidth:'815px', borderTop:'2px solid #333' }}>
                <p style={{ margin:'0 0 15px 0', fontSize:'11px', color:'#555', fontWeight:'bold' }}>RECENT ACTIVITY</p>
                {tx.map((t: any) => (
                  <div key={t.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#111', padding:'12px 20px', borderRadius:'4px', border:'1px solid #222', marginBottom:'10px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
                      {t.status === 'pending' ? <Hourglass size={16} color="#eab308" /> : <CheckCircle2 size={16} color="#22c55e" />}
                      <p style={{ margin:0, fontSize:'12px', fontWeight:'bold' }}>{t.type === 'sync_request' ? 'Game Sync' : 'Payroll'}</p>
                    </div>
                    <p style={{ margin:0, fontSize:'14px', color: t.status === 'pending' ? '#eab308' : '#22c55e', fontWeight:'bold' }}>${t.amount?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
