"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
import { Shield, AlertCircle, Loader2, Radio, Clock, LogOut } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);

  // 1. Handle Mounting and Session
  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // 2. Controlled Fetch (Prevents the infinite loop crash)
  useEffect(() => {
    if (session && news.length === 0) {
      const fetchNews = async () => {
        const { data, error } = await sb
          .from('tactical_news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error("DATA_ACCESS_DENIED: Check RLS Policies");
        } else {
          setNews(data || []);
        }
      };
      fetchNews();
    }
  }, [session, news.length]); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        // Handle the 401/403 errors specifically
        setErrorMsg(error.status === 401 ? "INVALID OPERATIVE KEY" : "CONNECTION REFUSED");
      }
    } catch (err) {
      setErrorMsg("CRITICAL UPLINK FAILURE");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div style={{ background: '#000', height: '100vh' }} />;

  // --- LOGIN SCREEN ---
  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000', fontFamily: 'monospace' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80")', 
          backgroundSize: 'cover', opacity: 0.2
        }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleLogin} style={{ width: '380px', padding: '40px', backgroundColor: 'rgba(5, 5, 5, 0.95)', border: '1px solid #d4af3722', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
            <Shield size={32} color="#d4af37" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '10px', marginBottom: '35px' }}>DAISY HILL SECURE UPLINK</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px', outline: 'none' }} />
              <input type="password" placeholder="ACCESS KEY" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px', outline: 'none' }} />
              {errorMsg && <div style={{ color: '#ff4444', fontSize: '9px', padding: '10px', background: 'rgba(255,0,0,0.05)', border: '1px solid #ff444433' }}>{errorMsg}</div>}
              <button type="submit" disabled={loading} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
                {loading ? "VERIFYING..." : "INITIATE ACCESS"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- LOGGED IN TERMINAL ---
  return (
    <div style={{ height: '100vh', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ letterSpacing: '12px', color: '#d4af37', marginBottom: '10px' }}>UPLINK_ESTABLISHED</h1>
        <div style={{ width: '40px', height: '2px', background: '#d4af37', marginBottom: '20px' }} />
        <p style={{ color: '#444', fontSize: '12px' }}>WELCOME BACK, OPERATIVE</p>
        <p style={{ color: '#888', fontSize: '11px', marginTop: '5px' }}>{session.user.email}</p>
        
        <button 
          onClick={() => sb.auth.signOut()} 
          style={{ marginTop: '40px', background: 'none', border: '1px solid #222', color: '#444', padding: '10px 20px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}
        >
          <LogOut size={14} /> TERMINATE SESSION
        </button>
      </div>

      {/* Sidebar News Feed */}
      <div style={{ width: '350px', borderLeft: '1px solid #111', padding: '30px', background: '#020202' }}>
        <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '3px' }}>
          <Radio size={14} className="pulse" /> LIVE_INTELLIGENCE
        </div>
        
        {news.length === 0 ? (
          <div style={{ color: '#222', fontSize: '10px italic' }}>NO NEW INTEL DEPLOYED...</div>
        ) : (
          news.map((item) => (
            <div key={item.id} style={{ marginBottom: '25px', paddingLeft: '15px', borderLeft: '1px solid #d4af3733' }}>
              <div style={{ fontSize: '9px', color: '#444', marginBottom: '5px' }}>
                <Clock size={10} style={{ display: 'inline', marginRight: '5px' }} /> 
                {new Date(item.created_at).toLocaleTimeString()}
              </div>
              <div style={{ fontSize: '11px', color: '#ccc', lineHeight: '1.4' }}>{item.headline}</div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}
