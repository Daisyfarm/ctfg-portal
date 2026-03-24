"use client";
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../../db/supabase"; 
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Dynamic imports for Leaflet components
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
      if (container !== null) {
        // @ts-ignore
        container._leaflet_id = null;
      }
      setMapCRS(L.CRS.Simple);
    };
    initLeaflet();

    const fetchBoxes = async () => {
      try {
        const { data } = await sb.from('montana_conquest').select('*');
        if (data) setBoxes(data.sort((a, b) => (a.id || 0) - (b.id || 0)));
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxes();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const getBounds = (index: number) => {
    const row = Math.floor(index / 11);
    const col = index % 11;
    const width = 55; const height = 35;
    const startX = 220; const startY = -350; 
    return [
      [startX - (row * height), startY + (col * width)], 
      [startX - ((row + 1) * height), startY + ((col + 1) * width)]
    ] as [[number, number], [number, number]];
  };

  if (!mounted || !mapCRS || loading) return (
    <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" />
    </div>
  );

  const capturedCount = boxes.filter(b => b.status === 'captured').length;
  const progress = ((capturedCount / 122) * 100).toFixed(1);

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', overflow: 'hidden', position: 'relative' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, pointerEvents: 'none' }}>
        <Link href="/dashboard" style={{ 
          display: 'flex', alignItems: 'center', gap: '5px', color: '#d4af37', 
          textDecoration: 'none', fontSize: '12px', letterSpacing: '2px', marginBottom: '10px',
          pointerEvents: 'auto'
        }}>
          <ChevronLeft size={16} /> RETURN TO HUB
        </Link>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px', fontWeight: '900', letterSpacing: '2px' }}>
          MONTANA 122: CONQUEST
        </h1>
        <p style={{ color: '#22c55e', fontWeight: 'bold', margin: 0 }}>SECURED: {progress}%</p>
      </div>

      <MapContainer 
        id="tactical-map-canvas"
        ref={mapRef
