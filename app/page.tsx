"use client";
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, AlertCircle } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message.toUpperCase());
    } catch (err) {
      setErrorMsg("UPLINK FAILURE: CHECK VERCEL ENV KEYS");
    }
    setLoading(false);
  };

  if (!mounted) return <div style={{ background: '#000', height: '100vh' }} />;

  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000', fontFamily: 'monospace' }}>
        {/* Panning Mountain Background */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '200%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80")', 
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4,
          animation: 'panBackground 80s linear infinite'
        }} />
        
        {/* Tactical Scanlines */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%)', backgroundSize: '100% 4px', zIndex: 1, pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '360px', padding: '45px', backgroundColor: 'rgba(5, 5, 5, 0.95)', border: '1px solid #d4af3733', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
            <Shield size={42} color="#d4af37" style={{ marginBottom: '25px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '10px', marginBottom: '35px' }}>DAISY HILL SECURE UPLINK</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', fontSize: '11px' }} />
              <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', fontSize: '11px' }} />
              
              {errorMsg && (
                <div style={{ color: '#ff4444', fontSize: '9px', background: 'rgba(255,0,0,0.15)', padding: '10px', border: '1px solid #ff444433' }}>
                  {errorMsg}
                </div>
              )}

              <button onClick={handleLogin} disabled={loading} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', border: 'none', letterSpacing: '2px', cursor: 'pointer' }}>
                {loading ? "ESTABLISHING..." : "INITIATE ACCESS"}
              </button>
            </div>
          </div>
        </div>
        <style jsx global>{` @keyframes panBackground { 0% { transform: translateX(0); } 50% { transform: translateX(-25%); } 100% { transform: translateX(0); } } `}</style>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Terminal size={48} color="#d4af37" />
        <h1 style={{ letterSpacing: '5px', marginTop: '20px' }}>UPLINK ESTABLISHED</h1>
        <p style={{ color: '#666', fontSize: '12px' }}>OPERATIVE: {session.user.email}</p>
        <button onClick={() => sb.auth.signOut()} style={{ marginTop: '20px', background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '10px 20px', cursor: 'pointer' }}>DISCONNECT</button>
      </div>
    </div>
  );
}
