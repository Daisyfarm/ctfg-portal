I've got you. I have integrated the Bank Sync logic directly into your existing dashboard code. I also cleaned up a few small things to make sure the "Staff Panel" button and the "Sync" button both look professional and match your "American Farmer" theme.

Note: Since this is a "use client" file, the Discord alert works best if you have that Vercel Environment Variable set up, or better yet, a Supabase Edge Function. For now, this code focuses on getting the data into your database perfectly.

🚜 The Complete Dashboard Code
TypeScript
"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wallet, Tractor, Send, Map, Clock, Briefcase, Landmark, LogOut, 
  Cloud, ShieldCheck, TrendingUp, FileCheck, UserCheck, Megaphone, 
  Trophy, Radio, Star, LifeBuoy, BarChart3, BookOpen, Wheat, Activity, Truck, Wrench
} from 'lucide-react';

// Initialize Supabase
const sb = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function Dash() {
  const [p, setP] = useState<any>(null); 
  const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]); 
  const [w, setW] = useState("");
  const [news, setNews] = useState(""); 
  const [radio, setRadio] = useState<any>(null);
  const [co, setCo] = useState<any>(null); 
  const [ld, setLd] = useState(true);

  // --- DATA LOADING ---
  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';

    const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
    const { data: n } = await sb.from('news').select('message').order('created_at', { ascending: false }).limit(1);
    const { data: rd } = await sb.from('dispatch').select('*').order('created_at', { ascending: false }).limit(1);
    const { data: comp } = await sb.from('companies').select('*').eq('owner_id', user.id).maybeSingle();

    setP(pr); 
    setTx(t || []); 
    setNews(n?.[0]?.message || "System Active."); 
    setRadio(rd?.[0] || { message: 'Standby', sender: 'Dispatch' }); 
    setCo(comp);

    // Fetch Game Server & Weather
    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit')
      .then(r=>r.json())
      .then(d=>setW(Math.round(d.current.temperature_2m) + "°F"))
      .catch(()=>0);
      
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  // --- BANK SYNC HANDLER ---
  const handleSyncRequest = async (e: any) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount to sync.");
      return;
    }

    // Insert the request into your 'transactions' table
    const { error } = await sb.from('transactions').insert([
      { 
        user_id: p.id, 
        amount: Number(amount), 
        status: 'pending', 
        type: 'sync_request' 
      }
    ]);

    if (error) {
      console.error(error);
      alert("Error submitting request. Check console.");
    } else {
      alert(`Success! Requested $${Number(amount).toLocaleString()} sync to game.`);
      e.target.reset();
      load(); // Refresh transaction list
    }
  };

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center', fontFamily:'monospace'}}>SYNCING CTFG NETWORK...</div>;
  
  const sBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP NAVIGATION BAR */}
      <div style={{ background:'#222', padding:'10px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'25px', alignItems:'center' }}>
          <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{height:'40px', borderRadius:'4px'}} alt="Logo" />
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> MONTANA: {w || '--°F'}</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer', hover:{color:'#fff'}}}>FINANCES</span>
          </div>
        </div>
        {p.rank === 'Admin' && (
          <button onClick={()=>window.location.href='/admin/bank'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'8px 20px', fontSize:'11px', fontStyle:'italic', fontWeight:'black', cursor:'pointer', borderRadius:'3px', letterSpacing:'1px'}}>
            STAFF TERMINAL
          </button>
        )}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000', overflowY:'auto' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px', letterSpacing:'1px'}}>OPERATIONS</p>
          <button style={{...sBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}><Activity size={16}/> Dashboard</button>
          <button style={sBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={sBtn} onClick={()=>window.location.href='/logistics'}><Truck size={16} color="#3b82f6"/> Trucking</button>
          <button style={sBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', letterSpacing:'1px'}}>LEGAL & FINANCE</p>
          <button style={sBtn} onClick={()=>window.location.href='/accounting'}><BarChart3 size={16}/> Accounting</button>
          <button style={sBtn} onClick={()=>window.location.href='/insurance'}><ShieldCheck size={16}/> Insurance</button>
          <button style={sBtn} onClick={()=>window.location.href='/permits'}><FileCheck size={16}/> Permits</button>
          <button style={sBtn} onClick={()=>window.location.href='/agreements'}><UserCheck size={16}/> Agreements</button>
          
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px', letterSpacing:'1px'}}>SOCIAL</p>
          <button style={sBtn} onClick={()=>window.location.href='/wiki'}><BookOpen size={16}/> Wiki</button>
          <button style={sBtn} onClick={()=>window.location.href='/leaderboard'}><Trophy size={16}/> Rankings</button>
          <button style={{...sBtn, background:'#1a1a1a', marginTop:'20px', color:'#dc2626'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>
            <LogOut size={16}/> Sign Out
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.15, position:'absolute' }} alt="Background" />
          
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px' }}>
            
            {/* LIVE DISPATCH ALERT */}
            <div style={{ background:'rgba(220,38,38,0.1)', border:'1px solid #dc2626', padding:'15px', borderRadius:'4px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'15px' }}>
              <Radio size={24} color="#dc2626" />
              <div style={{ textAlign:'left' }}>
                <p style={{ margin:0, fontSize:'10px', color:'#dc2626', fontWeight:'bold', letterSpacing:'1px' }}>LIVE DISPATCH</p>
                <p style={{ margin:0, fontSize:'14px', fontStyle:'italic' }}><span style={{color:'#aaa'}}>{radio.sender}:</span> "{radio.message}"</p>
              </div>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap', gap:'20px' }}>
              
              {/* OPERATOR & BALANCE CARD */}
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', width:'420px', borderLeft:'6px solid #4a7ab5', display:'flex', gap:'15px' }}>
                <div style={{flex:1}}>
                  <p style={{ margin:0, fontSize:'11px', color:'#888', fontWeight:'bold' }}>OPERATOR</p>
                  <h2 style={{ margin:'5px 0', fontSize:'24px', color:'#fff', textTransform:'uppercase' }}>{p.username}</h2>
                  <h1 style={{ fontSize:'42px', margin:0, color:'#22c55e', fontFamily:'monospace', fontWeight:'bold' }}>
                    ${p.balance?.toLocaleString()}
                  </h1>
                </div>
                {co && <img src={co.logo_url} style={{width:'80px', height:'80px', objectFit:'contain', background:'#fff', padding:'5px', borderRadius:'4px'}} alt="Company Logo" />}
              </div>

              {/* NEW: BANK SYNC MODULE */}
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', width:'420px', borderLeft:'6px solid #22c55e' }}>
                <p style={{ margin:0, fontSize:'11px', color:'#22c55e', fontWeight:'bold', letterSpacing:'1px' }}>BANKING TERMINAL</p>
                <h3 style={{ margin:'5px 0 15px 0', fontSize:'16px', color:'#fff', fontStyle:'italic' }}>REQUEST GAME SYNC</h3>
                
                <form onSubmit={handleSyncRequest} style={{ display:'flex', gap:'10px' }}>
                  <input 
                    name="amount" 
                    type="number" 
                    placeholder="ENTER AMOUNT..." 
                    style={{ 
                      flex:1, 
                      background:'#111', 
                      border:'1px solid #333', 
                      color:'#fff', 
                      padding:'10px', 
                      fontFamily:'monospace',
                      fontSize:'14px',
                      outline:'none'
                    }} 
                    required
                  />
                  <button type="submit" style={{ 
                    background:'#22c55e', 
                    color:'#000', 
                    border:'none', 
                    padding:'0 20px', 
                    fontWeight:'black', 
                    cursor:'pointer',
                    fontSize:'11px',
                    textTransform:'uppercase',
                    borderRadius:'2px'
                  }}>
                    Sync
                  </button>
                </form>
                <p style={{ margin:'12px 0 0 0', fontSize:'10px', color:'#555', fontStyle:'italic' }}>
                  * Funds will be deducted from your portal and added to FS25.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
