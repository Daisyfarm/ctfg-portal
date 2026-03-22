"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../lib/supabase";
import { ArrowLeft, Landmark, ShieldCheck } from 'lucide-react';

export default function BankPage() {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    sb.auth.getUser().then(({ data: { user } }) => {
      if (user) sb.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => setP(data));
    });
  }, []);

  return (
    <div style={{ background:'#1c1c1c', minHeight:'100vh', color:'#f5f5dc', padding:'40px', fontFamily:'serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#d4af37', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', marginBottom:'40px'}}>
        <ArrowLeft size={16}/> Return to Hub
      </button>
      
      <div style={{ maxWidth:'500px', margin:'0 auto', background:'#f5f5dc', color:'#1c1c1c', padding:'50px', borderRadius:'4px', boxShadow:'20px 20px 0px #d4af37', border:'1px solid #d4af37' }}>
        <div style={{textAlign:'center', borderBottom:'2px solid #1c1c1c', paddingBottom:'20px', marginBottom:'30px'}}>
          <Landmark size={40}/>
          <h2 style={{margin:'10px 0 0 0', letterSpacing:'2px'}}>DAISY'S SAVINGS TRUST</h2>
          <p style={{margin:0, fontSize:'10px', fontWeight:'bold'}}>OFFICIAL DEPOSITARY RECORD</p>
        </div>
        
        <div style={{textAlign:'center'}}>
          <p style={{margin:0, fontSize:'12px', color:'#666'}}>CURRENT HOLDINGS</p>
          <h1 style={{fontSize:'64px', margin:'10px 0'}}>${p?.balance?.toLocaleString() || '0'}</h1>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px', marginTop:'20px', color:'#8da989'}}>
            <ShieldCheck size={18}/>
            <span style={{fontSize:'12px', fontWeight:'bold'}}>SECURED BY NETWORK PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
