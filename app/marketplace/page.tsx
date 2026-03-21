"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Search, ChevronDown, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, Landmark } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Marketplace() {
  const [u, setU] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: fleetData } = await sb.from('fleet').select('*, profiles(username)').eq('is_for_sale', true);
        setItems(fleetData || []);
        const { data: coData } = await sb.from('companies').select('*');
        setCompanies(coData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Opening Marketplace Gates...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px', textTransform:'uppercase'}}>Montana Weather: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/marketplace'}><ShoppingCart size={16}/> Marketplace</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'rgba(20,20,20,0.7)', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Network Market</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>BROWSE NEW AND USED EQUIPMENT FROM VERIFIED CTFG DEALERSHIPS.</p>

            {/* SEARCH BOXES matching your screenshot */}
            <div style={{ background:'rgba(35,35,35,0.9)', padding:'20px', borderRadius:'4px', border:'1px solid #333', marginBottom:'30px' }}>
                <div style={{ display:'flex', gap:'10px', marginBottom:'10px' }}>
                    <select style={{flex:1, padding:'10px', background:'#fff', color:'#333', border:'none'}}><option>New & Used</option></select>
                    <select style={{flex:1, padding:'10px', background:'#fff', color:'#333', border:'none'}}><option>All Brands</option></select>
                </div>
                <button style={{ background:'#4a7ab5', color:'#fff', border:'none', padding:'10px 20px', fontWeight:'bold', cursor:'pointer' }}>SEARCH THE NETWORK!</button>
            </div>

            {/* COMPANY LOGOS */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:'15px', marginBottom:'40px', background:'rgba(40,40,40,0.5)', padding:'20px', borderRadius:'4px' }}>
                {companies.map(co => (
                    <div key={co.id} style={{ textAlign:'center' }}>
                        <div style={{ background:'#fff', height:'120px', borderRadius:'2px', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #444' }}>
                            <img src={co.logo_url} style={{ maxWidth:'90%', maxHeight:'90%' }} />
                        </div>
                        <p style={{ fontSize:'11px', marginTop:'5px', fontWeight:'bold', fontStyle:'italic' }}>{co.name}</p>
                    </div>
                ))}
            </div>

            {/* USED LISTINGS */}
            <h3 style={{fontSize:'18px', borderBottom:'1px solid #333', paddingBottom:'10px'}}>Active Listings</h3>
            {items.length === 0 ? <p style={{color:'#555'}}>No used equipment currently listed.</p> : items.map(item => (
                <div key={item.id} style={{ background:'#222', padding:'20px', borderRadius:'4px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', borderLeft:'4px solid #f59e0b' }}>
                    <div>
                        <h4 style={{margin:0, fontSize:'18px'}}>{item.machinery_name}</h4>
                        <p style={{margin:0, fontSize:'11px', color:'#888'}}>SELLER: {item.profiles?.username}</p>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <p style={{margin:0, fontSize:'20px', color:'#22c55e', fontWeight:'bold'}}>${item.price?.toLocaleString()}</p>
                        <button style={{ background:'#4a7ab5', color:'#fff', border:'none', padding:'5px 15px', marginTop:'5px', fontWeight:'bold', cursor:'pointer', fontSize:'11px' }}>BUY NOW</button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
