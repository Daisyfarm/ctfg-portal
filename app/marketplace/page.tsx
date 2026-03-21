"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search, ChevronDown, Cloud, LogOut, Briefcase, Landmark, Tractor, Map, TrendingUp } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Marketplace() {
  const [u, setU] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  useEffect(() => {
    const load = async () => {
        const { data: { user } } = await sb.auth.getUser();
        if (user) {
            const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
            setU(profile);
        }
        const { data: coData } = await sb.from('companies').select('*').order('name');
        setCompanies(coData || []);
        fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
        setLd(false);
    };
    load();
  }, []);

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Network Marketplace...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };
  const filterInput = { width:'100%', padding:'12px', background:'#fff', color:'#333', border:'none', borderRadius:'2px', fontSize:'13px', textTransform:'uppercase' as const, marginBottom:'10px', appearance:'none' as const };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/marketplace'}>Marketplace</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT Area Matching Screenshot */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
            
            {/* FILTER SECTION */}
            <div style={{ background:'rgba(25,25,25,0.9)', padding:'25px', marginBottom:'25px', border:'1px solid #333' }}>
                <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                    <div style={{position:'relative'}}>
                        <select style={filterInput}><option>New & Used</option></select>
                        <ChevronDown size={14} style={{position:'absolute', right:10, top:12, color:'#333'}}/>
                    </div>
                    <div style={{position:'relative'}}>
                        <select style={filterInput}><option>All Brands</option></select>
                        <ChevronDown size={14} style={{position:'absolute', right:10, top:12, color:'#333'}}/>
                    </div>
                    <div style={{position:'relative'}}>
                        <select style={filterInput}><option>All Categories</option></select>
                        <ChevronDown size={14} style={{position:'absolute', right:10, top:12, color:'#333'}}/>
                    </div>
                </div>
                <button style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 20px', fontWeight:'bold', fontSize:'12px', cursor:'pointer', borderRadius:'2px' }}>
                    SEARCH THE NETWORK!
                </button>
            </div>

            {/* LOGO GRID SECTION */}
            <div style={{ background:'rgba(40,40,40,0.9)', padding:'30px', borderTop:'1px solid #fff' }}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'20px' }}>
                    {companies.map(co => (
                        <div key={co.id} style={{ textAlign:'center', cursor:'pointer' }} onClick={()=>alert(`Entering ${co.name}...`)}>
                            <div style={{ background:'#fff', padding:'5px', borderRadius:'2px', height:'160px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'10px', border:'1px solid #555' }}>
                                <img src={co.logo_url} style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} />
                            </div>
                            <p style={{ margin:0, fontSize:'13px', fontWeight:'bold', fontStyle:'italic', color:'#fff' }}>{co.name}</p>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
