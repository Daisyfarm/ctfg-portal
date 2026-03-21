"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ChevronDown, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, Landmark, Info } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LandDeeds() {
  const [u, setU] = useState<any>(null);
  const [land, setLand] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data: landData } = await sb.from('land_registry').select('*, profiles(username)').order('field_number');
    setLand(landData || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Retrieving Land Deed Records...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

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
        <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Account</p>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT Area Matching Screenshot */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
            <h1 style={{fontSize:'36px', margin:0, textTransform:'uppercase'}}>Land Deed Data</h1>
            <p style={{fontSize:'12px', color:'#ccc', maxWidth:'900px', lineHeight:'1.6', margin:'15px 0 30px'}}>
              HERE YOU CAN VIEW ALL LANDS IN CTFG, AND WHO CURRENTLY OWNS THEM. LIKEWISE, IN THE NEAR FUTURE, YOU WILL BE ABLE TO VIEW LAND HISTORY DETAILS. JUST SELECT THE MAP FROM THE DROPDOWN LIST TO SEE ALL LAND ASSOCIATED WITH THAT MAP!
            </p>

            {/* DROPDOWN SELECTOR */}
            <div style={{ background:'#fff', padding:'2px', borderRadius:'2px', display:'flex', width:'100%', marginBottom:'15px' }}>
                <select style={{ flex:1, border:'none', padding:'12px', fontSize:'14px', textTransform:'uppercase', background:'#fff', color:'#333' }}>
                    <option>Montana Judith Plains 4X - Judith Basin County</option>
                </select>
                <div style={{ padding:'10px', display:'flex', alignItems:'center', background:'#fff' }}>
                    <ChevronDown size={20} color="#333" />
                </div>
            </div>

            <button style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontSize:'13px', fontWeight:'bold', cursor:'pointer', marginBottom:'40px', borderRadius:'2px' }}>
                VIEW LAND INFO
            </button>

            {/* DATA TABLE HEADER */}
            <div style={{ display:'flex', borderBottom:'1px solid #fff', padding:'10px 0', fontSize:'16px', fontWeight:'bold', textTransform:'uppercase', color:'#ddd' }}>
                <div style={{ width:'250px' }}>UID/Image</div>
                <div style={{ width:'150px' }}>Base Cost</div>
                <div style={{ flex:1 }}>Fields</div>
                <div style={{ width:'200px', textAlign:'right' }}>Current Owner</div>
            </div>

            {/* LAND ROWS */}
            <div style={{ display:'flex', flexDirection:'column' }}>
              {land.map(f => (
                <div key={f.id} style={{ display:'flex', alignItems:'center', padding:'20px 0', background:'rgba(30,30,30,0.6)', borderBottom:'1px solid #222', marginBottom:'2px' }}>
                  
                  {/* UID/IMAGE */}
                  <div style={{ width:'250px' }}>
                    <img src={f.image_url || '/map.PNG'} style={{ width:'200px', height:'120px', objectFit:'cover', border:'1px solid #444' }} />
                    <p style={{ margin:'5px 0 0 0', fontSize:'18px', color:'#fff' }}>{f.field_number * 100}</p>
                  </div>

                  {/* COST */}
                  <div style={{ width:'150px', fontSize:'18px', color:'#ddd' }}>
                    ${f.price?.toLocaleString()}
                  </div>

                  {/* FIELD INFO */}
                  <div style={{ flex:1, fontSize:'18px', color:'#ddd' }}>
                    #{f.field_number} - {f.acres} Acres
                  </div>

                  {/* OWNER */}
                  <div style={{ width:'200px', textAlign:'right', fontSize:'18px', textTransform:'uppercase', color:'#aaa' }}>
                    {f.profiles?.username || 'CTFG LAND'}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
