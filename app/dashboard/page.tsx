"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, RefreshCcw, Send, Map, Clock, Briefcase, Landmark, LogOut, Sun, CloudRain, Wind, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
    setP(pr);
    
    // Fetch Game Server Data
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Establishing Link...</div>;

  // FORMAT GAME TIME (dayTime 1170.94 -> 00:19)
  const gameMinutes = Math.floor((s?.server?.dayTime || 0) / 60);
  const hours = Math.floor(gameMinutes / 60);
  const minutes = gameMinutes % 60;
  const timeDisplay = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Clock size={14} color="#4a7ab5"/> GAME TIME: {timeDisplay}</span>
            <span style={{color:'#f59e0b'}}>DAY: {s?.server?.currentDay || '50'}</span>
          </div>
        </div>
        <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Map size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.2, position:'absolute' }} />
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px' }}>
            
            {/* SEVERE WEATHER ALERT - Dynamic based on your XML data */}
            <div style={{ background:'rgba(220,38,38,0.2)', border:'1px solid #dc2626', padding:'15px', borderRadius:'4px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'15px' }}>
              <AlertTriangle size={24} color="#dc2626" className="animate-bounce" />
              <div style={{ textAlign:'left' }}>
                <p style={{ margin:0, fontSize:'10px', color:'#dc2626', fontWeight:'bold', textTransform:'uppercase' }}>Judith Basin Weather Warning</p>
                <p style={{ margin:0, fontSize:'14px', color:'#fff', fontWeight:'bold' }}>TWISTER FORECASTED FOR DAY 42-46. SEEK SHELTER FOR EQUIPMENT.</p>
              </div>
            </div>

            <div style={{ display:'flex', gap:'20px', marginBottom:'20px' }}>
              {/* BALANCE CARD */}
              <div style={{ background:'rgba(0,0,0,0.8)', padding:'30px', borderRadius:'4px', width:'400px', borderLeft:'6px solid #4a7ab5' }}>
                <p style={{ margin:0, fontSize:'11px', color:'#888', textTransform:'uppercase' }}>Welcome back, Operator</p>
                <h2 style={{ margin:'5px 0', fontSize:'24px', color:'#fff' }}>{p.username}</h2>
                <div style={{ height:'1px', background:'#333', margin:'15px 0' }}></div>
                <h1 style={{ fontSize:'42px', margin:0, color:'#22c55e', fontFamily:'monospace' }}>${p.balance?.toLocaleString()}</h1>
              </div>

              {/* LIVE SERVER STATUS */}
              <div style={{ background:'rgba(0,0,0,0.8)', padding:'30px', borderRadius:'4px', width:'300px', borderLeft:'6px solid #22c55e' }}>
                <p style={{ margin:0, fontSize:'11px', color:'#888', textTransform:'uppercase' }}>Montana Server Status</p>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', margin:'10px 0' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: s?.slots?.used > 0 ? '#22c55e' : '#ff4d4d' }}></div>
                  <span style={{fontSize:'18px', fontWeight:'bold'}}>{s ? `${s.slots.used} / ${s.slots.capacity} Active` : 'Offline'}</span>
                </div>
                <p style={{fontSize:'12px', color:'#aaa', margin:0}}>Map: {s?.server?.mapName || 'Montana Map 4x'}</p>
                {s?.slots?.players?.filter((pl:any)=>pl.isUsed).map((pl:any)=>(
                  <p key={pl.name} style={{fontSize:'11px', color:'#22c55e', margin:'5px 0'}}>🚜 {pl.name}</p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
