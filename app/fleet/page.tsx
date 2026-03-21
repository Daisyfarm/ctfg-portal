"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, Plus, Trash2, Wrench, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Fleet() {
  const [fleet, setFleet] = useState<any[]>([]);
  const [u, setU] = useState<any>(null);
  const [w, setW] = useState("");
  const [form, setForm] = useState({ name: '', cat: 'Tractor' });
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data } = await sb.from('fleet').select('*, profiles(username)').order('condition', { ascending: true });
    setFleet(data || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleService = async (item: any) => {
    const cost = 1500;
    const { error } = await sb.rpc('perform_maintenance', { p_id: u.id, m_id: item.id, service_cost: cost });
    if (error) alert(error.message);
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🔧 **WORKSHOP UPDATE**\n**${u.username}** serviced their **${item.machinery_name}** at the central workshop for **$1,500**.` })});
      alert("Maintenance Complete!"); load();
    }
  };

  const addAsset = async (e: any) => {
    e.preventDefault();
    await sb.from('fleet').insert([{ owner_id: u.id, machinery_name: form.name, category: form.cat, condition: 100 }]);
    setForm({ name: '', cat: 'Tractor' }); load();
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Fleet Database...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> Montana: {w || '--°F'}</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>Finances</span>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Management</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'#1a1a1a', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{margin:'0 0 30px 0', fontSize:'32px'}}>Fleet & Maintenance</h1>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'30px' }}>
              <div style={{ background:'#222', padding:'25px', borderRadius:'4px', borderTop:'4px solid #4a7ab5', height:'fit-content' }}>
                <h3 style={{margin:'0 0 15px 0', fontSize:'16px'}}>Purchase New Asset</h3>
                <form onSubmit={addAsset} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <input placeholder="Model Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} required />
                  <select value={form.cat} onChange={e=>setForm({...form, cat:e.target.value})} style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}}>
                    <option>Tractor</option><option>Harvester</option><option>Truck</option>
                  </select>
                  <button type="submit" style={{padding:'12px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px'}}>REGISTER TO FLEET</button>
                </form>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                {fleet.map(i => (
                  <div key={i.id} style={{ background:'#222', padding:'20px', borderRadius:'4px', borderLeft: i.condition < 30 ? '5px solid #ff4d4d' : '5px solid #444' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div>
                        <h4 style={{margin:0, fontSize:'18px'}}>{i.machinery_name}</h4>
                        <p style={{margin:'5px 0', fontSize:'11px', color:'#555'}}>OWNER: {i.profiles?.username}</p>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <p style={{margin:0, fontSize:'11px', fontWeight:'bold', color: i.condition < 30 ? '#ff4d4d' : '#22c55e'}}>CONDITION: {i.condition}%</p>
                        <div style={{width:'120px', height:'6px', background:'#111', borderRadius:'10px', marginTop:'5px', overflow:'hidden'}}>
                            <div style={{width: `${i.condition}%`, height:'100%', background: i.condition < 30 ? '#ff4d4d' : '#22c55e'}}></div>
                        </div>
                      </div>
                    </div>

                    {i.owner_id === u.id && (
                      <div style={{marginTop:'15px', display:'flex', gap:'10px'}}>
                        <button onClick={()=>handleService(i)} style={{padding:'8px 15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px', display:'flex', alignItems:'center', gap:'5px'}}>
                          <Wrench size={14}/> SERVICE MACHINE ($1,500)
                        </button>
                        {i.condition < 30 && <span style={{color:'#ff4d4d', fontSize:'11px', display:'flex', alignItems:'center', gap:'5px'}}><AlertTriangle size={14}/> URGENT REPAIR NEEDED</span>}
                      </div>
                    )}
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
