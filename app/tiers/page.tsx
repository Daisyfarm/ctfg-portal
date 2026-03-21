"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Crown, Check, ArrowLeft, Shield, Star } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function TierShop() {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('*').eq('id', user?.id).single().then(({data}) => setP(data));
    });
  }, []);

  const buy = async (name: string, cost: number) => {
    if (confirm(`Authorize $${cost.toLocaleString()} for 30 days of ${name} status?`)) {
      const { error } = await sb.rpc('buy_sub', { p_id: p.id, t_name: name, t_cost: cost });
      if (error) alert(error.message); else { alert("Promotion Successful!"); window.location.href = '/dashboard'; }
    }
  };

  if (!p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Treasury...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial', padding:'40px' }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← BACK</button>
        <h1 style={{fontSize:'36px', textTransform:'uppercase'}}>Network Tiers</h1>
        
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px', marginTop:'30px' }}>
          {/* CONTRACTOR TIER */}
          <div style={{ background:'rgba(30,30,30,0.9)', padding:'30px', borderTop:'4px solid #f59e0b' }}>
            <h2 style={{color:'#f59e0b'}}>Contractor</h2>
            <h3 style={{fontSize:'28px'}}>$150,000 <small style={{fontSize:'12px'}}> / month</small></h3>
            <ul style={{fontSize:'14px', color:'#aaa', lineHeight:'2', marginTop:'20px'}}>
              <li><Check size={14} color="#22c55e"/> Post Custom Sub-Contracts</li>
              <li><Check size={14} color="#22c55e"/> Access to Private Equipment Market</li>
              <li><Check size={14} color="#22c55e"/> 1 Dedicated Farm Slot</li>
            </ul>
            <button onClick={()=>buy('Contractor', 150000)} style={{width:'100%', padding:'15px', background:'#f59e0b', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>UPGRADE</button>
          </div>

          {/* MAYOR TIER */}
          <div style={{ background:'rgba(30,30,30,0.9)', padding:'30px', borderTop:'4px solid #22c55e', boxShadow:'0 0 20px rgba(34,197,94,0.2)' }}>
            <h2 style={{color:'#22c55e'}}>Mayor</h2>
            <h3 style={{fontSize:'28px'}}>$500,000 <small style={{fontSize:'12px'}}> / month</small></h3>
            <ul style={{fontSize:'14px', color:'#fff', lineHeight:'2', marginTop:'20px'}}>
              <li><Star size={14} color="#facc15"/> <b>2 Farm Slots (Over 2 Servers)</b></li>
              <li><Check size={14} color="#22c55e"/> Exempt from Weekly Land Tax</li>
              <li><Check size={14} color="#22c55e"/> Use of Admin Radio Frequency</li>
              <li><Check size={14} color="#22c55e"/> Special Discord "Mayor" Role</li>
            </ul>
            <button onClick={()=>buy('Mayor', 500000)} style={{width:'100%', padding:'15px', background:'#22c55e', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>CLAIM MAYORSHIP</button>
          </div>
        </div>
      </div>
    </div>
  );
}
