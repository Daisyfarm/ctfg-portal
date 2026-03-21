"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Crown, Star, Check, ArrowLeft, Cloud, LogOut, Briefcase, Map, Landmark, Tractor, Shield } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Subscriptions() {
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

  const buyTier = async (tier: string, cost: number) => {
    if (confirm(`Authorize monthly payment of $${cost.toLocaleString()} for ${tier} status?`)) {
      const { error } = await sb.rpc('buy_subscription', { p_id: p.id, tier_name: tier, cost: cost });
      if (error) alert(error.message);
      else {
        await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({
          content: `👑 **NETWORK PROMOTION**\n**${p.username}** has just attained **${tier}** status! Respect the new authority.`
        })});
        alert("Subscription Active!"); load();
      }
    }
  };

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Verifying Membership...</div>;

  const cardStyle = { background:'rgba(30,30,30,0.9)', padding:'30px', borderRadius:'4px', borderTop:'4px solid #4a7ab5', display:'flex', flexDirection:'column' as const, gap:'15px' };
  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
        <div style={{textAlign:'right'}}>
            <p style={{margin:0, fontSize:'10px', color:'#888'}}>CURRENT BALANCE</p>
            <p style={{margin:0, color:'#22c55e', fontWeight:'bold'}}>${p.balance?.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={{...sideBtn, background:'#4a7ab5', color:'#fff'}} onClick={()=>window.location.href='/subscriptions'}>Subscriptions</button>
          <button style={sideBtn} onClick={()=>window.location.href='/support'}>Support</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* CONTENT Area */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1594398044700-eb44808358ae?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase'}}>Subscription Center</h1>
            <p style={{color:'#aaa', marginBottom:'40px'}}>Manage your network tiers and unlock exclusive server perks.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'20px' }}>
              
              {/* TIER 1 */}
              <div style={cardStyle}>
                <h3 style={{margin:0, fontSize:'24px'}}>Farmer</h3>
                <h2 style={{margin:0, color:'#aaa'}}>$0 <small style={{fontSize:'12px'}}> / month</small></h2>
                <ul style={{fontSize:'13px', color:'#888', paddingLeft:'15px', lineHeight:'2'}}>
                    <li><Check size={14} color="#22c55e"/> 1 Farm Slot</li>
                    <li><Check size={14} color="#22c55e"/> Access to Job Board</li>
                </ul>
                <button disabled style={{marginTop:'auto', padding:'12px', background:'#333', color:'#555', border:'none', fontWeight:'bold'}}>CURRENT TIER</button>
              </div>

              {/* TIER 2 */}
              <div style={{...cardStyle, borderTopColor:'#f59e0b'}}>
                <h3 style={{margin:0, fontSize:'24px', color:'#f59e0b'}}>Contractor</h3>
                <h2 style={{margin:0, color:'#f59e0b'}}>$150,000 <small style={{fontSize:'12px'}}> / month</small></h2>
                <ul style={{fontSize:'13px', color:'#ccc', paddingLeft:'15px', lineHeight:'2'}}>
                    <li><Check size={14} color="#f59e0b"/> 1 Farm Slot (Priority)</li>
                    <li><Check size={14} color="#f59e0b"/> Post Sub-Contracts</li>
                    <li><Check size={14} color="#f59e0b"/> Equipment Marketplace Access</li>
                </ul>
                <button onClick={()=>buyTier('Contractor', 150000)} style={{marginTop:'auto', padding:'12px', background:'#f59e0b', color:'#000', border:'none', fontWeight:'bold', cursor:'pointer'}}>UPGRADE NOW</button>
              </div>

              {/* TIER 3 - MAYOR */}
              <div style={{...cardStyle, borderTopColor:'#22c55e', boxShadow:'0 0 20px rgba(34,197,94,0.2)'}}>
                <h3 style={{margin:0, fontSize:'24px', color:'#22c55e'}}>Mayor</h3>
                <h2 style={{margin:0, color:'#22c55e'}}>$500,000 <small style={{fontSize:'12px'}}> / month</small></h2>
                <ul style={{fontSize:'13px', color:'#fff', paddingLeft:'15px', lineHeight:'2'}}>
                    <li><Check size={14} color="#22c55e"/> <b>2 Farm Slots (Over 2 Servers)</b></li>
                    <li><Check size={14} color="#22c55e"/> Tax Exemption on Land</li>
                    <li><Check size={14} color="#22c55e"/> Custom Radio Dispatch Access</li>
                    <li><Check size={14} color="#22c55e"/> Discord "Mayor" Role</li>
                </ul>
                <button onClick={()=>buyTier('Mayor', 500000)} style={{marginTop:'auto', padding:'12px', background:'#22c55e', color:'#000', border:'none', fontWeight:'bold', cursor:'pointer'}}>CLAIM MAYORSHIP</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
