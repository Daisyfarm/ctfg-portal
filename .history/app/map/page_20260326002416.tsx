"use client";
import React from 'react';

export default function MapPage() { // Must have 'default'
  return (
    <div className="min-h-screen bg-black text-green-500 p-10 font-mono">
      <h1 className="text-2xl border-b border-green-900 pb-4">SATELLITE_LINK_ACTIVE</h1>
      <div className="mt-10 animate-pulse">Scanning Montana Sector 4...</div>
    </div>
  );
}