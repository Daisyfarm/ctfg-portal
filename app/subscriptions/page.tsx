"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Zap, Check, Crown, Star, ArrowLeft, Cloud, LogOut, Briefcase, Map, Landmark, Tractor, ChevronDown } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Subscriptions() {
  const [u, setU] = useState<any>(null);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  useEffect(() => {
    const load = async () => {
        const { data: { user } } = await sb.auth.getUser();
        if (user) {
            const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
            setU(profile);
        }
        fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
        setLd(false);
    };
    load();
  }, []);

  const buyTier = async (name: string, cost: number) => {
    if (confirm(`Authorize $${cost.toLocaleString()} monthly for ${name} status?`)) {
        const { error } = await sb.rpc('process_promotion', { p_id: u.id, tier_name: name, cost: cost });
        if (error) alert(error.message);
        else {
            await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
                content: `👑 **NETWORK PROMOTION**\n**${u.username}** has just attained **${name}** status! Respect the new authority.` 
            })});
            alert("Promotion Active!"); window.location.href = '/dashboard';
        }
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Treasury...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
        </div>
        <div style={{textAlign:'right'}}>
            <p style={{margin:0, fontSize:'10px', color:'#888'}}>CURRENT CAPITAL</p>
            <p style={{margin:0, color:'#22c55e', fontWeight:'bold'}}>${u.balance?.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/subscriptions'}><Crown size={16} color="#f59e0b"/> Subscriptions</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Network Tiers</h1>
            <p style={{color:'#aaa', marginBottom:'40px'}}>Support the CTFG Network and unlock advanced operational capabilities.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'30px' }}>
              
              {/* TIER 1 - CONTRACTOR */}
              <div style={{ background:'rgba(30,30,30,0.95)', padding:'30px', borderRadius:'4px', borderTop:'4px solid #aaa' }}>
                <h3 style={{margin:0, color:'#aaa'}}>CONTRACTOR</h3>
                <h2 style={{fontSize:'32px', margin:'10px 0'}}>$100,000 <small style={{fontSize:'12px', color:'#555'}}>/ month</small></h2>
                <div style={{ height:'1px', background:'#333', margin:'20px 0' }}></div>
                <ul style={{fontSize:'13px', color:'#ccc', paddingLeft:'15px', lineHeight:'2.5'}}>
                    <li><Check size={14} color="#22c55e"/> Standard Job Access</li>
                    <li><Check size={14} color="#22c55e"/> 1 Farm Slot (Montana)</li>
                    <li><Check size={14} color="#22c55e"/> Direct Bank Sync</li>
                </ul>
                <button onClick={()=>buyTier('Contractor', 100000)} style={{width:'100%', padding:'15px', background:'#aaa', color:'#000', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>CURRENT STATUS</button>
              </div>

              {/* TIER 2 - FARM MANAGER */}
              <div style={{ background:'rgba(30,30,30,0.95)', padding:'30px', borderRadius:'4px', borderTop:'4px solid #f59e0b', boxShadow:'0 10px 30px rgba(0,0,0,0.5)' }}>
                <h3 style={{margin:0, color:'#f59e0b'}}>FARM MANAGER</h3>
                <h2 style={{fontSize:'32px', margin:'10px 0'}}>$250,000 <small style={{fontSize:'12px', color:'#555'}}>/ month</small></h2>
                <div style={{ height:'1px', background:'#333', margin:'20px 0' }}></div>
                <ul style={{fontSize:'13px', color:'#ccc', paddingLeft:'15px', lineHeight:'2.5'}}>
                    <li><Check size={14} color="#f59e0b"/> High-Pay Contracts</li>
                    <li><Check size={14} color="#f59e0b"/> 1 Dedicated Farm Slot</li>
                    <li><Check size={14} color="#f59e0b"/> Land Registry Access</li>
                    <li><Check size={14} color="#f59e0b"/> Special Discord Role</li>
                </ul>
                <button onClick={()=>buyTier('Farm Manager', 250000)} style={{width:'100%', padding:'15px', background:'#f59e0b', color:'#000', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>UPGRADE NOW</button>
              </div>

              {/* TIER 3 - MAYOR */}
              <div style={{ background:'rgba(30,30,30,0.95)', padding:'30px', borderRadius:'4px', borderTop:'4px solid #22c55e', boxShadow:'0 0 20px rgba(34,197,94,0.2)' }}>
                <h3 style={{margin:0, color:'#22c55e'}}>MAYOR</h3>
                <h2 style={{fontSize:'32px', margin:'10px 0'}}>$650,000 <small style={{fontSize:'12px', color:'#555'}}>/ month</small></h2>
                <div style={{ height:'1px', background:'#333', margin:'20px 0' }}></div>
                <ul style={{fontSize:'13px', color:'#fff', paddingLeft:'15px', lineHeight:'2.5'}}>
                    <li><Crown size={14} color="#facc15"/> <b>2 Farm Slots (Over 2 Servers)</b></li>
                    <li><Check size={14} color="#22c55e"/> Tax Exemption on Land</li>
                    <li><Check size={14} color="#22c55e"/> Radio Dispatch Access</li>
                    <li><Check size={14} color="#22c55e"/> Custom Fleet Badge</li>
                </ul>
                <button onClick={()=>buyTier('Mayor', 650000)} style={{width:'100%', padding:'15px', background:'#22c55e', color:'#000', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>CLAIM MAYORSHIP</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
