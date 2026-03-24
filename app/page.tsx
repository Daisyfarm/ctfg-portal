"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Wallet, Trophy, ShoppingCart, Box, MessageSquare, Send, Radar } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualTerminal() {
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<'finance' | 'leaderboard' | 'store' | 'inventory' | 'chat' | 'admin'>('finance');
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
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

  if (!session) {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', fontFamily: 'monospace' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.4 }}>
          <source src="/tactical-background.mp4" type="video/mp4" />
        </video>

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '350px', border: '1px solid #d4af3733', padding: '40px', background: 'rgba(5, 5, 5, 0.9)', textAlign: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
            <Shield size={40} color="#d4af37" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#d4af37', letterSpacing: '3px', fontSize: '12px', marginBottom: '30px' }}>DAISY HILL SECURE UPLINK</h2>
            <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', marginBottom: '10px' }} />
            <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', marginBottom: '20px' }} />
            <button onClick={() => sb.auth.signInWithPassword({ email, password })} style={{ width: '100%', background: '#d4af37', color: '#000', padding: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>AUTHORIZE ACCESS</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          {boxes.map((box, i) => (
            <Rectangle key={box.id || i} bounds={[[220 - (Math.floor(i/11)*35), -350 + ((i%11)*55)], [220 - ((Math.floor(i/11)+1)*35), -350 + (((i%11)+1)*55)]]} pathOptions={{ color: box.status === 'captured' ? '#22c55e' : '#ff4444', fillOpacity: 0.15 }} />
          ))}
        </MapContainer>
      </div>
      <div style={{ width: '400px', background: '#000', borderLeft: '1px solid #222', padding: '20px' }}>
        <div style={{ border: '1px solid #d4af3744', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: '#d4af37' }}>{player?.rank || 'OPERATIVE'} BALANCE</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>${player?.balance?.toLocaleString() || "0.00"}</div>
        </div>
      </div>
    </div>
  );
}
