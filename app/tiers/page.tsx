"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Award, Shield, CheckCircle, Star, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function TiersPage() {
  const [u, setU] = useState<any>(null);
  const [tiers, setTiers] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', rank_level: 'Tier 1 - Master Operator', perk_summary: '', clearance_fee: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: tierData } = await sb
      .from('tiers')
      .select('*, holder:profiles!tiers_holder_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!tierData) {
      const { data: fallbackTier } = await sb.from('tiers').select('*').order('created_at', { ascending: false });
      setTiers(fallbackTier || []);
    } else {
      setTiers(tierData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const claimTier = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const feeVal = parseFloat(form.clearance_fee || '0');

    const { error } = await sb.from('tiers').insert([{
      holder_id: u.id,
      title: form.title,
      rank_level: form.rank_level,
      perk_summary: form.perk_summary,
      clearance_fee: feeVal,
      status: 'active'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `⭐ **OPERATOR TIER REGISTERED**\n**Operator:** ${u.username}\n**Tier:** ${form.title} (${form.rank_level})\n**Clearance Fee:** $${feeVal.toLocaleString()}`
        })
      });

      alert("Tier clearance successfully registered and unlocked.");
      setShowForm(false);
      setForm({ title: '', rank_level: 'Tier 1 - Master Operator', perk_summary: '', clearance_fee: '' });
      load();
    } else {
      alert("Error registering tier: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Rank Tiers & Clearance Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/tiers'}><Award size={16}/> Operator Tiers</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Operator Rank Tiers & Clearances</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              UNLOCK ADVANCED AGRICULTURAL PRIVILEGES, EXECUTIVE ACCESS CODES, AND PRIORITY DISPUTE RATINGS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL TIER REGISTRATION' : 'REGISTER NEW TIER CLEARANCE'}
            </button>

            {showForm && (
              <form onSubmit={claimTier} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Tier Registration Terminal</h3>
                <input placeholder="Tier Title (e.g. Sector 4 Apex Director)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.rank_level} onChange={e=>setForm({...form, rank_level: e.target.value})}>
                  <option value="Tier 1 - Master Operator">Tier 1 - Master Operator</option>
                  <option value="Tier 2 - Executive Director">Tier 2 - Executive Director</option>
                  <option value="Tier 3 - Senior Syndicate">Tier 3 - Senior Syndicate</option>
                  <option value="Tier 4 - General Associate">Tier 4 - General Associate</option>
                </select>
                <input type="number" placeholder="Clearance Fee ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.clearance_fee} onChange={e=>setForm({...form, clearance_fee: e.target.value})} />
                <textarea placeholder="Summary of perks, voting rights, and operational privileges..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.perk_summary} onChange={e=>setForm({...form, perk_summary: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>CONFIRM & UNLOCK TIER</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {tiers.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <Award size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No rank tiers registered in the state database.</p>
                </div>
              ) : (
                tiers.map(t => (
                  <div key={t.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{t.title}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{t.rank_level?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>{t.perk_summary}</p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
                      <span style={{color:'#fff'}}>Clearance Fee: <b style={{color:'#22c55e'}}>${t.clearance_fee?.toLocaleString()}</b></span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Holder: <b>{t.holder?.username || 'Authorized Operative'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Unlocked: {new Date(t.created_at || Date.now()).toLocaleDateString()}</span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>{t.status?.toUpperCase()}</span>
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
