"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Landmark, DollarSign, PlusCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LoansPage() {
  const [u, setU] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ amount: '', interest_rate: '5', term_months: '12', purpose: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: loanData } = await sb
      .from('loans')
      .select('*, borrower:profiles!loans_borrower_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!loanData) {
      const { data: fallbackLoan } = await sb.from('loans').select('*').order('created_at', { ascending: false });
      setLoans(fallbackLoan || []);
    } else {
      setLoans(loanData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const requestLoan = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const principal = parseFloat(form.amount || '0');
    const rate = parseFloat(form.interest_rate || '5');
    const months = parseInt(form.term_months || '12');

    const { error } = await sb.from('loans').insert([{
      borrower_id: u.id,
      amount: principal,
      interest_rate: rate,
      term_months: months,
      purpose: form.purpose,
      status: 'pending'
    }]);

    if (!error) {
      // Immediately disburse funds to borrower for gameplay acceleration or keep pending approval
      const newBalance = (u.balance || 0) + principal;
      await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🏦 **CORPORATE LOAN ISSUED**\n**Borrower:** ${u.username}\n**Principal:** $${principal.toLocaleString()}\n**Interest Rate:** ${rate}%\n**Purpose:** ${form.purpose}`
        })
      });

      alert(`Loan approved and disbursed! $${principal.toLocaleString()} credited to your balance.`);
      setShowForm(false);
      setForm({ amount: '', interest_rate: '5', term_months: '12', purpose: '' });
      load();
    } else {
      alert("Error requesting loan: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Corporate Credit Terminal...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>OPERATOR BALANCE: ${u.balance?.toLocaleString()}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/loans'}><Landmark size={16}/> Corporate Credit & Loans</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Credit & Loans</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              SECURE FINANCING FOR LARGE-SCALE EQUIPMENT ACQUISITION, LAND EXPANSION, AND SEASONAL CROP INPUTS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL LOAN APPLICATION' : 'APPLY FOR NEW LOAN'}
            </button>

            {showForm && (
              <form onSubmit={requestLoan} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Loan Application Terminal</h3>
                <input type="number" placeholder="Loan Amount / Principal ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} />
                <input type="number" placeholder="Interest Rate % (e.g. 5)" step="0.1" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.interest_rate} onChange={e=>setForm({...form, interest_rate: e.target.value})} />
                <input type="number" placeholder="Term Length in Months (e.g. 12)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.term_months} onChange={e=>setForm({...form, term_months: e.target.value})} />
                <textarea placeholder="Purpose of Loan (e.g. John Deere Harvester financing)..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.purpose} onChange={e=>setForm({...form, purpose: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>SUBMIT & DISBURSE LOAN</button>
              </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
              {loans.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <Landmark size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active corporate loans registered in the credit bureau database.</p>
                </div>
              ) : (
                loans.map(l => (
                  <div key={l.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderLeft:'6px solid #f59e0b', borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{flex:1}}>
                      <h3 style={{margin:'0 0 5px 0', fontSize:'20px'}}>Principal: ${l.amount?.toLocaleString()}</h3>
                      <p style={{margin:'0 0 10px 0', fontSize:'13px', color:'#ccc'}}>Purpose: {l.purpose}</p>
                      <div style={{display:'flex', gap:'20px', fontSize:'13px', color:'#aaa'}}>
                        <span>Interest Rate: <b style={{color:'#fff'}}>{l.interest_rate}%</b></span>
                        <span>Term: <b style={{color:'#fff'}}>{l.term_months} Months</b></span>
                        <span>Borrower: <b>{l.borrower?.username || 'Authorized Operative'}</b></span>
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'5px'}}>
                      <span style={{fontSize:'10px', fontWeight:'bold', background:'#22c55e', color:'#000', padding:'3px 8px', borderRadius:'3px'}}>
                        {l.status?.toUpperCase() || 'ACTIVE'}
                      </span>
                      <span style={{fontSize:'11px', color:'#777', marginTop:'5px'}}>{new Date(l.created_at || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
