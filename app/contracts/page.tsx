"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, ArrowLeft, Clock, CheckCircle, Plus, Home, FileText, Search, Info, HelpCircle, Star, DollarSign, MapPin } from 'lucide-react';

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
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username), employer:profiles!contracts_employer_id_fkey(username)').order('created_at', { ascending: false });
    setJobs(data || []);
    setLd(false);
  };

  useEffect(() => { ref(); }, []);

  const post = async (e: any) => {
    e.preventDefault();
    const { error } = await sb.from('contracts').insert([{ title: f.t, payout: parseInt(f.p), employer_id: u.id, status: 'available' }]);
    if (!error) {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🚜 **CONTRACT POSTED**\n**${u.username}** is hiring: **${f.t}** ($${f.p})` })}).catch(()=>0);
      setF({ t: '', p: '' }); setShowAdd(false); ref();
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

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Contracting Network...</div>;

  return (
    <div style={{ background:'#222', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif' }}>
      
      {/* HEADER MATCHING SCREENSHOT */}
      <div style={{ background:'#333', padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
            <h1 style={{ margin:0, fontSize:'28px', textTransform:'uppercase', letterSpacing:'1px' }}>Contracting Center</h1>
            <div style={{ display:'flex', gap:'20px', marginLeft:'40px' }}>
                <span onClick={()=>window.location.href='/dashboard'} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#aaa'}}><Home size={18} color="#f59e0b"/> HOME</span>
                <span onClick={()=>setShowAdd(!showAdd)} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#aaa'}}><Plus size={20} color="#22c55e"/> ADD CONTRACT</span>
                <span style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#aaa'}}><FileText size={18} color="#4a7ab5"/> MY CONTRACTS</span>
            </div>
        </div>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b', border:'none', color:'#fff', padding:'8px 15px', borderRadius:'4px', cursor:'pointer', fontSize:'12px'}}>Back</button>
      </div>

      {/* FILTER BAR */}
      <div style={{ background:'#4a7ab5', padding:'10px 40px', display:'flex', gap:'1px' }}>
        <select style={{ padding:'10px', width:'250px', background:'#fff', border:'none', fontSize:'13px', textTransform:'uppercase' }}>
            <option>All Player Contracts</option>
        </select>
        <button style={{ padding:'10px 40px', background:'#4a7ab5', color:'#fff', border:'1px solid #fff', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase', fontSize:'13px' }}>Filter</button>
      </div>

      <div style={{ position:'relative', minHeight:'calc(100vh - 150px)' }}>
        {/* BACKGROUND IMAGE OVERLAY */}
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.1, position:'absolute' }} />

        <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
          
          {/* ADD CONTRACT FORM (Toggles) */}
          {showAdd && (
            <div style={{ background:'#333', padding:'25px', borderRadius:'4px', marginBottom:'30px', border:'1px solid #4a7ab5' }}>
              <h3 style={{marginTop:0}}>Post New Field Work</h3>
              <form onSubmit={post} style={{ display:'flex', gap:'10px' }}>
                <input placeholder="Job Title (e.g. Harvest Field 8)" value={f.t} onChange={e=>setF({...f, t:e.target.value})} style={{flex:2, padding:'10px'}} required />
                <input placeholder="Payout $" type="number" value={f.p} onChange={e=>setF({...f, p:e.target.value})} style={{flex:1, padding:'10px'}} required />
                <button type="submit" style={{background:'#22c55e', color:'#fff', padding:'10px 20px', border:'none', fontWeight:'bold'}}>POST</button>
              </form>
            </div>
          )}

          {/* JOB CARDS */}
          {jobs.map(j => (
            <div key={j.id} style={{ background:'rgba(85,85,85,0.9)', padding:'25px', marginBottom:'15px', borderRadius:'2px', border:'1px solid #666', display:'flex', justifyContent:'space-between' }}>
              
              <div style={{ width:'200px' }}>
                <h4 style={{ margin:0, fontSize:'16px', fontStyle:'italic' }}>{j.employer?.username || 'CTFG Network'}</h4>
                <div style={{ display:'flex', color:'#4a7ab5', margin:'5px 0' }}>
                  <Star size={12} fill="#4a7ab5"/> <Star size={12} fill="#4a7ab5"/> <Star size={12} fill="#4a7ab5"/> <Star size={12} fill="#4a7ab5"/> <Star size={12} fill="#4a7ab5"/>
                </div>
                <p style={{ margin:0, fontSize:'11px', color:'#ccc' }}>ID: {j.id.slice(0,6)}</p>
                <p style={{ margin:'5px 0', fontSize:'14px', fontWeight:'bold', textTransform:'uppercase' }}>{j.title.split(' ')[0]}</p>
              </div>

              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'10px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                        <DollarSign size={20} color="#888" />
                        <span style={{ fontSize:'18px', fontWeight:'bold', color:'#ddd' }}>${j.payout?.toLocaleString()}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'5px', color:'#aaa', fontSize:'13px' }}>
                        <Info size={20} color="#4a7ab5" /> Details
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'5px', color:'#aaa', fontSize:'13px' }}>
                        <HelpCircle size={20} color="#4a7ab5" /> How-To?
                    </div>
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'14px', color:'#ddd' }}>
                    <Clock size={18} color="#888" /> Hourly / Flat Rate
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'14px', color:'#ddd' }}>
                    <MapPin size={18} color="#888" /> Judith Plains Montana Map
                </div>

                <div style={{ marginTop:'10px' }}>
                    {j.status === 'available' && j.employer_id !== u?.id && <button onClick={()=>claim(j.id)} style={{ padding:'8px 25px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', textTransform:'uppercase' }}>Accept Contract</button>}
                    {j.status === 'taken' && j.assigned_to === u?.id && <button onClick={()=>finish(j.id)} style={{ padding:'8px 25px', background:'#f59e0b', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', textTransform:'uppercase' }}>Complete Work</button>}
                    {j.status === 'pending' && j.employer_id === u?.id && <button onClick={()=>pay(j)} style={{ padding:'8px 25px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', textTransform:'uppercase' }}>Authorize Payment to {j.profiles?.username}</button>}
                    {j.status === 'pending' && j.employer_id !== u?.id && <span style={{fontSize:'12px', color:'#f59e0b', fontWeight:'bold'}}>AWAITING AUDIT...</span>}
                    {j.status === 'completed' && <span style={{fontSize:'14px', color:'#22c55e', fontWeight:'bold'}}>✓ CONTRACT SETTLED</span>}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
