"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Building2, ShieldCheck, DollarSign, Users, Briefcase, Plus, ArrowUpRight } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function CompanyPortalPage() {
  const [u, setU] = useState<any>(null);
  const [myCompany, setMyCompany] = useState<any>(null);
  const [allCompanies, setAllCompanies] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ name: '', tag: '', description: '' });
  const [depositAmount, setDepositAmount] = useState('');

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);

      // Check if user owns or belongs to a company
      const { data: comp } = await sb.from('companies').select('*, owner:profiles!companies_owner_id_fkey(username)').eq('owner_id', user.id).single();
      setMyCompany(comp || null);
    }

    const { data: comps } = await sb.from('companies').select('*, owner:profiles!companies_owner_id_fkey(username)').order('created_at', { ascending: false });
    setAllCompanies(comps || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const registerCompany = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const fee = 5000;
    if (u.balance < fee) {
      return alert(`Insufficient funds. Corporate incorporation requires $${fee.toLocaleString()}.`);
    }

    const { error } = await sb.from('companies').insert([{
      owner_id: u.id,
      name: form.name,
      tag: form.tag.toUpperCase(),
      description: form.description,
      balance: 0,
      status: 'active'
    }]);

    if (error) return alert("Error incorporating company: " + error.message);

    await sb.from('profiles').update({ balance: u.balance - fee }).eq('id', u.id);

    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🏢 **NEW CORPORATE INCORPORATION**\n**${u.username}** has registered **${form.name}** [${form.tag.toUpperCase()}] within Iron Daisy Agri.`
      })
    });

    alert("Company successfully incorporated.");
    setShowRegister(false);
    setForm({ name: '', tag: '', description: '' });
    load();
  };

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid deposit amount.");
    if (u.balance < amount) return alert("Insufficient personal funds for this deposit.");

    // Update personal balance and company balance
    await sb.from('profiles').update({ balance: u.balance - amount }).eq('id', u.id);
    await sb.from('companies').update({ balance: (myCompany.balance || 0) + amount }).eq('id', myCompany.id);

    alert(`Successfully deposited $${amount.toLocaleString()} into ${myCompany.name} treasury.`);
    setDepositAmount('');
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Corporate Terminal...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>PERSONAL BALANCE: ${u.balance?.toLocaleString()}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/company'}><Building2 size={16}/> Corporate Suite</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Command</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              MANAGE YOUR ENTERPRISE TREASURY, CORPORATE CHARTER, AND REGISTRY STANDINGS WITHIN IRON DAISY AGRI.
            </p>

            {myCompany ? (
              <div style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #22c55e', borderRadius:'6px', marginBottom:'40px' }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', borderBottom:'1px solid #444', paddingBottom:'20px', marginBottom:'20px'}}>
                  <div>
                    <h2 style={{margin:0, fontSize:'26px'}}>{myCompany.name} <span style={{color:'#22c55e', fontSize:'18px'}}> [{myCompany.tag}]</span></h2>
                    <p style={{margin:'5px 0 0 0', fontSize:'13px', color:'#aaa', fontStyle:'italic'}}>"{myCompany.description}"</p>
                  </div>
                  <span style={{background:'#22c55e', color:'#fff', padding:'5px 12px', fontSize:'11px', fontWeight:'bold', borderRadius:'4px'}}>ACTIVE CORPORATION</span>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'25px'}}>
                  <div style={{background:'rgba(0,0,0,0.4)', padding:'20px', borderRadius:'4px'}}>
                    <span style={{fontSize:'11px', color:'#888', fontWeight:'bold', display:'block', marginBottom:'5px'}}>CORPORATE TREASURY</span>
                    <span style={{fontSize:'24px', color:'#22c55e', fontWeight:'bold'}}>${myCompany.balance?.toLocaleString()}</span>
                  </div>
                  <div style={{background:'rgba(0,0,0,0.4)', padding:'20px', borderRadius:'4px'}}>
                    <span style={{fontSize:'11px', color:'#888', fontWeight:'bold', display:'block', marginBottom:'5px'}}>CHIEF EXECUTIVE</span>
                    <span style={{fontSize:'18px', color:'#fff', fontWeight:'bold'}}>{myCompany.owner?.username || u.username}</span>
                  </div>
                </div>

                <form onSubmit={handleDeposit} style={{display:'flex', gap:'10px'}}>
                  <input 
                    type="number" 
                    placeholder="Deposit Amount ($)" 
                    required
                    style={{flex:1, padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'4px'}}
                    value={depositAmount}
                    onChange={e=>setDepositAmount(e.target.value)}
                  />
                  <button type="submit" style={{padding:'12px 25px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}>
                    DEPOSIT TO TREASURY
                  </button>
                </form>
              </div>
            ) : (
              <div style={{marginBottom:'30px'}}>
                <button onClick={()=>setShowRegister(!showRegister)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'12px 25px', fontWeight:'bold', cursor:'pointer', borderRadius:'4px', marginBottom:'20px' }}>
                  {showRegister ? 'CANCEL INCORPORATION' : 'REGISTER A NEW COMPANY ($5,000 FEE)'}
                </button>

                {showRegister && (
                  <form onSubmit={registerCompany} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'15px' }}>
                    <h3 style={{marginTop:0}}>Corporate Incorporation Form</h3>
                    <input placeholder="Company Name (e.g. Red River Farming Co.)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                    <input placeholder="Company Tag / Ticker (e.g. RRF)" maxLength={5} required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.tag} onChange={e=>setForm({...form, tag: e.target.value})} />
                    <textarea placeholder="Corporate Charter & Vision..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                    <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>SUBMIT & INCORPORATE ($5,000)</button>
                  </form>
                )}
              </div>
            )}

            <h2 style={{ fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px' }}>Registered Network Enterprises</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
              {allCompanies.map(c => (
                <div key={c.id} style={{ background:'rgba(35,35,35,0.9)', padding:'20px', borderLeft:'5px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'8px' }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3 style={{margin:0, fontSize:'18px'}}>{c.name} <span style={{color:'#4a7ab5', fontSize:'14px'}}> [{c.tag}]</span></h3>
                    <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#aaa'}}>{c.status.toUpperCase()}</span>
                  </div>
                  <p style={{margin:0, fontSize:'13px', color:'#ccc', fontStyle:'italic'}}>"{c.description}"</p>
                  <div style={{borderTop:'1px solid #444', paddingTop:'8px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#aaa'}}>
                    <span>Owner: <b>{c.owner?.username || 'Unknown'}</b></span>
                    <span style={{color:'#22c55e'}}>Treasury: ${c.balance?.toLocaleString() || 0}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
