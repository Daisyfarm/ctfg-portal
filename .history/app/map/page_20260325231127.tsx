"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JudithGapMap() {
  const [timestamp, setTimestamp] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [distance, setDistance] = useState("1.2");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString('en-US', { hour12: false }));
      // Randomly fluctuate distance for realism
      setDistance((1.2 + Math.random() * 0.5).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4">
      <div className="max-w-7xl mx-auto border-4 border-[#003b11] h-[90vh] flex flex-col relative overflow-hidden shadow-[0_0_80px_rgba(0,255,65,0.15)]">
        
        {/* SCANLINE EFFECT */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50"></div>

        {/* HEADER */}
        <div className="flex justify-between items-center bg-[#001a07] p-4 border-b-2 border-[#003b11] z-10">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white italic">IDA_TACTICAL_OVERLAY</h1>
            <p className="text-[10px] text-green-500 font-bold uppercase">Targeting_System: Online // SRT_Interception_Grid</p>
          </div>
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className={`px-6 py-2 border-2 font-black transition-all ${isLocked ? 'bg-red-600 border-white text-white animate-pulse' : 'bg-black border-red-900 text-red-900'}`}
          >
            {isLocked ? 'TARGET_LOCKED' : 'ENGAGE_LOCK'}
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          
          {/* RADAR MAP AREA */}
          <div className="flex-[3] relative bg-zinc-950 overflow-hidden border-r border-[#003b11]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {/* TARGETING VECTOR LINE */}
            {isLocked && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <line 
                  x1="45%" y1="40%" x2="60%" y2="25%" 
                  stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"
                  className="animate-[dash_2s_linear_infinite]"
                />
                <circle cx="52.5%" cy="32.5%" r="20" fill="none" stroke="#ef4444" strokeWidth="1" className="opacity-30 animate-ping" />
              </svg>
            )}

            {/* ASSET: DODGE SRT INTERCEPTOR (P-01) */}
            <div className="absolute top-[25%] left-[60%] flex flex-col items-center z-30">
              <div className={`w-4 h-4 bg-blue-600 border-2 border-white ${isLocked ? 'shadow-[0_0_20px_#2563eb]' : ''}`}></div>
              <span className="text-[9px] font-black text-blue-500 bg-black mt-2 border border-blue-900 px-2">P-01: SRT_HELLCAT</span>
            </div>

            {/* ASSET: GENERAL LEE (R-01) */}
            <div className="absolute top-[40%] left-[45%] flex flex-col items-center z-30">
              <div className={`w-5 h-5 bg-orange-600 rotate-45 border-2 border-white ${isLocked ? 'shadow-[0_0_20px_#ea3a0a]' : ''}`}></div>
              <span className="text-[9px] font-black text-orange-600 bg-black mt-2 border border-orange-900 px-2">R-01: GEN_LEE</span>
            </div>

            {/* RADAR SWEEP UI */}
            <div className="absolute bottom-6 left-6 text-green-900 font-black text-xs space-y-1">
              <p>GRID_REF: 46.68 / -109.78</p>
              <p>WIND: 22MPH NW</p>
              <p className={isLocked ? "text-red-500" : ""}>VECTOR_DIST: {distance} MI</p>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex-1 bg-black p-4 border-l border-[#003b11] flex flex-col gap-6">
            
            {/* INTERCEPT DATA */}
            <section className="border border-red-900 bg-red-900/10 p-4">
              <h2 className="text-[10px] font-black text-red-500 uppercase mb-4 border-b border-red-900 pb-1">Intercept_Math</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase">Closure_Rate</p>
                  <p className="text-xl text-white font-black">14.2 FPS</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase">Estimated_Contact</p>
                  <p className="text-xl text-white font-black">04:12 MIN</p>
                </div>
              </div>
            </section>

            {/* SCANNER FEED */}
            <section className="border border-green-900 p-4">
              <h2 className="text-[9px] font-black text-green-900 uppercase mb-2">Radio_Link</h2>
              <div className="flex gap-1 h-12 items-end mb-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex-1 bg-green-500 opacity-50 animate-pulse" style={{ height: `${Math.random() * 100}%` }}></div>
                ))}
              </div>
              <p className="text-[10px] text-white font-bold italic">DISPATCH: "Unit P-01, hold position at Gap Pass..."</p>
            </section>

          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-black border-t-2 border-[#003b11] flex justify-between items-center">
          <Link href="/dashboard" className="text-[10px] text-green-900 hover:text-white uppercase font-black underline decoration-2">
            ← ABORT_TO_DASHBOARD
          </Link>
          <div className="text-right">
             <p className="text-[9px] text-zinc-700 font-black">ENCRYPTION: GAP_SRT_SECURE</p>
             <p className="text-[9px] text-zinc-500 font-bold uppercase italic">{timestamp} MT</p>
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