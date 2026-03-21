"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LifeBuoy, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, Landmark, ChevronDown, Info, ShieldCheck, Mail } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function SupportCenter() {
  const [u, setU] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: ticketData } = await sb.from('tickets').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        setTickets(ticketData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const closeTicket = async (id: number) => {
    await sb.from('tickets').update({ status: 'CLOSED' }).eq('id', id);
    alert("Ticket marked as resolved.");
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Support Network...</div>;

  const sideBtn = { width:'100%', padding:'15px', background:'#5b84c1', color:'#fff', border:'none', marginBottom:'10px', textAlign:'center' as const, cursor:'pointer', fontWeight:'bold', fontSize:'13px', textTransform:'uppercase' as const };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>MONTANA WEATHER: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#333', padding:'20px', borderRight:'1px solid #111' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Field Management</button>
          <button style={sideBtn} onClick={()=>window.location.href='/bank'}>Finances</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}>Equipment</button>
          <button style={{...sideBtn, background:'#4a7ab5'}} onClick={()=>window.location.href='/support'}>Support</button>
          <button style={{...sideBtn, background:'#555', marginTop:'20px'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT area matching screenshot */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            {/* HEADER BOX */}
            <div style={{ background:'rgba(25,25,25,0.95)', padding:'30px', borderTop:'1px solid #fff', marginBottom:'30px' }}>
                <h1 style={{fontSize:'32px', margin:0, textTransform:'uppercase'}}>Support Center</h1>
                <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'15px 0'}}>
                    THIS IS THE SUPPORT CENTER! IF YOU HAVE ANY ISSUES WITH CTFG, THIS IS WHERE YOU CAN POST THEM, AND WHERE YOU CAN SEE THE STATUS OF OPEN TICKETS, RESPONSES FROM STAFF, ETC.
                </p>
                <div style={{ fontSize:'13px', color:'#4a7ab5', fontWeight:'bold', display:'flex', gap:'10px', textTransform:'uppercase' }}>
                    <span style={{cursor:'pointer'}}>Support Home</span> | <span style={{cursor:'pointer'}} onClick={()=>alert("Ticket system fully active. Click View to see details.")}>Create Ticket</span>
                </div>
            </div>

            {/* TICKETS TABLE */}
            <div style={{ background:'rgba(40,40,40,0.9)', padding:'30px', borderRadius:'2px' }}>
                <h2 style={{fontSize:'28px', margin:'0 0 20px 0'}}>Support Tickets</h2>
                
                <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
                    <thead style={{ background:'#1a1a1a', color:'#fff', fontSize:'14px', textTransform:'uppercase', borderBottom:'1px solid #fff' }}>
                        <tr>
                            <th style={{padding:'15px'}}>ID</th>
                            <th style={{padding:'15px'}}>Subject</th>
                            <th style={{padding:'15px', textAlign:'center'}}>View</th>
                            <th style={{padding:'15px', textAlign:'center'}}>Action</th>
                            <th style={{padding:'15px', textAlign:'right'}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(t => (
                            <tr key={t.id} style={{ borderBottom:'1px solid #333' }}>
                                <td style={{padding:'20px', fontSize:'16px'}}>{50000 + t.id}</td>
                                <td style={{padding:'20px', fontSize:'16px', textTransform:'uppercase'}}>{t.subject}</td>
                                <td style={{padding:'20px', textAlign:'center'}}>
                                    <button style={{ background:'#4a7ab5', color:'#fff', border:'none', padding:'10px 40px', fontWeight:'bold', cursor:'pointer' }}>VIEW</button>
                                </td>
                                <td style={{padding:'20px', textAlign:'center'}}>
                                    {t.status === 'OPEN' && (
                                        <button onClick={()=>closeTicket(t.id)} style={{ background:'#e17055', color:'#fff', border:'none', padding:'10px 20px', fontWeight:'bold', cursor:'pointer' }}>CLOSE TICKET</button>
                                    )}
                                </td>
                                <td style={{padding:'20px', textAlign:'right', fontSize:'16px', textTransform:'uppercase'}}>{t.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
