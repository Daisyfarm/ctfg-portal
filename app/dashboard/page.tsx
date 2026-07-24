"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DollarSign, Shield, Tractor, TrendingUp, Building2, Users, FileText, Gavel, Sword, Mail, LogOut, ArrowUpRight } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function DashboardPage() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);
  const [stats, setStats] = useState({ companiesCount: 0, auctionsCount: 0, contractsCount: 0, membersCount: 0 });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) {
      window.location.href = '/';
      return;
    }

    const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
    if (profile) setU(profile);

    const [{ count: cCount }, { count: aCount }, { count: ctCount }, { count: mCount }] = await Promise.all([
      sb.from('companies').select('*', { count: 'exact', head: true }),
      sb.from('auctions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      sb.from('contracts').select('*', { count: 'exact', head: true }).eq('status', 'open'),
      sb.from('profiles').select('*', { count: 'exact', head: true }),
    ]);

    setStats({
      companiesCount: cCount || 0,
      auctionsCount: aCount || 0,
      contractsCount: ctCount || 0,
      membersCount: mCount || 0,
    });

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleLogout = async () => {
    await sb.auth.signOut();
    window.location.href = '/';
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Synchronizing Command Feed...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div onClick={()=>window.location.href='/dashboard'} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'10px'}}>
          <span style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic'}}>DAISY HILL</span>
        </div>
        <div style={{display:'flex', gap:'20px', alignItems:'center', fontSize:'11px'}}>
          <span>OPERATIVE: <b style={{color:'#22c55e'}}>{u.username}</b></span>
          <span>BALANCE: <b style={{color:'#fff'}}>${u.balance?.toLocaleString()}</b></span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
            <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
            <button style={sideBtn} onClick={()=>window.location.href='/auctions'}>Live Auctions</button>
            <button style={sideBtn} onClick={()=>window.location.href='/company'}>Corporate Suite</button>
            <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Contracts</button>
            <button style={sideBtn} onClick={()=>window.location.href='/conquest'}>Conquest</button>
            <button style={sideBtn} onClick={()=>window.location.href='/community'}>Community Hub</button>
            <button style={sideBtn} onClick={()=>window.location.href='/contact'}>Contact Board</button>
            <button style={sideBtn} onClick={()=>window.location.href='/invoices'}>Corporate Invoices</button>
          </div>
          <div>
            <button style={{...sideBtn, color:'#ef4444'}} onClick={handleLogout}><LogOut size={16}/> Logout</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Operator Command Center</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 35px'}}>
              WELCOME BACK, {u.username?.toUpperCase()}. MONITOR YOUR ASSETS, EXECUTE TRANSACTIONS, AND OVERSEE NETWORK OPERATIONS.
            </p>

            {/* STATS GRID */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'20px', marginBottom:'40px' }}>
              <div onClick={()=>window.location.href='/company'} style={{ background:'rgba(30,30,30,0.9)', padding:'25px', borderLeft:'5px solid #22c55e', borderRadius:'4px', cursor:'pointer' }}>
                <span style={{fontSize:'11px', color:'#888', fontWeight:'bold', display:'block', marginBottom:'5px'}}>REGISTERED COMPANIES</span>
                <span style={{fontSize:'28px', fontWeight:'bold', color:'#fff'}}>{stats.companiesCount}</span>
              </div>
              <div onClick={()=>window.location.href='/auctions'} style={{ background:'rgba(30,30,30,0.9)', padding:'25px', borderLeft:'5px solid #4a7ab5', borderRadius:'4px', cursor:'pointer' }}>
                <span style={{fontSize:'11px', color:'#888', fontWeight:'bold', display:'block', marginBottom:'5px'}}>ACTIVE AUCTIONS</span>
                <span style={{fontSize:'28px', fontWeight:'bold', color:'#fff'}}>{stats.auctionsCount}</span>
              </div>
              <div onClick={()=>window.location.href='/contracts'} style={{ background:'rgba(30,30,30,0.9)', padding:'25px', borderLeft:'5px solid #f59e0b', borderRadius:'4px', cursor:'pointer' }}>
                <span style={{fontSize:'11px', color:'#888', fontWeight:'bold', display:'block', marginBottom:'5px'}}>OPEN CONTRACTS</span>
                <span style={{fontSize:'28px', fontWeight:'bold', color:'#fff'}}>{stats.contractsCount}</span>
              </div>
              <div onClick={()=>window.location.href='/community'} style={{ background:'rgba(30,30,30,0.9)', padding:'25px', borderLeft:'5px solid #ec4899', borderRadius:'4px', cursor:'pointer' }}>
                <span style={{fontSize:'11px', color:'#888', fontWeight:'bold', display:'block', marginBottom:'5px'}}>NETWORK MEMBERS</span>
                <span style={{fontSize:'28px', fontWeight:'bold', color:'#fff'}}>{stats.membersCount}</span>
              </div>
            </div>

            {/* QUICK ACTIONS BANNER */}
            <div style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'6px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <h3 style={{margin:'0 0 5px 0', fontSize:'20px'}}>Ready to expand your agricultural footprint?</h3>
                <p style={{margin:0, fontSize:'13px', color:'#aaa'}}>Check available territories for regional conquest or list surplus goods on the auction block.</p>
              </div>
              <div style={{display:'flex', gap:'15px'}}>
                <button onClick={()=>window.location.href='/conquest'} style={{padding:'12px 20px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}>
                  Conquest Map
                </button>
                <button onClick={()=>window.location.href='/auctions'} style={{padding:'12px 20px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px'}}>
                  Auctions
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
