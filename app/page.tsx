"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
import { Shield, Radio, Activity, Terminal, AlertCircle, Clock, Map as MapIcon } from 'lucide-react';

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Tactical Intel Feed
  const [intel] = useState([
    { id: 1, msg: "UPLINK STABILIZED: SECURE CHANNEL 122", time: "23:33" },
    { id: 2, msg: "SECTOR 7-B: MOUNTAIN SCAN COMPLETE", time: "23:34" },
    { id: 3, msg: "OPERATIVE SIG: adsgarden... DETECTED", time: "23:35" }
  ]);

  useEffect(() => {
    setMounted(true);
    //
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
      setErrorMsg("UPLINK FAILURE: CHECK SUPABASE KEYS");
    }
    setLoading(false);
  };

  if (!mounted) return <div style={{ background: '#000', height: '100vh' }} />;

  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000', fontFamily: 'monospace' }}>
        {/* */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '200%', height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80")', 
          backgroundSize: 'cover', opacity: 0.3,
          animation: 'panBackground 100s linear infinite'
        }} />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '380px', padding: '40px', backgroundColor: 'rgba(5, 5, 5, 0.98)', border: '1px solid #d4af3722', textAlign: 'center' }}>
            <Shield size={32} color="#d4af37" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '10px', marginBottom: '30px' }}>DAISY HILL SECURE UPLINK</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px' }} />
              <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#080808', border: '1px solid #222', color: '#fff', padding: '12px', fontSize: '11px' }} />
              {errorMsg && <div style={{ color: '#ff4444', fontSize: '9px', padding: '8px', border: '1px solid #ff444422' }}><AlertCircle size={10} style={{display:'inline', marginRight:'5px'}}/>{errorMsg}</div>}
              <button onClick={handleLogin} disabled={loading} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px' }}>
                {loading ? "ESTABLISHING..." : "INITIATE ACCESS"}
              </button>
            </div>
          </div>
        </div>
        <style jsx global>{` @keyframes panBackground { 0% { transform: translateX(0); } 50% { transform: translateX(-20%); } 100% { transform: translateX(0); } } `}</style>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      {/* Center Display */}
      <div style={{ flex: 1, borderRight: '1px solid #111', padding: '20px', display: 'flex', flexDirection: 'column' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', marginBottom: '20px' }}>
            <MapIcon size={16} /> <span style={{ letterSpacing: '2px', fontSize: '10px' }}>TACTICAL_MAP_OVERLAY</span>
         </div>
         <div style={{ flex: 1, border: '1px solid #111', background: '#010101', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05 }}>
               <Shield size={120} />
            </div>
         </div>
      </div>

      {/* Intel Sidebar */}
      <div style={{ width: '320px', background: '#000', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ border: '1px solid #d4af3722', padding: '15px', flex: 1, background: 'rgba(10,10,10,0.5)' }}>
          <div style={{ fontSize: '10px', color: '#d4af37', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #d4af3711', paddingBottom: '12px', marginBottom: '20px' }}>
            <Radio size={12} className="flicker" /> LIVE_INTEL_WIRE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {intel.map((item) => (
              <div key={item.id} style={{ borderLeft: '2px solid #d4af3722', paddingLeft: '12px' }}>
                <div style={{ fontSize: '8px', color: '#444', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={8} /> {item.time}
                </div>
                <div style={{ fontSize: '10px', color: '#aaa' }}>{item.msg}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => sb.auth.signOut()} style={{ background: 'none', border: '1px solid #333', color: '#555', padding: '10px', fontSize: '9px', cursor: 'pointer' }}>DISCONNECT</button>
      </div>
      <style jsx global>{` .flicker { animation: pulse 2s infinite; } @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } } `}</style>
    </div>
  );
}
