"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, ShieldAlert, DollarSign, FileText, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function InsurancePage() {
  const [u, setU] = useState<any>(null);
  const [policies, setPolicies] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ policy_type: 'crop', coverage_amount: '', premium: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: polData } = await sb
      .from('insurance_policies')
      .select('*, holder:profiles!insurance_policies5_holder_id_fkey(username)')
      .order('created_at', { ascending: false });

    // Fallback query if foreign key relation differs
    if (!polData) {
      const { data: fallbackPol } = await sb.from('insurance_policies').select('*').order('created_at', { ascending: false });
      setPolicies(fallbackPol || []);
    } else {
      setPolicies(polData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const purchasePolicy = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const premiumCost = parseFloat(form.premium || '0');
    const coverageVal = parseFloat(form.coverage_amount || '0');

    if (u.balance < premiumCost) {
      return alert(`Insufficient funds. Purchasing this policy requires a premium payment of $${premiumCost.toLocaleString()}.`);
    }

    const { error } = await sb.from('insurance_policies').insert([{
      holder_id: u.id,
      policy_type: form.policy_type,
      coverage_amount: coverageVal,
      premium: premiumCost,
      status: 'active'
    }]);

    if (!error) {
      await sb.from('profiles').update({ balance: u.balance - premiumCost }).eq('id', u.id);

      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🛡️ **CORPORATE INSURANCE PURCHASED**\n**Operative:** ${u.username}\n**Type:** ${form.policy_type.toUpperCase()}\n**Coverage:** $${coverageVal.toLocaleString()} (Premium: $${premiumCost.toLocaleString()})`
        })
      });

      alert("Insurance policy successfully secured.");
      setShowForm(false);
      setForm({ policy_type: 'crop', coverage_amount: '', premium: '' });
      load();
    } else {
      alert("Error underwriting insurance policy: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Underwriting Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/insurance'}><ShieldCheck size={16}/> Corporate Insurance</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Insurance</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              PROTECT YOUR CROPS, MACHINERY, AND REGIONAL ASSETS AGAINST YIELD LOSS, EQUIPMENT FAILURE, AND UNFORESEEN RISKS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL UNDERWRITING' : 'UNDERWRITE NEW POLICY'}
            </button>

            {showForm && (
              <form onSubmit={purchasePolicy} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Insurance Policy Application</h3>
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.policy_type} onChange={e=>setForm({...form, policy_type: e.target.value})}>
                  <option value="crop">Crop Yield Insurance</option>
                  <option value="machinery">Fleet & Machinery Insurance</option>
                  <option value="liability">Corporate Liability Protection</option>
                </select>
                <input type="number" placeholder="Coverage Amount ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.coverage_amount} onChange={e=>setForm({...form, coverage_amount: e.target.value})} />
                <input type="number" placeholder="Upfront Premium Cost ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.premium} onChange={e=>setForm({...form, premium: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>SECURE & UNDERWRITE POLICY</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
              {policies.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <ShieldCheck size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active insurance policies registered in the database.</p>
                </div>
              ) : (
                policies.map(p => (
                  <div key={p.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'10px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{p.policy_type?.toUpperCase()} POLICY</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{p.status?.toUpperCase() || 'ACTIVE'}</span>
                    </div>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px', color:'#ccc'}}>
                      <span>Coverage: <b style={{color:'#fff'}}>${p.coverage_amount?.toLocaleString()}</b></span>
                      <span style={{color:'#f59e0b'}}>Premium: ${p.premium?.toLocaleString()}</span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'8px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Holder: <b>{p.holder?.username || 'Authorized Operative'}</b></span>
                      <span>{new Date(p.created_at || Date.now()).toLocaleDateString()}</span>
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
