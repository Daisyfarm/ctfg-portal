"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JudithGapMap() {
  const [timestamp, setTimestamp] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [distance, setDistance] = useState("1.24");
  const [fuelSRT, setFuelSRT] = useState(14); // Set to 14 to trigger alert
  const [frequency, setFrequency] = useState("460.125");

  // System Clock & Radio Jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { 
        timeZone: 'America/Denver', 
        hour12: false 
      }));
      const jitter = (Math.random() * 0.005).toFixed(3);
      setFrequency((460.125 + parseFloat(jitter)).toString());
      // Slight distance drift
      setDistance((1.2 + Math.random() * 0.1).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-2 sm:p-4 overflow-hidden">
      {/* MAIN HUD CONTAINER */}
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] h-[92vh] flex flex-col relative bg-[#050505] shadow-[0_0_60px_rgba(0,59,17,0.3)]">
        
        {/* SCANLINE EFFECT */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>

        {/* TOP BAR: SYSTEM STATUS */}
        <div className="flex justify-between items-center bg-black p-4 border-b-2 border-[#003b11] z-10">
          <div>
            <h1 className="text-xl font-black tracking-widest text-white italic">IDA_TACTICAL_SATELLITE</h1>
            <div className="flex gap-4 mt-1">
              <span className="text-[10px] text-green-700 font-bold tracking-widest">WHEATLAND_COUNTY_MT</span>
              <span className="text-[10px] text-zinc-500 font-bold underline decoration-red-600">{timestamp} MST</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {fuelSRT < 15 && (
              <div className="bg-red-900/20 border border-red-600 px-3 py-1 animate-pulse">
                <p className="text-[10px] text-red-500 font-black tracking-tighter">LOW_FUEL_WARNING: P-01</p>
              </div>
            )}
            <button 
              onClick={() => setIsLocked(!isLocked)}
              className={`px-4 py-2 border-2 font-black text-xs transition-all ${isLocked ? 'bg-red-600 border-white text-white' : 'bg-black border-red-900 text-red-900'}`}
            >
              {isLocked ? 'TARGET_ACQUIRED' : 'ENGAGE_RADAR_LOCK'}
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          
          {/* LEFT: SATELLITE RADAR DISPLAY */}
          <div className="flex-[3] relative bg-zinc-950 overflow-hidden border-r-2 border-[#003b11]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* TARGETING VECTOR */}
            {isLocked && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <line 
                  x1="45%" y1="45%" x2="60%" y2="25%" 
                  stroke="#ef4444" strokeWidth="1" strokeDasharray="10,5"
                  className="animate-[dash_2s_linear_infinite]"
                />
                <circle cx="52.5%" cy="35%" r="30" fill="none" stroke="#ef4444" strokeWidth="0.5" className="opacity-20 animate-ping" />
              </svg>
            )}

            {/* ASSET: DODGE SRT INTERCEPTOR (P-01) */}
            <div className="absolute top-[25%] left-[60%] flex flex-col items-center z-30 group cursor-help">
              <div className={`w-4 h-4 bg-blue-600 border-2 border-white shadow-[0_0_15px_rgba(37,99,235,0.8)] ${isLocked ? 'scale-125' : ''}`}></div>
              <div className="mt-2 bg-black/90 border border-blue-600 px-2 py-1">
                <span className="text-[9px] font-black text-blue-400 italic tracking-tighter">P-01_SRT_HELLCAT</span>
              </div>
            </div>

            {/* ASSET: GENERAL LEE (R-01) */}
            <div className="absolute top-[45%] left-[45%] flex flex-col items-center z-30 group">
              <div className={`w-5 h-5 bg-orange-600 rotate-45 border-2 border-white shadow-[0_0_15px_rgba(234,58,10,0.8)]`}></div>
              <div className="mt-2 bg-black/90 border border-orange-600 px-2 py-1">
                <span className="text-[9px] font-black text-orange-600 italic tracking-tighter">R-01_GEN_LEE</span>
              </div>
            </div>

            {/* RADAR OVERLAYS */}
            <div className="absolute top-4 left-4 border border-green-900/30 p-2 bg-black/40">
              <p className="text-[9px] text-green-900 font-black">ZOOM: 4.5X</p>
              <p className="text-[9px] text-green-900 font-black italic">AZIMUTH: 184°</p>
            </div>
            
            <div className="absolute bottom-4 right-4 text-right">
               <p className="text-[10px] text-zinc-800 font-black">LAT: 46.678 / LON: -109.781</p>
               <p className="text-[12px] text-white font-black italic">DIST: {distance} MI</p>
            </div>
          </div>

          {/* RIGHT: DATA & SCANNER SIDEBAR */}
          <div className="flex-1 bg-black p-4 flex flex-col gap-4 overflow-y-auto border-l-2 border-[#003b11]">
            
            {/* RADIO SCANNER */}
            <section className="border border-green-900 bg-green-900/5 p-3 rounded">
              <h2 className="text-[9px] font-black text-zinc-500 uppercase mb-2">VHF_SCANNER_LINK</h2>
              <div className="bg-black border border-green-900 p-2">
                <p className="text-xl text-green-400 font-black tracking-widest">{frequency} MHz</p>
              </div>
              <div className="flex gap-1 h-6 items-end mt-2 opacity-50">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="flex-1 bg-green-500 animate-pulse" style={{ height: `${Math.random() * 100}%` }}></div>
                ))}
              </div>
              <p className="text-[8px] text-green-800 text-center mt-2 font-black italic uppercase">WHEATLAND_DISPATCH_88</p>
            </section>

            {/* INTERCEPT MATH */}
            <section className={`border p-3 transition-colors ${isLocked ? 'border-red-900 bg-red-900/10' : 'border-zinc-900'}`}>
              <h2 className={`text-[9px] font-black uppercase mb-3 ${isLocked ? 'text-red-500' : 'text-zinc-700'}`}>Intercept_Vector</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-[8px] text-zinc-600 font-bold uppercase">Closure_Speed</p>
                  <p className="text-sm font-black text-white italic">14.2 ft/s</p>
                </div>
                <div>
                  <p className="text-[8px] text-zinc-600 font-bold uppercase">Estimated_ETA</p>
                  <p className="text-sm font-black text-white italic">03:48 MIN</p>
                </div>
              </div>
            </section>

            {/* FLEET QUICK STATS */}
            <section className="mt-auto border-t border-zinc-900 pt-4">
              <Link href="/manifest" className="block text-[10px] text-blue-500 hover:text-white font-black uppercase underline mb-4">
                View_Full_Manifest →
              </Link>
              <div className="text-[9px] text-zinc-800 space-y-1 font-bold italic">
                <p>SYNC: ENCRYPTED</p>
                <p>AUTH: SRT_COMMAND</p>
              </div>
            </section>

          </div>
        </div>

        {/* BOTTOM NAV BAR */}
        <div className="p-4 bg-black border-t-2 border-[#003b11] flex justify-between items-center">
          <Link href="/dashboard" className="text-xs font-black text-green-900 hover:text-white transition-colors uppercase italic underline decoration-2">
            ← ABORT_TO_DASHBOARD
          </Link>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-green-900">UPLINK_STABLE</span>
            </div>
            <span className="text-[10px] text-zinc-800 font-black uppercase">v.2.4.0-JUDITH</span>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
}