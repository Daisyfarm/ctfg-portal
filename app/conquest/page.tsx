"use client";
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../../db/supabase"; 
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Dynamic imports to stop Leaflet from crashing the server
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
      // Cleans up the old map if it's still stuck in memory
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
