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

  if (!mounted || !mapCRS || loading) {
    return (
      <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
