"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CheckCircle2, XCircle, Clock, ArrowLeft } from 'lucide-react';

const sb = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function AdminBank() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data } = await sb.from('transactions').select('*, profiles(username)').eq('status', 'pending').order('created_at', { ascending: false });
    setReqs(data || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleAction = async (id: string, userId: string, amount: number, action: 'completed' | 'denied') => {
    if (action === 'completed') {
      const { data: profile } = await sb.from('profiles').select('balance').eq('id', userId).single();
      await sb.from('profiles').update({ balance: (profile?.balance || 0) - amount }).eq('id', userId);
    }
    await sb.from('transactions').update({ status: action }).eq('id', id);
    load();
  };

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Terminal...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', padding:'40px', fontFamily:'sans-serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#888', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}><ArrowLeft size={16}/> Back to Dashboard</button>
      <h1 style={{fontSize:'24px', fontWeight:'bold', borderBottom:'2px solid #dc2626', paddingBottom:'10px', marginBottom:'30px'}}>PENDING SYNC REQUESTS</h1>
      
      <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
        {reqs.map(r => (
          <div key={r.id} style={{background:'#222', padding:'20px', borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <p style={{margin:0, fontSize:'12px', color:'#888'}}>OPERATOR</p>
              <p style={{margin:0, fontWeight:'bold', fontSize:'18px'}}>{r.profiles?.username}</p>
            </div>
            <div style={{textAlign:'center'}}>
              <p style={{margin:0, fontSize:'12px', color:'#888'}}>AMOUNT</p>
              <p style={{margin:0, fontWeight:'bold', fontSize:'20px', color:'#22c55e'}}>${r.amount.toLocaleString()}</p>
            </div>
            <div style={{display:'flex', gap:'10px'}}>
              <button onClick={()=>handleAction(r.id, r.user_id, r.amount, 'completed')} style={{background:'#22c55e', color:'#000', border:'none', padding:'10px 15px', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>APPROVE</button>
              <button onClick={()=>handleAction(r.id, r.user_id, r.amount, 'denied')} style={{background:'#dc2626', color:'#fff', border:'none', padding:'10px 15px', borderRadius:'4px', cursor:'pointer', fontWeight:'bold'}}>DENY</button>
            </div>
          </div>
        ))}
        {reqs.length === 0 && <p style={{color:'#444', fontStyle:'italic'}}>No pending requests.</p>}
      </div>
    </div>
  );
}
