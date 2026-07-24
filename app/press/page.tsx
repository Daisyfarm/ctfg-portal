"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Radio, Mic, Volume2, Globe, PlusCircle, Calendar } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function PressPage() {
  const [u, setU] = useState<any>(null);
  const [releases, setReleases] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', media_outlet: 'Iron Daisy Radio Network', category: 'Press Release', content: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: pressData } = await sb
      .from('press')
      .select('*, author:profiles!press_author_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!pressData) {
      const { data: fallbackPress } = await sb.from('press').select('*').order('created_at', { ascending: false });
      setReleases(fallbackPress || []);
    } else {
      setReleases(pressData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const publishPress = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('press').insert([{
      author_id: u.id,
      title: form.title,
      media_outlet: form.media_outlet,
      category: form.category,
      content: form.content
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📢 **OFFICIAL PRESS RELEASE**\n**Outlet:** ${form.media_outlet}\n**Author:** ${u.username}\n**Title:** ${form.title}\n\n${form.content}`
        })
      });

      alert("Press release successfully published to media wire.");
      setShowForm(false);
      setForm({ title: '', media_outlet: 'Iron Daisy Radio Network', category: 'Press Release', content: '' });
      load();
    } else {
      alert("Error publishing press release: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Press & Media Wire...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/press'}><Radio size={16}/> Press & Media Wire</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Press & Media Wire</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              PUBLIC STATEMENTS, MEDIA BROADCASTS, AND CORPORATE PRESS RELEASES DISTRIBUTED REGIONALLY.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL STATEMENT' : 'PUBLISH PRESS RELEASE'}
            </button>

            {showForm && (
              <form onSubmit={publishPress} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Press Release Form</h3>
                <input placeholder="Press Headline / Title" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <input placeholder="Media Outlet (e.g. Iron Daisy Radio Network)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.media_outlet} onChange={e=>setForm({...form, media_outlet: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  <option value="Press Release">Official Press Release</option>
                  <option value="Radio Broadcast">Radio Broadcast Transcript</option>
                  <option value="Public Statement">Public Executive Statement</option>
                  <option value="Interview">Media Interview & Q&A</option>
                </select>
                <textarea placeholder="Release body text, statements, broadcast details..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'120px'}} value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>BROADCAST TO MEDIA WIRE</button>
              </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              {releases.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <Radio size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No press releases or media broadcasts found on the wire.</p>
                </div>
              ) : (
                releases.map(item => (
                  <div key={item.id} style={{ background:'rgba(35,35,35,0.95)', padding:'30px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h2 style={{margin:0, fontSize:'22px'}}>{item.title}</h2>
                      <span style={{fontSize:'10px', background:'#222', padding:'4px 10px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{item.media_outlet?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:'5px 0', fontSize:'14px', color:'#ddd', lineHeight:'1.6', whiteSpace:'pre-wrap'}}>{item.content}</p>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#888'}}>
                      <span>Author / Spokesperson: <b>{item.author?.username || 'Corporate Communications'}</b></span>
                      <span>{new Date(item.created_at || Date.now()).toLocaleDateString()}</span>
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
