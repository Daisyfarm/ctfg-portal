"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Star, Zap, Check, ShieldCheck, MessageSquare, Monitor, Bot, Award, Crown, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Subscriptions() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('*').eq('id', user?.id).single().then(({data}) => {
        setU(data); setLd(false);
      });
    });
  }, []);

  const subscribe = async (tier: string, cost: number) => {
    if (confirm(`Authorize monthly budget of $${cost.toLocaleString()} for ${tier} status?`)) {
        const { error } = await sb.rpc('buy_subscription', { p_id: u.id, tier_name: tier, cost: cost });
        if (error) alert(error.message);
        else { alert("Subscription Activated."); window.location.href = '/dashboard'; }
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Store...</div>;

  return (
    <div style={{ background:'#000', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', padding:'40px 20px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#555', cursor:'pointer', marginBottom:'30px', fontWeight:'bold'}}>← BACK TO DASHBOARD</button>
        
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'25px' }}>
          
          {/* TIER 1 - BRONZE */}
          <TierCard 
            title="Bronze Member" price="150,000" color="#cd7f32" u={u}
            perks={[
                { cat: 'EXCLUSIVE CHANNELS', items: ['#bot-commands', '#private-chat'] },
                { cat: 'ADDITIONAL BENEFITS', items: ['[MP] Bank Access', '[BOT] Custom Prefixes', '[BOT] Tracking Embeds'] }
            ]}
            onBuy={() => subscribe('Bronze', 150000)}
          />

          {/* TIER 2 - SILVER */}
          <TierCard 
            title="Silver Member" price="350,000" color="#94a3b8" u={u}
            perks={[
                { cat: 'EXCLUSIVE CHANNELS', items: ['#silver-lounge', '#premium-support'] },
                { cat: 'ADDITIONAL BENEFITS', items: ['[MP] Detailed Farm Stats', '[BOT] Everything from Bronze!', '[BOT] Player Tracking'] }
            ]}
            onBuy={() => subscribe('Silver', 350000)}
          />

          {/* TIER 3 - GOLD (MAYOR) */}
          <TierCard 
            title="Gold Member" price="750,000" color="#facc15" u={u} isGold={true}
            perks={[
                { cat: 'EXCLUSIVE CHANNELS', items: ['#staff-comms-read', '#mayor-office'] },
                { cat: 'ADDITIONAL BENEFITS', items: ['[MP] Full Website Access', '[MP] 2 Farm Slots', '[BOT] Admin Alerts', '[BOT] Elite Customization'] }
            ]}
            onBuy={() => subscribe('Gold', 750000)}
          />

        </div>
      </div>
    </div>
  );
}

function TierCard({ title, price, color, perks, onBuy, u, isGold = false }: any) {
    return (
        <div style={{ background:'#1a1a1a', borderRadius:'8px', border:'1px solid #333', display:'flex', flexDirection:'column', overflow:'hidden' }}>
            <div style={{ padding:'30px', textAlign:'center' }}>
                <div style={{ width:'70px', height:'70px', background:'#333', borderRadius:'50%', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center', border:`2px solid ${color}` }}>
                    <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{ width:'80%', borderRadius:'50%' }} />
                </div>
                <h2 style={{ margin:0, fontSize:'28px' }}>${price}</h2>
                <p style={{ fontSize:'10px', color:'#555', fontWeight:'bold', textTransform:'uppercase' }}>PER MONTH</p>
                <button onClick={onBuy} style={{ width:'100%', padding:'12px', background:'#5865f2', color:'#fff', border:'none', borderRadius:'5px', fontWeight:'bold', marginTop:'20px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
                    <Zap size={16} fill="#fff"/> Subscribe
                </button>
                <p style={{ fontSize:'11px', color:'#888', marginTop:'15px' }}>Support CTFG and earn the following perks</p>
            </div>

            {/* PREVIEW BOX */}
            <div style={{ padding:'20px', background:'#111', borderTop:'1px solid #222' }}>
                <p style={{ fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'10px' }}>MEMBER COLOR & BADGE</p>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div style={{ width:'32px', height:'32px', background:'#444', borderRadius:'50%', overflow:'hidden' }}>
                        <img src="https://i.postimg.cc/mD0m7m6p/CTFG-Logo.jpg" style={{ width:'100%' }} />
                    </div>
                    <div>
                        <p style={{ margin:0, fontSize:'13px', color: color, fontWeight:'bold' }}>{u.username} <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{ width:'14px', verticalAlign:'middle' }} /></p>
                        <p style={{ margin:0, fontSize:'11px', color:'#444' }}>wow this looks so cool</p>
                    </div>
                </div>
            </div>

            {/* PERKS LIST */}
            <div style={{ padding:'20px' }}>
                {perks.map((group: any) => (
                    <div key={group.cat} style={{ marginBottom:'20px' }}>
                        <p style={{ fontSize:'10px', fontWeight:'bold', color:'#555', marginBottom:'10px' }}>{group.cat}</p>
                        {group.items.map((item: string) => (
                            <div key={item} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px', fontSize:'12px' }}>
                                <div style={{ width:'18px', height:'18px', background: color + '22', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                    <Check size={10} color={color} />
                                </div>
                                <span style={{ color:'#ccc' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
