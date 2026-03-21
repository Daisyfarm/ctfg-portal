"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Truck, CheckCircle, Clock, MapPin, ShieldCheck, Cloud, LogOut, Briefcase, TrendingUp, Landmark, Package, Radio } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function DispatchCenter() {
  const [u, setU] = useState<any>(null);
  const [activeHauls, setActiveHauls] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        if (profile.rank !== 'Admin') window.location.href = '/dashboard';
        setU(profile);
    }
    const { data: jobs } = await sb.from('logistics_jobs').select('*, profiles!logistics_jobs_driver_id_fkey(username)').eq('status', 'IN_TRANSIT');
    setActiveHauls(jobs || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const verifyDelivery = async (job: any) => {
    const { error } = await sb.rpc('confirm_delivery', { job_id: job.id, d_id: job.driver_id, pay_amount: job.payout });
    if (error) alert(error.message);
    else {
      await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
        content: `🏁 **CARGO DELIVERED**\n**${job.profiles.username}** successfully delivered **${job.cargo}** to **${job.destination}**. Payment of **$${job.payout.toLocaleString()}** has been settled.` 
      })});
      alert("Delivery Verified and Paid."); load();
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Establishing Dispatch Link...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #3b82f6' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#3b82f6', fontSize:'11px', fontWeight:'bold'}}>DISPATCH COMMAND</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}}><Radio size={16} color="#3b82f6"/> Dispatch Center</button>
          <button style={sideBtn} onClick={()=>window.location.href='/admin'}>Staff Panel</button>
        </div>

        <div style={{ flex:1, background:'#1a1a1a', padding:'40px' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{fontSize:'32px', textTransform:'uppercase', margin:0}}>Active Hauls</h1>
            <p style={{fontSize:'12px', color:'#3b82f6', fontWeight:'bold', margin:'10px 0 40px'}}>VERIFY IN-GAME DELIVERY SCREENSHOTS BEFORE AUTHORIZING PAYROLL.</p>

            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                {activeHauls.length === 0 ? (
                    <div style={{ textAlign:'center', padding:'50px', background:'#222', borderRadius:'4px', color:'#555' }}>
                        <Truck size={48} style={{marginBottom:'10px', opacity:0.2}} />
                        <p>No drivers currently in transit.</p>
                    </div>
                ) : activeHauls.map(job => (
                    <div key={job.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderRadius:'4px', borderLeft:'5px solid #f59e0b', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div>
                            <p style={{margin:0, fontSize:'10px', color:'#888'}}>DRIVER: <b style={{color:'#fff'}}>{job.profiles?.username}</b></p>
                            <h3 style={{margin:'5px 0', fontSize:'22px', textTransform:'uppercase'}}>{job.cargo}</h3>
                            <p style={{margin:0, fontSize:'13px', color:'#aaa'}}><MapPin size={14} style={{verticalAlign:'middle'}}/> DESTINATION: {job.destination}</p>
                        </div>
                        <div style={{ textAlign:'right' }}>
                            <p style={{ margin:0, fontSize:'24px', fontWeight:'bold', color:'#22c55e', fontFamily:'monospace' }}>${job.payout.toLocaleString()}</p>
                            <button onClick={()=>verifyDelivery(job)} style={{marginTop:'10px', padding:'10px 25px', background:'#22c55e', color:'#000', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px'}}>CONFIRM & PAY DRIVER</button>
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
