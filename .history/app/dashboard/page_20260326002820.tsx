"use client";
import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-zinc-800 pb-8 gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">IDA_CONGLOMERATE</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Satellite Uplink: Montana / Idaho Division</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 px-5 py-2 rounded-full flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-green-500 uppercase">System Active</span>
          </div>
        </div>

        {/* STAT CARD */}
        <div className="max-w-md bg-[#0f1117] border border-zinc-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden mb-12 border-l-4 border-l-blue-600">
          <p className="text-[9px] text-zinc-500 font-black uppercase mb-1">Chief Operator / Founder</p>
          <h2 className="text-4xl font-black italic mb-2">Samuel_Founder</h2>
          <p className="text-5xl font-black text-green-500 mb-6 tracking-tighter">$9,459,000</p>
        </div>

        {/* NAVIGATION - TARGETING THE OTHER FOLDERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/manifest" className="bg-zinc-900 border border-zinc-800 p-5 font-black text-[10px] uppercase tracking-widest text-center hover:bg-blue-900/40 hover:border-blue-500 transition-all flex items-center justify-center">
             LOG FUEL
          </Link>

          <Link href="/map" className="bg-zinc-900 border border-zinc-800 p-5 font-black text-[10px] uppercase tracking-widest text-center hover:bg-green-900/40 hover:border-green-400 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <span className="text-green-500">VIEW SATELLITE</span>
          </Link>

          <button className="bg-[#fbbf24] text-black p-5 font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all">
            Staff Panel
          </button>
        </div>

      </div>
    </div>
  );
}