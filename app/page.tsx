"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 2. Load Leaflet safely for Vercel
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function FarmMap() {
  const [boxes, setBoxes] = useState<any[]>([]);

  // 3. Fetch data - using 'id' to match your Supabase screenshot
  useEffect(() => {
    const fetchBoxes = async () => {
      const { data } = await supabase
        .from('montana_conquest')
        .select('*')
        .order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    fetchBoxes();
  }, []);

  // 4. Grid Logic - This centers the 122 boxes on your map
  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const size = 70; 
    const startX = 350;
    const startY = -400;
    return [
      [startX - (row * size), startY + (col * size)], 
      [startX - ((row + 1) * size), startY + ((col + 1) * size)]
    ] as [[number, number], [number, number]];
  };

  return (
    <div style={{ height: '100vh', width: '100%', background: '#000' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* Dashboard Stats */}
      <div style={{ position: 'absolute', top: 20, left: 60, zIndex: 1000, color: 'white', textShadow: '2px 2px 4px black' }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>DAISY HILL FARMS</h1>
        <p style={{ fontSize: '18px' }}>Total Conquest: {((boxes.filter(b => b.status === 'captured').length / 122) * 100).toFixed(1)}%</p>
      </div>

      <MapContainer 
        center={[0, 0]} 
        zoom={0} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        {/* ACTION REQUIRED: Paste your PostIMG "Direct Link" below */}
        <ImageOverlay 
          url="REPLACE_THIS_WITH_YOUR_DIRECT_LINK_HERE" 
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
              // GOLD GLOW ON HOVER
              mouseover: (e) => {
                e.target.setStyle({
                  fillColor: '#fbbf24', 
                  fillOpacity: 0.8,
                });
              },
              // RESET COLOR ON MOUSE OUT
              mouseout: (e) => {
                e.target.setStyle({
                  fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
                  fillOpacity: box.status === 'captured' ? 0.6 : 0.1,
                });
              },
              // SAVE CAPTURE TO DATABASE
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
