"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JudithGapMap() {
  const [timestamp, setTimestamp] = useState("");
  const [generalLeeStatus, setGeneralLeeStatus] = useState("Nominal");

  // Local Time simulation for MT
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Denver' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4">
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] h-[85vh] flex flex-col relative overflow-hidden shadow-[0_0_100px_rgba(0,59,17,0.2)]">
        
        {/* SCANLINE / CRT OVERLAY (Optional) */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>

        {/* TOP HUD / SATELLITE STATUS */}
        <div className="flex justify-between items-center bg-[#001a07] p-4 border-b border-[#003b11] z-10">
          <div>
            <h1 className="text-xl font-black tracking-widest uppercase">MT_TACTICAL_LINK: 088</h1>
            <p className="text-[10px] text-green-700 font-bold uppercase tracking-[0.2em]">Loc: 46.67N / -109.75W // Judith_Gap // MT</p>
          </div>
          <div className="text-right text-xs font-black text-white animate-pulse">
            SATELLITE_LOCK: NOMINAL
          </div>
        </div>

        {/* MAP GRID (Using clean satellite perspective) */}
        <div className="flex-grow flex gap-0 overflow-hidden relative">
          
          {/* THE MAP GRID AREA */}
          <div className="flex-[4] relative bg-zinc-950 overflow-hidden border-r border-[#003b11]">
            {/* Satellite image overlay to match image_0.png style */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* Simulated Radar Grid lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-full w-[1px] bg-green-900/20 absolute left-1/2"></div>
              <div className="w-full h-[1px] bg-green-900/20 absolute top-1/2"></div>
            </div>

            {/* RADAR SWEEP (Animated) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-green-900/20 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-green-900/10 rounded-full"></div>

            {/* ASSET MARKER: GENERAL LEE (R-01) */}
            <div className="absolute top-1/3 left-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-orange-600 rotate-45 animate-pulse border border-white"></div>
              <div className="mt-2 bg-black border border-orange-600 px-1 py-1">
                <span className="text-[9px] font-black text-orange-600">R-01_GENERAL_LEE</span>
              </div>
            </div>

            {/* COORDINATE HUD (Bottom Right) */}
            <div className="absolute bottom-4 right-4 bg-black/70 border border-green-900 text-right p-3">
              <p className="text-[9px] text-green-700 font-black">GPS_REF: MT_JUDITH_GAP_WHEATLAND</p>
              <p className="text-[8px] text-zinc-700 uppercase font-black">Data_Relay: 46.678947 / -109.781313</p>
            </div>
          </div>

          {/* TELEMETRY SIDEBAR (A1) */}
          <div className="flex-1 bg-black p-4 flex flex-col border-l border-[#003b11]">
            <h2 className="text-[10px] font-black text-green-900 uppercase mb-6 border-b border-[#003b11] pb-2 italic">Active_Telemetry</h2>
            <div className="space-y-4">
              <div className="border border-green-900 p-2">
                <p className="text-[8px] font-black text-zinc-700">R-01 status</p>
                <p className="text-xs font-black text-white italic">{generalLeeStatus}</p>
              </div>
              <div className="border border-green-900 p-2">
                <p className="text-[8px] font-black text-zinc-700">MT local time</p>
                <p className="text-xs font-black text-white italic">{timestamp}</p>
              </div>
              <div className="border border-red-900 bg-red-900/10 p-2">
                <p className="text-[8px] font-black text-red-600 uppercase">Alert</p>
                <p className="text-[10px] text-zinc-500 italic leading-snug">High wind gusts at Judith Gap Pass (46.68N)</p>
              </div>
            </div>
            <div className="mt-auto p-4 border border-zinc-900 bg-zinc-950">
              <span className="text-[9px] font-black text-zinc-800 uppercase italic">Encryption: GAP_DELTA_UPLINK</span>
            </div>
          </div>
        </div>

        {/* BOTTOM NAV / FOOTER */}
        <div className="p-4 bg-black border-t border-[#003b11] flex justify-between items-center">
          <Link href="/dashboard" className="text-[10px] text-green-900 hover:text-white transition-colors font-black uppercase underline decoration-green-900">
            ← ESC_TO_COMMAND_DASHBOARD
          </Link>
          <span className="text-[8px] font-black text-zinc-800 uppercase italic">Signal: JUD_088_SYNCED</span>
        </div>
      </div>
    </div>
  );
}