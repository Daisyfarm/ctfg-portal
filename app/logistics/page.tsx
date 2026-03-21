"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Truck, ArrowLeft, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, Tractor, ChevronDown, Timer, MapPin } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Logistics() {
  const [u, setU] = useState<any>(null);
  const [loads, setLoads] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data: jobs } = await sb.from('logistics_jobs').select('*').eq('status', 'AVAILABLE').order('created_at', { ascending: false });
    setLoads(jobs || []);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  const claimLoad = async (job: any) => {
    await sb.from('logistics_jobs').update({ status: 'ACTIVE', driver_id: u.id }).eq('id', job.id);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🚚 **DISPATCH ALERT**\n**${u.username}** has departed Judith Plains with a load of **${job.cargo}** bound for **${job.destination}**! (ATS)` 
    })});
    alert("Load Logged. Drive safe, Operator."); load();
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Logistics Frequency...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #3b82f6' }}>
        <div style={{ display:'flex', gap:'25px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#3b82f6', fontSize:'11px', fontWeight:'bold'}}>LOGISTICS DIVISION</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}}><Truck size={16} color="#3b82f6"/> ATS/ETS2 Hauling</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'40px' }}>
          <h1 style={{fontSize:'32px', textTransform:'uppercase', margin:0}}>Logistics Command</h1>
          <p style={{fontSize:'12px', color:'#3b82f6', fontWeight:'bold', margin:'10px 0 30px'}}>COMMERCIAL HAULING CONTRACTS FOR CTFG OPERATORS.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
            {loads.length === 0 ? <p style={{color:'#555'}}>No active freight requests.</p> : loads.map(job => (
              <div key={job.id} style={{ background:'#222', padding:'25px', borderRadius:'4px', borderLeft:'6px solid #3b82f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <h3 style={{margin:0, fontSize:'20px'}}>{job.cargo}</h3>
                  <div style={{display:'flex', gap:'15px', marginTop:'5px', color:'#aaa', fontSize:'12px'}}>
                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}><MapPin size={14}/> {job.origin} → {job.destination}</span>
                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}><Timer size={14}/> Estimated 12h Drive</span>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{margin:0, fontSize:'24px', fontWeight:'bold', color:'#22c55e', fontFamily:'monospace'}}>${job.payout.toLocaleString()}</p>
                  <button onClick={()=>claimLoad(job)} style={{marginTop:'10px', padding:'8px 20px', background:'#3b82f6', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px'}}>ACCEPT LOAD</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
