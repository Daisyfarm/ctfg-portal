"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Radio, Send, Truck, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function DispatchPage() {
  const [u, setU] = useState<any>(null);
  const [dispatches, setDispatches] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [form, setForm] = useState({ title: '', message: '', priority: 'routine' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: dispData } = await sb
      .from('dispatches')
      .select('*, sender:profiles!dispatches_sender_id_fkey(username)')
      .order('created_at', { ascending: false });

    setDispatches(dispData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const sendDispatch = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('dispatches').insert([{
      sender_id: u.id,
      title: form.title,
      message: form.message,
      priority: form.priority
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📻 **MONTANA FIELD DISPATCH [${form.priority.toUpperCase()}]**\n**From:** ${u.username}\n**Subject:** ${form.title}\n**Message:** ${form.message}`
        })
      });

      alert("Dispatch successfully broadcasted.");
      setForm({ title: '', message: '', priority: 'routine' });
      load();
    } else {
      alert("Error broadcasting dispatch.");
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Connecting to Field Comms...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#F2C94C', fontSize:'11px', fontWeight:'bold'}}>MONTANA FIELD COMMS: ACTIVE</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dispatch'}><Radio size={16}/> IDA Dispatch</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>IDA Field Dispatch</h1>
            <p style={{fontSize:'12px', color:'#F2C94C', fontWeight:'bold', margin:'10px 0 30px'}}>
              BROADCAST LIVE OPERATIONAL ALERTS, LOGISTICAL UPDATES, AND FIELD INSTRUCTIONS ACROSS THE MONTANA NETWORK.
            </p>

            <form onSubmit={sendDispatch} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'2px solid #F2C94C', borderRadius:'4px', marginBottom:'40px', display:'flex', flexDirection:'column', gap:'15px' }}>
              <h3 style={{marginTop:0, color:'#F2C94C'}}>New Field Broadcast</h3>
              <input placeholder="Dispatch Subject / Title" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
              <textarea placeholder="Dispatch Message / Field Coordinates..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'90px'}} value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
              <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})}>
                <option value="routine">Routine Operational</option>
                <option value="urgent">Urgent Logistical</option>
                <option value="critical">Critical Emergency</option>
              </select>
              <button type="submit" style={{padding:'15px', background:'#F2C94C', color:'#000', border:'none', fontWeight:'bold', cursor:'pointer'}}>BROADCAST DISPATCH</button>
            </form>

            <h2 style={{ fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px' }}>Active Dispatch Logs</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
              {dispatches.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <Radio size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active dispatch logs found.</p>
                </div>
              ) : (
                dispatches.map(d => (
                  <div key={d.id} style={{ background:'rgba(40,40,40,0.9)', padding:'20px', borderLeft:`6px solid ${d.priority === 'critical' ? '#ef4444' : d.priority === 'urgent' ? '#f59e0b' : '#22c55e'}`, borderRadius:'4px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px'}}>
                      <h4 style={{margin:0, fontSize:'18px', color:'#fff'}}>{d.title}</h4>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#F2C94C', fontWeight:'bold'}}>{d.priority.toUpperCase()}</span>
                    </div>
                    <p style={{margin:'0 0 10px 0', fontSize:'13px', color:'#ccc'}}>{d.message}</p>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Transmitted by: <b>{d.sender?.username || 'Operative'}</b></span>
                      <span>{new Date(d.created_at).toLocaleString()}</span>
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
