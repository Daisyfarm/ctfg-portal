"use client";
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../../db/supabase"; 
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Dynamic imports
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function ConquestPage() {
  const [boxes, setBoxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mapCRS, setMapCRS] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    const initLeaflet = async () => {
      const L = (await import('leaflet')).default;
      const container = L.DomUtil.get('tactical-map-canvas');
      if (container) {
        // @ts-ignore
        container._leaflet_id = null;
      }
      setMapCRS(L.CRS.Simple);
    };
    initLeaflet();

    const fetchData = async () => {
      const { data } = await sb.from('montana_conquest').select('*');
      if (data) setBoxes(data.sort((a, b) => (a.id || 0) - (b.id || 0)));
      setLoading(false);
    };
    fetchData();

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const startX = 220; const startY = -350; 
    return [
      [startX - (row * 35), startY + (col * 55)], 
      [startX - ((row + 1) * 35), startY + ((col + 1) * 55)]
    ] as [[number, number], [number, number]];
  };

  if (!mounted || !mapCRS || loading) {
    return (
      <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" color="#d4af37" />
      </div>
    );
  }

  const capturedCount = boxes.filter(b => b.status === 'captured').length;
  const progressPercent = ((capturedCount / 122) * 100).toFixed(1);

  return (
    <div id="conquest-root" style={{ height: '100vh', width: '100%', background: '#050505', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{ __html: `.leaflet-container { background: #000 !important; }` }} />
      
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000 }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#d4af37', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px' }}>
          <ChevronLeft size={16} /> RETURN TO HUB
        </Link>
        <h1 style={{ color: 'white', margin: '5px 0', fontSize: '24px', fontWeight: '900' }}>
          MONTANA 122: CONQUEST
        </h1>
        <p style={{ color: '#22c55e', margin: 0 }}>SECURED: {progressPercent}%</p>
      </div>

      <MapContainer 
        id="tactical-map-canvas"
        ref={mapRef}
        center={[0, 0]} 
        zoom={0} 
        crs={mapCRS}
        style={{ height: '100%', width: '100%' }}
      >
        <ImageOverlay url="/montana-map.jpg" bounds={[[-500, -500], [500, 500]]} />
        {boxes.map((box, i) => (
          <Rectangle 
            key={box.id || i}
            bounds={getBounds(i)}
            pathOptions={{
              color: box.status === 'captured' ? '#22c55e' : '#ff4444',
              fillOpacity: 0.3,
              weight: 1
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
