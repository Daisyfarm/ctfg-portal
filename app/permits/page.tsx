"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldAlert, FileCheck, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, Tractor, ChevronDown, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

const AVAILABLE_PERMITS = [
    { type: 'Oversize Load / Pilot Car', cost: 5000, desc: 'Required for hauling headers or wide equipment on main roads.' },
    { type: 'Commercial Pesticide License', cost: 12000, desc: 'Required for chemical application on contracted fields.' },
    { type: 'Livestock Transport Permit', cost: 8500, desc: 'Required for hauling cattle, pigs, or sheep.' },
    { type: 'Building/Construction Permit', cost: 25000, desc: 'Required before placing any new sheds or silos.' }
];

export default function PermitsPage() {
  const [u, setU] = useState<any>(null);
  const [myPermits, setMyPermits] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: perms } = await sb.from('permits').select('*').eq('user_id', user.id).eq('status', 'ACTIVE');
        setMyPermits(perms || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handlePurchase = async (permit: any) => {
    if (confirm(`Purchase ${permit.type} for $${permit.cost.toLocaleString()}?`)) {
        const { error } = await sb.rpc('buy_permit', { p_id: u.id, permit_type: permit.type, permit_cost: permit.cost });
        if (error) alert(error.message);
        else {
            await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
                content: `📜 **LICENSE ISSUED**\n**${u.username}** has been granted a **${permit.type}** for the next 7 days.` 
            })});
            alert("Permit Issued."); load();
        }
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Licensing Bureau...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/permits'}><FileCheck size={16}/> Permits</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Management</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <div style={{ background:'rgba(35,35,35,0.95)', padding:'40px', borderTop:'1px solid #fff' }}>
                <h1 style={{fontSize:'36px', margin:0, textTransform:'uppercase'}}>Licensing Bureau</h1>
                <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
                    OPERATORS MUST HOLD VALID PERMITS FOR RESTRICTED ACTIVITIES ON THE MONTANA JUDITH PLAINS MAP. FAILURE TO DISPLAY A PERMIT TO STAFF UPON REQUEST WILL RESULT IN EQUIPMENT IMPOUNDMENT AND FINES.
                </p>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }}>
                    
                    {/* PERMIT SHOP */}
                    <div>
                        <h2 style={{fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px'}}>Available Licenses</h2>
                        {AVAILABLE_PERMITS.map(p => {
                            const alreadyOwned = myPermits.find(mp => mp.type === p.type);
                            return (
                                <div key={p.type} style={{ background:'#1a1a1a', padding:'20px', borderRadius:'4px', marginBottom:'15px', border:'1px solid #333' }}>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <span style={{fontWeight:'bold', color:'#fff'}}>{p.type}</span>
                                        <span style={{color:'#22c55e', fontWeight:'bold'}}>${p.cost.toLocaleString()}</span>
                                    </div>
                                    <p style={{fontSize:'12px', color:'#666', margin:'10px 0'}}>{p.desc}</p>
                                    {!alreadyOwned ? (
                                        <button onClick={()=>handlePurchase(p)} style={{ width:'100%', padding:'10px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px' }}>PURCHASE LICENSE</button>
                                    ) : (
                                        <div style={{ textAlign:'center', background:'rgba(34,197,94,0.1)', padding:'10px', color:'#22c55e', fontSize:'11px', fontWeight:'bold', borderRadius:'2px', border:'1px solid #22c55e' }}>VALID UNTIL {new Date(alreadyOwned.expires_at).toLocaleDateString()}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CURRENT STATUS */}
                    <div>
                        <h2 style={{fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px'}}>Your Credentials</h2>
                        {myPermits.length === 0 ? (
                            <div style={{ padding:'30px', textAlign:'center', background:'rgba(255,77,77,0.05)', border:'1px dashed #ff4d4d', borderRadius:'4px' }}>
                                <ShieldAlert size={40} color="#ff4d4d" style={{marginBottom:'10px'}} />
                                <p style={{margin:0, color:'#ff4d4d', fontWeight:'bold'}}>UNLICENSED OPERATOR</p>
                                <p style={{margin:0, fontSize:'11px', color:'#888'}}>You are currently operating at risk of fines.</p>
                            </div>
                        ) : (
                            myPermits.map(p => (
                                <div key={p.id} style={{ background:'rgba(34,197,94,0.1)', padding:'20px', borderRadius:'4px', marginBottom:'10px', display:'flex', alignItems:'center', gap:'15px', border:'1px solid #22c55e' }}>
                                    <CheckCircle color="#22c55e" size={24} />
                                    <div>
                                        <p style={{margin:0, fontWeight:'bold', color:'#fff'}}>{p.type}</p>
                                        <p style={{margin:0, fontSize:'11px', color:'#aaa'}}>Verified Valid License</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
