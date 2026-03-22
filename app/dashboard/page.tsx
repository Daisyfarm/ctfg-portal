"use client";

import { useEffect, useState } from 'react';
import { sb } from '../../lib/supabase';
import { 
  Wallet, Tractor, Send, Map, Clock, Briefcase, Landmark, LogOut, 
  Cloud, ShieldCheck, TrendingUp, FileCheck, UserCheck, Megaphone, 
  Trophy, Radio, Star, LifeBuoy, BarChart3, BookOpen, Wheat, Activity, Truck, Wrench
} from 'lucide-react';

interface Profile {
  id: string;
  username: string;
  balance: number;
  rank: string;
}

interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  type: string;
}

interface News {
  message: string;
}

interface Dispatch {
  sender: string;
  message: string;
}

interface Company {
  logo_url: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [news, setNews] = useState<string>('');
  const [radio, setRadio] = useState<Dispatch>({ sender: 'Dispatch', message: 'Standby' });
  const [company, setCompany] = useState<Company | null>(null);
  const [temperature, setTemperature] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return window.location.href = '/';

      const { data: profileData } = await sb
        .from<Profile>('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const { data: txData } = await sb
        .from<Transaction>('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: newsData } = await sb
        .from<News>('news')
        .select('message')
        .order('created_at', { ascending: false })
        .limit(1);

      const { data: radioData } = await sb
        .from<Dispatch>('dispatch')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      const { data: companyData } = await sb
        .from<Company>('companies')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle();

      setProfile(profileData || null);
      setTransactions(txData || []);
      setNews(newsData?.[0]?.message || 'System Active.');
      setRadio(radioData?.[0] || { sender: 'Dispatch', message: 'Standby' });
      setCompany(companyData || null);

      // Weather fetch
      const weatherRes = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current_weather=true&temperature_unit=fahrenheit'
      );
      const weatherJson = await weatherRes.json();
      setTemperature(Math.round(weatherJson.current_weather.temperature) + '°F');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (loading || !profile) return (
    <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      Syncing CTFG Network...
    </div>
  );

  const navBtnStyle = { 
    width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'5px', 
    textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'11px', borderRadius:'4px', 
    display:'flex', alignItems:'center', gap:'10px' 
  };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* Top Bar */}
      <div style={{ background:'#222', padding:'10px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'25px', alignItems:'center' }}>
          <img src="https://i.postimg.cc/KjkfJQYz/American-farmer-emblem-with-pride.png" style={{height:'40px', borderRadius:'4px'}} />
          <div style={{ display:'flex', gap:'20px', fontSize:'11px', fontWeight:'bold', color:'#888' }}>
            <span style={{color:'#fff', display:'flex', alignItems:'center', gap:'5px'}}>
              <Cloud size={14} color="#4a7ab5"/> MONTANA: {temperature || '--°F'}
            </span>
            <span onClick={()=>window.location.href='/bank'} style={{cursor:'pointer'}}>FINANCES</span>
          </div>
        </div>
        {profile.rank === 'Admin' && 
          <button onClick={()=>window.location.href='/admin'} style={{background:'#dc2626', border:'none', color:'#fff', padding:'6px 15px', fontSize:'11px', fontWeight:'bold', cursor:'pointer', borderRadius:'3px'}}>
            STAFF PANEL
          </button>
        }
      </div>

      {/* Sidebar + Content */}
      <div style={{ display:'flex', flex:1 }}>
        {/* Sidebar */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000', overflowY:'auto' }}>
          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginBottom:'10px'}}>OPERATIONS</p>
          <button style={{...navBtnStyle, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/dashboard'}><Activity size={16}/> Dashboard</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/contracts'}><Briefcase size={16}/> Field Work</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/logistics'}><Truck size={16} color="#3b82f6"/> Trucking</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/fleet'}><Tractor size={16}/> Equipment</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/map'}><Map size={16}/> Live Map</button>

          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px'}}>LEGAL & FINANCE</p>
          <button style={navBtnStyle} onClick={()=>window.location.href='/accounting'}><BarChart3 size={16}/> Accounting</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/insurance'}><ShieldCheck size={16}/> Insurance</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/permits'}><FileCheck size={16}/> Permits</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/agreements'}><UserCheck size={16}/> Agreements</button>

          <p style={{fontSize:'10px', color:'#555', fontWeight:'bold', marginTop:'20px'}}>SOCIAL</p>
          <button style={navBtnStyle} onClick={()=>window.location.href='/wiki'}><BookOpen size={16}/> Wiki</button>
          <button style={navBtnStyle} onClick={()=>window.location.href='/leaderboard'}><Trophy size={16}/> Rankings</button>

          <button style={{...navBtnStyle, background:'#1a1a1a', marginTop:'20px'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>
            <LogOut size={16}/> Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600" style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.2, position:'absolute' }} />
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px' }}>
            {/* Live Dispatch */}
            <div style={{ background:'rgba(220,38,38,0.1)', border:'1px solid #dc2626', padding:'15px', borderRadius:'4px', marginBottom:'15px', display:'flex', alignItems:'center', gap:'15px' }}>
              <Radio size={24} color="#dc2626" className="animate-pulse" />
              <div style={{ textAlign:'left' }}>
                <p style={{ margin:0, fontSize:'10px', color:'#dc2626', fontWeight:'bold' }}>LIVE DISPATCH</p>
                <p style={{ margin:0, fontSize:'14px', fontStyle:'italic' }}>
                  <span style={{color:'#aaa'}}>{radio.sender}:</span> "{radio.message}"
                </p>
              </div>
            </div>

            {/* Operator Info */}
            <div style={{ background:'rgba(0,0,0,0.85)', padding:'30px', borderRadius:'4px', width:'420px', borderLeft:'6px solid #4a7ab5', display:'flex', gap:'15px' }}>
              <div style={{flex:1}}>
                <p style={{ margin:0, fontSize:'11px', color:'#888' }}>OPERATOR</p>
                <h2 style={{ margin:'5px 0', fontSize:'24px', color:'#fff' }}>{profile.username}</h2>
                <h1 style={{ fontSize:'42px', margin:0, color:'#22c55e', fontFamily:'monospace' }}>
                  ${profile.balance?.toLocaleString()}
                </h1>
              </div>
              {company && <img src={company.logo_url} style={{width:'80px', height:'80px', objectFit:'contain', background:'#fff', padding:'5px', borderRadius:'4px'}} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
