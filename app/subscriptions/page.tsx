"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Crown, Check, Star, ShieldCheck, Zap, ArrowLeft, Cloud } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Subscriptions() {
  const [u, setU] = useState<any>(null);
  const [w, setW] = useState("");

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('*').eq('id', user?.id).single().then(({data}) => setU(data));
    });
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F"));
  }, []);

  const purchase = async (name: string, cost: number) => {
    if (confirm(`Authorize $${cost.toLocaleString()} for 30 days of ${name} status?`)) {
        const { error } = await sb.rpc('buy_tier', { p_id: u.id, t_name: name, cost: cost });
        if (error) alert(error.message); else { alert("Upgrade Complete!"); window.location.href = '/dashboard'; }
    }
  };

  if (!u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing Tiers...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', cursor:'pointer'}}>CTFG NETWORK</span>
        <span style={{fontSize:'12px'}}>WEATHER: {w}</span>
      </div>

      <div style={{ padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
        <h1 style={{fontSize:'36px', textAlign:'center', textTransform:'uppercase'}}>Subscription Center</h1>
        <p style={{textAlign:'center', color:'#888', marginBottom:'50px'}}>Support the CTFG Network and earn exclusive in-game perks.</p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'30px' }}>
          
          <TierCard 
            title="Bronze" price="150,000" color="#cd7f32" u={u}
            perks={['Exclusive #supporter-chat', '[MP] Priority Bank Access', '[BOT] Custom Player Prefixes']}
            onBuy={() => purchase('Bronze', 150000)}
          />

          <TierCard 
            title="Silver" price="350,000" color="#94a3b8" u={u}
            perks={['All Bronze Perks', '[MP] Detailed Farm Analytics', '[BOT] Player Tracking Embeds', 'Special Silver Badge']}
            onBuy={() => purchase('Silver', 350000)}
          />

          <TierCard 
            title="Gold (Mayor)" price="750,000" color="#facc15" u={u}
            perks={['2 Farm Slots over 2 Servers', 'Exempt from Land Taxes', 'Access to Dispatch Frequency', 'American Farmer Badge']}
            onBuy={() => purchase('Gold', 750000)}
          />

        </div>
      </div>
    </div>
  );
}

function TierCard({ title, price, color, perks, onBuy, u }: any) {
  return (
    <div style={{ background:'#1a1a1a', borderRadius:'8px', border:`1px solid #333`, overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'30px', textAlign:'center', borderBottom:'1px solid #222' }}>
        <h3 style={{ margin:0, color:color, textTransform:'uppercase' }}>{title}</h3>
        <h2 style={{ fontSize:'32px', margin:'10px 0' }}>${price} <small style={{fontSize:'12px', color:'#555'}}>/mo</small></h2>
        <button onClick={onBuy} style={{ width:'100%', padding:'12px', background:'#5865f2', color:'#fff', border:'none', borderRadius:'5px', fontWeight:'bold', cursor:'pointer' }}>SUBSCRIBE</button>
      </div>

      {/* MEMBER PREVIEW BOX (Matching your screenshot) */}
      <div style={{ padding:'20px', background:'#111', borderBottom:'1px solid #222' }}>
        <p style={{ fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'10px' }}>MEMBER PREVIEW</p>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'#444', overflow:'hidden' }}>
            <img src="https://i.postimg.cc/mD0m7m6p/CTFG-Logo.jpg" style={{width:'100%'}} />
          </div>
          <div>
            <p style={{ margin:0, fontSize:'13px', color:color, fontWeight:'bold' }}>{u.username} <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{width:'12px'}} /></p>
            <p style={{ margin:0, fontSize:'10px', color:'#444' }}>wow this looks so cool</p>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px', flex:1 }}>
        <p style={{ fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'10px' }}>ADDITIONAL BENEFITS</p>
        {perks.map((p:string) => (
          <div key={p} style={{ display:'flex', gap:'10px', marginBottom:'10px', fontSize:'12px', color:'#ccc' }}>
            <Check size={14} color={color} /> {p}
          </div>
        ))}
      </div>
    </div>
  );
}
