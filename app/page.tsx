"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal } from 'lucide-react';

// Dynamic imports to prevent build errors with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const { data: mapData } = await sb.from('montana_conquest').select('*');
        if (mapData) setBoxes(mapData);
        const { data: pData } = await sb.from('players').select('*').eq('id', session.user.id).single();
        if (pData) setPlayer(pData);
      };
      fetchData();
    }
  }, [session]);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) alert("ACCESS DENIED: " + error.message);
    setLoading(false);
  };

  if (!mounted || !L) return <div style={{ background: '#000', height: '100vh' }} />;

  // --- LOGGED OUT VIEW ---
  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000', fontFamily: 'monospace' }}>
        
        {/* MOVING MOUNTAIN BACKGROUND */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%', 
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          opacity: 0.5,
          animation: 'panBackground 80s linear infinite'
        }} />

        {/* SCANLINE OVERLAY */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px', zIndex: 1, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '360px', padding: '45px', backgroundColor: 'rgba(5, 5, 5, 0.9)', border: '1px solid #d4af3733', textAlign: 'center', backdropFilter: 'blur(3px)', boxShadow: '0 0 50px rgba(0,0,0,0.8)' }}>
            <Shield size={42} color="#d4af37" style={{ marginBottom: '25px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '12px', marginBottom: '35px' }}>DAISY HILL SECURE UPLINK</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', fontSize: '11px' }} />
              <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '12px', fontSize: '11px' }} />
              <button onClick={handleLogin} disabled={loading} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', border: 'none', letterSpacing: '2px', cursor: 'pointer' }}>
                {loading ? "INITIALIZING..." : "INITIATE ACCESS"}
              </button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes panBackground {
            0% { transform: translateX(0); }
            50% { transform: translateX(-25%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }

  // --- LOGGED IN VIEW ---
  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <div style={{ flex: 1, position: 'relative' }}>
        <header style={{ position: 'absolute', top: 0, width: '100%', height: '50px', background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #d4af3722', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={18} style={{ color: '#d4af37' }} />
            <span style={{ letterSpacing: '2px', fontSize: '10px' }}>MONTANA 122 // ACTIVE</span>
          </div>
          <button onClick={() => sb.auth.signOut()} style={{ background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '4px 10px', fontSize: '9px', cursor: 'pointer' }}>DISCONNECT</button>
        </header>

        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          {boxes.map((box, i) => (
            <Rectangle key={i} bounds={[[220 - (Math.floor(i/11)*35), -350 + ((i%11)*55)], [220 - ((Math.floor(i/11)+1)*35), -350 + (((i%11)+1)*55)]]} pathOptions={{ color: box.status === 'captured' ? '#22c55e' : '#ff4444', fillOpacity: 0.15 }} />
          ))}
        </MapContainer>
      </div>

      <div style={{ width: '350px', background: '#000', borderLeft: '1px solid #222', padding: '20px' }}>
        <div style={{ border: '1px solid #d4af3744', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: '#d4af37' }}>OPERATIVE: {player?.email?.split('@')[0].toUpperCase()}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '10px' }}>${player?.balance?.toLocaleString() || "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
