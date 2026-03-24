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

  useEffect(() => {
    const fetchBoxes = async () => {
      const { data } = await supabase.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    fetchBoxes();
  }, []);

  // NEW CALIBRATED GRID FOR YOUR PHOTO
  const getBounds = (index: number) => {
    const row = Math.floor(index / 11); // 11 boxes wide
    const col = index % 11;
    const width = 35;   // Smaller width to fit the photo perspective
    const height = 25;  // Smaller height
    const startX = 150;  // Moves the whole grid up/down
    const startY = -200; // Moves the whole grid left/right
    
    return [
      [startX - (row * height), startY + (col * width)], 
      [startX - ((row + 1) * height), startY + ((col + 1) * width)]
    ] as [[number, number], [number, number]];
  };

  return (
    <div style={{ height: '100vh', width: '100%', background: '#0a0a0a' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* HUD Header */}
      <div style={{ position: 'absolute', top: 25, left: 70, zIndex: 1000, color: 'white', textShadow: '2px 2px 4px black' }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '900', letterSpacing: '2px' }}>DAISY HILL FARMS</h1>
        <p style={{ fontSize: '18px', color: '#22c55e', fontWeight: 'bold' }}>
          CONQUEST: {((boxes.filter(b => b.status === 'captured').length / 122) * 1
