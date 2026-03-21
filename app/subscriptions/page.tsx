"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Crown, Heart, Check, Star, Shield, ArrowLeft, Cloud, LogOut, Briefcase, Map, Landmark, Tractor, ChevronDown } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

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

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Treasury...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px', textTransform:'uppercase'}}>Montana Weather: {w}</span>
        </div>
        <div style={{background:'#4a7ab5', color:'#fff', padding:'5px 15px', fontSize:'11px', fontWeight:'bold', borderRadius:'3px'}}>FUNDING PORTAL</div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/subscriptions'}><Crown size={16} color="#f59e0b"/> Subscriptions</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.8)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Community Support</h1>
            <p style={{color:'#aaa', marginBottom:'40px', maxWidth:'700px'}}>Help CTFG maintain high-performance hardware and 24/7 uptime for the Montana Network.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px' }}>
              
              {/* MAYORSHIP TIER */}
              <div style={{ background:'rgba(30,30,30,0.95)', padding:'30px', borderRadius:'4px', borderTop:'4px solid #f59e0b', boxShadow:'0 10px 30px rgba(245,158,11,0.1)' }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h2 style={{color:'#f59e0b', margin:0}}>MAYORSHIP</h2>
                    <Crown size={24} color="#f59e0b" />
                </div>
                <h3 style={{fontSize:'32px', margin:'10px 0'}}>£14.99 <small style={{fontSize:'12px', color:'#555'}}>/ month</small></h3>
                <div style={{ height:'1px', background:'#333', margin:'20px 0' }}></div>
                <ul style={{fontSize:'13px', color:'#ccc', paddingLeft:'15px', lineHeight:'2.5'}}>
                    <li><Star size={14} color="#f59e0b"/> <b>2 Farm Slots (Over 2 Servers)</b></li>
                    <li><Check size={14} color="#22c55e"/> Tax Exemption on All Land Deeds</li>
                    <li><Check size={14} color="#22c55e"/> Custom Logo on Live Satellite Map</li>
                    <li><Check size={14} color="#22c55e"/> Private "Mayor Lounge" Discord Access</li>
                    <li><Check size={14} color="#22c55e"/> Priority Queue for Server Entry</li>
                </ul>
                {/* REPLACE LINK BELOW WITH YOUR STRIPE OR PAYPAL LINK */}
                <button onClick={()=>window.open('https://buy.stripe.com/your_mayorship_link', '_blank')} style={{width:'100%', padding:'15px', background:'#f59e0b', color:'#000', border:'none', fontWeight:'bold', marginTop:'20px', cursor:'pointer', borderRadius:'2px'}}>BECOME A MAYOR</button>
              </div>

              {/* DONATIONS */}
              <div style={{ background:'rgba(30,30,30,0.95)', padding:'30px', borderRadius:'4px', borderTop:'4px solid #4a7ab5' }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h2 style={{color:'#4a7ab5', margin:0}}>DONATIONS</h2>
                    <Heart size={24} color="#4a7ab5" />
                </div>
                <h3 style={{fontSize:'32px', margin:'10px 0'}}>Flexible</h3>
                <div style={{ height:'1px', background:'#333', margin:'20px 0' }}></div>
                <p style={{fontSize:'14px', color:'#aaa', lineHeight:'1.6'}}>One-time contributions directly fund our server costs, domain renewals, and custom mod development. Every bit helps keep the network alive.</p>
                <ul style={{fontSize:'13px', color:'#ccc', paddingLeft:'15px', lineHeight:'2.5', marginTop:'20px'}}>
                    <li><Check size={14} color="#4a7ab5"/> "Supporter" Discord Badge</li>
                    <li><Check size={14} color="#4a7ab5"/> Name on the Portal Wall of Fame</li>
                    <li><Check size={14} color="#4a7ab5"/> Our Eternal Gratitude</li>
                </ul>
                {/* REPLACE LINK BELOW WITH YOUR DONATION LINK */}
                <button onClick={()=>window.open('https://paypal.me/your_account', '_blank')} style={{width:'100%', padding:'15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', marginTop:'auto', cursor:'pointer', borderRadius:'2px'}}>MAKE A DONATION</button>
              </div>

            </div>

            <div style={{ marginTop:'40px', padding:'20px', background:'rgba(255,255,255,0.05)', borderRadius:'4px', textAlign:'center', border:'1px solid #333' }}>
                <p style={{fontSize:'12px', color:'#777', margin:0}}>
                    All transactions are handled securely via Stripe or PayPal. Mayorship is a recurring subscription. 
                    After payment, please send your transaction ID to Samuel_Founder to claim your in-game slots.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
