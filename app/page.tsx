"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Wallet, Trophy, ShoppingCart, Box, MessageSquare, Send, Radar, LogOut } from 'lucide-react';

// Standard Leaflet Imports
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<'finance' | 'leaderboard' | 'store' | 'inventory' | 'chat' | 'admin'>('finance');
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const refreshAll = async () => {
    if (!session) return;
    const { data: mapData } = await sb.from('montana_conquest').select('*, players(email)');
    if (mapData) setBoxes(mapData);
    const { data: pData } = await sb.from('players').select('*').eq('id', session.user.id).single();
    if (pData) setPlayer(pData);
  };

  useEffect(() => { if (session) refreshAll(); }, [session]);

  if (!mounted || !L) return <div style={{background:'#000', height:'100vh'}} />;

  // --- STATE 1: THE ANIMATED LOGIN SCREEN ---
  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
        {/* THE MOVING IMAGE (VIDEO) */}
        <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.4 }}>
          <source src="/tactical-background.mp4" type="video/mp4" />
        </video>

        {/* CRT SCANLINE OVERLAY */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px', zIndex: 1, pointerEvents: 'none' }} />

        {/* LOGIN BOX (Matched to your screenshot) */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '360px', padding: '45px', backgroundColor: 'rgba(5, 5, 5, 0.9)', border: '1px solid #d4af3733', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
            <Shield size={42} color="#d4af37" style={{ marginBottom: '25px' }} />
            <h2 style={{ color: '#d4af37', fontFamily: 'monospace', letterSpacing: '4px', fontSize: '13px', marginBottom: '35px' }}>DAISY HILL SECURE UPLINK</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '14px', fontFamily: 'monospace' }} />
              <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '14px', fontFamily: 'monospace' }} />
              <button onClick={() => sb.auth.signInWithPassword({ email, password })} style={{ background: '#d4af37', color: '#000', padding: '14px', fontWeight: 'bold', cursor: 'pointer', border: 'none', fontFamily: 'monospace', letterSpacing: '2px' }}>INITIATE ACCESS</button>
            </div>
            <p style={{ fontSize: '9px', color: '#444', marginTop: '25px', letterSpacing: '1px' }}>System monitored by Daisy Hill Security</p>
          </div>
        </div>
      </div>
    );
  }

  // --- STATE 2: THE TACTICAL DASHBOARD ---
  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div style={{ flex: 1, position: 'relative' }}>
        <header style={{ position: 'absolute', top:0, width:'100%', height:'50px', background:'rgba(0,0,0,0.8)', zIndex:2000, display:'flex', alignItems:'center', padding:'0 20px', borderBottom:'1px solid #d4af3722', justifyContent: 'space-between' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={18} style={{ color: '#d4af37' }} />
              <span style={{ letterSpacing:'2px', fontSize:'10px' }}>MONTANA 122 // ACTIVE</span>
           </div>
           <button onClick={() => sb.auth.signOut()} style={{ background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '4px 10px', fontSize: '9px', cursor: 'pointer' }}>DISCONNECT</button>
        </header>
        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          {boxes.map((box, i) => (
            <Rectangle key={box.id || i} bounds={[[220 - (
