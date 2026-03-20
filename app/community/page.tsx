"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Download, Lock, Server, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Hub() {
  const [p, setP] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setP(data);
    };
    load();
  }, []);

  if (!p) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Verifying Rank...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        <h1 style={{ color:'#22c55e' }}>CTFG Community Hub</h1>

        {p.rank === 'Farmer' ? (
          <div style={{ background:'#131926', padding:'30px', borderRadius:'20px', textAlign:'center', border:'1px solid #dc2626' }}>
            <Lock size={48} color="#dc2626" style={{marginBottom:'15px'}} />
            <h2>Access Restricted</h2>
            <p style={{color:'#94a3b8'}}>You must be a verified Member to see server details. Please fill out an application or contact Samuel on Discord.</p>
            <button onClick={()=>window.location.href='/apply'} style={{padding:'10px 20px', background:'#22c55e', border:'none', borderRadius:'8px', color:'#fff', fontWeight:'bold'}}>Apply Now</button>
          </div>
        ) : (
          <div>
            <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', marginBottom:'20px', border:'1px solid #1e293b' }}>
              <h3><Server size={20} color="#22c55e" /> Server Connection</h3>
              <p><b>IP:</b> 147.93.162.149:8170</p>
              <p><b>Password:</b> <span style={{background:'#22c55e', color:'#000', padding:'2px 6px', borderRadius:'4px', fontWeight:'bold'}}>CTFG2025</span></p>
            </div>

            <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', border:'1px solid #1e293b' }}>
              <h3><Download size={20} color="#3b82f6" /> Mod Pack</h3>
              <p style={{fontSize:'14px', color:'#94a3b8'}}>Make sure you have all mods installed before joining to avoid sync issues.</p>
              <button onClick={()=>window.open('http://147.93.162.149:8170/mods.html', '_blank')} style={{width:'100%', padding:'15px', background:'#3b82f6', border:'none', borderRadius:'10px', color:'#fff', fontWeight:'bold', cursor:'pointer'}}>Download Mods</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
