"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JudithGapMap() {
  const [timestamp, setTimestamp] = useState("");
  
  // Real-time clock for MT
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { 
        timeZone: 'America/Denver',
        hour12: false 
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4">
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] h-[85vh] flex flex-col relative overflow-hidden shadow-[0_0_80px_rgba(0,255,65,0.1)]">
        
        {/* SCANLINES */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>

        {/* HEADER */}
        <div className="flex justify-between items-center bg-[#001a07] p-4 border-b border-[#003b11] z-10">
          <div>
            <h1 className="text-xl font-black tracking-widest uppercase text-white">IDA_TACTICAL_NETWORK</h1>
            <p className="text-[10px] text-green-600 font-bold uppercase">Sector: Judith_Gap_Pass // MT // {timestamp}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-red-900/20 text-red-500 border border-red-900 px-2 py-1 font-black animate-pulse">
              INTERCEPT_PROTOCOL_ACTIVE
            </span>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          
          {/* SATELLITE RADAR DISPLAY */}
          <div className="flex-[3] relative bg-zinc-950 overflow-hidden border-r border-[#003b11]">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* GRID LINES */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-full w-[1px] bg-green-900/30 absolute left-1/4"></div>
              <div className="h-full w-[1px] bg-green-900/30 absolute left-2/4"></div>
              <div className="h-full w-[1px] bg-green-900/30 absolute left-3/4"></div>
              <div className="w-full h-[1px] bg-green-900/30 absolute top-1/2"></div>
            </div>

            {/* ASSET: GENERAL LEE (R-01) */}
            <div className="absolute top-[40%] left-[45%] flex flex-col items-center">
              <div className="w-4 h-4 bg-orange-600 rotate-45 border border-white shadow-[0_0_10px_#ea3a0a]"></div>
              <span className="text-[8px] font-black text-orange-600 bg-black mt-2 px-1">R-01: GEN_LEE</span>
            </div>

            {/* ASSET: DODGE SRT INTERCEPTOR (P-01) */}
            <div className="absolute top-[20%] left-[60%] flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-600 border border-white animate-pulse shadow-[0_0_15px_#2563eb]"></div>
              <span className="text-[8px] font-black text-blue-500 bg-black mt-2 px-1">P-01: DODGE_SRT</span>
            </div>

            {/* RADAR COORDINATES */}
            <div className="absolute bottom-4 left-4 text-[9px] text-green-900 font-black">
              LAT: 46.6789 <br/> LON: -109.7813
            </div>
          </div>

          {/* TELEMETRY SIDEBAR */}
          <div className="flex-1 bg-black p-4 border-l border-[#003b11] flex flex-col gap-6">
            <section>
              <h2 className="text-[10px] font-black text-zinc-600 uppercase mb-2 border-b border-zinc-900 pb-1">Fleet_Status</h2>
              <div className="space-y-3">
                <div className="border border-green-900 p-2">
                  <p className="text-[9px] text-orange-600 font-bold">R-01 [GENERAL LEE]</p>
                  <p className="text-[11px] text-white">STATUS: IN_TRANSIT</p>
                  <p className="text-[11px] text-white">SPD: 115 MPH</p>
                </div>
                <div className="border border-blue-900 p-2 bg-blue-900/5">
                  <p className="text-[9px] text-blue-500 font-bold">P-01 [DODGE SRT]</p>
                  <p className="text-[11px] text-white">STATUS: PATROL</p>
                  <p className="text-[11px] text-white">UNIT: SRT_HELLCAT</p>
                </div>
              </div>
            </section>

            <div className="mt-auto border border-zinc-900 p-2 bg-zinc-950">
              <p className="text-[8px] text-zinc-700 font-black italic">SATELLITE_UPLINK: STABLE</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-black border-t border-[#003b11] flex justify-between">
          <Link href="/dashboard" className="text-[10px] text-green-900 hover:text-white uppercase font-black underline">
            ← RETURN_TO_HQ
          </Link>
          <span className="text-[8px] text-zinc-800 font-black uppercase tracking-widest">
            Authorization: SRT_ONLY // Wheatland_Unit
          </span>
        </div>
      </div>
    </div>
  );
}