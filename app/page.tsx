"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans relative overflow-hidden">
      {/* Background scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-0 bg-[length:100%_4px]"></div>

      {/* Top Bar / Navbar */}
      <header className="bg-[#0b0e14] border-b border-zinc-800 px-6 py-4 text-zinc-400 text-xs font-bold uppercase tracking-wider relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-white font-black">FARM NETWORK</span>
            <span className="text-zinc-600">|</span>
            <span>Samuel Founder (#001)</span>
            <span className="text-zinc-600">|</span>
            <span className="text-emerald-400">Judith Plains Network $8,100,000 (16 Slots)</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> NORTH: ONLINE</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SOUTH: ONLINE</span>
            <span className="text-zinc-500">2026-07-24 18:24</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto flex gap-8 mt-6 border-t border-zinc-800/80 pt-4 overflow-x-auto">
          <Link href="/myself" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Myself</Link>
          <Link href="/interactions" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Interactions</Link>
          <Link href="/finance" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Finance</Link>
          <Link href="/data" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Data</Link>
          <Link href="/market" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Market</Link>
          <Link href="/wiki" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Wiki</Link>
          <Link href="/settings" className="hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">Settings</Link>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tight text-white">Judith Plains Montana 4X // Command Hub</h1>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Multi-node operations, agricultural telemetry, and infrastructure management.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/investment-center" className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-5 py-3 rounded uppercase tracking-wider transition-all">
              Investment Center
            </Link>
            <Link href="/registration" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-black text-xs px-5 py-3 rounded uppercase tracking-wider transition-all">
              Registration
            </Link>
          </div>
        </div>

        {/* Grid Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f1117] border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sector Status</span>
            <h3 className="text-lg font-black text-white mt-1 uppercase">North Node (Slots 1-8)</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Active farming operations, high-yield fields, and automated heavy machinery tracking.</p>
            <div className="mt-6">
              <Link href="/data" className="text-xs font-black text-blue-400 hover:underline uppercase tracking-wider">View Telemetry →</Link>
            </div>
          </div>

          <div className="bg-[#0f1117] border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sector Status</span>
            <h3 className="text-lg font-black text-white mt-1 uppercase">South Node (Slots 9-16)</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Secondary logistics hub, storage silos, and secondary crop production cycles.</p>
            <div className="mt-6">
              <Link href="/data" className="text-xs font-black text-blue-400 hover:underline uppercase tracking-wider">View Telemetry →</Link>
            </div>
          </div>

          <div className="bg-[#0f1117] border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Treasury Vault</span>
            <h3 className="text-lg font-black text-emerald-400 mt-1 uppercase">$8,100,000.00</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Global network balance, maintenance overhead deduction, and automated tax revenue.</p>
            <div className="mt-6">
              <Link href="/finance" className="text-xs font-black text-blue-400 hover:underline uppercase tracking-wider">Open Ledger →</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
