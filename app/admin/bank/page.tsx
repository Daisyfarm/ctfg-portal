"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../../lib/supabase"; 
import { ShieldAlert, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function StaffAuthority() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data: p } = await sb.from('profiles').select('rank').eq('id', user.id).single();
      if (p?.rank !== 'Admin') return window.location.href = '/dashboard';
      const { data } = await sb.from('transactions').select('*, profiles(username, balance)').eq('status', 'pending');
      setReqs(data || []);
    } catch (e) { console.error(e); } finally { setLd(false); }
  };

  useEffect(() => { load(); }, []);

  if (ld) return (
    <div style={{background:'#1c1c1c', color:'#d4af37', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <Loader2 className="animate-spin" size={24} />
      <span style={{marginLeft:'10px', letterSpacing:'2px'}}>VERIFYING AUTHORITY...</span>
    </div>
  );

  return (
    <div style={{ background: '#1c1c1c', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily: 'serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color: '#555', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}>
        <ArrowLeft size={16}/> BACK
      </button>

      <div style={{display:'flex', alignItems:'center', gap:'15px', borderBottom:'1px solid #d4af37', paddingBottom:'20px', marginBottom:'40px'}}>
        <ShieldAlert size={32} color="#d4af37"/>
        <div>
          <h1 style={{margin:0, letterSpacing:'2px', fontSize:'24px'}}>DAISY'S AUTHORITY</h1>
          <p style={{margin:0, fontSize:'10px', color: '#d4af37'}}>DREAM FARM NETWORK • STAFF ONLY</p>
        </div>
      </div>

      {reqs.length === 0 ? <p style={{color: '#555', textAlign: 'center'}}>NO PENDING LOGS</p> : reqs.map((r: any) => (
        <div key={r.id} style={{ background: '#262626', padding: '20px', marginBottom: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', border: '1px solid #333', borderRadius: '4px' }}>
          <div>
            <p style={{margin:0, color: '#555', fontSize:'9px'}}>OPERATOR</p>
            <p style={{fontSize:'16px', fontWeight:'bold', margin:0}}>{r.profiles?.username || "Unknown"}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{margin:0, color: '#555', fontSize:'9px'}}>CREDITS</p>
            <p style={{fontSize:'20px', fontWeight:'bold', color: '#d4af37', margin:0}}>${r.amount?.toLocaleString()}</p>
          </div>
          <div style={{display:'flex', gap:'10px'}}>
            <button style={{background: '#8da989', color: '#1c1c1c', padding:'8px 16px', border:'none', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}>
              <CheckCircle size={14}/> APPROVE
            </button>
            <button style={{background: '#800000', color: '#fff', padding:'8px 16px', border:'none', fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}>
              <XCircle size={14}/> DENY
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
