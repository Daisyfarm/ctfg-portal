"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Landmark, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LoanOffice() {
  const [p, setP] = useState<any>(null);
  const [amt, setAmt] = useState("");

  useEffect(() => {
    sb.auth.getUser().then(({data:{user}}) => {
      sb.from('profiles').select('*').eq('id', user?.id).single().then(({data}) => setP(data));
    });
  }, []);

  const takeLoan = async () => {
    const borrow = parseInt(amt);
    if (borrow > 500000) return alert("Max loan is $500,000");
    await sb.from('profiles').update({ balance: p.balance + borrow }).eq('id', p.id);
    await sb.from('loans').insert([{ user_id: p.id, amount_borrowed: borrow, amount_remaining: Math.round(borrow * 1.05) }]);
    await sb.from('transactions').insert([{ user_id: p.id, amount: borrow, type: 'income', description: 'Approved Bank Loan' }]);
    alert("Loan Approved! Funds deposited.");
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'400px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', color:'#94a3b8', border:'none', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        <h2 style={{color:'#7c3aed'}}>CTFG Loan Office</h2>
        <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', border:'1px solid #7c3aed' }}>
          <p style={{fontSize:'14px', margin:'0 0 10px'}}>Apply for Farm Capital (5% Interest)</p>
          <input type="number" placeholder="Amount (Max 500k)" value={amt} onChange={e=>setAmt(e.target.value)} style={{width:'100%', padding:'10px', marginBottom:'15px', background:'#0b0f1a', color:'#fff'}} />
          <button onClick={takeLoan} style={{width:'100%', padding:'12px', background:'#7c3aed', border:'none', color:'#fff', fontWeight:'bold', borderRadius:'8px'}}>Get Loan</button>
        </div>
      </div>
    </div>
  );
}
