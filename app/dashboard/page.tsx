"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/lib/supabase"; // Use the @ alias to fix Webpack pathing
import { LogOut, Flower2, Loader2 } from 'lucide-react';

export default function Dash() {
  const [p, setP] = useState<any>(null);
  const [ld, setLd] = useState(true);

  useEffect(() => {
    async function check() {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setP(data || { username: 'Operator', balance: 0 });
      setLd(false);
    }
    check();
  }, []);

  if (ld) return (
    <div style={{background:'#111', color:'#d4af37', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Loader2 className="animate-spin" />
    </div>
  );

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily: 'serif' }}>
       <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #d4af37', paddingBottom:'20px'}}>
          <h2>DAISY'S HUB</h2>
          <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{background:'none', border:'none', color:'#555', cursor:'pointer'}}><LogOut /></button>
       </div>
       <div style={{textAlign:'center', marginTop:'100px'}}>
          <Flower2 color="#d4af37" size={48} />
          <h1 style={{fontSize:'64px', color:'#8da989'}}>${p?.balance?.toLocaleString()}</h1>
       </div>
    </div>
  );
}
