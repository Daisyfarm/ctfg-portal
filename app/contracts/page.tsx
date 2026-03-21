"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, Tractor, Clock, CheckCircle, Plus, Home, Map, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Contracting() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [f, setF] = useState({ t: '', p: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [ld, setLd] = useState(true);

  const ref = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      
      // Load user profile
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setU(profile || { username: 'Farmer', id: user.id });

      // Load jobs with a simpler query to prevent hanging
      const { data } = await sb.from('contracts').select('*, profiles!contracts_assigned_to_fkey(username)').order('created_at', { ascending: false });
      setJobs(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLd(false);
    }
  };

  useEffect(() => { ref(); }, []);

  const post = async (e: any) => {
    e.preventDefault();
    const { error } = await sb.from('contracts').insert([{ title: f.t, payout: parseInt(f.p), employer_id: u.id, status: 'available' }]);
    if (!error) {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🚜 **NEW CONTRACT**\n**${u.username}** is hiring: **${f.t}** ($${f.p})` })}).catch(()=>0);
      setF({ t: '', p: '' }); setShowAdd(false); ref();
    }
  };

  const claim = async (id: string) => { await sb.from('contracts').update({ status: 'taken', assigned_to: u.id }).eq('id', id); ref(); };
  const finish = async (id: string) => { await sb.from('contracts').update({ status: 'pending' }).eq('id', id); ref(); };
  
  const pay = async (j: any) => {
    const { error } = await sb.rpc('pay_contract', { contract_id: j.id, worker_id: j.assigned_to, employer_id: u.id, payout_amount: j.payout });
    if (error) alert(error.message); else ref();
  };

  if (ld) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Syncing Operations Board...</div>;
  const sBtn = { width:'100%', padding:'12px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'10px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span style={{color:'#22c55e', fontWeight:'900', fontStyle:'italic'}}>CTFG NETWORK</span>
        <button onClick={()=>setShowAdd(!showAdd)} style={{background:'#22c55e', color:'#000', border:'none', padding:'5px 15px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>+ ADD CONTRACT</button>
      </div>
      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'200px', background:'#222', padding:'15px', borderRight:'1px solid #000' }}>
          <button style={sBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={14}/> Dashboard</button>
          <button style={{...sBtn, background:'#333', color:'#fff'}}><Briefcase size={14}/> Field Work</button>
          <button style={sBtn} onClick={()=>window.location.href='/land'}><Map size={14}/> Management</button>
          <button style={sBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>
        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'30px', overflowY:'auto' }}>
          {showAdd && (
            <form onSubmit={post} style={{ background:'#333', padding:'20px', borderRadius:'4px', border:'1px solid #4a7ab5', marginBottom:'20px', display:'flex', gap:'10px' }}>
              <input placeholder="Job..." value={f.t} onChange={e=>setF({...f, t:e.target.value})} style={{flex:2, padding:'10px'}} required />
              <input placeholder="$" type="number" value={f.p} onChange={e=>setF({...f, p:e.target.value})} style={{flex:1, padding:'10px'}} required />
              <button type="submit" style={{background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', padding:'0 20px'}}>POST</button>
            </form>
          )}
          {jobs.map(j => (
            <div key={j.id} style={{ background:'rgba(50,50,50,0.9)', padding:'20px', borderRadius:'4px', border:'1px solid #444', display:'flex', gap:'20px', alignItems:'center', marginBottom:'10px' }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <h4 style={{ margin:0, textTransform:'uppercase' }}>{j.title}</h4>
                  <span style={{ fontSize:'20px', fontWeight:'bold', color:'#22c55e' }}>${j.payout?.toLocaleString()}</span>
                </div>
                <div style={{ marginTop:'10px' }}>
                  {j.status === 'available' && j.employer_id !== u?.id && <button onClick={()=>claim(j.id)} style={{ padding:'5px 15px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'10px' }}>ACCEPT</button>}
                  {j.status === 'taken' && j.assigned_to === u?.id && <button onClick={()=>finish(j.id)} style={{ padding:'5px 15px', background:'#f59e0b', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'10px' }}>FINISH</button>}
                  {j.status === 'pending' && j.employer_id === u?.id && <button onClick={()=>pay(j)} style={{ padding:'5px 15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'10px' }}>PAY {j.profiles?.username}</button>}
                  {j.status === 'pending' && j.employer_id !== u?.id && <span style={{ color:'#f59e0b', fontSize:'10px' }}>AWAITING PAY</span>}
                  {j.status === 'completed' && <span style={{ color:'#22c55e', fontSize:'10px' }}>✓ PAID</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
