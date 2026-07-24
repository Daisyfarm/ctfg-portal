"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MapPin, DollarSign, Shield, Home, PlusCircle, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LandPage() {
  const [u, setU] = useState<any>(null);
  const [lands, setLands] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', size_acres: '', price: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: landData } = await sb
      .from('lands')
      .select('*, owner:profiles!lands_owner_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!landData) {
      const { data: fallbackLand } = await sb.from('lands').select('*').order('created_at', { ascending: false });
      setLands(fallbackLand || []);
    } else {
      setLands(landData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const registerLand = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const acres = parseFloat(form.size_acres || '0');
    const priceVal = parseFloat(form.price || '0');

    const { error } = await sb.from('lands').insert([{
      owner_id: u.id,
      name: form.name,
      location: form.location,
      size_acres: acres,
      price: priceVal,
      status: 'owned'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🗺️ **NEW LAND PARCEL REGISTERED**\n**Owner:** ${u.username}\n**Parcel:** ${form.name} (${form.location})\n**Size:** ${acres} Acres\n**Valuation:** $${priceVal.toLocaleString()}`
        })
      });

      alert("Land parcel successfully registered.");
      setShowForm(false);
      setForm({ name: '', location: '', size_acres: '', price: '' });
      load();
    } else {
      alert("Error registering land parcel: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Land Registry Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/land'}><MapPin size={16}/> Land & Property</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Land & Property Registry</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              ACQUIRE, MANAGE, AND MONITOR AGRICULTURAL ACREAGE, FARMLANDS, AND RANCH ESTATES ACROSS MONTANA.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL REGISTRATION' : 'REGISTER NEW LAND PARCEL'}
            </button>

            {showForm && (
              <form onSubmit={registerLand} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Land Acquisition Form</h3>
                <input placeholder="Parcel Name (e.g. Whispering Pines Sector 4)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                <input placeholder="Geographic Location / Region" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.location} onChange={e=>setForm({...form, location: e.target.value})} />
                <input type="number" placeholder="Size in Acres" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.size_acres} onChange={e=>setForm({...form, size_acres: e.target.value})} />
                <input type="number" placeholder="Estimated Valuation ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>REGISTER PARCEL</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {lands.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <MapPin size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No land parcels registered in the territorial database.</p>
                </div>
              ) : (
                lands.map(l => (
                  <div key={l.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{l.name}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#4a7ab5', fontWeight:'bold'}}>{l.size_acres} ACRES</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>Location: <b>{l.location}</b></p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px', color:'#ccc'}}>
                      <span>Valuation: <b style={{color:'#22c55e'}}>${l.price?.toLocaleString()}</b></span>
                      <span>Status: <b style={{color:'#fff'}}>{l.status?.toUpperCase()}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'8px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Owner: <b>{l.owner?.username || 'Authorized Operative'}</b></span>
                      <span>{new Date(l.created_at || Date.now()).toLocaleDateString()}</span>
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
