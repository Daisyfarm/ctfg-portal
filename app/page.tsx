"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function FarmMap() {
  const [boxes, setBoxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const { data, error } = await supabase.from('montana_conquest').select('*');
        if (error) throw error;
        if (data) setBoxes(data.sort((a, b) => a.id - b.id));
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxes();
  }, []);

  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const width = 55;   
    const height = 35;  
    const startX = 220;  
    const startY = -350; 
    
    return [
      [startX - (row * height), startY + (col * width)], 
      [startX - ((row + 1) * height), startY + ((col + 1) * width)]
    ] as [[number, number], [number, number]];
  };

  const capturedCount = boxes.filter(b => b.status === 'captured').length;
  const progress = boxes.length > 0 ? ((capturedCount / boxes.length) * 100).toFixed(1) : "0.0";

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <div style={{ 
        position: 'absolute', top: '30px', left: '70px', zIndex: 1000, 
        color: 'white', textShadow: '0px 0px 10px rgba(34, 197, 94, 0.5)' 
      }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '900', letterSpacing: '3px' }}>
          DAISY HILL FARMS
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
          <div style={{ 
            width: '10px', height: '10px', borderRadius: '50%', 
            background: loading ? '#facc15' : '#22c55e', 
            boxShadow: '0 0 8px currentColor' 
          }}></div>
          <p style={{ fontSize: '20px', color: '#22c55e', fontWeight: 'bold', margin: 0 }}>
            {loading ? "SYNCING..." : `CONQUEST: ${progress}%`}
          </p>
        </div>
      </div>

      <MapContainer 
        center={[0, 0]} 
        zoom={0} 
        minZoom={-1}
        maxZoom={2}
        style={{ height: '100%', width: '100%' }} 
        attributionControl={false}
        crs={typeof window !== 'undefined' ? (window as any).L.CRS.Simple : undefined}
      >
        <ImageOverlay url="/map.png" bounds={[[-600, -800], [600, 800]]} />
        
        {!loading && boxes.map((box, i) => (
          <Rectangle
            key={box.id || i}
            bounds={getBounds(i)}
            pathOptions={{
              color: 'rgba(255,255,255,0.15)',
              weight: 1,
              fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
              fillOpacity: box.status === 'captured' ? 0.4 : 0.0,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillColor: '#fbbf24', fillOpacity: 0.7, color: '#fbbf24' }); 
              },
              mouseout: (e) => {
                e.target.setStyle({
                  color: 'rgba(255,255,255,0.15)',
                  fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
                  fillOpacity: box.status === 'captured' ? 0.4 : 0.0,
                });
              },
              click: async () => {
                setBoxes(prev => prev.map(b => b.id === box.id ? {...b, status: 'captured'} : b));
                await supabase.from('montana_conquest').update({ status: 'captured' }).eq('id', box.id);
              }
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
