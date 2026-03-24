"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function FarmMap() {
  const [boxes, setBoxes] = useState<any[]>([]);

  // 1. Fetch the 122 boxes from your database
  useEffect(() => {
    const fetchBoxes = async () => {
      const { data } = await supabase
        .from('montana_conquest')
        .select('*')
        .order('field_number', { ascending: true });
      if (data) setBoxes(data);
    };
    fetchBoxes();
  }, []);

  // 2. Helper to generate the grid positions (11x11ish for 122 boxes)
  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const size = 40; 
    return [
      [500 - (row * size), -500 + (col * size)], 
      [500 - ((row + 1) * size), -500 + ((col + 1) * size)]
    ] as [[number, number], [number, number]];
  };

  return (
    <div style={{ height: '100vh', width: '100%', background: '#000' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <MapContainer 
        center={[0, 0]} 
        zoom={1} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <ImageOverlay 
          url="https://i.postimg.cc/your-map-image.png" 
          bounds={[[-500, -500], [500, 500]]} 
        />

        {boxes.map((box, i) => (
          <Rectangle
            key={box.field_number}
            bounds={getBounds(i)}
            pathOptions={{
              color: 'white',
              weight: 1,
              fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
              fillOpacity: 0.5,
            }}
            eventHandlers={{
              // THIS FIXES THE HOVER
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: '#fbbf24', // Glows Gold on hover
                  fillOpacity: 0.7,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
                  fillOpacity: 0.5,
                });
              },
              click: async () => {
                // Logic to capture the box in Supabase
                await supabase
                  .from('montana_conquest')
                  .update({ status: 'captured' })
                  .eq('field_number', box.field_number);
                
                // Refresh local state so it turns green immediately
                setBoxes(prev => prev.map(b => 
                  b.field_number === box.field_number ? {...b, status: 'captured'} : b
                ));
              }
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
