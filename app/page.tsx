"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Loader2, Shield, Terminal, Activity, Lock } from 'lucide-react';

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
    setTimeout(() => setAccessGranted(true), 1500);

    const getData = async () => {
      const { data } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    getData();
  }, []);

  if (!accessGranted || !mounted || !L) {
    return (
      <div style={{height:'100vh', width:'100%', background:'#000', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace'}}>
        <div style={{padding:'40px', border:'1px solid rgba(212,175,55,0.2)', background:'#050505', textAlign:'center'}}>
          <Shield style={{color:'#d4af37', marginBottom:'20px'}} size={48} className="animate-pulse" />
          <h2 style={{color:'#d4af37', letterSpacing:'5px', textTransform:'uppercase'}}>Daisy Hill Operations</h2>
          <p style={{color:'rgba(212,175,55,0.4)', fontSize:'10px', marginTop:'15px'}}>ESTABLISHING SECURE LINK...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* TACTICAL HEADER */}
      <header style={{ height: '60px', borderBottom: '1px solid rgba(212,175,55,0.3)', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 2000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Terminal size={20} style={{ color: '#d4af37' }} />
          <h1 style={{ margin: 0, fontSize: '14px', letterSpacing: '3px', fontWeight: '900' }}>DAISY HILL <span style={{ color: '#d4af37' }}>TACTICAL</span></h1>
        </div>
        <div style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace', textAlign: 'right' }}>
          <div>STATUS: <span style={{ color: '#22c55e' }}>CONNECTED</span></div>
          <div style={{ color: '#d4af37' }}>SECTOR: MONTANA_122</div>
        </div>
      </header>

      {/* VIEWPORT */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* HUD UI */}
        <div style={{ position: 'absolute', right: '20px', top: '20px', zIndex: 1000, width: '180px', background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(212,175,55,0.2)', padding: '15px', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ color: '#d4af37', fontSize: '10px', margin: '0 0 10px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>Live Intel</h3>
          <div style={{ fontSize: '11px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
              <span style={{ color: '#888' }}>SECURED:</span>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{boxes.filter(b => b.status === 'captured').length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#888' }}>PENDING:</span>
              <span style={{ color: '#ff4444', fontWeight: 'bold' }}>{boxes.length - boxes.filter(b => b.status === 'captured').length}</span>
            </div>
          </div>
        </div>

        <MapContainer 
          center={[0, 0]} zoom={0} crs={L.CRS.Simple}
          style={{ height: '100%', width: '100%', background: '#000' }}
          attributionControl={false} zoomControl={false}
        >
          {/* Points to the map.png from your screenshot */}
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
                    const { error } = await sb.from('montana_conquest').update({ status: nextStatus }).eq('id', box.id);
                    if (!error) setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, status: nextStatus } : b));
                  }
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* FOOTER */}
      <footer style={{ height: '30px', background: '#000', borderTop: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', fontSize: '9px', color: '#555', fontFamily: 'monospace' }}>
        <div>GPS: 45.362 / -111.022 | ENCRYPTION: ACTIVE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Lock size={10} style={{ color: '#d4af37' }} /> SECURE SYSTEM</div>
      </footer>
    </div>
  );
}
