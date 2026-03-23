"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../../db/supabase";
import { ShieldAlert, ArrowLeft, Loader2 } from 'lucide-react';

export default function StaffAuthority() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data: { user } } = await sb.auth.getUser();
        if (!user) return window.location.href = '/';

        // Check rank safely
        const { data: p } = await sb.from('profiles').select('rank').eq('id', user.id).maybeSingle();
        if (p?.rank !== 'Admin') {
          window.location.href = '/dashboard';
          return;
        }

        // Simpler fetch to avoid Join errors
        const { data: txs } = await sb.from('transactions')
          .select('*')
          .eq('status', 'pending');
        
        setReqs(txs || []);
      } catch (e) {
        console.error("Auth Page Crash:", e);
      } finally {
        setLd(false);
      }
    }
    load();
  }, []);

  if (ld) return (
    <div style={{background:'#111', color:'#d4af37', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <Loader2 className="animate-spin" size={24} />
      <span style={{marginLeft:'10px'}}>DAISY'S ENCRYPTED LINK...</span>
    </div>
  );

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily: 'serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color: '#444', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}>
        <ArrowLeft size={16}/> RETURN
      </button>

      <div style={{borderBottom:'1px solid #d4af37', paddingBottom:'20px', marginBottom:'40px', display:'flex', alignItems:'center', gap:'15px'}}>
        <ShieldAlert size={30} color="#d4af37"/>
        <h1 style={{margin:0, letterSpacing:'2px'}}>STAFF AUTHORITY</h1>
      </div>

      {reqs.length === 0 ? (
        <p style={{textAlign:'center', color:'#333'}}>NO PENDING LOGS FOUND.</p>
      ) : (
        reqs.map((r) => (
          <div key={r.id} style={{ background: '#1a1a1a', padding: '20px', marginBottom: '10px', border: '1px solid #333', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{margin:0, fontSize:'10px', color:'#555'}}>LOG_ID</p>
              <code>{r.id.slice(0,8)}</code>
            </div>
            <div style={{textAlign:'center'}}>
              <p style={{margin:0, fontSize:'10px', color:'#555'}}>CREDITS</p>
              <b style={{color:'#d4af37'}}>${r.amount?.toLocaleString()}</b>
            </div>
            <button style={{background:'#8da989', border:'none', padding:'5px 15px', fontWeight:'bold', cursor:'pointer'}}>PROCESS</button>
          </div>
        ))
      )}
    </div>
  );
}
