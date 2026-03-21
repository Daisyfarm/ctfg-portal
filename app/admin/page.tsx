"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Plus, Radio, TrendingUp, ArrowLeft, Banknote, Truck, Clock, Check, Send } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function AdminPanel() {
  const [ps, setPs] = useState<any[]>([]);
  const [syncs, setSyncs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [f, setF] = useState({ cargo: '', dest: '', pay: '', radio: '' });

  const ref = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: s } = await sb.from('bank_sync').select('*, profiles(username)').eq('status', 'PENDING');
    setPs(p || []); setSyncs(s || []);
    setLd(false);
  };

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('rank').eq('id', user?.id).single().then(({data}) => {
        if (data?.rank !== 'Admin') window.location.href = '/dashboard';
        else ref();
      });
    });
  }, []);

  const postLoad = async (e: any) => {
    e.preventDefault();
    await sb.from('logistics_jobs').insert([{ cargo: f.cargo, destination: f.dest, payout: parseInt(f.pay), origin: 'Judith Plains, MT' }]);
    await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🚚 **NEW FREIGHT AVAILABLE**\nA load of **${f.cargo}** is ready for transport to **${f.dest}**! Payout: $${f.pay}` })});
    alert("Freight Posted."); setF({ ...f, cargo: '', dest: '', pay: '' });
  };

  const approveSync = async (id: string) => {
    await sb.from('bank_sync').update({ status: 'COMPLETED' }).eq('id', id);
    alert("Bank Sync Marked as Completed."); ref();
  };

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Command Center...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'15px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #dc2626' }}>
        <span style={{color:'#dc2626', fontWeight:'900', fontSize:'20px'}}>CTFG STAFF COMMAND</span>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'#333', color:'#fff', border:'none', padding:'5px 15px', fontWeight:'bold', cursor:'pointer'}}>DASHBOARD</button>
      </div>

      <div style={{ padding:'40px', maxWidth:'1200px', margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px' }}>
        
        {/* LOGISTICS MANAGER */}
        <div style={{ background:'#1a1a1a', padding:'25px', borderRadius:'4px', borderTop:'4px solid #3b82f6' }}>
          <h3 style={{margin:'0 0 20px 0', color:'#3b82f6'}}><Truck size={20}/> Post ATS Freight</h3>
          <form onSubmit={postLoad} style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            <input placeholder="Cargo (e.g. Soybeans)" value={f.cargo} onChange={e=>setF({...f, cargo:e.target.value})} style={{padding:'10px', background:'#000', border:'1px solid #333', color:'#fff'}} />
            <input placeholder="Destination (e.g. Portland)" value={f.dest} onChange={e=>setF({...f, dest:e.target.value})} style={{padding:'10px', background:'#000', border:'1px solid #333', color:'#fff'}} />
            <input placeholder="Payout $" type="number" value={f.pay} onChange={e=>setF({...f, pay:e.target.value})} style={{padding:'10px', background:'#000', border:'1px solid #333', color:'#fff'}} />
            <button type="submit" style={{background:'#3b82f6', color:'#fff', padding:'10px', fontWeight:'bold', cursor:'pointer'}}>POST TO LOGISTICS BOARD</button>
          </form>
        </div>

        {/* BANK SYNC MANAGER */}
        <div style={{ background:'#1a1a1a', padding:'25px', borderRadius:'4px', borderTop:'4px solid #f59e0b' }}>
          <h3 style={{margin:'0 0 20px 0', color:'#f59e0b'}}><Clock size={20}/> Pending Bank Syncs</h3>
          {syncs.length === 0 ? <p style={{color:'#444'}}>No pending transfers.</p> : syncs.map(s => (
            <div key={s.id} style={{ display:'flex', justifyContent:'space-between', background:'#111', padding:'15px', marginBottom:'10px', borderRadius:'4px' }}>
              <div>
                <b style={{color:'#fff'}}>{s.profiles?.username}</b>
                <p style={{margin:0, fontSize:'12px', color:'#888'}}>Farm ID: {s.farm_id} | ${s.amount.toLocaleString()}</p>
              </div>
              <button onClick={()=>approveSync(s.id)} style={{background:'#22c55e', color:'#000', border:'none', padding:'5px 15px', fontWeight:'bold', cursor:'pointer', fontSize:'11px'}}>MARK SYNCED</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
