"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JudithGapMap() {
  const [timestamp, setTimestamp] = useState("");
  const [frequency, setFrequency] = useState("460.125");
  
  // Real-time clock and frequency jitter for realism
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { hour12: false }));
      // Slight jitter in frequency for "live" effect
      const jitter = (Math.random() * 0.005).toFixed(3);
      setFrequency((460.125 + parseFloat(jitter)).toString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4">
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] h-[88vh] flex flex-col relative overflow-hidden shadow-[0_0_80px_rgba(0,255,65,0.1)]">
        
        {/* TOP HUD */}
        <div className="flex justify-between items-center bg-[#001a07] p-4 border-b border-[#003b11] z-10">
          <div>
            <h1 className="text-xl font-black tracking-widest text-white italic">IDA_TACTICAL_NETWORK</h1>
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Unit: Dodge_SRT_Intercept // Sector: Wheatland_MT</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-red-900/30 text-red-500 border border-red-900 px-3 py-1 font-black animate-pulse">
              SRT_PURSUIT_ENABLED
            </span>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          
          {/* RADAR / SATELLITE AREA */}
          <div className="flex-[3] relative bg-zinc-950 overflow-hidden border-r border-[#003b11]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* CROSSHAIR GRID */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="h-full w-[1px] bg-green-500 absolute left-1/2"></div>
              <div className="w-full h-[1px] bg-green-500 absolute top-1/2"></div>
            </div>

            {/* ASSET: DODGE SRT INTERCEPTOR (P-01) */}
            <div className="absolute top-[25%] left-[55%] flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-600 border border-white animate-pulse shadow-[0_0_20px_#2563eb]"></div>
              <div className="mt-2 bg-black/90 border border-blue-600 px-2 py-1">
                <span className="text-[8px] font-black text-blue-400">P-01: SRT_HELLCAT</span>
              </div>
            </div>

            {/* ASSET: GENERAL LEE (R-01) */}
            <div className="absolute top-[50%] left-[40%] flex flex-col items-center">
              <div className="w-4 h-4 bg-orange-600 rotate-45 border border-white shadow-[0_0_15px_#ea3a0a]"></div>
              <span className="text-[8px] font-black text-orange-600 bg-black mt-2 px-1">R-01: GEN_LEE</span>
            </div>
          </div>

          {/* TELEMETRY & SCANNER SIDEBAR */}
          <div className="flex-1 bg-black p-4 border-l border-[#003b11] flex flex-col gap-4">
            
            {/* POLICE SCANNER WIDGET */}
            <section className="border border-green-900 bg-green-900/5 p-3 rounded">
              <h2 className="text-[9px] font-black text-zinc-500 uppercase mb-3">VHF_Scanner_Link</h2>
              <div className="bg-black border border-green-900 p-2 mb-2">
                <p className="text-[10px] text-zinc-600 font-bold uppercase">Frequency</p>
                <p className="text-lg text-green-400 font-black tracking-widest">{frequency} MHz</p>
              </div>
              <div className="flex gap-1 h-8 items-end justify-between px-1">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-green-500 animate-pulse" 
                    style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
              <p className="text-[8px] text-green-900 text-center mt-2 font-black italic">Channel: WHEATLAND_DISPATCH_1</p>
            </section>

            {/* SRT TELEMETRY */}
            <section className="border border-blue-900 bg-blue-900/5 p-3 rounded">
              <h2 className="text-[9px] font-black text-blue-900 uppercase mb-2">P-01_Unit_Stats</h2>
              <div className="space-y-1">
                <p className="text-[10px] text-white">RPM: <span className="text-blue-400">6,200</span></p>
                <p className="text-[10px] text-white">GEAR: <span className="text-blue-400">4th</span></p>
                <p className="text-[10px] text-white">TRACTION: <span className="text-blue-400">TRACK_MODE</span></p>
              </div>
            </section>

          </div>
        </div>

        {/* FOOTER */}
        <div className="p-3 bg-black border-t border-[#003b11] flex justify-between items-center">
          <Link href="/dashboard" className="text-[10px] text-green-900 hover:text-white uppercase font-black underline">
            ← RETURN_TO_HQ
          </Link>
          <div className="text-right">
             <p className="text-[8px] text-zinc-800 font-black italic uppercase">Time_Stamp: {timestamp} MT</p>
          </div>
        </div>
      </div>
    </div>
  );
}