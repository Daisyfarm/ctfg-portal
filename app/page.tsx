"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; // Fixed path for app/page.tsx
import { Loader2 } from 'lucide-react';

// Vercel-Safe Dynamic Imports
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);

  useEffect(() => {
    // Hard reset for the Leaflet container
    const container = document.getElementById('map-viewport');
    if (container) {
      // @ts-ignore
      container._leaflet_id = null;
    }

    setMounted(true);

    // Load Leaflet Assets
    import('leaflet').then((mod) => {
      setL(mod.default);
    });

    // Fetch data from Supabase
    const fetchData = async () => {
      const { data } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    fetchData();
  }, []);

  if (!mounted || !L) {
    return (
      <div style={{ background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" color="#d4af37" size={40} />
      </div>
    );
  }

  // Adjusted bounds to make map.png fit the screen
  const mapBounds: [[number, number], [number, number]] = [[-500, -500], [500, 500]];

  return (
    <div style={{ height: '100vh', width: '100%', background: '#000', position: 'relative' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>MONTANA 122</h1>
      </div>

      <MapContainer 
        id="map-viewport"
        center={[0, 0]} 
        zoom={0} 
        crs={L.CRS.Simple}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        {/* UPDATED: Points to map.png from your folder screenshot */}
        <ImageOverlay url="/map.png" bounds={mapBounds} />
        
        {boxes.map((box, i) => {
          const row = Math.floor(i / 11);
          const col = i % 11;
          // Grid alignment for the 122 sectors
          const bounds = [
            [220 - (row * 35), -350 + (col * 55)], 
            [220 - ((row + 1) * 35), -350 + ((col + 1) * 55)]
          ] as [[number, number], [number, number]];

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
                  if (!error) {
                    setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, status: nextStatus } : b));
                  }
                }
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
