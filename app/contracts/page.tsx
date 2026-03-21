"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, ArrowLeft, Clock, CheckCircle, Plus, Home, FileText, Star, DollarSign, MapPin, Cloud, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ContractingCenter() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [f, setF] = useState({ t: '', p: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [ld, setLd] = useState(true);

  const ref = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*, companies(name, logo_url)').eq('id', user.id).single();
        setU(profile);
    }
    // We pull the job, the worker name, AND the employer's company logo
    const { data } = await sb.from('contracts').select(`
      *,
      profiles!contracts_assigned_to_fkey(username),
      employer:profiles!contracts_employer_id_fkey(
        username,
        companies(name, logo_url)
      )
    `).order('created_at', { ascending: false });
    
    setJobs(data || []);
    setLd(false);
  };

  useEffect(() => { ref(); }, []);

  const post = async (e: any) => {
    e.preventDefault();
    const { error } = await sb.from('contracts').insert([{ title: f.t, payout: parseInt(f.p), employer_id: u.id, status: 'available' }]);
    if (!error) {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🚜 **CONTRACT POSTED**\n**${u.companies?.name || u.username}** is hiring: **${f.t}** ($${f.p})` 
      })}).catch(()=>0);
      setF({ t: '', p: '' }); setShowAdd(false); ref();
    }
  };

  const claim = async (id: string) => { await sb.from('contracts').update({ status: 'taken', assigned_to: u.id }).eq('id', id); ref(); };
  const finish = async (id: string) => { await sb.from('contracts').update({ status: 'pending' }).eq('id', id); ref(); };
  
  const pay = async (j: any) => {
    const { error } = await sb.rpc('pay_contract', { contract_id: j.id, worker_id: j.assigned_to, employer_id: u.id, payout_amount: j.payout });
    if (error) alert(error.message); 
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `✅ **CONTRACT SETTLED**\n**${u.companies?.name || u.username}** paid **${j.profiles?.username}** $${j.payout.toLocaleString()}!` 
      })}).catch(()=>0);
      ref();
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Operations Center...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
            <h1 style={{ margin:0, fontSize:'24px', textTransform:'uppercase' }}>Contracting Center</h1>
            <div style={{ display:'flex', gap:'20px', marginLeft:'40px' }}>
                <span onClick={()=>window.location.href='/dashboard'} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color:'#aaa'}}><Home size={16} color="#f59e0b"/> HOME</span>
                <span onClick={()=>setShowAdd(!showAdd)} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'11px', color:'#aaa'}}><Plus size={18} color="#22c55e"/> ADD CONTRACT</span>
            </div>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}}><Briefcase size={16}/> Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Map size={16}/> Management</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* CONTENT */}
        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            
            {showAdd && (
              <div style={{ background:'#333', padding:'25px', borderRadius:'4px', marginBottom:'30px', border:'1px solid #4a7ab5' }}>
                <h3 style={{marginTop:0}}>Post New Service Contract</h3>
                <form onSubmit={post} style={{ display:'flex', gap:'10px' }}>
                  <input placeholder="Service Required..." value={f.t} onChange={e=>setF({...f, t:e.target.value})} style={{flex:2, padding:'10px', background:'#111', color:'#fff', border:'1px solid #444'}} required />
                  <input placeholder="Fee $" type="number" value={f.p} onChange={e=>setF({...f, p:e.target.value})} style={{flex:1, padding:'10px', background:'#111', color:'#fff', border:'1px solid #444'}} required />
                  <button type="submit" style={{background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', padding:'0 30px', cursor:'pointer'}}>POST</button>
                </form>
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
              {jobs.map(j => (
                <div key={j.id} style={{ background:'rgba(50,50,50,0.9)', padding:'25px', borderRadius:'4px', border:'1px solid #444', display:'flex', gap:'30px', alignItems:'center' }}>
                  
                  {/* COMPANY LOGO AREA */}
                  <div style={{ width:'120px', textAlign:'center' }}>
                    <div style={{ width:'100px', height:'100px', background:'#fff', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', padding:'5px', margin:'0 auto' }}>
                        <img src={j.employer?.companies?.logo_url || 'https://i.ibb.co/Z8m6v8p/ctfg-placeholder.png'} style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} />
                    </div>
                    <p style={{ margin:'10px 0 0 0', fontSize:'11px', fontWeight:'bold', color:'#aaa' }}>{j.employer?.companies?.name || j.employer?.username}</p>
                  </div>

                  {/* JOB DETAILS */}
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <h4 style={{ margin:0, fontSize:'20px', textTransform:'uppercase' }}>{j.title}</h4>
                        <span style={{ fontSize:'24px', fontWeight:'bold', color:'#22c55e', fontFamily:'monospace' }}>${j.payout?.toLocaleString()}</span>
                    </div>
                    <div style={{ display:'flex', gap:'20px', marginTop:'10px', color:'#888', fontSize:'12px' }}>
                        <span style={{display:'flex', alignItems:'center', gap:'5px'}}><Star size={14} fill="#f59e0b" color="#f59e0b"/> 5.0 Rating</span>
                        <span style={{display:'flex', alignItems:'center', gap:'5px'}}><MapPin size={14}/> Montana Judith Plains</span>
                    </div>

                    <div style={{ marginTop:'20px' }}>
                        {j.status === 'available' && j.employer_id !== u?.id && <button onClick={()=>claim(j.id)} style={{ padding:'10px 30px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer' }}>ACCEPT CONTRACT</button>}
                        {j.status === 'taken' && j.assigned_to === u?.id && <button onClick={()=>finish(j.id)} style={{ padding:'10px 30px', background:'#f59e0b', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer' }}>MARK WORK FINISHED</button>}
                        {j.status === 'pending' && j.employer_id === u?.id && <button onClick={()=>pay(j)} style={{ padding:'10px 30px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer' }}>AUTHORIZE PAYMENT TO {j.profiles?.username}</button>}
                        {j.status === 'pending' && j.employer_id !== u?.id && <span style={{ color:'#f59e0b', fontWeight:'bold' }}>AWAITING EMPLOYER AUDIT</span>}
                        {j.status === 'completed' && <span style={{ color:'#22c55e', fontWeight:'bold' }}>✓ TRANSACTION SETTLED</span>}
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
