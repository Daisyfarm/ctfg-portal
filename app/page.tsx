"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "./db/supabase"; // Verified path
import { Shield, Truck, Globe, BarChart3, Trophy, Radio, Clock, HardDrive, Zap } from 'lucide-react';

export default function AegisTerminal() {
  const [view, setView] = useState('FLEET');
  const [session, setSession] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const balance = 9400000;

  // Fleet Data
  const fleet = [
    { id: 'EU-UNIT-01', name: 'Euro-Cab Vanguard', armor: 85, img: 'https://images.unsplash.com/photo-1586191128574-32f6405c8936?q=80&w=800' },
    { id: 'US-UNIT-01', name: 'US Heavy Hauler', armor: 40, img: 'https://images.unsplash.com/photo-1591768793355-74d7ef7e9c95?q=80&w=800' }
  ];

  // Auth & Intelligence Sync
  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchIntel = async () => {
        const { data, error } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false });
        if (!error) setNews(data || []);
      };
      fetchIntel();
    }
  }, [session]);

  if (!session) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#d4af37', fontFamily: 'monospace', letterSpacing: '4px', fontSize: '12px' }}>AWAITING_AUTHENTICATION...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'monospace', display: 'flex' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '70px', borderRight: '1px solid #111', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 0', gap: '25px', background: '#050505' }}>
        <Shield size={24} color="#d4af37" />
        <button onClick={() => setView('COMMAND')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: view === 'COMMAND' ? '#d4af37' : '#222' }}><Globe size={22} /></button>
        <button onClick={() => setView('FLEET')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: view === 'FLEET' ? '#d4af37' : '#222' }}><Truck size={22} /></button>
        <button onClick={() => setView('MARKET')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: view === 'MARKET' ? '#d4af37' : '#222' }}><BarChart3 size={20} /></button>
        <button onClick={() => setView('RANK')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: view === 'RANK' ? '#d4af37' : '#222' }}><Trophy size={20} /></button>
      </aside>

      {/* MAIN VIEW */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '20px 40px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020202' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HardDrive size={14} color="#d4af37" />
            <span style={{ fontSize: '10px', color: '#666', letterSpacing: '2px' }}>AEGIS_INTEL // {view}</span>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>BANK: ${balance.toLocaleString()}</span>
        </header>

        <div style={{ flex: 1, display: 'flex' }}>
          <main style={{ flex: 1, padding: '40px' }}>
            {view === 'FLEET' ? (
              <div style={{ display: 'flex', gap: '25px' }}>
                {fleet.map(u => (
                  <div key={u.id} style={{ width: '320px', background: '#050505', border: '1px solid #111' }}>
                    <img src={u.img} style={{ width: '100%', height: '160px', objectFit: 'cover', opacity: 0.7 }} />
                    <div style={{ padding: '20px' }}>
                      <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}>{u.id}</div>
                      <div style={{ fontSize: '10px', margin: '5px 0 15px', color: '#888' }}>{u.name}</div>
                      <div style={{ height: '2px', background: '#111' }}>
                        <div style={{ width: `${u.armor}%`, height: '100%', background: '#d4af37' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ border: '1px solid #d4af37', padding: '30px', color: '#d4af37' }}>
                [UPLINK_STABLE] // {view} DATA ACTIVE
              </div>
            )}
          </main>

          {/* SIDEBAR INTELLIGENCE */}
          <div style={{ width: '300px', borderLeft: '1px solid #111', padding: '30px', background: '#020202' }}>
            <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio size={14} /> LIVE_INTEL
            </div>
            {news.map((item) => (
              <div key={item.id} style={{ marginBottom: '20px', paddingLeft: '10px', borderLeft: '1px solid #d4af3733' }}>
                <div style={{ fontSize: '8px', color: '#444', marginBottom: '4px' }}>
                  <Clock size={10} style={{ display: 'inline', marginRight: '5px' }} />
                  {new Date(item.created_at).toLocaleTimeString()}
                </div>
                <div style={{ fontSize: '11px', color: '#ccc' }}>{item.headline}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
