"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wrench, Toolcase, Settings, Truck, PlusCircle, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ServicePage() {
  const [u, setU] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ equipment: 'John Deere Tractor Repair', service_type: 'Mechanical Maintenance', cost: '', description: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: serviceData } = await sb
      .from('services')
      .select('*, mechanic:profiles!services_mechanic_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!serviceData) {
      const { data: fallbackService } = await sb.from('services').select('*').order('created_at', { ascending: false });
      setServices(fallbackService || []);
    } else {
      setServices(serviceData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createService = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const costVal = parseFloat(form.cost || '0');

    const { error } = await sb.from('services').insert([{
      mechanic_id: u.id,
      equipment: form.equipment,
      service_type: form.service_type,
      cost: costVal,
      description: form.description,
      status: 'completed'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🛠️ **EQUIPMENT SERVICE LOGGED**\n**Technician:** ${u.username}\n**Equipment:** ${form.equipment} (${form.service_type})\n**Service Cost:** $${costVal.toLocaleString()}`
        })
      });

      alert("Maintenance record successfully logged to service bay.");
      setShowForm(false);
      setForm({ equipment: 'John Deere Tractor Repair', service_type: 'Mechanical Maintenance', cost: '', description: '' });
      load();
    } else {
      alert("Error logging service: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Service & Repair Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/service'}><Wrench size={16}/> Equipment Service</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Equipment Service & Repair</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              TRACK TRACTOR MAINTENANCE, COMBINE REPAIRS, HYDRAULIC OVERHAULS, AND FLEET SERVICE LOGS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL RECORD' : 'LOG NEW SERVICE RECORD'}
            </button>

            {showForm && (
              <form onSubmit={createService} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Service Bay Terminal</h3>
                <input placeholder="Equipment Name / ID (e.g. John Deere S780 Combine)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.equipment} onChange={e=>setForm({...form, equipment: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.service_type} onChange={e=>setForm({...form, service_type: e.target.value})}>
                  <option value="Mechanical Maintenance">Mechanical Maintenance & Engine Repair</option>
                  <option value="Hydraulic Overhaul">Hydraulic System Overhaul</option>
                  <option value="Tire & Track Replacement">Tire & Track Replacement</option>
                  <option value="Electrical Diagnostics">Electrical & Sensor Diagnostics</option>
                </select>
                <input type="number" placeholder="Service Cost ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.cost} onChange={e=>setForm({...form, cost: e.target.value})} />
                <textarea placeholder="Detailed breakdown of repairs, parts replaced, and maintenance notes..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>COMMIT SERVICE RECORD</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {services.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <Wrench size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No equipment service records logged in the database.</p>
                </div>
              ) : (
                services.map(s => (
                  <div key={s.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{s.equipment}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{s.service_type?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>{s.description}</p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
                      <span style={{color:'#fff'}}>Cost: <b style={{color:'#22c55e'}}>${s.cost?.toLocaleString()}</b></span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Mechanic: <b>{s.mechanic?.username || 'Authorized Operative'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Serviced: {new Date(s.created_at || Date.now()).toLocaleDateString()}</span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>{s.status?.toUpperCase()}</span>
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
