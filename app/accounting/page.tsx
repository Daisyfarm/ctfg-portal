"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Landmark, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, ChevronDown, Info, HelpCircle, DollarSign, Clock } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Accounting() {
  const [u, setU] = useState<any>(null);
  const [stats, setStats] = useState({ landNav: 0, vehicleNav: 0, totalDebt: 0, fines: 0 });
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';

    // Get Profile
    const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
    setU(profile);

    // Get Land Value (Land NAV)
    const { data: land } = await sb.from('land_registry').select('price').eq('owner_id', user.id);
    const landSum = land?.reduce((acc, curr) => acc + curr.price, 0) || 0;

    // Get Vehicle Value (Vehicle NAV)
    const { data: fleet } = await sb.from('fleet').select('value').eq('owner_id', user.id);
    const fleetSum = fleet?.reduce((acc, curr) => acc + curr.value, 0) || 0;

    // Get Debt
    const { data: loans } = await sb.from('loans').select('amount_remaining').eq('user_id', user.id).eq('status', 'active');
    const debtSum = loans?.reduce((acc, curr) => acc + curr.amount_remaining, 0) || 0;

    // Get Fines from transactions
    const { data: tx } = await sb.from('transactions').select('amount').eq('user_id', user.id).ilike('description', '%Fine%');
    const fineSum = tx?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

    setStats({ landNav: landSum, vehicleNav: fleetSum, totalDebt: debtSum, fines: fineSum });
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Generating Audit Report...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px', textTransform:'uppercase'}}>Montana Weather: {w}</span>
        </div>
        <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Field Management</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}}>Accounting</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT Area Matching Screenshot */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <div style={{ background:'rgba(35,35,35,0.9)', padding:'40px', borderTop:'1px solid #fff' }}>
                <h1 style={{fontSize:'42px', margin:0, textTransform:'uppercase'}}>Accounting</h1>
                <p style={{fontSize:'12px', color:'#ccc', margin:'15px 0 30px', maxWidth:'900px'}}>
                    THIS IS YOUR ACCOUNTING AREA. HERE YOU CAN SEE AN OVERVIEW OF YOUR ENTIRE FINANCIAL SITUATION. YOU CAN VIEW MORE DETAILED INFORMATION ON EACH CATEGORY AS WELL. IF YOU HAVE QUESTIONS, REFER TO THE KNOWLEDGEBASE!
                </p>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px' }}>
                    
                    {/* COLUMN 1: WEB LIABILITIES */}
                    <div>
                        <h2 style={{fontSize:'28px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px'}}>Web Liabilities</h2>
                        <div style={{fontSize:'18px', display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>Invoices: $0.00 <span style={{background:'#22c55e', color:'#fff', padding:'2px 4px', fontSize:'10px', borderRadius:'3px'}}>$</span></div>
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>Contracts: $0.00 <span style={{background:'#22c55e', color:'#fff', padding:'2px 4px', fontSize:'10px', borderRadius:'3px'}}>$</span></div>
                            <div>Loans: ${stats.totalDebt.toLocaleString()}</div>
                            <div>IG Loans: $0.00</div>
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>Taxes: $0.00 <HelpCircle size={16} color="#facc15" /> <span style={{background:'#22c55e', color:'#fff', padding:'2px 4px', fontSize:'10px', borderRadius:'3px'}}>$</span></div>
                            <div>Fines: ${stats.fines.toLocaleString()}</div>
                            
                            <div style={{marginTop:'30px'}}>
                                <p style={{margin:0}}>Total Liabilities: ${stats.totalDebt.toLocaleString()}</p>
                                <p style={{margin:0}}>LTN Ratio: 0%</p>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: GAME ASSETS */}
                    <div>
                        <h2 style={{fontSize:'28px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px'}}>Game Assets</h2>
                        <div style={{fontSize:'18px', display:'flex', flexDirection:'column', gap:'10px'}}>
                            <p style={{margin:0}}>Cash: ${u.balance.toLocaleString()}</p>
                            <p style={{margin:0}}>IG Cash: $0.00</p>
                            <p style={{margin:0}}>Savings: $0.00</p>
                            <p style={{margin:0}}>Invoices Receivable: $0.00</p>
                            <p style={{margin:'10px 0 0 0'}}>Vehicle NAV: ${stats.vehicleNav.toLocaleString()}</p>
                            <p style={{margin:0, color:'#4a7ab5'}}>Land NAV (LNAV): ${stats.landNav.toLocaleString()}</p>
                            <p style={{margin:0, color:'#4a7ab5'}}>Bonds: $0.00</p>
                            <p style={{margin:0}}>Funds:</p>

                            <div style={{marginTop:'30px'}}>
                                <p style={{margin:0}}>IG GAV: ${(u.balance + stats.landNav + stats.vehicleNav).toLocaleString()}</p>
                                <p style={{margin:0}}>IG NAV: ${(u.balance + stats.landNav + stats.vehicleNav - stats.totalDebt).toLocaleString()}</p>
                                <p style={{margin:0}}>Credit Score: {u.credit_score || 600}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background:'#1a1a1a', padding:'20px', textAlign:'center', fontSize:'11px', color:'#888', borderTop:'1px solid #333' }}>
        CTFG FARM NETWORK © 2026 • BUILT BY SAMUEL FOUNDER
      </div>
    </div>
  );
}
