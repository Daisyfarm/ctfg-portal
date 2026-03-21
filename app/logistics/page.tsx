"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Truck, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, Landmark, ChevronDown, MapPin, Timer, CheckCircle, Package } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LogisticsCenter() {
  const [u, setU] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: jobData } = await sb.from('logistics_jobs').select('*').neq('status', 'DELIVERED').order('created_at', { ascending: false });
        setJobs(jobData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const claimJob = async (job: any) => {
    await sb.from('logistics_jobs').update({ status: 'IN_TRANSIT', driver_id: u.id }).eq('id', job.id);
    await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
        content: `🚚 **DISPATCH UPDATE**\n**${u.username}** has departed Montana with a load of **${job.cargo}** destined for **${job.destination}**! (ATS)` 
    })});
    alert("Load accepted. Post delivery screenshot in Discord for final payment."); load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Logistics Frequency...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #3b82f6' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px', textTransform:'uppercase'}}>Montana Weather: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/logistics'}><Truck size={16} color="#3b82f6"/> ATS Logistics</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT area matching screenshot */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.8)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <div style={{ background:'rgba(25,25,25,0.95)', padding:'30px', borderTop:'1px solid #fff', marginBottom:'30px' }}>
                <h1 style={{fontSize:'32px', margin:0, textTransform:'uppercase'}}>Freight Management</h1>
                <p style={{fontSize:'12px', color:'#3b82f6', fontWeight:'bold', margin:'15px 0'}}>
                    THIS IS THE LOGISTICS CENTER. OPERATORS CAN BROWSE AVAILABLE FREIGHT HAULS FROM THE MONTANA NETWORK. ENSURE YOU HAVE THE CORRECT TRUCK CONFIGURATION FOR THE CARGO TYPE.
                </p>
                <div style={{ fontSize:'13px', color:'#3b82f6', fontWeight:'bold', display:'flex', gap:'10px', textTransform:'uppercase' }}>
                    <span>Active Hub</span> | <span style={{cursor:'pointer'}} onClick={()=>window.location.href='/contracts'}>Back to Farming</span>
                </div>
            </div>

            {/* JOBS LIST */}
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {jobs.map(j => (
                    <div key={j.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderLeft: j.status === 'AVAILABLE' ? '5px solid #3b82f6' : '5px solid #f59e0b' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'25px' }}>
                            <div style={{ background:'#111', padding:'15px', borderRadius:'4px' }}>
                                <Package size={32} color="#3b82f6" />
                            </div>
                            <div>
                                <h3 style={{margin:0, fontSize:'22px', textTransform:'uppercase'}}>{j.cargo}</h3>
                                <div style={{ display:'flex', gap:'15px', marginTop:'5px', color:'#aaa', fontSize:'13px' }}>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}><MapPin size={14}/> {j.origin} → {j.destination}</span>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}><Timer size={14}/> Route: 650 Miles</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ textAlign:'right' }}>
                            <p style={{ margin:0, fontSize:'28px', color:'#22c55e', fontWeight:'bold', fontFamily:'monospace' }}>${j.payout.toLocaleString()}</p>
                            <div style={{ marginTop:'10px' }}>
                                {j.status === 'AVAILABLE' ? (
                                    <button onClick={()=>claimJob(j)} style={{ background:'#3b82f6', color:'#fff', border:'none', padding:'10px 30px', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase', fontSize:'11px', borderRadius:'2px' }}>Accept Load</button>
                                ) : (
                                    <span style={{ color:'#f59e0b', fontWeight:'bold', fontSize:'12px' }}>IN TRANSIT: {j.profiles?.username}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
