"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, MessageSquare, Shield, Award, Calendar, ExternalLink } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const DISCORD_INVITE = "https://discord.gg/iron-daisy-agri"; // Replace or use standard link

export default function CommunityPage() {
  const [u, setU] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: profileList } = await sb
      .from('profiles')
      .select('id, username, role, balance, created_at')
      .order('created_at', { ascending: false });

    setMembers(profileList || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Community Hub...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>OPERATIVE: {u.username || 'Authorized'}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/community'}><Users size={16}/> Community Hub</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
              <div>
                <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Community Hub</h1>
                <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 0 0'}}>
                  CONNECT WITH FELLOW OPERATIVES, REVIEW THE REGISTRY ROSTER, AND JOIN OUR EXTERNAL COMMUNICATIONS CHANNEL.
                </p>
              </div>
              <a href="https://discord.com" target="_blank" rel="noreferrer" style={{ background:'#5865F2', color:'#fff', padding:'12px 20px', textDecoration:'none', fontWeight:'bold', fontSize:'13px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'8px' }}>
                <MessageSquare size={16} /> Join Discord
              </a>
            </div>

            <h2 style={{ fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px' }}>Registered Operatives Registry</h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' }}>
              {members.map(m => (
                <div key={m.id} style={{ background:'rgba(35,35,35,0.9)', padding:'20px', borderLeft:'5px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'8px' }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3 style={{margin:0, fontSize:'18px', color:'#fff'}}>{m.username}</h3>
                    <span style={{fontSize:'10px', background:'#222', color:'#22c55e', padding:'3px 8px', borderRadius:'3px', fontWeight:'bold'}}>{m.role || 'OPERATIVE'}</span>
                  </div>
                  <p style={{margin:0, fontSize:'13px', color:'#aaa'}}>Balance: <b style={{color:'#fff'}}>${m.balance?.toLocaleString() || 0}</b></p>
                  <span style={{fontSize:'10px', color:'#666', marginTop:'5px'}}>Joined: {new Date(m.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
