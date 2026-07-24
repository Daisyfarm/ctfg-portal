"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Layers, Monitor, Eye, Radio, Settings, Shield, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function OverlayPage() {
  const [u, setU] = useState<any>(null);
  const [overlays, setOverlays] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', overlay_type: 'Live Stats Widget', stream_url: '', theme: 'Dark Tactical' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: overlayData } = await sb
      .from('overlays')
      .select('*, creator:profiles!overlays_creator_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!overlayData) {
      const { data: fallbackOverlay } = await sb.from('overlays').select('*').order('created_at', { ascending: false });
      setOverlays(fallbackOverlay || []);
    } else {
      setOverlays(overlayData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createOverlay = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('overlays').insert([{
      creator_id: u.id,
      title: form.title,
      overlay_type: form.overlay_type,
      stream_url: form.stream_url,
      theme: form.theme,
      status: 'active'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📺 **STREAM OVERLAY CONFIGURED**\n**Operator:** ${u.username}\n**Title:** ${form.title} (${form.overlay_type})\n**Theme:** ${form.theme}`
        })
      });

      alert("Stream overlay successfully deployed and registered.");
      setShowForm(false);
      setForm({ title: '', overlay_type: 'Live Stats Widget', stream_url: '', theme: 'Dark Tactical' });
      load();
    } else {
      alert("Error configuring stream overlay: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Overlay Broadcasting Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/overlay'}><Layers size={16}/> Stream Overlays</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Stream Overlays & HUD</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              CONFIGURE OBS STREAMING OVERLAYS, REAL-TIME FINANCIAL HUD WIDGETS, AND BROADCAST CHANNELS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL OVERLAY SETUP' : 'DEPLOY NEW STREAM OVERLAY'}
            </button>

            {showForm && (
              <form onSubmit={createOverlay} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Overlay Configuration Form</h3>
                <input placeholder="Overlay Name / Title (e.g. Montana Harvest Cam HUD)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.overlay_type} onChange={e=>setForm({...form, overlay_type: e.target.value})}>
                  <option value="Live Stats Widget">Live Financial & Stats Widget</option>
                  <option value="Full Stream HUD">Full Stream HUD Layout</option>
                  <option value="Alert Box Ticker">Alert Box & Transaction Ticker</option>
                  <option value="Minimap & Land Radar">Minimap & Land Radar</option>
                </select>
                <input placeholder="Stream URL / Embed Link (optional)" style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.stream_url} onChange={e=>setForm({...form, stream_url: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.theme} onChange={e=>setForm({...form, theme: e.target.value})}>
                  <option value="Dark Tactical">Dark Tactical & Steel</option>
                  <option value="Emerald Harvest">Emerald Harvest Green</option>
                  <option value="Industrial Rust">Industrial Rust & Gold</option>
                </select>
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>DEPLOY OVERLAY</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {overlays.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <Layers size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No stream overlays deployed in the broadcasting registry.</p>
                </div>
              ) : (
                overlays.map(ov => (
                  <div key={ov.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{ov.title}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{ov.overlay_type?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>Theme: <b>{ov.theme}</b></p>

                    {ov.stream_url && (
                      <p style={{margin:0, fontSize:'12px', color:'#4a7ab5', wordBreak:'break-all'}}>Link: {ov.stream_url}</p>
                    )}

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Creator: <b>{ov.creator?.username || 'Authorized Operative'}</b></span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>{ov.status?.toUpperCase()}</span>
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
