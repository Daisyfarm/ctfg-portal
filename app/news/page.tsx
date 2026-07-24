"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Newspaper, Radio, Megaphone, Calendar, User, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function NewsPage() {
  const [u, setU] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Bulletin', content: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: newsData } = await sb
      .from('news')
      .select('*, author:profiles!news_author_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!newsData) {
      const { data: fallbackNews } = await sb.from('news').select('*').order('created_at', { ascending: false });
      setNews(fallbackNews || []);
    } else {
      setNews(newsData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const publishNews = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('news').insert([{
      author_id: u.id,
      title: form.title,
      category: form.category,
      content: form.content
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📰 **CORPORATE BROADCAST / NEWS**\n**Author:** ${u.username}\n**Category:** ${form.category.toUpperCase()}\n**Title:** ${form.title}\n\n${form.content}`
        })
      });

      alert("News bulletin successfully broadcasted to the network.");
      setShowForm(false);
      setForm({ title: '', category: 'Bulletin', content: '' });
      load();
    } else {
      alert("Error broadcasting news: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing News Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/news'}><Newspaper size={16}/> Corporate News</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate News & Broadcasts</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              OFFICIAL BULLETINS, MARKET UPDATES, AND ANNOUNCEMENTS ACROSS THE IRON DAISY AGRI NETWORK.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL BROADCAST' : 'PUBLISH NEW BULLETIN'}
            </button>

            {showForm && (
              <form onSubmit={publishNews} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Broadcast Bulletin Form</h3>
                <input placeholder="Bulletin Headline / Title" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  <option value="Bulletin">General Bulletin</option>
                  <option value="Market Update">Market & Commodity Update</option>
                  <option value="Operations">Operations Alert</option>
                  <option value="Executive">Executive Directive</option>
                </select>
                <textarea placeholder="Bulletin content, announcements, regulatory updates..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'120px'}} value={form.content} onChange={e=>setForm({...form, content: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>BROADCAST TO NETWORK</button>
              </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              {news.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <Newspaper size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No corporate news bulletins published in the database.</p>
                </div>
              ) : (
                news.map(item => (
                  <div key={item.id} style={{ background:'rgba(35,35,35,0.95)', padding:'30px', borderLeft:'6px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h2 style={{margin:0, fontSize:'22px'}}>{item.title}</h2>
                      <span style={{fontSize:'10px', background:'#222', padding:'4px 10px', borderRadius:'3px', color:'#4a7ab5', fontWeight:'bold'}}>{item.category?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:'5px 0', fontSize:'14px', color:'#ddd', lineHeight:'1.6', whiteSpace:'pre-wrap'}}>{item.content}</p>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#888'}}>
                      <span>Author: <b>{item.author?.username || 'Executive Directorate'}</b></span>
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
