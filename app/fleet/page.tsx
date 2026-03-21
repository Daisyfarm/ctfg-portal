"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, ShieldCheck, ChevronDown, Wrench, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function EquipmentPage() {
  const [fleet, setFleet] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: fleetData } = await sb.from('fleet').select('*').eq('owner_id', user.id).order('machinery_name');
        setFleet(fleetData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Retrieving Equipment Registry...</div>;

  const sideBtn = { width:'100%', padding:'15px', background:'#5b84c1', color:'#fff', border:'none', marginBottom:'10px', textAlign:'center' as const, cursor:'pointer', fontWeight:'bold', fontSize:'13px', textTransform:'uppercase' as const, borderRadius:'2px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> Montana: {w || '--°F'}</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>Finances</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>Market</span>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR MATCHING SCREENSHOT */}
        <div style={{ width:'240px', background:'#333', padding:'20px', borderRight:'1px solid #111' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Field Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/sell'}>Crop Sales</button>
          <button style={sideBtn}>Crop Insurance</button>
          <button style={sideBtn}>Permits</button>
          <button style={sideBtn}>Agreements</button>
          <button style={{...sideBtn, background:'#4a7ab5'}} onClick={()=>window.location.href='/fleet'}>Equipment</button>
          <button style={sideBtn}>Task Management</button>
          <button style={{...sideBtn, background:'#555', marginTop:'20px'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT Area Matching Screenshot */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
            
            {/* CONTENT CARD */}
            <div style={{ background:'rgba(40,40,40,0.9)', padding:'35px', borderRadius:'2px', minHeight:'400px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px' }}>
                    <h1 style={{fontSize:'36px', margin:0, textTransform:'uppercase'}}>Equipment</h1>
                    <button style={{ background:'#f59e0b', color:'#000', border:'none', padding:'10px 40px', fontWeight:'bold', fontSize:'12px', textTransform:'uppercase' }}>Next Page</button>
                </div>

                <p style={{fontSize:'12px', color:'#ccc', maxWidth:'900px', lineHeight:'1.6', margin:'0 0 30px'}}>
                    THIS IS YOUR EQUIPMENT AREA. HERE YOU CAN VIEW YOUR EQUIPMENT DETAILS, AND ABOVE YOUR EQUIPMENT TABLE, YOU WILL SEE ANY ORDERS YOU HAVE, OR AUCTIONS YOU HAVE WON THAT ARE PENDING PROCESSING AND DELIVERY. YOU CAN VIEW YOUR ENTIRE LIST OF EQUIPMENT BELOW, OR FILTER IT BY IT'S CURRENT SERVER LOCATION, OR IT'S CATEGORY. CLICK ON ANY VEHICLE TO GET MORE IN DEPTH INFORMATION ON IT.
                </p>

                <h2 style={{fontSize:'24px', marginBottom:'20px', fontWeight:'normal'}}>Equipment Owned</h2>

                {fleet.length === 0 ? (
                    <div style={{ marginTop:'20px' }}>
                        <h3 style={{ fontSize:'20px', textTransform:'uppercase' }}>Whoops. It looks like you don't have any equipment yet. What a pity!</h3>
                    </div>
                ) : (
                    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                        {fleet.map(item => (
                            <div key={item.id} style={{ background:'rgba(20,20,20,0.8)', padding:'20px', borderLeft:'5px solid #4a7ab5', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                <div>
                                    <h4 style={{margin:0, fontSize:'18px', color:'#fff'}}>{item.machinery_name}</h4>
                                    <p style={{margin:'5px 0 0 0', fontSize:'11px', color:'#888'}}>{item.category} • Condition: {item.condition}%</p>
                                </div>
                                <div style={{ display:'flex', gap:'10px' }}>
                                    <button onClick={()=>window.location.href='/fleet'} style={{ background:'#333', border:'1px solid #555', color:'#fff', padding:'5px 15px', fontSize:'11px', fontWeight:'bold' }}>DETAILS</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
      
      {/* FOOTER */}
      <div style={{ background:'#1a1a1a', padding:'20px', textAlign:'center', fontSize:'11px', color:'#888', borderTop:'1px solid #333' }}>
        CTFG FARM NETWORK © 2026 • BUILT BY SAMUEL FOUNDER
      </div>
    </div>
  );
}
