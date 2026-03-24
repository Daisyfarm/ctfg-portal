"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Lock, Activity } from 'lucide-react';

// Dynamic imports to prevent SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualTerminal() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    
    // Aesthetic boot sequence
    setTimeout(() => setAccessGranted(true), 1200);

    const getData = async () => {
      // Pulls live data using the keys you just saved in Vercel
      const { data, error } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
      if (error) console.error("Link Error:", error.message);
    };
    getData();
  }, []);

  if (!accessGranted || !mounted || !L) {
    return (
      <div style={{height:'100vh', width:'100%', background:'#000', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace'}}>
        <div style={{textAlign:'center'}}>
          <Shield style={{color:'#d4af37', marginBottom:'15px'}} size={48} className="animate-pulse" />
          <div style={{color:'#d4af37', fontSize:'10px', letterSpacing:'4px'}}>CONNECTING TO DAISY HILL...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* TOP HUD BAR */}
      <header style={{ height: '50px', borderBottom: '1px solid rgba(212,175,55,0.3)', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 2000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Terminal size={18} style={{ color: '#d4af37' }} />
          <h1 style={{ margin: 0, fontSize: '12px', letterSpacing: '2px', fontWeight: '900' }}>DAISY HILL <span style={{ color: '#d4af37' }}>TACTICAL</span></h1>
        </div>
        <div style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>
          <Activity size={12} style={{ color: '#22c55e', display: 'inline', marginRight: '5px' }} />
          STATUS: <span style={{ color: '#22c55e' }}>CONNECTED</span>
        </div>
      </header>

      <div style={{ flex: 1, position: 'relative' }}>
        {/* LIVE INTELLIGENCE OVERLAY */}
        <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 1000, width: '160px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', backdropFilter: 'blur(5px)' }}>
          <div style={{ fontSize: '9px', color: '#d4af37', marginBottom: '8px', fontWeight: 'bold' }}>LIVE INTEL</div>
          <div style={{ fontSize: '11px', fontFamily: 'monospace' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>SECURED:</span>
              <span style={{ color: '#22c55e' }}>{boxes.filter(b => b.status === 'captured').length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
              <span style={{ color: '#888' }}>PENDING:</span>
              <span style={{ color: '#ff4444' }}>{boxes.length - boxes.filter(b => b.status === 'captured').length}</span>
            </div>
          </div>
        </div>

        <MapContainer 
          center={[0, 0]} zoom={0} crs={L.CRS.Simple} 
          style={{ height: '100%', width: '100%', background: '#000' }} 
          attributionControl={false} zoomControl={false}
        >
          {/* Targets your map.png exactly */}
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          
          {boxes.map((box, i) => {
            const row = Math.floor(i / 11);
            const col = i % 11;
            const bounds = [[220 - (row * 35), -350 + (col * 55)], [220 - ((row + 1) * 35), -350 + ((col + 1) * 55)]] as [[number, number], [number, number]];
            return (
              <Rectangle 
                key={box.id || i}
                bounds={bounds}
                pathOptions={{
                  color: box.status === 'captured' ? '#22c55e' : '#ff4444',
                  fillOpacity: 0.25,
                  weight: 1
                }}
                eventHandlers={{
                  click: async () => {
                    const nextStatus = box.status === 'captured' ? 'pending' : 'captured';
                    // Updates your Supabase table in real-time
                    const { error } = await sb.from('montana_conquest').update({ status: nextStatus }).eq('id', box.id);
                    if (!error) setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, status: nextStatus } : b));
                  }
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      <footer style={{ height: '25px', background: '#000', borderTop: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#444' }}>
        <Lock size={10} style={{ marginRight: '5px' }} /> AUTHORIZED ACCESS ONLY // MONTANA 122 PROJECT
      </footer>
    </div>
  );
}
