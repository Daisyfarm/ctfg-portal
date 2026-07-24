"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Building2, ShieldCheck, DollarSign, Users, Briefcase } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function CompanyRegisterPage() {
  const [u, setU] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', tag: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: compData } = await sb
      .from('companies')
      .select('*, owner:profiles!companies_owner_id_fkey(username)')
      .order('created_at', { ascending: false });

    setCompanies(compData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const registerCompany = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const registrationFee = 5000;
    if (u.balance < registrationFee) {
      return alert(`Insufficient funds. Registering a corporate entity requires $${registrationFee.toLocaleString()}.`);
    }

    // Deduct registration fee & create company
    const { error: compError } = await sb.from('companies').insert([{
      owner_id: u.id,
      name: form.name,
      tag: form.tag.toUpperCase(),
      description: form.description,
      balance: 0,
      status: 'active'
    }]);

    if (compError) {
      return alert("Error registering corporate entity: " + compError.message);
    }

    // Update user balance
    await sb.from('profiles').update({ balance: u.balance - registrationFee }).eq('id', u.id);

    // Discord Alert
    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🏢 **NEW CORPORATE REGISTRATION**\n**${u.username}** has officially incorporated **${form.name}** [${form.tag.toUpperCase()}] within Iron Daisy Agri!`
      })
    });

    alert("Company registered successfully.");
    setShowForm(false);
    setForm({ name: '', description: '', tag: '' });
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Corporate Registry...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/companys/register'}><Building2 size={16}/> Corporate Registry</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Registry</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              ESTABLISH AND MANAGE REGISTERED BUSINESS ENTITIES, SUBSIDIARIES, AND PARTNERSHIPS WITHIN THE IRON DAISY AGRI NETWORK. (FEE: $5,000)
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL INCORPORATION' : 'REGISTER NEW COMPANY'}
            </button>

            {showForm && (
              <form onSubmit={registerCompany} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Incorporate Enterprise</h3>
                <input placeholder="Company Name (e.g. Montana Grain & Logistics)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                <input placeholder="Ticker / Tag (e.g. MGL)" maxLength={5} required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.tag} onChange={e=>setForm({...form, tag: e.target.value})} />
                <textarea placeholder="Corporate Charter & Operations Overview..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>INCORPORATE ($5,000 FEE)</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
              {companies.length === 0 ? (
                <p style={{color:'#777'}}>No registered companies found in the archive.</p>
              ) : (
                companies.map(c => (
                  <div key={c.id} style={{ background:'rgba(35,35,35,0.9)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'10px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                      <div>
                        <h3 style={{margin:0, fontSize:'18px'}}>{c.name}</h3>
                        <span style={{fontSize:'11px', color:'#22c55e', fontWeight:'bold'}}> [{c.tag}] </span>
                      </div>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#aaa'}}>{c.status.toUpperCase()}</span>
                    </div>
                    <p style={{margin:0, fontSize:'13px', color:'#ccc', fontStyle:'italic'}}>"{c.description}"</p>
                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#aaa'}}>
                      <span>Owner: <b>{c.owner?.username || 'Unknown'}</b></span>
                      <span style={{color:'#22c55e'}}>Assets: ${c.balance?.toLocaleString() || 0}</span>
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
