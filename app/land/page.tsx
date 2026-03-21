"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Map, Landmark, ArrowLeft, Clock, Cloud, LogOut, Briefcase, TrendingUp, Tractor, ChevronDown, ShieldCheck, Globe } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LandRegistry() {
  const [land, setLand] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
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

  const buy = async (field: any) => {
    if (!u) return alert("Login required.");
    if (u.balance < field.price) return alert("Insufficient capital for this acquisition.");

    if (confirm(`Acquire Field ${field.field_number} for $${field.price.toLocaleString()}?`)) {
      await sb.from('profiles').update({ balance: u.balance - field.price }).eq('id', u.id);
      await sb.from('land_registry').update({ owner_id: u.id }).eq('id', field.id);
      await sb.from('transactions').insert([{ user_id: u.id, amount: field.price, type: 'expense', description: `Acquired Field ${field.field_number}` }]);
      
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🏡 **LAND ACQUISITION**\n**${u.username}** has officially purchased **Field ${field.field_number}** for **$${field.price.toLocaleString()}**!` 
      })});

      alert("Acquisition Successful."); load();
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Accessing Land Registry...</div>;

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
        {u.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/sell'}><TrendingUp size={16}/> Crop Sales</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Account</p>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'#1a1a1a', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'30px' }}>
                <div>
                    <p style={{margin:0, color:'#4a7ab5', fontWeight:'bold', fontSize:'12px', textTransform:'uppercase'}}>Montana Judith Plains</p>
                    <h1 style={{margin:0, fontSize:'32px'}}>Land Registry</h1>
                </div>
                <div style={{textAlign:'right'}}>
                    <p style={{margin:0, color:'#888', fontSize:'11px'}}>PERSONAL CAPITAL</p>
                    <h2 style={{margin:0, color:'#22c55e', fontSize:'32px', fontFamily:'monospace'}}>${u.balance?.toLocaleString()}</h2>
                </div>
            </div>

            {/* LAND GRID */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' }}>
              {land.map(f => (
                <div key={f.id} style={{ background:'#222', borderRadius:'4px', borderTop: f.owner_id ? '4px solid #4a7ab5' : '4px solid #22c55e', overflow:'hidden', boxShadow:'0 4px 10px rgba(0,0,0,0.3)' }}>
                  <img src={f.image_url || '/map.PNG'} style={{ width:'100%', height:'140px', objectFit:'cover', opacity:0.7 }} />
                  <div style={{ padding:'20px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <h3 style={{margin:0, fontSize:'18px'}}>Field {f.field_number}</h3>
                        <span style={{fontSize:'12px', color:'#aaa'}}>{f.acres} Acres</span>
                    </div>
                    <p style={{ fontSize:'22px', fontWeight:'bold', color:'#fff', margin:'15px 0', fontFamily:'monospace' }}>${f.price?.toLocaleString()}</p>
                    
                    {f.owner_id ? (
                        <div style={{ background:'#111', padding:'10px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' }}>
                            <Globe size={14} color="#4a7ab5" />
                            <span style={{fontSize:'12px', color:'#888'}}>Owner: <b style={{color:'#fff'}}>{f.profiles?.username}</b></span>
                        </div>
                    ) : (
                        <button onClick={()=>buy(f)} style={{ width:'100%', padding:'12px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase', fontSize:'12px', borderRadius:'2px' }}>Acquire Field</button>
                    )}
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
