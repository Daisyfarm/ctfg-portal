"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Book, Search, FileText, ChevronRight, ChevronDown, Plus, Home, Folder, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Wiki() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data } = await sb.from('wiki').select('*').order('category');
    setArticles(data || []);
    if (data && data.length > 0) setSelected(data[0]);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>Loading Confluence...</div>;

  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <div style={{ background:'#fff', minHeight:'100vh', color:'#172b4d', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Fira Sans,"Droid Sans","Helvetica Neue",sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP HEADER BAR */}
      <div style={{ background:'#fff', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #ebecf0' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'20px' }}>
          <div style={{ background:'#0052cc', color:'#fff', padding:'5px', borderRadius:'3px' }}><Book size={20}/></div>
          <span style={{ fontWeight:'bold', fontSize:'18px', color:'#42526e' }}>CTFG <span style={{color:'#0052cc'}}>Confluence</span></span>
        </div>
        <div style={{ display:'flex', gap:'10px', alignItems:'center', flex:1, maxWidth:'600px', margin:'0 40px' }}>
          <div style={{ position:'relative', width:'100%' }}>
            <Search size={16} style={{ position:'absolute', left:'10px', top:'10px', color:'#7a869a' }}/>
            <input placeholder="Search knowledgebase..." style={{ width:'100%', padding:'8px 10px 8px 35px', borderRadius:'3px', border:'2px solid #ebecf0', background:'#fafbfc' }} />
          </div>
        </div>
        <button onClick={()=>window.location.href='/dashboard'} style={{ background:'#0052cc', color:'#fff', border:'none', padding:'8px 15px', borderRadius:'3px', fontWeight:'bold', cursor:'pointer' }}>Dashboard</button>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        
        {/* LEFT SIDEBAR (TREE VIEW) */}
        <div style={{ width:'280px', background:'#f4f5f7', borderRight:'1px solid #ebecf0', padding:'20px 10px' }}>
          <p style={{ fontSize:'11px', fontWeight:'bold', color:'#6b778c', marginBottom:'15px', paddingLeft:'10px' }}>SPACES</p>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px', background:'#fff', borderRadius:'3px', boxShadow:'0 1px 2px rgba(0,0,0,0.1)', marginBottom:'20px' }}>
            <div style={{ background:'#0052cc', width:'24px', height:'24px', borderRadius:'3px' }}></div>
            <span style={{ fontWeight:'bold', fontSize:'14px' }}>Farm Simulator Network</span>
          </div>

          <p style={{ fontSize:'11px', fontWeight:'bold', color:'#6b778c', marginBottom:'10px', paddingLeft:'10px' }}>CONTENT</p>
          
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom:'10px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'5px', padding:'5px 10px', cursor:'pointer', fontSize:'14px', color:'#42526e', fontWeight:'bold' }}>
                <ChevronDown size={14}/> <Folder size={14} color="#0052cc"/> {cat}
              </div>
              <div style={{ marginLeft:'25px' }}>
                {articles.filter(a => a.category === cat).map(art => (
                  <div 
                    key={art.id} 
                    onClick={()=>setSelected(art)}
                    style={{ padding:'5px 10px', fontSize:'13px', color: selected?.id === art.id ? '#0052cc' : '#42526e', cursor:'pointer', background: selected?.id === art.id ? '#deebff' : 'transparent', borderRadius:'3px', display:'flex', alignItems:'center', gap:'8px' }}
                  >
                    <FileText size={14}/> {art.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex:1, padding:'60px 80px', overflowY:'auto' }}>
          <div style={{ maxWidth:'800px', position:'relative' }}>
            
            {/* LOGO IMAGE ON THE RIGHT (Like screenshot) */}
            <div style={{ position:'absolute', top:0, right:'-100px', width:'250px' }}>
              <img src="https://i.ibb.co/3ykG8z7/fs-logo.png" style={{ width:'100%', opacity:0.9 }} alt="FSN Logo" />
            </div>

            {selected ? (
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'14px', color:'#6b778c', marginBottom:'10px' }}>
                  NextGen / <span style={{color:'#0052cc'}}>{selected.category}</span>
                </div>
                <h1 style={{ fontSize:'36px', color:'#172b4d', margin:'0 0 20px 0' }}>{selected.title}</h1>
                
                <div style={{ fontSize:'16px', color:'#172b4d', lineHeight:'1.6', borderTop:'1px solid #ebecf0', paddingTop:'30px' }}>
                  {selected.content}
                </div>

                <div style={{ marginTop:'50px', borderTop:'1px solid #ebecf0', paddingTop:'20px' }}>
                  <h3 style={{ fontSize:'16px' }}>Related in this category:</h3>
                  <ul style={{ paddingLeft:'20px', color:'#0052cc' }}>
                    {articles.filter(a => a.category === selected.category && a.id !== selected.id).map(rel => (
                        <li key={rel.id} style={{ cursor:'pointer', marginBottom:'5px' }} onClick={()=>setSelected(rel)}>{rel.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>Select a topic to begin.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
