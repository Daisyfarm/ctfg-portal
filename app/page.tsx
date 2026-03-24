"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Loader2, Crosshair, Map as MapIcon, Shield } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualDashboard() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    
    const getData = async () => {
      const { data } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    getData();
  }, []);

  if (!mounted || !L) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-yellow-500" size={48} />
      </div>
    );
  }

  // Tactical Bounds - This makes the image fill the screen better
  const mapBounds: [[number, number], [number, number]] = [[-500, -500], [500, 500]];

  return (
    <div className="h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col font-sans">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* TACTICAL HEADER UI */}
      <header className="h-16 border-b border-yellow-600/30 bg-black flex items-center justify-between px-6 z-[1001] shadow-2xl">
        <div className="flex items-center gap-3">
          <Shield className="text-yellow-500" size={24} />
          <h1 className="text-white font-black tracking-[0.2em] text-xl">DAISY HILL <span className="text-yellow-500">TACTICAL</span></h1>
        </div>
        <div className="flex gap-6 text-xs text-gray-400 font-mono uppercase tracking-widest">
          <div className="flex flex-col items-end">
            <span>Sector: Montana 122</span>
            <span className="text-green-500">System: Operational</span>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 relative">
        <MapContainer 
          center={[0, 0]} 
          zoom={0} 
          crs={L.CRS.Simple}
          className="h-full w-full"
          style={{ background: '#050505' }}
          attributionControl={false}
          zoomControl={false}
        >
          <ImageOverlay url="/map.png" bounds={mapBounds} />
          
          {boxes.map((box, i) => {
            const row = Math.floor(i / 11);
            const col = i % 11;
            const bounds = [
              [220 - (row * 35), -350 + (col * 55)], 
              [220 - ((row + 1) * 35), -350 + ((col + 1) * 55)]
            ] as [[number, number], [number, number]];

            return (
              <Rectangle 
                key={box.id || i}
                bounds={bounds}
                pathOptions={{
                  color: box.status === 'captured' ? '#22c55e' : '#ef4444',
                  fillOpacity: 0.2,
                  weight: 1,
                  dashArray: box.status === 'captured' ? '' : '5, 5'
                }}
                eventHandlers={{
                  click: async () => {
                    const nextStatus = box.status === 'captured' ? 'pending' : 'captured';
                    const { error } = await sb.from('montana_conquest').update({ status: nextStatus }).eq('id', box.id);
                    if (!error) {
                      setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, status: nextStatus } : b));
                    }
                  }
                }}
              />
            );
          })}
        </MapContainer>

        {/* HUD OVERLAY - RIGHT SIDE */}
        <div className="absolute right-6 top-6 z-[1000] w-48 bg-black/80 border border-yellow-600/30 p-4 backdrop-blur-md">
          <h3 className="text-yellow-500 text-[10px] font-bold tracking-tighter uppercase mb-3">Live Intelligence</h3>
          <div className="space-y-2 text-[11px] font-mono">
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-gray-500">Captured:</span>
              <span className="text-green-500 font-bold">{boxes.filter(b => b.status === 'captured').length}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-1">
              <span className="text-gray-500">Remaining:</span>
              <span className="text-red-500 font-bold">{boxes.length - boxes.filter(b => b.status === 'captured').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR */}
      <footer className="h-8 bg-black border-t border-yellow-600/30 px-4 flex items-center text-[10px] font-mono text-gray-500 justify-between">
        <div className="flex gap-4">
          <span>LAT: 45.362 | LON: -111.022</span>
          <span className="animate-pulse">● REC SIGNAL ACTIVE</span>
        </div>
        <span>PROJECT: DAISY_HILL_LEGACY_v2.0</span>
      </footer>

      {/* Global CSS to hide Leaflet Branding */}
      <style jsx global>{`
        .leaflet-container { background: #000 !important; cursor: crosshair !important; }
        .leaflet-vignette { pointer-events: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; box-shadow: inset 0 0 150px rgba(0,0,0,0.8); z-index: 999; }
      `}</style>
    </div>
  );
}
