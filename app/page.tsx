"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
import { Shield, AlertCircle, Loader2, Radio, Clock } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  // Only fetch data AFTER a successful login
  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const { data, error } = await sb.from('tactical_news').select('*').order('created_at', { ascending: false }).limit(5);
        if (error) {
          console.error("DATA_ACCESS_DENIED: Check RLS Policies");
        } else {
          setNews(data || []);
        }
      };
      fetchData();
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Authenticating using the verified credentials
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.status === 401 ? "UPLINK DENIED: KEY MISMATCH" : "ACCESS DENIED: INVALID CREDENTIALS");
      }
    } catch (err) {
      setErrorMsg("CRITICAL CONNECTION FAILURE");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div style={{ background: '#000', height: '100vh' }} />;

  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000', fontFamily: 'monospace' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80")', 
          backgroundSize: 'cover', opacity: 0.3 // Backdrop from reference
        }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleLogin} style={{ width: '380px', padding: '40px', backgroundColor: 'rgba(5, 5, 5, 0.98)', border: '1px solid #d4af3722', textAlign: 'center' }}>
            <Shield size={32} color="#d4af37" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '10px', marginBottom: '35px' }}>DAISY HILL SECURE UPLINK</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px', outline: 'none' }} />
              <input type="password" placeholder="ACCESS KEY" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px', outline: 'none' }} />
              {errorMsg && <div style={{ color: '#ff4444', fontSize: '9px', padding: '10px', border: '1px solid #ff444433' }}>{errorMsg}</div>}
              <button type="submit" disabled={loading} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                {loading ? "AUTHENTICATING..." : "INITIATE ACCESS"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ letterSpacing: '10px', color: '#d4af37' }}>UPLINK ACTIVE</h1>
        <p style={{ color: '#444', marginTop: '10px' }}>LOGGED IN AS: {session.user.email}</p>
      </div>

      <div style={{ width: '300px', borderLeft: '1px solid #111', padding: '20px', background: '#000' }}>
        <div style={{ fontSize: '10px', color: '#d4af37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio size={12} /> LIVE_INTEL
        </div>
        {news.map((item) => (
          <div key={item.id} style={{ marginBottom: '15px', paddingLeft: '10px', borderLeft: '1px solid #222' }}>
            <div style={{ fontSize: '8px', color: '#444' }}><Clock size={8} style={{display:'inline'}}/> {new Date(item.created_at).toLocaleTimeString()}</div>
            <div style={{ fontSize: '10px', color: '#aaa' }}>{item.headline}</div>
          </div>
        ))}
        <button onClick={() => sb.auth.signOut()} style={{ marginTop: '20px', width: '100%', background: 'none', border: '1px solid #333', color: '#555', padding: '8px', fontSize: '9px', cursor: 'pointer' }}>TERMINATE</button>
      </div>
    </div>
  );
}
