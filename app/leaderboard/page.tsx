"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trophy, Award, DollarSign, Users, Shield, ArrowUp } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LeaderboardPage() {
  const [u, setU] = useState<any>(null);
  const [operatives, setOperatives] = useState<any[]>([]);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: profileData } = await sb
      .from('profiles')
      .select('*')
      .order('balance', { ascending: false })
      .limit(50);

    setOperatives(profileData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Operative Rankings...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/leaderboard'}><Trophy size={16}/> Operative Leaderboard</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Operative Leaderboard</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              TOP PERFORMING OPERATIVES AND EXECUTIVES RANKED ACROSS THE IRON DAISY AGRI FINANCIAL NETWORK.
            </p>

            <div style={{ background:'rgba(25,25,25,0.95)', border:'1px solid #4a7ab5', borderRadius:'4px', overflow:'hidden' }}>
              <div style={{ display:'grid', gridTemplateColumns:'80px 1fr 180px', padding:'15px 20px', background:'#222', borderBottom:'1px solid #333', fontSize:'12px', fontWeight:'bold', color:'#888' }}>
                <span>RANK</span>
                <span>OPERATIVE NAME</span>
                <span style={{textAlign:'right'}}>NET BALANCE</span>
              </div>

              {operatives.length === 0 ? (
                <div style={{ padding:'30px', textAlign:'center', color:'#777' }}>
                  <p style={{margin:0}}>No operatives registered in the network.</p>
                </div>
              ) : (
                operatives.map((op, idx) => (
                  <div key={op.id} style={{ display:'grid', gridTemplateColumns:'80px 1fr 180px', padding:'18px 20px', borderBottom:'1px solid #333', alignItems:'center', background: op.id === u.id ? 'rgba(74, 122, 181, 0.15)' : 'transparent' }}>
                    <div style={{display:'flex', alignItems:'center', gap:'8px', fontWeight:'bold', color: idx === 0 ? '#F2C94C' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : '#fff'}}>
                      {idx === 0 && <Trophy size={16} />}
                      #{idx + 1}
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <span style={{fontWeight:'bold', color: op.id === u.id ? '#22c55e' : '#fff'}}>{op.username || 'Operative'}</span>
                      {op.id === u.id && <span style={{fontSize:'9px', background:'#22c55e', color:'#000', padding:'2px 6px', borderRadius:'3px', fontWeight:'bold'}}>YOU</span>}
                    </div>
                    <div style={{textAlign:'right', fontWeight:'bold', color:'#22c55e'}}>
                      ${op.balance?.toLocaleString()}
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
