"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Landmark, ArrowLeft, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LoanOffice() {
  const [p, setP] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [amt, setAmt] = useState("");

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    const { data: prof } = await sb.from('profiles').select('*').eq('id', user?.id).single();
    const { data: ln } = await sb.from('loans').select('*').eq('user_id', user?.id).eq('status', 'active');
    setP(prof); setLoans(ln || []);
  };

  useEffect(() => { load(); }, []);

  const takeLoan = async () => {
    const borrow = parseInt(amt);
    if (borrow > 500000) return alert("Max loan is $500,000");
    
    // 1. Give money to player
    await sb.from('profiles').update({ balance: p.balance + borrow }).eq('id', p.id);
    // 2. Record the loan (with 5% interest)
    const totalToPay = Math.round(borrow * 1.05);
    await sb.from('loans').insert([{ user_id: p.id, amount_borrowed: borrow, amount_remaining: totalToPay }]);
    // 3. Log transaction
    await sb.from('transactions').insert([{ user_id: p.id, amount: borrow, type: 'income', description: 'Bank Loan Approved' }]);
    
    alert("Funds deposited!");
    window.location.href = '/dashboard';
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        <h2 style={{color:'#7c3aed'}}><Landmark style={{verticalAlign:'middle'}}/> CTFG Bank & Loans</h2>
        
        <div style={{ background:'#131926', padding:'20px', borderRadius:'20px', border:'1px solid #7c3aed', marginBottom:'20px' }}>
          <p style={{margin:0, fontSize:'14px'}}>Apply for Capital</p>
          <p style={{fontSize:'11px', color:'#94a3b8'}}>5% Flat Interest Rate</p>
          <input type="number" placeholder="Amount (Max 500k)" value={amt} onChange={e=>setAmt(e.target.value)} style={{width:'100%', padding:'10px', margin:'10px 0', background:'#0b0f1a', color:'#fff', border:'1px solid #333'}} />
          <button onClick={takeLoan} style={{width:'100%', padding:'12px', background:'#7c3aed', border:'none', color:'#fff', fontWeight:'bold', borderRadius:'10px'}}>Request Loan</button>
        </div>

        <h3>Active Debt</h3>
        {loans.map(l => (
          <div key={l.id} style={{ background:'#131926', padding:'15px', borderRadius:'15px', border:'1px solid #ef4444', marginBottom:'10px' }}>
            <p style={{margin:0, fontSize:'12px'}}>Remaining Balance:</p>
            <h2 style={{margin:0, color:'#ef4444'}}>${l.amount_remaining.toLocaleString()}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
