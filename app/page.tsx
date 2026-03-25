"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
import { Shield, Radio, Clock, LogOut, Loader2 } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // Fetch news only once when session is established
  useEffect(() => {
    if (session && news.length === 0 && !newsLoading) {
      const fetchIntel = async () => {
        setNewsLoading(true);
        const { data, error } = await sb
          .from('tactical_news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("DATA_ACCESS_DENIED: Check RLS Policies", error);
        } else {
          setNews(data || []);
        }
        setNewsLoading(false);
      };
      fetchIntel();
    }
  }, [session]);

  if (!mounted) return null;

  if (!session) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#d4af37', fontFamily: 'monospace' }}>UPLINK DISCONNECTED...</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      <div style={{ flex: 1, padding: '60px' }}>
        <h1 style={{ letterSpacing: '12px', color: '#d4af37' }}>UPLINK_ESTABLISHED</h1>
        <p style={{ color: '#444', marginTop: '20px' }}>OPERATIVE: {session.user.email}</p>
        <button onClick={() => sb.auth.signOut()} style={{ marginTop: '40px', background: 'none', border: '1px solid #222', color: '#444', padding: '10px', cursor: 'pointer' }}>
          <LogOut size={14} /> TERMINATE
        </button>
      </div>

      {/* Tactical Sidebar */}
      <div style={{ width: '350px', borderLeft: '1px solid #111', padding: '30px', background: '#020202' }}>
        <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Radio size={14} /> LIVE_INTELLIGENCE
        </div>
        
        {news.length === 0 ? (
          <p style={{ color: '#222', fontSize: '10px' }}>NO NEW INTEL DEPLOYED...</p>
        ) : (
          news.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px', paddingLeft: '10px', borderLeft: '1px solid #d4af3733' }}>
              <div style={{ fontSize: '8px', color: '#444' }}><Clock size={8} /> {new Date(item.created_at).toLocaleTimeString()}</div>
              <div style={{ fontSize: '11px', color: '#ccc', marginTop: '5px' }}>{item.headline}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
