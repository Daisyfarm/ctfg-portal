"use client";
import React from 'react';
import Link from 'next/link';

export default function RootDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <main className="p-4 sm:p-8 max-w-6xl mx-auto">
        
        {/* TOP HUD */}
        <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight italic">IDA_CONGLOMERATE</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Satellite Uplink: Montana / Idaho Division</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-green-500 uppercase">System Integrity: Active</span>
          </div>
        </div>

        {/* DISPATCH ALERT */}
        <div className="bg-red-950/20 border border-red-900/50 p-3 mb-8 flex items-center gap-4">
          <span className="text-red-500 animate-pulse">📡</span>
          <p className="text-xs font-bold text-red-500 italic uppercase tracking-tighter">
            Live Dispatch: <span className="text-white text-[10px]">"Standby" — Sector 4-G Plowing Ops Protected.</span>
          </p>
        </div>

        {/* FOUNDER PROFILE CARD */}
        <div className="max-w-md bg-gradient-to-br from-[#1a1c23] to-[#111218] border border-zinc-800 p-8 rounded-xl shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <p className="text-[9px] text-zinc-500 font-black uppercase mb-1">Chief Operator / Founder</p>
          <h2 className="text-3xl font-black mb-1 italic">Samuel_Founder</h2>
          <p className="text-4xl font-black text-green-500 mb-6 tracking-tighter">$9,459,000</p>
          <div className="flex gap-6 text-[10px] font-black uppercase">
            <span className="text-green-600">EID: Verified</span>
            <span className="text-orange-500">Rank: Executive</span>
          </div>
          <div className="absolute bottom-[-10px] right-4 opacity-10 text-6xl">🚜</div>
        </div>

        {/* ACTION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-zinc-900 border border-zinc-800 p-4 font-black text-[10px] uppercase tracking-widest opacity-50 cursor-not-allowed">
            Request Dispatch
          </button>
          
          <Link href="/manifest" className="bg-zinc-900 border border-zinc-800 p-4 font-black text-[10px] uppercase tracking-widest text-center hover:bg-blue-900/40 hover:border-blue-500 transition-all">
            Log Fuel
          </Link>

          <Link href="/map" className="bg-zinc-900 border border-zinc-800 p-4 font-black text-[10px] uppercase tracking-widest text-center hover:bg-green-900/40 hover:border-green-500 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            View Satellite
          </Link>

          <button className="bg-yellow-500 text-black p-4 font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all">
            Staff Panel
          </button>
        </div>

      </main>
    </div>
  );
}