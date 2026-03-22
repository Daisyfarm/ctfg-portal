"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Safe CSS loading for Next.js
if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css');
}

// Dynamic imports to prevent "Window is not defined" errors
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
