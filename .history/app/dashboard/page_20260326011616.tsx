"use client";
import React from 'react';
import Link from 'next/link';

export default function DashboardHub() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      
      {/* --- BACKGROUND LAYER: THE ASSIMILATED XERION --- */}
      {/* Ensure you have 'xerion-hero.jpg' in your /public folder */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 shadow-[inset_0_0_200px_rgba(0,0,0,1)]"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(5, 7, 10, 0.9), rgba(5, 7, 10, 0.7)), url('/xerion-hero.jpg')` }}
      />

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* TOP NAVIGATION / STATUS */}
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800/50 pb-6">
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase text-zinc-100">IDA_CONGLOMERATE</h1>
            <p className="text-[9px] text-zinc-500 font-bold tracking-[0.3em] uppercase">Montana / Idaho Operational Hub</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </div>

        {/* FOUNDER CARD - THE CORE STATS */}
        <div className="max-w-md bg-[#0f1117]/90 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-2xl relative mb-16 border-l-4 border-l-blue-600">
          <div className="absolute top-4 right-4 text-[8px] font-black text-zinc-700 uppercase tracking-widest">Authorized_Only</div>
          <p className="text-[9px] text-zinc-500 font-black uppercase mb-1">Chief Operator / Founder</p>
          <h2 className="text-3xl font-black italic mb-2 tracking-tight">Samuel_Founder</h2>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-green-500 tracking-tighter">$9,459,000</span>
            <span className="text-xs text-zinc-600 font-bold uppercase italic">Credits</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-blue-600 shadow-[0_0_10px_#2563eb]"></div>
          </div>
        </div>

        {/* ACTION GRID - NAVIGATION TO SEPARATE PAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-50">
          
          {/* 1. DISPATCH (LOCKED) */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 font-black text-[10px] uppercase tracking-widest opacity-30 cursor-not-allowed flex items-center justify-center rounded text-zinc-600">
            Request Dispatch
          </div>
          
          {/* 2. LOGISTICS MANIFEST (GRAIN / ANIMALS) */}
          <Link 
            href="/manifest" 
            className="bg-[#1a1c23]/80 backdrop-blur-sm border border-zinc-800 p-6 font-black text-[10px] uppercase tracking-widest text-center hover:bg-blue-900/40 hover:border-blue-500 transition-all flex items-center justify-center cursor-pointer rounded group"
          >
             <span className="group-hover:text-blue-400 group-hover:scale-110 transition-transform">Log Logistics</span>
          </Link>

          {/* 3. SATELLITE UPLINK (MAP SECTORS) */}
          <Link 
            href="/map" 
            className="bg-[#1a1c23]/80 backdrop-blur-sm border border-zinc-800 p-6 font-black text-[10px] uppercase tracking-widest text-center hover:bg-green-900/40 hover:border-green-400 transition-all flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.1)] cursor-pointer rounded group"
          >
            <span className="text-green-500 group-hover:text-green-300 group-hover:scale-110 transition-transform">View Satellite</span>
          </Link>

          {/* 4. STAFF PANEL (ADMIN ONLY) */}
          <Link 
            href="/admin" 
            className="bg-[#fbbf24] text-black p-6 font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl flex items-center justify-center cursor-pointer rounded"
          >
            Staff Panel
          </Link>

        </div>

        {/* FOOTER ENCRYPTED DATA */}
        <div className="mt-24 flex justify-between items-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
          <p className="text-[8px] font-mono tracking-widest uppercase">ID_AUTH_099128_SAMUEL</p>
          <p className="text-[8px] font-mono tracking-widest uppercase italic text-blue-500">Terminal Connection Verified</p>
        </div>

      </div>
    </div>
  );
}