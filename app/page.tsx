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
        console.error("Supabase Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxes();
  }, []);

  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const width = 35;
    const height = 25;
    const startX = 150;
    const startY = -200;
    return [
      [startX - (row * height), startY + (col * width)], 
      [startX - ((row + 1) * height), startY + ((col + 1) * width)]
    ] as [[number, number], [number, number]];
  };

  const capturedCount = boxes.filter(b => b.status === 'captured').length;

  return (
    <div style={{ height: '100vh', width: '100%', background: '#0a0a0a' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <div style={{ position: 'absolute', top: '25px', left: '70px', zIndex: 1000, color: 'white', textShadow: '2px 2px 4px black' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '900' }}>DAISY HILL FARMS</h1>
        <p style={{ fontSize: '18px', color: '#22c55e', fontWeight: 'bold' }}>
          {loading ? "SYNCING..." : `CONQUEST: ${((capturedCount / 122) * 100).toFixed(1)}%`}
        </p>
      </div>

      <MapContainer center={[0, 0]} zoom={0} style={{ height: '100%', width: '100%' }} attributionControl={false}>
        <ImageOverlay url="/map.png" bounds={[[-400, -600], [400, 600]]} />
        {!loading && boxes.map((box, i) => (
          <Rectangle
            key={box.id || i}
            bounds={getBounds(i)}
            pathOptions={{
              color: 'rgba(255,255,255,0.2)',
              weight: 1,
              fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
              fillOpacity: box.status === 'captured' ? 0.5 : 0.0,
            }}
            eventHandlers={{
              mouseover: (e) => { e.target.setStyle({ fillColor: '#fbbf24', fillOpacity: 0.8 }); },
              mouseout: (e) => {
                e.target.setStyle({
                  fillColor: box.status === 'captured' ? '#22c55e' : 'transparent',
                  fillOpacity: box.status === 'captured' ? 0.5 : 0.0,
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
