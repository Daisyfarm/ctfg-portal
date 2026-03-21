"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, Cloud, LogOut, Briefcase, Map, TrendingUp, Landmark, Tractor, ChevronDown, CheckCircle, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function CropInsurance() {
  const [u, setU] = useState<any>(null);
  const [myLand, setMyLand] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: land } = await sb.from('land_registry').select('*').eq('owner_id', user.id);
        setMyLand(land || []);
        const { data: ins } = await sb.from('insurance').select('*, land_registry(field_number)').eq('user_id', user.id).eq('status', 'ACTIVE');
        setPolicies(ins || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const buyInsurance = async (field: any) => {
    const premium = Math.round(field.price * 0.02); // 2% of land value
    const coverage = Math.round(field.price * 0.80); // 80% coverage
    
    if (confirm(`Insure Field ${field.field_number} for a premium of $${premium.toLocaleString()}?`)) {
        const { error } = await sb.rpc('buy_insurance', { p_id: u.id, f_id: field.id, cost: premium, coverage: coverage });
        if (error) alert(error.message);
        else {
            await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
                content: `🛡️ **INSURANCE POLICY ISSUED**\n**${u.username}** has insured **Field ${field.field_number}** for **$${coverage.toLocaleString()}** in coverage.` 
            })});
            alert("Policy Issued Successfully."); load();
        }
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Insurance Underwriters...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px', textTransform:'uppercase'}}>Montana Weather: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Management</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/insurance'}><ShieldCheck size={16}/> Crop Insurance</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT Area */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <div style={{ background:'rgba(25,25,25,0.95)', padding:'40px', borderTop:'1px solid #fff' }}>
                <h1 style={{fontSize:'36px', margin:0, textTransform:'uppercase'}}>Crop Insurance</h1>
                <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
                    PROTECT YOUR FARM FROM UNFORESEEN DISASTERS. SELECT AN OWNED FIELD BELOW TO VIEW ELIGIBLE POLICIES. INSURANCE LASTS FOR 7 REAL-TIME DAYS AND COVERS UP TO 80% OF LAND VALUE.
                </p>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }}>
                    
                    {/* ACTIVE POLICIES */}
                    <div>
                        <h2 style={{fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px'}}>Active Policies</h2>
                        {policies.length === 0 ? <p style={{color:'#555', fontSize:'13px'}}>No active coverage found.</p> : policies.map(p => (
                            <div key={p.id} style={{ background:'#1a1a1a', padding:'15px', borderRadius:'4px', marginBottom:'10px', borderLeft:'4px solid #22c55e' }}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <span style={{fontWeight:'bold'}}>Field #{p.land_registry?.field_number} Coverage</span>
                                    <span style={{color:'#22c55e', fontWeight:'bold'}}>ACTIVE</span>
                                </div>
                                <p style={{margin:'5px 0', fontSize:'18px', color:'#fff'}}>${p.coverage_amount.toLocaleString()}</p>
                                <p style={{margin:0, fontSize:'10px', color:'#555'}}>EXPIRES: {new Date(p.expires_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>

                    {/* BUY NEW COVERAGE */}
                    <div>
                        <h2 style={{fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px'}}>Eligible Fields</h2>
                        {myLand.length === 0 ? <p style={{color:'#555', fontSize:'13px'}}>You must own land before you can apply for insurance.</p> : myLand.map(field => {
                            const isInsured = policies.find(p => p.field_id === field.id);
                            return (
                                <div key={field.id} style={{ background:'#1a1a1a', padding:'15px', borderRadius:'4px', marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                                    <div>
                                        <p style={{margin:0, fontWeight:'bold'}}>Field #{field.field_number}</p>
                                        <p style={{margin:0, fontSize:'11px', color:'#555'}}>Premium: ${Math.round(field.price * 0.02).toLocaleString()}</p>
                                    </div>
                                    {!isInsured ? (
                                        <button onClick={()=>buyInsurance(field)} style={{ background:'#4a7ab5', color:'#fff', border:'none', padding:'8px 15px', fontWeight:'bold', cursor:'pointer', fontSize:'11px', borderRadius:'2px' }}>BUY COVERAGE</button>
                                    ) : (
                                        <span style={{color:'#22c55e'}}><CheckCircle size={18}/></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
