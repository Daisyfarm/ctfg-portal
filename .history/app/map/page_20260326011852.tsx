"use client";
import React from 'react';
import Link from 'next/link';

export default function SatelliteMap() {
  const sectors = [
    { id: "MT-01", name: "Montana Central", game: "FS22", status: "ACTIVE", color: "text-green-500" },
    { id: "EA-09", name: "Hilly Aquifer", game: "FS25", status: "STANDBY", color: "text-blue-400" },
    { id: "ID-05", name: "Boise Transit", game: "ATS", status: "LIVE", color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6 font-sans relative overflow-hidden">
      
      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-green-900/30 pb-6 mb-10">
          <Link href="/dashboard" className="text-[10px] font-black text-zinc-500 hover:text-green-500 transition-all uppercase tracking-[.4em]">
            ← DISCONNECT_UPLINK
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase text-green-500">Satellite_Uplink_v4.0</h1>
            <p className="text-[9px] text-green-900 font-bold uppercase tracking-widest">Global Asset Tracking // FS25_READY</p>
          </div>
        </div>

        {/* MAP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* THE "RADAR" VISUAL */}
          <div className="lg:col-span-2 aspect-video bg-zinc-900/20 border border-green-900/20 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            {/* Pulsing Radar Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-green-500/40 rounded-full"></div>
            
            {/* MOCKED COORDINATES */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-green-500/50">
              LAT: 46.8796° N<br/>LONG: 110.3626° W
            </div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 shadow-[0_0_15px_#22c55e] rounded-full"></div>
            <span className="absolute top-[48%] left-[52%] text-[9px] font-black text-green-500 uppercase tracking-tighter">Current_Location (Montana)</span>
          </div>

          {/* SECTOR LIST */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-zinc-500 mb-4 tracking-widest">Active_Sectors</h3>
            {sectors.map((sector) => (
              <div key={sector.id} className="bg-zinc-900/40 border border-zinc-800 p-4 rounded hover:border-green-500/50 transition-all cursor-crosshair">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase ${sector.color}`}>{sector.game}</span>
                  <span className="text-[9px] font-mono text-zinc-600">{sector.id}</span>
                </div>
                <h4 className="text-sm font-black italic uppercase">{sector.name}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${sector.status === 'ACTIVE' || sector.status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-zinc-700'}`}></div>
                  <span className="text-[8px] font-black text-zinc-500 uppercase">{sector.status}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* FS25 WEATHER ALERT BAR */}
        <div className="mt-10 bg-yellow-900/10 border border-yellow-900/30 p-4 rounded flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-yellow-500 animate-bounce">⚠️</span>
            <p className="text-[10px] font-black uppercase text-yellow-200">
              FS25 Weather Alert: Severe Typhoon activity detected in East Asia Sector. Prepare Rice Harvesters for extraction.
            </p>
          </div>
          <button className="text-[9px] font-black bg-yellow-600 text-black px-4 py-1 uppercase italic">Acknowledge</button>
        </div>

      </div>
    </div>
  );
}