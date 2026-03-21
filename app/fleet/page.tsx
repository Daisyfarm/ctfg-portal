"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, Plus, Trash2, Wrench, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, FileCheck, UserCheck, LifeBuoy, Trophy, Clock, ShieldCheck } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Fleet() {
  const [fleet, setFleet] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [w, setW] = useState("");
  const [form, setForm] = useState({ name: '', cat: 'Tractor' });
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: fleetData } = await sb.from('fleet').select('*, profiles(username)').order('created_at', { ascending: false });
        setFleet(fleetData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const addAsset = async (e: any) => {
    e.preventDefault();
    await sb.from('fleet').insert([{ owner_id: u.id, machinery_name: form.name, category: form.cat, condition: 100 }]);
    setForm({ name: '', cat: 'Tractor' }); alert("Asset Registered."); load();
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing Asset Database...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> MONTANA: {w || '--°F'}</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>FINANCES</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>MARKET</span>
          </div>
        </div>
        {u.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000', overflowY:'auto' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/sell'}><TrendingUp size={16}/> Crop Sales</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Account</p>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, position:'relative', overflow:'hidden', background:'#1a1a1a' }}>
           <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.1, position:'absolute' }} />
           
           <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1200px', margin:'0 auto' }}>
              <h1 style={{fontSize:'32px', textTransform:'uppercase', margin:0}}>Machinery Registry</h1>
              <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>VIEW AND MANAGE ALL ASSETS CURRENTLY REGISTERED WITHIN THE CTFG NETWORK.</p>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'30px' }}>
                {/* REGISTER FORM */}
                <div style={{ background:'#222', padding:'25px', borderRadius:'4px', borderTop:'4px solid #4a7ab5', height:'fit-content' }}>
                  <h3 style={{margin:'0 0 15px 0', fontSize:'16px'}}>Register New Asset</h3>
                  <form onSubmit={addAsset} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    <input placeholder="Model (e.g. JD 8R)" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} required />
                    <select value={form.cat} onChange={e=>setForm({...form, cat:e.target.value})} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}}>
                      <option>Tractor</option><option>Harvester</option><option>Truck</option><option>Trailer</option>
                    </select>
                    <button type="submit" style={{padding:'12px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px'}}>AUTHORIZE REGISTRATION</button>
                  </form>
                </div>

                {/* FLEET TABLE */}
                <div style={{ background:'#222', borderRadius:'4px', overflow:'hidden' }}>
                  <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
                    <thead style={{ background:'#111', fontSize:'11px', color:'#555' }}>
                      <tr>
                        <th style={{padding:'15px 20px'}}>MODEL</th>
                        <th style={{padding:'15px 20px'}}>CATEGORY</th>
                        <th style={{padding:'15px 20px'}}>OPERATOR</th>
                        <th style={{padding:'15px 20px'}}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody style={{fontSize:'13px'}}>
                      {fleet.map((item, i) => (
                        <tr key={item.id} style={{ borderBottom:'1px solid #111', background: i % 2 === 0 ? '#1a1a1a' : '#222' }}>
                          <td style={{padding:'15px 20px', fontWeight:'bold'}}>{item.machinery_name}</td>
                          <td style={{padding:'15px 20px'}}><span style={{fontSize:'10px', background:'#333', padding:'3px 8px', borderRadius:'3px'}}>{item.category}</span></td>
                          <td style={{padding:'15px 20px', color:'#4a7ab5'}}>{item.profiles?.username}</td>
                          <td style={{padding:'15px 20px'}}><span style={{color:'#22c55e', fontWeight:'bold'}}>DEPLOYED</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
