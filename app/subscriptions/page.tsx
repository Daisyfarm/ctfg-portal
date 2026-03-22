"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Crown, Heart, Check, Star, Shield, ArrowLeft, Cloud, LogOut, MessageSquare, Landmark, FileText, Factory, LifeBuoy } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Subscriptions() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      if (user) sb.from('profiles').select('*').eq('id', user.id).single().then(({data}) => setU(data));
      setLd(false);
    });
  }, []);

  const requestPromotion = async (tier: string) => {
    await fetch(HK, { 
      method:'POST', 
      headers:{'Content-Type':'application/json'}, 
      body:JSON.stringify({ 
        content: `🎫 **SUBSCRIPTION REQUEST**\n**Operator:** ${u?.username || 'Unknown'}\n**Tier:** ${tier}\n*Action required: Contact user for manual payment.*` 
    })});
    alert("Request Logged. Redirecting to Support.");
    window.location.href = '/support';
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Treasury...</div>;

  const sBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
        <div style={{background:'#4a7ab5', color:'#fff', padding:'5px 15px', borderRadius:'3px', fontSize:'11px', fontWeight:'bold'}}>FUNDING PORTAL</div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px'}}>OPERATIONS</p>
          <button style={sBtn} onClick={()=>window.location.href='/dashboard'}><Factory size={16}/> Dashboard</button>
          <button style={{...sBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/subscriptions'}><Crown size={16} color="#f59e0b"/> Subscriptions</button>
          <button style={sBtn} onClick={()=>window.location.href='/support'}><LifeBuoy size={16}/> Support</button>
          <button style={sBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.8)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Network Funding</h1>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px', marginTop:'40px' }}>
              
              <div style={{ background:'rgba(30,30,30,0.95)', padding:'35px', borderRadius:'4px', borderTop:'4px solid #f59e0b' }}>
                <h2 style={{color:'#f59e0b', margin:0}}>MAYORSHIP</h2>
                <h3 style={{fontSize:'32px', margin:'10px 0'}}>£12.99 <small style={{fontSize:'12px', color:'#555'}}>/ month</small></h3>
                <ul style={{fontSize:'13px', color:'#ccc', paddingLeft:'15px', lineHeight:'2.5'}}>
                    <li><Star size={14} color="#f59e0b" fill="#f59e0b"/> <b>2 Farm Slots (Over 2 Servers)</b></li>
                    <li><Check size={14} color="#22c55e"/> Tax Exemption on Land</li>
                    <li><Check size={14} color="#22c55e"/> Discord "Mayor" Role</li>
                </ul>
                <button onClick={()=>requestPromotion('Mayorship')} style={{width:'100%', padding:'15px', background:'#f59e0b', color:'#000', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>REQUEST MAYORSHIP</button>
              </div>

              <div style={{ background:'rgba(30,30,30,0.95)', padding:'35px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <h2 style={{color:'#4a7ab5', margin:0}}>DONATIONS</h2>
                <h3 style={{fontSize:'32px', margin:'10px 0'}}>Flexible</h3>
                <p style={{fontSize:'14px', color:'#aaa'}}>Directly funds server hardware and Judith Plains development.</p>
                <button onClick={()=>requestPromotion('Donation')} style={{width:'100%', padding:'15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}}>REQUEST INFO</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
