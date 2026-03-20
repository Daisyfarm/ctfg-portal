"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, ArrowLeft, Clock, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [u, setU] = useState<any>(null); // Stores the current user profile
  const [f, setF] = useState({ t: '', p: '' });
  const [ld, setLd] = useState(true);

  const ref = async () => {
    // 1. Get current user profile (for In-Game Name)
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    
    // 2. Load all jobs with Employer and Worker names
    const { data } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username), employer:profiles!contracts_employer_id_fkey(username)').order('created_at', { ascending: false });
    setJobs(data || []);
    setLd(false);
  };

  useEffect(() => { ref(); }, []);

  const post = async (e: any) => {
    e.preventDefault();
    const { error } = await sb.from('contracts').insert([{ title: f.t, payout: parseInt(f.p), employer_id: u.id, status: 'available' }]);
    if (!error) {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🚜 **NEW SUB-CONTRACT**\n**${u.username}** is hiring for: **${f.t}** ($${f.p})\nClaim it here: https://ctfg-portal.vercel.app/contracts` 
      })}).catch(()=>0);
      setF({ t: '', p: '' }); ref();
    }
  };

  const claim = async (id: string) => { await sb.from('contracts').update({ status: 'taken', assigned_to: u.id }).eq('id', id); ref(); };
  const finish = async (id: string) => { await sb.from('contracts').update({ status: 'pending' }).eq('id', id); ref(); };
  
  const pay = async (j: any) => {
    const { error } = await sb.rpc('pay_contract', { contract_id: j.id, worker_id: j.assigned_to, employer_id: u.id, payout_amount: j.payout });
    if (error) alert(error.message); 
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `✅ **CONTRACT PAID**\n**${u.username}** paid **${j.profiles?.username}** $${j.payout.toLocaleString()} for completing *${j.title}*!` 
      })}).catch(()=>0);
      alert("Worker Paid!"); ref();
    }
  };

  if (ld) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Syncing Job Board...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b',color:'#fff',border:'none',padding:'8px 15px',borderRadius:'8px',marginBottom:'20px',cursor:'pointer'}}>← Dashboard</button>
        <h2 style={{color:'#22c55e'}}>CTFG Job Board</h2>

        {/* POST JOB FORM */}
        <form onSubmit={post} style={{ background:'#131926', padding:'15px', borderRadius:'15px', marginBottom:'20px', display:'flex', gap:'5px' }}>
          <input placeholder="Hiring for..." value={f.t} onChange={e=>setF({...f, t:e.target.value})} style={{flex:2, background:'#000', color:'#fff', border:'1px solid #333', padding:'8px'}} required />
          <input placeholder="$" type="number" value={f.p} onChange={e=>setF({...f, p:e.target.value})} style={{flex:1, background:'#000', color:'#fff', border:'1px solid #333', padding:'8px'}} required />
          <button type="submit" style={{background:'#22c55e', color:'#fff', border:'none', padding:'10px', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>Post</button>
        </form>

        {/* JOBS LIST */}
        {jobs.map(j => (
          <div key={j.id} style={{ background:'#131926', padding:'15px', borderRadius:'15px', marginBottom:'10px', border:'1px solid #1e293b' }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span style={{fontWeight:'bold'}}>{j.title}</span> <span style={{color:'#22c55e'}}>${j.payout?.toLocaleString()}</span>
            </div>
            <p style={{fontSize:'11px', color:'#94a3b8', margin:'4px 0'}}>Employer: <b>{j.employer?.username || 'Admin'}</b></p>
            
            {j.status === 'available' && j.employer_id !== u?.id && <button onClick={()=>claim(j.id)} style={{width:'100%', background:'#22c55e', color:'#fff', border:'none', padding:'8px', marginTop:'5px', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>Claim Job</button>}
            {j.status === 'taken' && j.assigned_to === u?.id && <button onClick={()=>finish(j.id)} style={{width:'100%', background:'#f97316', color:'#fff', border:'none', padding:'8px', marginTop:'5px', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>Mark Finished</button>}
            {j.status === 'pending' && j.employer_id === u?.id && <button onClick={()=>pay(j)} style={{width:'100%', background:'#3b82f6', border:'none', color:'#fff', padding:'8px', marginTop:'5px', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>Pay {j.profiles?.username}</button>}
            {j.status === 'pending' && j.employer_id !== u?.id && <span style={{fontSize:'12px', color:'#94a3b8'}}><Clock size={12}/> Waiting for Pay...</span>}
            {j.status === 'completed' && <span style={{color:'#22c55e', fontSize:'12px'}}><CheckCircle size={12}/> Completed</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
