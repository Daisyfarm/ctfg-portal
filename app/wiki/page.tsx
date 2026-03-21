"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Book, Search, ArrowLeft, Cloud, LogOut, Briefcase, Map, Landmark, Tractor, ChevronRight, HelpCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Wiki() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data } = await sb.from('wiki').select('*').order('category');
    setArticles(data || []);
    if (data && data.length > 0) setSelected(data[0]);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Opening CTFG Archives...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR NAVIGATION */}
        <div style={{ width:'260px', background:'#222', padding:'20px', borderRight:'1px solid #000', overflowY:'auto' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}><ArrowLeft size={16}/> Dashboard</button>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', marginBottom:'10px', textTransform:'uppercase'}}>Knowledgebase</p>
          {articles.map(a => (
            <button key={a.id} onClick={()=>setSelected(a)} style={{...sideBtn, background: selected?.id === a.id ? '#333' : 'transparent', color: selected?.id === a.id ? '#fff' : '#888'}}>
              <ChevronRight size={14} color={selected?.id === a.id ? '#22c55e' : '#444'}/> {a.title}
            </button>
          ))}
        </div>

        {/* WIKI CONTENT AREA */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1594398044700-eb44808358ae?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)' }}></div>
          
          <div style={{ position:'relative', zIndex:1, padding:'60px', maxWidth:'800px' }}>
            {selected ? (
              <div>
                <span style={{ background:'#4a7ab5', color:'#fff', padding:'4px 10px', borderRadius:'3px', fontSize:'10px', fontWeight:'bold', textTransform:'uppercase' }}>{selected.category}</span>
                <h1 style={{ fontSize:'42px', margin:'10px 0 30px', borderBottom:'1px solid #333', paddingBottom:'20px' }}>{selected.title}</h1>
                <div style={{ fontSize:'18px', color:'#ccc', lineHeight:'1.8', whiteSpace:'pre-wrap' }}>
                  {selected.content}
                </div>
              </div>
            ) : (
              <p>Select an article from the left to begin.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
