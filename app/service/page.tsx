"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wrench, ArrowLeft, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, ShieldAlert, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ServiceCenter() {
  const [u, setU] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [myFleet, setMyFleet] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: fleet } = await sb.from('fleet').select('*').eq('owner_id', user.id).lt('condition', 100);
        setMyFleet(fleet || []);
    }
    const { data: ticketData } = await sb.from('service_tickets').select('*, profiles!service_tickets_owner_id_fkey(username), fleet(machinery_name, condition)').eq('status', 'OPEN');
    setTickets(ticketData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const requestRepair = async (item: any) => {
    await sb.from('service_tickets').insert([{ machinery_id: item.id, owner_id: u.id, issue_description: 'Engine overhaul required.', repair_cost: 5000 }]);
    await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
        content: `🔧 **WORKSHOP REQUEST**\n**${u.username}** has sent a broken **${item.machinery_name}** to the shop floor! CMS Mechanics needed.` 
    })});
    alert("Vehicle sent to Shop Floor."); load();
  };

  const completeRepair = async (t: any) => {
    const { error } = await sb.rpc('complete_repair', { 
        ticket_id: t.id, m_id: u.id, o_id: t.owner_id, cost: t.repair_cost, mach_id: t.machinery_id 
    });
    if (error) alert(error.message);
    else {
        await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
            content: `✅ **REPAIR COMPLETE**\n**${u.username}** has finished the repair on **${t.fleet.machinery_name}**. The unit is back at 100% condition!` 
        })});
        alert("Repair logged and paid."); load();
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Workshop...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', borderBottom:'2px solid #f59e0b', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
        <div style={{background:'#f59e0b', color:'#000', padding:'5px 15px', fontSize:'11px', fontWeight:'bold', borderRadius:'3px'}}>MAINTENANCE HUB</div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}}><Wrench size={16} color="#f59e0b"/> CMS Workshop</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{fontSize:'32px', textTransform:'uppercase', margin:0}}>Shop Floor</h1>
            <p style={{fontSize:'12px', color:'#f59e0b', fontWeight:'bold', margin:'10px 0 30px'}}>CENTRALIZED MAINTENANCE FOR ALL FS25 ASSETS VIA CAR MECHANIC SIMULATOR.</p>

            <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'30px' }}>
              
              {/* OPEN TICKETS (The Job Board for Mechanics) */}
              <div>
                <h2 style={{fontSize:'18px', borderBottom:'1px solid #333', paddingBottom:'10px', marginBottom:'20px'}}>Active Work Orders</h2>
                {tickets.length === 0 ? <p style={{color:'#555'}}>No vehicles currently in the shop.</p> : tickets.map(t => (
                  <div key={t.id} style={{ background:'#222', padding:'20px', borderRadius:'4px', marginBottom:'15px', borderLeft:'5px solid #f59e0b' }}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h4 style={{margin:0, fontSize:'18px'}}>{t.fleet?.machinery_name}</h4>
                        <span style={{color:'#22c55e', fontWeight:'bold'}}>${t.repair_cost.toLocaleString()}</span>
                    </div>
                    <p style={{fontSize:'12px', color:'#888', margin:'5px 0'}}>OWNER: {t.profiles?.username}</p>
                    <p style={{fontSize:'12px', color:'#ff4d4d'}}>CONDITION: {t.fleet?.condition}%</p>
                    <button onClick={()=>completeRepair(t)} style={{ width:'100%', padding:'10px', background:'#f59e0b', color:'#000', border:'none', fontWeight:'bold', marginTop:'15px', cursor:'pointer', fontSize:'11px'}}>COMPLETE CMS REPAIR & BILL OWNER</button>
                  </div>
                ))}
              </div>

              {/* REQUEST SERVICE (For the Farmer) */}
              <div>
                <h2 style={{fontSize:'18px', borderBottom:'1px solid #333', paddingBottom:'10px', marginBottom:'20px'}}>Your Damaged Fleet</h2>
                {myFleet.length === 0 ? <p style={{color:'#555'}}>All your equipment is at 100%.</p> : myFleet.map(item => (
                  <div key={item.id} style={{ background:'#1a1a1a', padding:'15px', borderRadius:'4px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                        <p style={{margin:0, fontWeight:'bold'}}>{item.machinery_name}</p>
                        <p style={{margin:0, fontSize:'11px', color:'#ff4d4d'}}>{item.condition}% Condition</p>
                    </div>
                    <button onClick={()=>requestRepair(item)} style={{ background:'#4a7ab5', color:'#fff', border:'none', padding:'8px 12px', fontSize:'10px', fontWeight:'bold', cursor:'pointer'}}>SEND TO SHOP</button>
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
