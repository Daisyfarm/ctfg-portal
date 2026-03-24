"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
import { Shield, Radio, Activity, Terminal, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Tactical News Data
  const [news] = useState([
    { id: 1, headline: "ENCRYPTED UPLINK STABILIZED", type: "SYSTEM" },
    { id: 2, headline: "MOUNTAIN SECTOR 7-B SCANNING...", type: "INTEL" },
    { id: 3, headline: "OPERATIVE 123 SIGNAL DETECTED", type: "GEO" }
  ]);

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
      setErrorMsg("CRITICAL UPLINK FAILURE: CHECK API KEYS");
    }
    setLoading(false);
  };

  if (!mounted) return <div style={{ background: '#000', height: '100vh' }} />;

  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000', fontFamily: 'monospace' }}>
        {/* Panning Background */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '200%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80")', 
          backgroundSize: 'cover', opacity: 0.3,
          animation: 'panBackground 90s linear infinite'
        }} />
        
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '380px', padding: '40px', backgroundColor: 'rgba(5, 5, 5, 0.98)', border: '1px solid #d4af3722', textAlign: 'center' }}>
            <Shield size={32} color="#d4af37" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '3px', fontSize: '10px', marginBottom: '30px' }}>DAISY HILL SECURE UPLINK</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px', outline: 'none' }} />
              <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px', outline: 'none' }} />
              
              {errorMsg && (
                <div style={{ color: '#ff4444', fontSize: '9px', padding: '10px', background: 'rgba(255,0,0,0.05)', border: '1px solid #ff444433', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={12} /> {errorMsg}
                </div>
              )}

              <button onClick={handleLogin} disabled={loading} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '1px' }}>
                {loading ? "AUTHENTICATING..." : "INITIATE ACCESS"}
              </button>
            </div>
          </div>
        </div>
        <style jsx global>{` @keyframes panBackground { 0% { transform: translateX(0); } 50% { transform: translateX(-15%); } 100% { transform: translateX(0); } } `}</style>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      {/* Left Sidebar - Ops Status */}
      <div style={{ width: '80px', borderRight: '1px solid #111', display: 'flex', flexDirection: 'column', alignItems: 'center', py: '20px', gap: '30px', paddingTop: '20px' }}>
         <Activity size={20} color="#d4af37" />
         <div style={{ writingMode: 'vertical-rl', fontSize: '9px', color: '#444', letterSpacing: '4px' }}>OPERATIVE_ONLINE</div>
      </div>

      {/* Main Tactical Feed */}
      <div style={{ flex: 1, borderRight: '1px solid #111', padding: '20px', display: 'flex', flexDirection: 'column' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', marginBottom: '20px' }}>
            <Terminal size={16} /> <span style={{ letterSpacing: '2px', fontSize: '10px' }}>MAIN_TACTICAL_DISPLAY</span>
         </div>
         <div style={{ flex: 1, border: '1px solid #111', background: '#020202', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', opacity: 0.1 }}>
              <Shield size={80} />
            </div>
         </div>
      </div>

      {/* Right Sidebar - News Wire */}
      <div style={{ width: '300px', background: '#000', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ border: '1px solid #d4af3711', padding: '15px', flex: 1, background: 'linear-gradient(180deg, #080808 0%, #000 100%)' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #d4af3722', paddingBottom: '12px', marginBottom: '20px' }}>
            <Radio size={12} className="flicker" /> LIVE_INTEL_WIRE
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {news.map((item) => (
              <div key={item.id} style={{ borderLeft: '2px solid #d4af3733', paddingLeft: '12px' }}>
                <div style={{ fontSize: '8px', color: '#444', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={8} /> {item.type} // 11:33 PM
                </div>
                <div style={{ fontSize: '10px', color: '#aaa', lineHeight: '1.4' }}>{item.headline}</div>
              </div>
            ))}
          </div>
        </div>
        
        <button onClick={() => sb.auth.signOut()} style={{ background: 'none', border: '1px solid #222', color: '#444', padding: '10px', fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          TERMINATE_UPLINK <ChevronRight size={10} />
        </button>
      </div>
      <style jsx global>{` .flicker { animation: pulse 2s infinite; } @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } } `}</style>
    </div>
  );
}
