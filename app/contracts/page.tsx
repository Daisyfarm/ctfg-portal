"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, ArrowLeft, Clock, CheckCircle, Cloud, LogOut, Landmark, Map, TrendingUp, Tractor, ChevronDown, Plus } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [w, setW] = useState("");
  const [f, setF] = useState({ t: '', p: '' });
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username), employer:profiles!contracts_employer_id_fkey(username)').order('created_at', { ascending: false });
    setJobs(data || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };
  useEffect(() => { ref(); }, []);

  const post = async (e: any) => {
    e.preventDefault();
    const { error } = await sb.from('contracts').insert([{ title: f.t, payout: parseInt(f.p), employer_id: u.id, status: 'available' }]);
    if (!error) {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🚜 **NEW SUB-CONTRACT**\n**${u.username}** is hiring for: **${f.t}** ($${f.p})` })}).catch(()=>0);
      setF({ t: '', p: '' }); ref();
    }
  };

  const claim = async (id: string) => { await sb.from('contracts').update({ status: 'taken', assigned_to: u.id }).eq('id', id); ref(); };
  const finish = async (id: string) => { await sb.from('contracts').update({ status: 'pending' }).eq('id', id); ref(); };
  
  const pay = async (j: any) => {
    const { error } = await sb.rpc('pay_contract', { contract_id: j.id, worker_id: j.assigned_to, employer_id: u.id, payout_amount: j.payout });
    if (error) alert(error.message); 
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `✅ **CONTRACT PAID**\n**${u.username}** paid **${j.profiles?.username}** $${j.payout.toLocaleString()} for *${j.title}*!` })}).catch(()=>0);
      ref();
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Loading Operations Board...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> Montana: {w || '--°F'}</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>Finances</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>Market</span>
          </div>
        </div>
        {u.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', textTransform:'uppercase'}}>Operations</p>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/sell'}><TrendingUp size={16}/> Crop Sales</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Account</p>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'#1a1a1a', padding:'40px' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'30px' }}>
                <div>
                    <p style={{margin:0, color:'#4a7ab5', fontWeight:'bold', fontSize:'12px', textTransform:'uppercase'}}>Montana Judith Plains</p>
                    <h1 style={{margin:0, fontSize:'32px'}}>Field Work Board</h1>
                </div>
                <div style={{textAlign:'right'}}>
                    <p style={{margin:0, color:'#888', fontSize:'11px'}}>OPERATOR</p>
                    <h2 style={{margin:0, color:'#fff', fontSize:'24px'}}>{u.username}</h2>
                </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'30px' }}>
              {/* POST A JOB */}
              <div style={{ background:'#222', padding:'25px', borderRadius:'4px', borderTop:'4px solid #22c55e', height:'fit-content' }}>
                <h3 style={{margin:'0 0 15px 0', fontSize:'16px', display:'flex', alignItems:'center', gap:'10px'}}><Plus size={18} color="#22c55e"/> Hire Operators</h3>
                <form onSubmit={post} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <input placeholder="Job Description..." value={f.t} onChange={e=>setF({...f, t:e.target.value})} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} required />
                  <input placeholder="Payout Amount ($)" type="number" value={f.p} onChange={e=>setF({...f, p:e.target.value})} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} required />
                  <button type="submit" style={{padding:'12px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase', fontSize:'12px'}}>Post Contract</button>
                </form>
              </div>

              {/* LIST OF JOBS */}
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {jobs.map(j => (
                  <div key={j.id} style={{ background:'#222', padding:'20px', borderRadius:'4px', borderLeft:'4px solid ' + (j.status === 'available' ? '#22c55e' : j.status === 'taken' ? '#f59e0b' : '#4a7ab5') }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                      <div>
                        <h4 style={{margin:0, fontSize:'18px'}}>{j.title}</h4>
                        <p style={{margin:'5px 0', fontSize:'11px', color:'#666'}}>POSTED BY: <span style={{color:'#aaa'}}>{j.employer?.username || 'NETWORK'}</span></p>
                      </div>
                      <span style={{fontSize:'20px', fontWeight:'bold', color:'#22c55e', fontFamily:'monospace'}}>${j.payout?.toLocaleString()}</span>
                    </div>

                    <div style={{marginTop:'15px'}}>
                      {j.status === 'available' && j.employer_id !== u?.id && <button onClick={()=>claim(j.id)} style={{padding:'8px 20px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px'}}>CLAIM CONTRACT</button>}
                      {j.status === 'taken' && j.assigned_to === u?.id && <button onClick={()=>finish(j.id)} style={{padding:'8px 20px', background:'#f59e0b', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px'}}>SUBMIT WORK</button>}
                      {j.status === 'pending' && j.employer_id === u?.id && <button onClick={()=>pay(j)} style={{padding:'8px 20px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px'}}>AUTHORIZE PAYMENT TO {j.profiles?.username}</button>}
                      {j.status === 'pending' && j.employer_id !== u?.id && <span style={{fontSize:'11px', color:'#f59e0b', fontWeight:'bold', textTransform:'uppercase'}}><Clock size={12} style={{verticalAlign:'middle'}}/> Awaiting Audit</span>}
                      {j.status === 'completed' && <span style={{fontSize:'11px', color:'#22c55e', fontWeight:'bold', textTransform:'uppercase'}}><CheckCircle size={12} style={{verticalAlign:'middle'}}/> Verified & Paid</span>}
                      {j.status === 'taken' && j.assigned_to !== u?.id && <span style={{fontSize:'11px', color:'#444', fontWeight:'bold', textTransform:'uppercase'}}>Occupied by {j.profiles?.username}</span>}
                    </div>
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
