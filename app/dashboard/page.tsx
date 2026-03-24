"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "@/db/supabase";
import { Loader2 } from 'lucide-react';

// This is the CRITICAL part that stops the "window is not defined" error
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { 
  ssr: false,
  loading: () => <div style={{background: '#000', height: '100vh'}} /> 
});
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Only import Leaflet inside useEffect (where 'window' exists)
    import('leaflet').then((mod) => setL(mod.default));
    
    const getData = async () => {
      const { data } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    getData();

    return () => {
      const container = document.getElementById('dashboard-map');
      if (container) {
        // @ts-ignore
        container._leaflet_id = null;
      }
    };
  }, []);

  // Don't even try to render the map until we are in the browser
  if (!mounted || !L) {
    return (
      <div style={{ background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" color="#d4af37" size={40} />
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#000' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <MapContainer 
        id="dashboard-map"
        center={[0, 0]} 
        zoom={0} 
        crs={L.CRS.Simple}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <ImageOverlay url="/montanna-map.jpg" bounds={[[-500, -500], [500, 500]]} />
        {boxes.map((box, i) => (
          <Rectangle 
            key={box.id || i}
            bounds={[[220 - (Math.floor(i/11)*35), -350 + ((i%11)*55)], [220 - ((Math.floor(i/11)+1)*35), -350 + (((i%11)+1)*55)]]}
            pathOptions={{ color: box.status === 'captured' ? '#22c55e' : '#ff4444', fillOpacity: 0.25 }}
            eventHandlers={{
              click: async () => {
                const nextStatus = box.status === 'captured' ? 'pending' : 'captured';
                const { error } = await sb.from('montana_conquest').update({ status: nextStatus }).eq('id', box.id);
                if (!error) setBoxes(prev => prev.map(b => b.id === box.id ? { ...b, status: nextStatus } : b));
              }
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
