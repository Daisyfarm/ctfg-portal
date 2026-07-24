"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "./db/supabase"; 
import { Shield, Truck, Globe, BarChart3, Trophy, Radio, Clock, HardDrive, Zap, Activity } from 'lucide-react';

export default function IronDaisyTerminal() {
  const [view, setView] = useState('FLEET');
  const [session, setSession] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const balance = 9400000;

  // Fleet Assets / Equipment
  const fleet = [
    { 
      id: 'UNIT-01', 
      name: 'Euro-Cab Vanguard', 
      armor: 85, 
      img: 'https://images.unsplash.com/photo-1586191128574-32f6405c8936?q=80&w=800' 
    },
    { 
      id: 'UNIT-02', 
      name: 'US Heavy Hauler', 
      armor: 40, 
      img: 'https://images.unsplash.com/photo-1591768793355-74d7ef7e9c95?q=80&w=800' 
    }
  ];

  // Auth & Intelligence Sync
  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchIntel = async () => {
        const { data, error } = await sb
          .from('tactical_news')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error) {
          setNews(data || []);
        } else {
          console.error("UPLINK_ERROR:", error.message);
        }
      };
      fetchIntel();
    }
  }, [session]);

  if (!mounted) return null;

  // Login Barrier
  if (!session) {
    return (
      <div style={{ height: '100vh', background: '#0b0f19', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', background: '#111827', padding: '40px', borderRadius: '12px', border: '1px solid #1f2937', width: '380px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ marginBottom: '15px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
          <h1 style={{ color: '#fff', fontFamily: 'monospace', fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px', margin: '0 0 5px 0' }}>
            IRON DAISY <span style={{ color: '#22c55e' }}>AGRI</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '25px', fontFamily: 'monospace' }}>Operator Login</p>
          
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px', fontFamily: 'monospace' }}>Email Address</label>
            <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '10px', background: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', fontSize: '12px', outline: 'none' }} />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px', fontFamily: 'monospace' }}>Password</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '10px', background: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', fontSize: '12px', outline: 'none' }} />
          </div>

          <button onClick={() => alert("Please connect authentication handler")} style={{ width: '100%', padding: '12px', background: '#22c55e', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontFamily: 'monospace', marginBottom: '15px' }}>
            Login to Network
          </button>
          
          <p style={{ color: '#6b7280', fontSize: '11px', fontFamily: 'monospace', margin: 0 }}>
            Need an account? Register here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace', display: 'flex' }}>
      
      {/* GLOBAL NAVIGATION */}
      <aside style={{ width: '70px', borderRight: '1px solid #111', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 0', gap: '25px', background: '#050505' }}>
        <Shield size={24} color="#d4af37" />
        {[
          { id: 'COMMAND', icon: <Globe size={22} /> },
          { id: 'FLEET', icon: <Truck size={22} /> },
          { id: 'MARKET', icon: <BarChart3 size={20} /> },
          { id: 'RANK', icon: <Trophy size={20} /> }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setView(item.id)}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              color: view === item.id ? '#d4af37' : '#222',
              transition: '0.2s'
            }}
          >
            {item.icon}
          </button>
        ))}
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* HEADER */}
        <header style={{ padding: '20px 40px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020202' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HardDrive size={14} color="#d4af37" />
            <span style={{ fontSize: '10px', color: '#444', letterSpacing: '2px' }}>IRON_DAISY_AGRI // {view}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>${balance.toLocaleString()}</div>
            <div style={{ fontSize: '8px', color: '#444' }}>OPERATIVE: {session.user.email}</div>
          </div>
        </header>

        <div style={{ flex: 1, display: 'flex' }}>
          {/* MAIN DATA MODULE */}
          <main style={{ flex: 1, padding: '40px' }}>
            {view === 'FLEET' ? (
              <div style={{ display: 'flex', gap: '25px' }}>
                {fleet.map(u => (
                  <div key={u.id} style={{ width: '320px', background: '#050505', border: '1px solid #111' }}>
                    <img src={u.img} style={{ width: '100%', height: '160px', objectFit: 'cover', opacity: 0.6 }} />
                    <div style={{ padding: '20px' }}>
                      <div style={{ color: '#d4af37', fontSize: '11px', fontWeight: 'bold' }}>{u.id}</div>
                      <div style={{ fontSize: '9px', margin: '5px 0 15px', color: '#666' }}>{u.name}</div>
                      <div style={{ height: '2px', background: '#111' }}>
                        <div style={{ width: `${u.armor}%`, height: '100%', background: '#d4af37' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ border: '1px solid #d4af3733', padding: '30px', color: '#d4af37' }}>
                <Zap size={20} style={{ marginBottom: '15px' }} />
                <br />
                [IRON_DAISY_OK] // {view}_DATA_STREAM_ACTIVE
              </div>
            )}
          </main>

          {/* LIVE INTEL SIDEBAR */}
          <div style={{ width: '320px', borderLeft: '1px solid #111', padding: '30px', background: '#020202' }}>
            <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px' }}>
              <Radio size={14} /> LIVE_INTELLIGENCE
            </div>
            {news.length === 0 ? (
              <p style={{ color: '#222', fontSize: '9px' }}>AWAITING DATA...</p>
            ) : (
              news.map((item) => (
                <div key={item.id} style={{ marginBottom: '25px', paddingLeft: '12px', borderLeft: '1px solid #d4af3733' }}>
                  <div style={{ fontSize: '8px', color: '#444', marginBottom: '6px' }}>
                    <Clock size={10} style={{ display: 'inline', marginRight: '5px' }} />
                    {new Date(item.created_at).toLocaleTimeString()}
                  </div>
                  <div style={{ fontSize: '11px', color: '#ccc', lineHeight: '1.4' }}>{item.headline}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
