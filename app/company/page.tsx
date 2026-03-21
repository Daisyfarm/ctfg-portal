"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Building2, Plus, ArrowLeft, Upload, Globe, Shield } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function CompanyPortal() {
  const [u, setU] = useState<any>(null);
  const [co, setCo] = useState<any>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: company } = await sb.from('companies').select('*').eq('owner_id', user.id).maybeSingle();
        setCo(company);
    }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createCo = async (e: any) => {
    e.preventDefault();
    const { data, error } = await sb.from('companies').insert([{ owner_id: u.id, name: name, logo_url: logo }]).select().single();
    if (error) alert(error.message);
    else {
        await sb.from('profiles').update({ company_id: data.id }).eq('id', u.id);
        alert("Company Registered!"); load();
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Corporate Registry...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial', padding:'40px' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← BACK</button>
        
        {!co ? (
          <div style={{ background:'rgba(30,30,30,0.9)', padding:'40px', borderTop:'4px solid #22c55e', borderRadius:'4px' }}>
            <h1>Register Company</h1>
            <p style={{color:'#888', fontSize:'13px'}}>Register your farming business to unlock corporate banking and custom branding on the Job Board.</p>
            <form onSubmit={createCo} style={{ display:'flex', flexDirection:'column', gap:'15px', marginTop:'20px' }}>
                <input placeholder="Company Name (e.g. Montana Grain Co)" required style={{padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} onChange={e=>setName(e.target.value)} />
                <input placeholder="Logo URL (from Postimages)" required style={{padding:'12px', background:'#111', border:'1px solid #333', color:'#fff'}} onChange={e=>setLogo(e.target.value)} />
                <button type="submit" style={{background:'#22c55e', color:'#000', padding:'15px', border:'none', fontWeight:'bold', cursor:'pointer'}}>AUTHORIZE FORMATION</button>
            </form>
          </div>
        ) : (
          <div style={{ background:'rgba(30,30,30,0.9)', padding:'40px', borderTop:'4px solid #4a7ab5', borderRadius:'4px', textAlign:'center' }}>
            <img src={co.logo_url} style={{ width:'120px', height:'120px', objectFit:'contain', marginBottom:'20px', background:'#fff', padding:'10px', borderRadius:'4px' }} />
            <h1 style={{margin:0}}>{co.name}</h1>
            <p style={{color:'#4a7ab5', fontWeight:'bold'}}>CORPORATE HEADQUARTERS</p>
            <div style={{marginTop:'30px', padding:'20px', background:'#111', borderRadius:'4px'}}>
                <p style={{fontSize:'12px', color:'#555'}}>BUSINESS OWNER</p>
                <p style={{fontSize:'18px'}}>{u.username}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
