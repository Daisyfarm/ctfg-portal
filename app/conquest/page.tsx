"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../../db/supabase"; // Using your existing connection
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Dynamic imports to prevent Leaflet from crashing during build
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function ConquestPage() {
  const [boxes, setBoxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mapCRS, setMapCRS] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Load Leaflet CRS
    const initLeaflet = async () => {
      const L = (await import('leaflet')).default;
      setMapCRS(L.CRS.Simple);
    };
    initLeaflet();

    // Fetch Tactical Data
    const fetchBoxes = async () => {
      try {
        const { data, error } = await sb.from('montana_conquest').select('*');
        if (error) throw error;
        if (data) setBoxes(data.sort((a, b) => (a.id || 0) - (b.id || 0)));
      } catch (err) {
        console.error("Tactical Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxes();
  }, []);

  // Grid calibration for Daisy Hill Grain Elevator
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

  if (!mounted || !mapCRS) return (
    <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" />
    </div>
  );

  const capturedCount = boxes.filter(b => b.status === 'captured').length;
  const progress = ((capturedCount / 122) * 100).toFixed(1);

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', overflow: 'hidden', position: 'relative' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* Tactical HUD Overlay */}
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
        center={[0, 0]} zoom={0} minZoom={-1} maxZoom={2} 
        style={{
