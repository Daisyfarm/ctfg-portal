"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileText, ShieldCheck, DollarSign, CheckCircle, PlusCircle, AlertCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function PermitsPage() {
  const [u, setU] = useState<any>(null);
  const [permits, setPermits] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', permit_type: 'Water Rights & Irrigation', fee: '', description: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: permitData } = await sb
      .from('permits')
      .select('*, holder:profiles!permits_holder_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!permitData) {
      const { data: fallbackPermit } = await sb.from('permits').select('*').order('created_at', { ascending: false });
      setPermits(fallbackPermit || []);
    } else {
      setPermits(permitData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const requestPermit = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const feeVal = parseFloat(form.fee || '0');

    const { error } = await sb.from('permits').insert([{
      holder_id: u.id,
      title: form.title,
      permit_type: form.permit_type,
      fee: feeVal,
      description: form.description,
      status: 'active'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📜 **PERMIT / LICENSE ISSUED**\n**Holder:** ${u.username}\n**Permit:** ${form.title} (${form.permit_type})\n**Filing Fee:** $${feeVal.toLocaleString()}`
        })
      });

      alert("Permit / license application successfully filed and approved.");
      setShowForm(false);
      setForm({ title: '', permit_type: 'Water Rights & Irrigation', fee: '', description: '' });
      load();
    } else {
      alert("Error filing permit: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Regulatory & Permit Bureau...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/permits'}><FileText size={16}/> Regulatory Permits</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Regulatory Permits & Licenses</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              ACQUIRE WATER RIGHTS, AERIAL SPRAYING LICENSES, ENVIRONMENTAL CLEARANCES, AND OPERATIONAL PERMITS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL FILING' : 'FILE NEW PERMIT APPLICATION'}
            </button>

            {showForm && (
              <form onSubmit={requestPermit} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Permit Application Terminal</h3>
                <input placeholder="Permit Title (e.g. Sector 4 Deep Well Irrigation)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.permit_type} onChange={e=>setForm({...form, permit_type: e.target.value})}>
                  <option value="Water Rights & Irrigation">Water Rights & Irrigation Permit</option>
                  <option value="Aerial Crop Dusting">Aerial Crop Dusting & Spray License</option>
                  <option value="Heavy Machinery Transport">Heavy Machinery Transport Permit</option>
                  <option value="Environmental & Zoning">Environmental & Zoning Clearance</option>
                </select>
                <input type="number" placeholder="Filing / Licensing Fee ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.fee} onChange={e=>setForm({...form, fee: e.target.value})} />
                <textarea placeholder="Legal description, terms, and operational boundaries..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>SUBMIT & ISSUE PERMIT</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {permits.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <FileText size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No regulatory permits registered in the state database.</p>
                </div>
              ) : (
                permits.map(p => (
                  <div key={p.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{p.title}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{p.permit_type?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>{p.description}</p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
                      <span style={{color:'#fff'}}>Filing Fee: <b style={{color:'#22c55e'}}>${p.fee?.toLocaleString()}</b></span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Holder: <b>{p.holder?.username || 'Authorized Operative'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Issued: {new Date(p.created_at || Date.now()).toLocaleDateString()}</span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>{p.status?.toUpperCase()}</span>
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
