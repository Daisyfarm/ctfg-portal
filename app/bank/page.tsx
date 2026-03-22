"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../lib/supabase";
import { ArrowLeft, Landmark } from 'lucide-react';

export default function BankPage() {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    sb.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        sb.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => setP(data));
      } else {
        window.location.href = '/';
      }
    });
  }, []);

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', padding:'40px', fontFamily:'sans-serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#888', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', marginBottom:'20px'}}>
        <ArrowLeft size={16}/> Back to Portal
      </button>
      <div style={{ maxWidth:'500px', margin:'50px auto', background:'#222', padding:'40px', borderRadius:'8px', textAlign:'center', borderTop:'4px solid #4a7ab5' }}>
        <Landmark size={48} color="#4a7ab5" style={{marginBottom:'20px'}}/>
        <h2 style={{margin:0, color:'#888', fontSize:'14px'}}>TOTAL PORTAL SAVINGS</h2>
        <h1 style={{fontSize:'54px', color:'#22c55e', margin:'10px 0'}}>${p?.balance?.toLocaleString() || '0'}</h1>
        <p style={{color:'#444', fontSize:'12px'}}>Funds are synced with the CTFG Mainframe</p>
      </div>
    </div>
  );
}
