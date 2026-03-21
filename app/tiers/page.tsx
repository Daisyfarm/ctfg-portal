"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Crown, Check, Star, ArrowLeft, Shield, Landmark } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function TierCenter() {
  const [p, setP] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setP(data);
    }
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  const buy = async (name: string, cost: number) => {
    if (confirm(`Confirm $${cost.toLocaleString()} for 30-day ${name} status?`)) {
      const { error } = await sb.rpc('buy_sub', { p_id: p.id, t_name: name, t_cost: cost });
      if (error) alert(error.message);
      else {
        await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({
          content: `👑 **PROMOTION ALERT**\n**${p.username}** has just been promoted to **${name}**! They now have network authority.`
        })});
        alert("Tier Activated! Enjoy your perks.");
        load();
      }
    }
  };

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Treasury...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'15px 25px', borderBottom:'2px solid #4a7ab5', display:'flex', justifyContent:'space-between' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', cursor:'pointer'}}>CTFG NETWORK</span>
        <div style={{textAlign:'right'}}>
            <p style={{margin:0, fontSize:'10px', color:'#888'}}>BALANCE</p>
            <p style={{margin:0, color:'#22c55e', fontWeight:'bold'}}>${p.balance?.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/tiers'}>Promotion Center</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, padding:'40px', background:'rgba(20,20,20,0.8)' }}>
          <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Promotion Center</h1>
          <p style={{color:'#aaa', marginBottom:'40px'}}>Current Status: <b style={{color:'#4a7ab5'}}>{p.sub_tier || 'Farmer'}</b></p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px' }}>
            
            {/* CONTRACTOR */}
            <div style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #f59e0b' }}>
              <h2 style={{color:'#f59e0b', margin:0}}>CONTRACTOR</h2>
              <h3 style={{fontSize:'32px', margin:'10px 0'}}>$150,000 <small style={{fontSize:'12px', color:'#555'}}>/ 30 days</small></h3>
              <ul style={{fontSize:'14px', color:'#aaa', lineHeight:'2', paddingLeft:'15px'}}>
                <li><Check size={14} color="#22c55e"/> 1 Dedicated Farm Slot</li>
                <li><Check size={14} color="#22c55e"/> Ability to Post Sub-Contracts</li>
                <li><Check size={14} color="#22c55e"/> Private Marketplace Access</li>
              </ul>
              <button onClick={()=>buy('Contractor', 150000)} style={{width:'100%', padding:'15px', background:'#f59e0b', color:'#000', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>UPGRADE NOW</button>
            </div>

            {/* MAYOR */}
            <div style={{ background:'#222', padding:'30px', borderRadius:'4px', borderTop:'4px solid #22c55e' }}>
              <h2 style={{color:'#22c55e', margin:0}}>MAYOR</h2>
              <h3 style={{fontSize:'32px', margin:'10px 0'}}>$500,000 <small style={{fontSize:'12px', color:'#555'}}>/ 30 days</small></h3>
              <ul style={{fontSize:'14px', color:'#fff', lineHeight:'2', paddingLeft:'15px'}}>
                <li><Star size={14} color="#facc15"/> <b>2 Farm Slots (Over 2 Servers)</b></li>
                <li><Check size={14} color="#22c55e"/> Tax Exemption on All Land</li>
                <li><Check size={14} color="#22c55e"/> Custom Radio Frequency Access</li>
              </ul>
              <button onClick={()=>buy('Mayor', 500000)} style={{width:'100%', padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>CLAIM MAYORSHIP</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
