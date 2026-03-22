"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// This loads the map styles from the web so Vercel doesn't crash on local files
const MapStyles = () => (
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />
);

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });

export default function FarmMap() {
  return (
    <div style={{ height: '100vh', width: '100%', background: '#111' }}>
      <MapStyles />
      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        {/* Your farm image goes here */}
        <ImageOverlay 
          url="https://i.postimg.cc/your-map-image.png" 
          bounds={[[-500, -500], [500, 500]]} 
        />
      </MapContainer>
    </div>
  );
}
