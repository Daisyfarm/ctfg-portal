"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, Truck, Wrench, Shield, DollarSign, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function FleetPage() {
  const [u, setU] = useState<any>(null);
  const [fleet, setFleet] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'tractor', condition: '100', value: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: fleetData } = await sb
      .from('fleet')
      .select('*, owner:profiles!fleet_owner_id_fkey(username)')
      .order('created_at', { ascending: false });

    setFleet(fleetData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const addVehicle = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const val = parseFloat(form.value || '0');

    const { error } = await sb.from('fleet').insert([{
      owner_id: u.id,
      name: form.name,
      type: form.type,
      condition: parseInt(form.condition),
      value: val,
      status: 'operational'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚜 **NEW FLEET ASSET REGISTERED**\n**Owner:** ${u.username}\n**Vehicle:** ${form.name} (${form.type.toUpperCase()})\n**Valuation:** $${val.toLocaleString()}`
        })
      });

      alert("Fleet asset registered successfully.");
      setShowForm(false);
      setForm({ name: '', type: 'tractor', condition: '100', value: '' });
      load();
    } else {
      alert("Error registering asset.");
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Fleet Command Registry...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Fleet Command</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Fleet Command</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              MONITOR TRACTORS, HARVESTERS, TRANSPORT TRUCKS, AND MACHINERY ASSIGNED ACROSS MONTANA OPERATIONS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL REGISTRATION' : 'REGISTER NEW FLEET ASSET'}
            </button>

            {showForm && (
              <form onSubmit={addVehicle} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Asset Registry Form</h3>
                <input placeholder="Asset Name / Model (e.g. John Deere X9 Combine)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
                  <option value="tractor">Heavy Tractor</option>
                  <option value="harvester">Harvester / Combine</option>
                  <option value="truck">Transport Semi-Truck</option>
                  <option value="implement">Agricultural Implement</option>
                </select>
                <input type="number" placeholder="Condition % (e.g. 100)" max={100} min={1} required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.condition} onChange={e=>setForm({...form, condition: e.target.value})} />
                <input type="number" placeholder="Estimated Asset Valuation ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.value} onChange={e=>setForm({...form, value: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>REGISTER ASSET</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'20px' }}>
              {fleet.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <Tractor size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No fleet machinery registered in the network inventory.</p>
                </div>
              ) : (
                fleet.map(f => (
                  <div key={f.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{f.name}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{f.type.toUpperCase()}</span>
                    </div>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px', color:'#ccc'}}>
                      <span>Condition: <b>{f.condition}%</b></span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>Value: ${f.value?.toLocaleString()}</span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'8px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Operator / Owner: <b>{f.owner?.username || 'Authorized'}</b></span>
                      <span>{f.status.toUpperCase()}</span>
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
