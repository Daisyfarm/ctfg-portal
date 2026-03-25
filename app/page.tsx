"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
import { Shield, Radio, Clock, LogOut } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  // Initialize session and listener
  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // Fetch intel once session is active
  useEffect(() => {
    if (session && news.length === 0) {
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
  }, [session, news.length]);

  if (!mounted) return null;

  // Login state check
  if (!session) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#d4af37', fontFamily: 'monospace', letterSpacing: '2px' }}>AWAITING AUTHENTICATION...</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      {/* Main Terminal Area */}
      <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ letterSpacing: '12px', color: '#d4af37', marginBottom: '10px' }}>UPLINK_ESTABLISHED</h1>
        <div style={{ width: '40px', height: '2px', background: '#d4af37', marginBottom: '20px' }} />
        <p style={{ color: '#444', fontSize: '12px' }}>OPERATIVE: {session.user.email}</p>
        
        <button 
          onClick={() => sb.auth.signOut()} 
          style={{ marginTop: '40px', background: 'none', border: '1px solid #222', color: '#444', padding: '10px 20px', fontSize: '10px', cursor: 'pointer', width: 'fit-content' }}
        >
          TERMINATE SESSION
        </button>
      </div>

      {/* Live Intel Sidebar */}
      <div style={{ width: '350px', borderLeft: '1px solid #111', padding: '30px', background: '#020202' }}>
        <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '2px' }}>
          <Radio size={14} /> LIVE_INTELLIGENCE
        </div>
        
        {news.length === 0 ? (
          <p style={{ color: '#222', fontSize: '10px', fontStyle: 'italic' }}>AWAITING DATA DEPLOYMENT...</p>
        ) : (
          news.map((item) => (
            <div key={item.id} style={{ marginBottom: '25px', paddingLeft: '12px', borderLeft: '1px solid #d4af3733' }}>
              <div style={{ fontSize: '8px', color: '#444', marginBottom: '4px' }}>
                <Clock size={10} style={{ display: 'inline', marginRight: '5px' }} /> 
                {new Date(item.created_at).toLocaleTimeString()}
              </div>
              <div style={{ fontSize: '11px', color: '#ccc', lineHeight: '1.4' }}>{item.headline}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
