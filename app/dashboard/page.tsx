"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wallet, Tractor, Send, Map, Clock, Briefcase, Landmark, LogOut, 
  Cloud, ShieldCheck, TrendingUp, FileCheck, UserCheck, Megaphone, 
  Trophy, Radio, Star, LifeBuoy, BarChart3, BookOpen, Wheat, Wrench, Truck, Activity
} from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Dash() {
  const [p, setP] = useState<any>(null); const [s, setS] = useState<any>(null);
  const [tx, setTx] = useState<any[]>([]); const [w, setW] = useState("");
  const [news, setNews] = useState(""); const [radio, setRadio] = useState<any>(null);
  const [co, setCo] = useState<any>(null); const [mkt, setMkt] = useState<any[]>([]);
  const [debt, setDebt] = useState(0); const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return window.location.href = '/';
    
    const { data: pr } = await sb.from('profiles').select('*').eq('id', user.id).single();
    const { data: t } = await sb.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
    const { data: n } = await sb.from('news').select('message').order('created_at', { ascending: false }).limit(1);
    const { data: rd } = await sb.from('dispatch').select('*').order('created_at', { ascending: false }).limit(1);
    const { data: comp } = await sb.from('companies').select('*').eq('owner_id', user.id).maybeSingle();
    const { data: m } = await sb.from('market_prices').select('*').order('crop_name');
    const { data: ln } = await sb.from('loans').select('amount_remaining').eq('user_id', user.id).eq('status', 'active');

    setP(pr); setTx(t || []); setNews(n?.[0]?.message || "System Active."); setRadio(rd?.[0] || { message: 'Radio Silence', sender: 'Dispatch' }); 
    setCo(comp); setMkt(m || []); setDebt(ln?.reduce((a:any, c:any) => a + c.amount_remaining, 0) || 0);

    fetch('/api/server').then(r=>r.json()).then(d=>setS(d)).catch(()=>0);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  if (ld || !p) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>ESTABLISHING MULTI-GAME LINK...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic'}}>CTFG NETWORK</span>
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', textTransform:'uppercase', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}><Cloud size={14} color="#4a7ab5"/> {w || '--°F'} MONTANA</span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>FINANCES</span>
            <span onClick={()=>window.location.href='/marketplace'} style={{cursor:'pointer'}}>MARKET</span>
          </div>
        </div>
        {p.rank === 'Admin' && <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>STAFF PANEL</button>}
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR NAVIGATION */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000', overflowY:'auto' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px'}}>OPERATIONS</p>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}><Activity size={16}/> Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> FS25 Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/logistics'}><Truck size={16} color="#3b82f6"/> ATS/ETS2 Hauling</button>
          <button style={sideBtn} onClick={()=>window.location.href='/service'}><Wrench size={16} color="#f59e0b"/> CMS Maintenance</button>
          <button style={sideBtn} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>
          
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px'}}>ASSETS & LEGAL</p>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}><Landmark size={16}/> Land Deeds</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={sideBtn} onClick={()=>window.location.href='/insurance'}><ShieldCheck size={16}/> Insurance</button>
          <button style={sideBtn} onClick={()=>window.location.href='/permits'}><FileCheck size={16}/> Permits</button>
          
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px'}}>NETWORK</p>
          <button style={sideBtn} onClick={()=>window.location.href='/leaderboard'}><Trophy size={16}/> Leaderboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/wiki'}><BookOpen size={16}/> Knowledgebase</button>
          <button style={{...sideBtn, background:'#1a1a1a', marginTop:'20px'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}><LogOut size={16}/> Sign Out</button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.1, position:'absolute' }} />
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px' }}>
            
            {/* RADIO DISPATCH BOX */}
            <div style={{ background:'rgba(220,38,38,0.1)', border:'1px solid #dc2626', padding:'15px', borderRadius:'4px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'15px' }}>
              <Radio size={24} color="#dc2626" className="animate-pulse" />
              <div style={{ textAlign:'left' }}>
                <p style={{ margin:0, fontSize:'10px', color:'#dc2626', fontWeight:'bold' }}>LIVE DISPATCH FREQUENCY</p>
                <p style={{ margin:0, fontSize:'14px', fontStyle:'italic' }}><span style={{color:'#aaa'}}>{radio.sender}:</span> "{radio.message}"</p>
              </div>
            </div>

            <div style={{ background:'rgba(34,197,94,0.1)', border:'1px solid #22c55e', padding:'12px', borderRadius:'4px', marginBottom:'20px', display:'flex', alignItems:'center', gap:'10px' }}><Megaphone size={18} color="#22c55e" /><p style={{ margin:0, fontSize:'12px' }}><b>BROADCAST:</b> {news}</p></div>

            <div style={{ display:'flex', gap:'20px', marginBottom:'20px' }}>
              {/* PRIMARY CAPITAL CARD */}
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', width:'420px', borderLeft:'6px solid #4a7ab5', display:'flex', gap:'15px' }}>
                <div style={{flex:1}}>
                  <p style={{ margin:0, fontSize:'11px', color:'#888' }}>{co ? co.name : 'INDEPENDENT OPERATOR'}</p>
                  <h2 style={{ margin:'5px 0', fontSize:'24px', color:'#fff' }}>{p.username}</h2>
                  <div style={{display:'flex', gap:'5px', marginBottom:'10px'}}>{p.badges?.map((b:string)=><span key={b} style={{fontSize:'9px', background:'#4a7ab5', padding:'2px 6px', borderRadius:'3px'}}>{b}</span>)}</div>
                  <h1 style={{ fontSize:'42px', margin:0, color:'#22c55e', fontFamily:'monospace' }}>${p.balance?.toLocaleString()}</h1>
                  {debt > 0 && <p style={{ marginTop:'10px', color:'#ff4d4d', fontSize:'11px', fontWeight:'bold' }}>⚠️ DEBT: ${debt.toLocaleString()}</p>}
                </div>
                {co && <img src={co.logo_url} style={{width:'80px', height:'80px', objectFit:'contain', background:'#fff', padding:'5px', borderRadius:'4px'}} />}
              </div>

              {/* MULTI-GAME STATUS */}
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', width:'350px', borderLeft:'6px solid #22c55e' }}>
                <p style={{ margin:0, fontSize:'11px', color:'#888', textTransform:'uppercase' }}>Network Link Status</p>
                <div style={{ marginTop:'15px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px'}}><div style={{width:'8px', height:'8px', borderRadius:'50%', background:s?.slots?.used > 0 ? '#22c55e' : '#555'}}></div> FS25 Montana: {s ? `${s.slots.used}/${s.slots.capacity}` : 'Offline'}</div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px'}}><div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#3b82f6'}}></div> ATS Logistics: ACTIVE</div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'13px'}}><div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#f59e0b'}}></div> CMS Workshop: OPEN</div>
                </div>
              </div>
            </div>

            {/* MARKET & LOGS GRID */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'20px', borderRadius:'4px', borderTop:'1px solid #333' }}>
                <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold' }}><TrendingUp size={14} style={{verticalAlign:'middle'}}/> LIVE MARKET FEED</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                  {mkt.map(m => <div key={m.id} style={{ fontSize:'10px', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #222', padding:'4px 0' }}><span style={{color:'#aaa'}}>{m.crop_name}</span><span style={{color:'#22c55e'}}>${m.base_price}</span></div>)}
                </div>
              </div>
              <div style={{ background:'rgba(0,0,0,0.85)', padding:'20px', borderRadius:'4px', borderTop:'1px solid #333' }}>
                <p style={{ margin:'0 0 10px 0', fontSize:'11px', color:'#4a7ab5', fontWeight:'bold' }}><Clock size={14} style={{verticalAlign:'middle'}}/> AUDIT LOGS</p>
                {tx.map(t => <div key={t.id} style={{ display:'flex', justifyContent:'space-between', fontSize:'11px', borderBottom:'1px solid #222', padding:'4px 0' }}><span style={{color:'#ccc'}}>{t.description}</span><span style={{fontWeight:'bold', color: t.type==='income'?'#22c55e':'#ff4d4d'}}>${t.amount?.toLocaleString()}</span></div>)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
