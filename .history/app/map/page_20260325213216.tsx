"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const JudithGapMap = () => {
  const [activeUnit, setActiveUnit] = useState('R-01');

  const assets = [
    { id: 'R-01', name: 'GENERAL_LEE', pos: 'HWY-191_NORTH', task: 'TRANSIT', load: '10%' },
    { id: 'T-01', name: 'CASE_IH_STEIGER', pos: 'JUDITH_BASIN_FIELD', task: 'PLOWING_OPS', load: '82%' },
    { id: 'W-01', name: 'WIND_TURBINE_ARRAY', pos: 'GAP_RIDGE', task: 'GRID_SYNC', load: '94%' },
  ];

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4">
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] bg-black shadow-[0_0_100px_rgba(0,255,65,0.1)] h-[85vh] flex flex-col relative">
        
        {/* CRT SCANLINE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>

        {/* TOP BAR */}
        <div className="flex justify-between items-center bg-[#001a07] p-4 border-b border-[#003b11]">
          <div>
            <h1 className="text-2xl font-black tracking-widest uppercase">JUDITH_GAP_SECTOR</h1>
            <p className="text-[10px] text-green-700 font-bold uppercase tracking-[0.2em]">Coordinates: 46.67N, 109.75W // Montana_USA</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-green-900 font-black">LOCAL_TEMP: 17°C</p>
            <p className="text-xs font-black text-white animate-pulse">SATELLITE_LOCK: HIGH</p>
          </div>
        </div>

        <div className="flex-grow flex gap-0 overflow-hidden relative">
          
          {/* THE MAP GRID - INTEGRATED SATELLITE IMAGE */}
          <div className="flex-[4] relative overflow-hidden border-r border-[#003b11] bg-cover bg-center" 
               style={{ backgroundImage: 'url("https://www.google.com/maps/vt?pb=!1m5!1m4!1i14!2i4474!3i5956!2m3!1e0!2sm!3i3!3m13!1sen!2sMT!5e18!12m1!1e6!12m3!1e37!2m1!1ssatellite!12m3!1e49!2m1!1ssatellite!4e0")' }}>
             
            {/* HUD / RADAR OVERLAYS */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-green-900/40"></div>
              <div className="border-b border-green-900/40"></div>
              <div className="border-r border-green-900/40"></div>
              <div></div>
            </div>

            {/* Simulated Radar Sweep */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-900/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-green-900/20 rounded-full"></div>

            {/* ASSET MARKERS (Matching the Satellite Layout) */}
            
            {/* R-01 General Lee - (Near HWY-191 North of Judith Gap) */}
            <div className="absolute top-1/3 left-1/2 flex flex-col items-center group">
               <div className="w-5 h-5 bg-orange-600 rotate-45 animate-pulse border-2 border-white shadow-[0_0_15px_rgba(234,88,12,0.8)] cursor-pointer"></div>
               <span className="text-[9px] font-black bg-black text-orange-600 px-2 py-1 mt-3 whitespace-nowrap hidden group-hover:block z-50">R-01_GENERAL_LEE</span>
            </div>

            {/* T-01 Steiger Tractor - (In the Main Farm Grid) */}
            <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center group">
               <div className="w-4 h-4 bg-green-500 rounded-full border border-white cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
               <span className="text-[9px] font-black bg-black text-green-500 px-2 py-1 mt-3 whitespace-nowrap hidden group-hover:block z-50">T-01_CASE_IH</span>
            </div>

            {/* GPS HUD COORDS (Bottom Right) */}
            <div className="absolute bottom-4 right-4 text-right bg-black/70 p-2 border border-zinc-900">
               <p className="text-[10px] text-green-500/80 font-bold uppercase tracking-wider leading-tight">
                 Lat: 46.6789<br/>
                 Long: -109.7813<br/>
                 // Zoom: 14.2 //
               </p>
            </div>
          </div>

          {/* TELEMETRY SIDEBAR */}
          <div className="flex-1 bg-black p-4 flex flex-col border-l border-[#003b11]">
            <h2 className="text-[10px] font-black text-green-900 uppercase mb-6 border-b border-[#003b11] pb-2 italic">Active_Telemetry</h2>
            <div className="space-y-6">
              {assets.map((a) => (
                <div key={a.id} onClick={() => setActiveUnit(a.id)} className={`cursor-pointer border-l-2 p-3 transition-all ${activeUnit === a.id ? 'border-green-500 bg-green-900/10' : 'border-zinc-800'}`}>
                  <p className="text-[9px] font-black text-zinc-600">{a.id}</p>
                  <p className="text-xs font-black text-white uppercase">{a.name}</p>
                  <div className="mt-2">
                    <p className="text-[8px] text-green-800 font-bold uppercase">System_Load</p>
                    <div className="h-1 w-full bg-zinc-900 mt-1">
                      <div className="h-full bg-green-500" style={{ width: a.load }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-4 border border-green-900/30 bg-green-900/5">
              <p className="text-[8px] font-black text-green-600 uppercase">Gap_Status</p>
              <p className="text-[10px] text-green-500/70 italic leading-relaxed mt-1">
                // Judith Gap wind farm output nominal.<br/>
                // High wind warning active for pass.<br/>
                // Hazzard-191 clear.
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD LINK */}
        <div className="p-4 bg-black border-t border-[#003b11] flex justify-between items-center">
          <Link href="/dashboard" className="text-[10px] text-green-900 hover:text-white transition-colors font-black uppercase underline decoration-green-900">
            ← ESC_TO_COMMAND_DASHBOARD
          </Link>
          <span className="text-[8px] font-black text-zinc-800 uppercase italic">Encryption_Key: GAP_882_DELTA // Sector_Sync_088</span>
        </div>
      </div>
    </div>
  );
};

export default JudithGapMap;