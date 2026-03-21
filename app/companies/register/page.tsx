"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Building2, Plus, Shield, Briefcase, Truck, Wrench, Cloud, LogOut, Tractor, Map, TrendingUp, Landmark, Activity, FileCheck } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function RegisterCompany() {
  const [u, setU] = useState<any>(null);
  const [hasCo, setHasCo] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Farming', logo: '' });
  const [ld, setLd] = useState(true);

  const LICENSE_COST = 250000;

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: company } = await sb.from('companies').select('*').eq('owner_id', user.id).maybeSingle();
        if (company) setHasCo(true);
    }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (u.balance < LICENSE_COST) return alert("Insufficient capital for incorporation.");

    if (confirm(`Authorize $${LICENSE_COST.toLocaleString()} for the "${form.name}" business license?`)) {
        const { error } = await sb.rpc('register_company', { 
            p_id: u.id, co_name: form.name, co_type: form.type, co_logo: form.logo, price: LICENSE_COST 
        });

        if (error) alert(error.message);
        else {
            await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ 
                content: `🏢 **CORPORATE FORMATION**\n**${u.username}** has officially founded **${form.name}** (${form.type}) within the CTFG Network!` 
            })});
            alert("Business License Issued!"); window.location.href = '/dashboard';
        }
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Commerce Registry...</div>;

  const sBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #22c55e' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', cursor:'pointer'}}>CTFG NETWORK</span>
        <div style={{textAlign:'right'}}>
            <p style={{margin:0, fontSize:'10px', color:'#888'}}>LIQUID CAPITAL</p>
            <p style={{margin:0, color:'#22c55e', fontWeight:'bold'}}>${u.balance?.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px'}}>OPERATIONS</p>
          <button style={sBtn} onClick={()=>window.location.href='/dashboard'}><Tractor size={16}/> Dashboard</button>
          <button style={{...sBtn, background:'#333', color:'#fff'}}><Building2 size={16} color="#22c55e"/> License Bureau</button>
          <button style={sBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'rgba(20,20,20,0.8)', padding:'40px' }}>
          <div style={{ maxWidth:'600px', margin:'0 auto' }}>
            {hasCo ? (
                <div style={{ background:'rgba(34,197,94,0.1)', padding:'40px', borderRadius:'4px', border:'1px solid #22c55e', textAlign:'center' }}>
                    <Shield size={48} color="#22c55e" style={{marginBottom:'15px'}}/>
                    <h2>Charter Active</h2>
                    <p>Your business is officially recognized by the CTFG Network. Visit your HQ to manage your fleet.</p>
                </div>
            ) : (
                <div style={{ background:'#222', padding:'40px', borderRadius:'4px', borderTop:'4px solid #22c55e' }}>
                    <h1 style={{margin:0, fontSize:'28px'}}>Business License Application</h1>
                    <p style={{color:'#888', fontSize:'13px', margin:'10px 0 30px'}}>Required Capital: <b style={{color:'#fff'}}>$250,000.00</b></p>
                    
                    <form onSubmit={handleRegister} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                        <div>
                            <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>REGISTERED BUSINESS NAME</label>
                            <input required style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="e.g. Samuel's Montana Logging" onChange={e=>setForm({...form, name:e.target.value})} />
                        </div>
                        <div>
                            <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>PRIMARY INDUSTRY</label>
                            <select style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} onChange={e=>setForm({...form, type:e.target.value})}>
                                <option>General Farming</option>
                                <option>Logistics & Transport</option>
                                <option>Machinery Service & Repair</option>
                            </select>
                        </div>
                        <div>
                            <label style={{fontSize:'11px', color:'#555', fontWeight:'bold'}}>CORPORATE IDENTITY (LOGO URL)</label>
                            <input required style={{width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', marginTop:'5px'}} placeholder="Paste Direct Link from Postimages" onChange={e=>setForm({...form, logo:e.target.value})} />
                        </div>
                        <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#000', border:'none', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase'}}>Submit Incorporation Filing</button>
                    </form>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
