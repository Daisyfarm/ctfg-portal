"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TrendingUp, Cloud, LogOut, Briefcase, Map, Landmark, Tractor, ChevronDown, Wheat, ArrowRight, History } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function CropSales() {
  const [u, setU] = useState<any>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data: marketData } = await sb.from('market_prices').select('*').order('crop_name');
    setCrops(marketData || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleSell = async (e: any) => {
    e.preventDefault();
    if (!selectedCrop || !amount) return;

    const liters = parseInt(amount);
    const payout = Math.round((liters / 1000) * selectedCrop.base_price);

    const { error } = await sb.rpc('sell_crops', { 
      player_id: u.id, 
      crop_id: selectedCrop.id, 
      amount_liters: liters 
    });

    if (error) alert(error.message);
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🌾 **GRAIN ELEVATOR DELIVERY**\n**${u.username}** delivered **${liters.toLocaleString()}L** of **${selectedCrop.crop_name}** and received a payout of **$${payout.toLocaleString()}**!` 
      })});
      alert("Delivery Accepted. Funds transferred to your account.");
      setAmount("");
      load();
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Opening Elevator Gates...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
        </div>
        <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/sell'}><TrendingUp size={16}/> Crop Sales</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}>Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Management</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT Area */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1594398044700-eb44808358ae?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <div style={{ background:'rgba(35,35,35,0.95)', padding:'40px', borderTop:'1px solid #fff' }}>
                <h1 style={{fontSize:'36px', margin:0, textTransform:'uppercase'}}>Grain Elevator</h1>
                <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
                    DELIVER YOUR HARVESTED CROPS HERE. SELECT THE COMMODITY TYPE AND ENTER THE TOTAL LITERS DELIVERED TO THE IN-GAME SILO. PAYOUTS ARE PROCESSED INSTANTLY BASED ON THE LIVE MONTANA MARKET PRICE.
                </p>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }}>
                    
                    {/* SELL FORM */}
                    <div style={{ background:'#1a1a1a', padding:'25px', borderRadius:'4px', border:'1px solid #333' }}>
                        <h3 style={{marginTop:0, borderBottom:'1px solid #333', paddingBottom:'10px'}}><Wheat size={20} color="#22c55e" style={{verticalAlign:'middle'}}/> Delivery Manifest</h3>
                        <form onSubmit={handleSell} style={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'20px' }}>
                            <div>
                                <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>COMMODITY TYPE</label>
                                <select 
                                    required 
                                    style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', marginTop:'5px'}}
                                    onChange={(e) => setSelectedCrop(crops.find(c => c.id === e.target.value))}
                                >
                                    <option value="">Select Crop...</option>
                                    {crops.map(c => <option key={c.id} value={c.id}>{c.crop_name} (${c.base_price}/1000L)</option>)}
                                </select>
                            </div>

                            <div>
                                <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>TOTAL LITERS (L)</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 45000" 
                                    required 
                                    value={amount}
                                    onChange={e=>setAmount(e.target.value)}
                                    style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', marginTop:'5px'}} 
                                />
                            </div>

                            {selectedCrop && amount && (
                                <div style={{ background:'rgba(34,197,94,0.1)', padding:'15px', borderRadius:'4px', border:'1px solid #22c55e' }}>
                                    <p style={{margin:0, fontSize:'11px', color:'#aaa'}}>ESTIMATED NET PAYOUT</p>
                                    <h2 style={{margin:0, color:'#22c55e'}}>${Math.round((parseInt(amount)/1000) * selectedCrop.base_price).toLocaleString()}</h2>
                                </div>
                            )}

                            <button type="submit" style={{ background:'#22c55e', color:'#fff', border:'none', padding:'15px', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase', borderRadius:'2px'}}>Sign & Submit Delivery</button>
                        </form>
                    </div>

                    {/* MARKET OVERVIEW */}
                    <div style={{ background:'#1a1a1a', padding:'25px', borderRadius:'4px', border:'1px solid #333' }}>
                        <h3 style={{marginTop:0, borderBottom:'1px solid #333', paddingBottom:'10px'}}><History size={20} color="#4a7ab5" style={{verticalAlign:'middle'}}/> Live Market Prices</h3>
                        <div style={{ marginTop:'20px' }}>
                            {crops.map(c => (
                                <div key={c.id} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #222' }}>
                                    <span style={{color:'#ccc'}}>{c.crop_name}</span>
                                    <span style={{color:'#22c55e', fontWeight:'bold'}}>${c.base_price} <small style={{fontSize:'9px'}}>per 1000L</small></span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
