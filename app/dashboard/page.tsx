"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wallet, Tractor, Send, Map, Clock, Briefcase, Landmark, Trophy, LogOut, ChevronDown } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [s, setS] = useState<any>(null);
  const [ld, setLd] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setP(prof);
      fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
      setLd(false);
    };
    load();
  }, []);

  if (ld) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Network...</div>;

  const sidebarBtn = { width:'100%', padding:'15px', background:'#4a7ab5', color:'#fff', border:'none', marginBottom:'10px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'13px', textTransform:'uppercase' as const };

  return (
    <div style={{ background:'#222', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP NAVIGATION BAR */}
      <div style={{ background:'#333', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'20px', fontSize:'13px', textTransform:'uppercase', fontWeight:'bold', color:'#aaa' }}>
          <span style={{color:'#fff', cursor:'pointer'}}>Myself <ChevronDown size={12}/></span>
          <span style={{cursor:'pointer'}}>Interactions <ChevronDown size={12}/></span>
          <span style={{cursor:'pointer'}} onClick={()=>window.location.href='/bank'}>Finances <ChevronDown size={12}/></span>
          <span style={{cursor:'pointer'}} onClick={()=>window.location.href='/marketplace'}>Market <ChevronDown size={12}/></span>
        </div>
        <button onClick={()=>window.location.href='/admin'} style={{background:'#4a7ab5', border:'none', color:'#fff', padding:'5px 15px', fontSize:'12px', fontWeight:'bold', cursor:'pointer'}}>STAFF OFFICE</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#333', padding:'20px', borderRight:'1px solid #111' }}>
          <button style={sidebarBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sidebarBtn} onClick={()=>window.location.href='/land'}>Field Management</button>
          <button style={sidebarBtn} onClick={()=>window.location.href='/sell'}>Crop Sales</button>
          <button style={sidebarBtn} onClick={()=>window.location.href='/fleet'}>Equipment</button>
          <button style={sidebarBtn} onClick={()=>window.location.href='/map'}>Live Map</button>
          <button style={{...sidebarBtn, background:'#555'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          {/* LARGE BACKGROUND IMAGE */}
          <img src="https://images.unsplash.com/photo-1594398044700-eb44808358ae?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.6, position:'absolute' }} />
          
          <div style={{ position:'relative', zIndex:1, padding:'40px' }}>
            {/* OVERLAY CARDS */}
            <div style={{ background:'rgba(0,0,0,0.7)', padding:'30px', borderRadius:'5px', maxWidth:'500px', borderLeft:'5px solid #4a7ab5' }}>
              <p style={{ margin:0, fontSize:'14px', color:'#aaa' }}>{p?.username} • {p?.rank}</p>
              <h1 style={{ fontSize:'48px', margin:'10px 0' }}>${p?.balance?.toLocaleString()}</h1>
              
              <div style={{ marginTop:'20px', display:'flex', gap:'15px', alignItems:'center' }}>
                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: s?.slots?.used > 0 ? '#22c55e' : '#ff4d4d' }}></div>
                <span style={{fontSize:'14px'}}>{s ? `Montana Server: ${s.slots.used}/${s.slots.capacity} Online` : 'Server Offline'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background:'#1a1a1a', padding:'15px', textAlign:'center', fontSize:'11px', color:'#666', borderTop:'1px solid #333' }}>
        CTFG FARM NETWORK © 2026 • BUILT BY SAMUEL FOUNDER
      </div>
    </div>
  );
}
