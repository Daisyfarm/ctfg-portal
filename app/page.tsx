"use client";
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchBoxes = async () => {
      const { data } = await supabase.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    fetchBoxes();
  }, []);

  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const width = 90;  
    const height = 70; 
    const startX = 420; 
    const startY = -490; 
    
    return [
      [startX - (row * height), startY + (col * width)], 
      [startX - ((row + 1) * height), startY + ((col + 1) * width)]
    ] as [[number, number], [number, number]];
  };

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <div style={{ position: 'absolute', top: 25, left: 70, zIndex: 1000, color: 'white', textShadow: '3px 3px 5px black' }}>
        <h1 style={{ margin: 0, fontSize: '32px', letterSpacing: '3px', fontWeight: '900' }}>DAISY HILL FARMS</h1>
        <p style={{ fontSize: '20px', color: '#4ade80', marginTop: '5px' }}>
          LIVE CONQUEST: {((boxes.filter(b => b.status === 'captured').length / 122) * 100).toFixed(1)}%
        </p>
      </div>

      <MapContainer center={[0, 0]} zoom={0} style={{ height: '100%', width: '100%' }} attributionControl={false}>
        
        {/* Working 2026 Direct Link */}
        <ImageOverlay 
          url="https://i.ibb.co/v4y8X4z/farm-map-tactical.png" 
          bounds={[[-1000, -1000], [1000, 1000]]} 
        />

        {boxes.map((box, i) => (
          <Rectangle
            key={box.id}
            bounds={getBounds(i)}
            pathOptions={{
              color: 'rgba(255,255,255,0.2)',
              weight: 1,
              fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
              fillOpacity: box.status === 'captured' ? 0.4 : 0.0,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillColor: '#fbbf24', fillOpacity: 0.7 }); 
              },
              mouseout: (e) => {
                e.target.setStyle({
                  fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
                  fillOpacity: box.status === 'captured' ? 0.4 : 0.0,
                });
              },
              click: async () => {
                await supabase.from('montana_conquest').update({ status: 'captured' }).eq('id', box.id);
                setBoxes(prev => prev.map(b => b.id === box.id ? {...b, status: 'captured'} : b));
              }
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
