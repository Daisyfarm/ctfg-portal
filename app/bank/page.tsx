"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Landmark, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, ChevronDown, Info } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function BankingArea() {
  const [u, setU] = useState<any>(null);
  const [banks, setBanks] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
    }
    const { data: bankData } = await sb.from('banks').select('*').order('name');
    setBanks(bankData || []);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Financial Network...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> Montana: {w || '--°F'}</span>
            <span style={{color:'#4a7ab5'}}>Finances</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>Market</span>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'220px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Management</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            <h1 style={{fontSize:'36px', margin:0, textTransform:'uppercase'}}>Banking</h1>
            <p style={{fontSize:'12px', color:'#ccc', maxWidth:'800px', lineHeight:'1.6', margin:'15px 0 30px'}}>
              WELCOME TO THE BANKING AREA. HERE IS WHERE YOU CAN LOOK AT VARIOUS FINANCIAL INSTITUTIONS WHO MAY BE ABLE TO OFFER YOU VARIOUS SERVICES FROM LOANS TO ACCOUNTS. AS TIME GOES ON YOU WILL SEE MORE AND MORE SERVICES OFFERED BY THESE BANKS, BUT MAKE SURE YOU PAY YOUR BILLS ON TIME SO YOU DON'T LOSE ACCESS TO THEIR SERVICES!
            </p>

            <h2 style={{fontSize:'24px', marginBottom:'20px', fontWeight:'normal'}}>Player Banks</h2>

            <div style={{ display:'flex', flexDirection:'column', gap:'2px', background:'#111', padding:'1px' }}>
              {banks.map(bank => (
                <div key={bank.id} style={{ background:'rgba(40,40,40,0.9)', padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ textAlign:'center', width:'150px' }}>
                    <div style={{ width:'80px', height:'80px', background:'#000', margin:'0 auto 10px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #555' }}>
                        <Landmark size={40} color={bank.is_open ? '#f59e0b' : '#555'} />
                    </div>
                    <p style={{ margin:0, fontSize:'13px', fontStyle:'italic', fontWeight:'bold' }}>{bank.name}</p>
                  </div>

                  <div style={{ fontSize:'16px', fontWeight:'bold' }}>No Accounts</div>

                  <button 
                    onClick={() => bank.is_open && (window.location.href = '/loans')}
                    style={{ background: bank.btn_color, border:'none', color:'#fff', padding:'12px 25px', fontWeight:'bold', cursor: bank.is_open ? 'pointer' : 'default', opacity: bank.is_open ? 1 : 0.8 }}
                  >
                    {bank.btn_text}
                  </button>

                  <div style={{ textAlign:'center' }}>
                    <div style={{ 
                        border:'2px solid #fff', borderRadius:'5px', padding:'5px 15px', 
                        background: bank.is_open ? '#e8f5e9' : '#ffebee', 
                        color:'#000', fontWeight:'black', fontSize:'18px', 
                        position:'relative', display:'inline-block', textTransform:'uppercase'
                    }}>
                        <div style={{ position:'absolute', top:'-10px', left:'50%', width:'2px', height:'10px', background:'#fff' }}></div>
                        {bank.is_open ? 'Open' : 'Closed'}
                    </div>
                    <p style={{ margin:'10px 0 0 0', fontSize:'11px', fontStyle:'italic', color:'#aaa' }}>{bank.status_msg}</p>
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
