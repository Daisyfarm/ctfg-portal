"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 2. Load Leaflet safely
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function FarmMap() {
  const [boxes, setBoxes] = useState<any[]>([]);

  // 3. Fetch data from Supabase
  useEffect(() => {
    const fetchBoxes = async () => {
      const { data } = await supabase
        .from('montana_conquest')
        .select('*')
        .order('id', { ascending: true }); // Changed back to 'id' based on your Supabase screenshot
      if (data) setBoxes(data);
    };
    fetchBoxes();
  }, []);

  // 4. Grid Logic - Adjust 'size' to fit your image better
  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const size = 80; 
    const startX = 400;
    const startY = -450;
    return [
      [startX - (row * size), startY + (col * size)], 
      [startX - ((row + 1) * size), startY + ((col + 1) * size)]
    ] as [[number, number], [number, number]];
  };

  return (
    <div style={{ height: '100vh', width: '100%', background: '#111' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* HUD Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 60, zIndex: 1000, color: 'white', textShadow: '2px 2px 4px black' }}>
        <h1 style={{ margin: 0 }}>DAISY HILL FARMS</h1>
        <p>Conquest Progress: {((boxes.filter(b => b.status === 'captured').length / 122) * 100).toFixed(1)}%</p>
      </div>

      <MapContainer 
        center={[0, 0]} 
        zoom={0} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        {/* FIX: Use your actual direct image link here */}
        <ImageOverlay 
          url="https://i.postimg.cc/hjX3fMhX/map.png" 
          bounds={[[-1000, -1000], [1000, 1000]]} 
        />

        {boxes.map((box, i) => (
          <Rectangle
            key={box.id}
            bounds={getBounds(i)}
            pathOptions={{
              color: 'white',
              weight: 1,
              fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
              fillOpacity: box.status === 'captured' ? 0.6 : 0.1,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({
                  fillColor: '#fbbf24', // GOLD GLOW ON HOVER
                  fillOpacity: 0.8,
                });
              },
              mouseout: (e) => {
                e.target.setStyle({
                  fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
                  fillOpacity: box.status === 'captured' ? 0.6 : 0.1,
                });
              },
              click: async () => {
                await supabase
                  .from('montana_conquest')
                  .update({ status: 'captured' })
                  .eq('id', box.id);
                
                setBoxes(prev => prev.map(b => 
                  b.id === box.id ? {...b, status: 'captured'} : b
                ));
              }
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
