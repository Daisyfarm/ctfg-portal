"use client";
import React from 'react';
import Link from 'next/link';

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      
      {/* BACKGROUND SCANLINES */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-0 bg-[length:100%_4px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">Financial_Ledger // Judith_Plains</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Global Network Vault // Balance: $8,100,000.00</p>
          </div>
          <Link href="/" className="text-[10px] font-black bg-zinc-900 border border-zinc-800 px-6 py-3 hover:bg-white hover:text-black transition-all rounded uppercase">
            Return_to_Command
          </Link>
        </div>

        {/* FINANCIAL STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0f1117] border border-zinc-800 p-6 rounded-xl">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Net Capital</span>
            <div className="text-2xl font-black text-emerald-400 mt-2">$8,100,000.00</div>
          </div>
          <div className="bg-[#0f1117] border border-zinc-800 p-6 rounded-xl">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Active Fleet Maintenance</span>
            <div className="text-2xl font-black text-red-400 mt-2">-$14,500.00 / mo</div>
          </div>
          <div className="bg-[#0f1117] border border-zinc-800 p-6 rounded-xl">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sector Tax Revenue</span>
            <div className="text-2xl font-black text-blue-400 mt-2">+$42,800.00 / mo</div>
          </div>
        </div>

        {/* TRANSACTION LOG TABLE */}
        <div className="bg-[#0f1117] border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-xs font-black uppercase text-zinc-400 tracking-widest mb-6">Recent Network Transactions</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
              <div>
                <div className="text-xs font-black uppercase text-white">Sector 4X Tax Collection</div>
                <div className="text-[10px] text-zinc-500">Source: Regional Governance // Automated</div>
              </div>
              <div className="text-sm font-mono font-black text-emerald-400">+$12,400.00</div>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
              <div>
                <div className="text-xs font-black uppercase text-white">Dedicated Server Upkeep</div>
                <div className="text-[10px] text-zinc-500">Destination: Node Hosting Provider</div>
              </div>
              <div className="text-sm font-mono font-black text-red-400">-$150.00</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs font-black uppercase text-white">External Investment Payout</div>
                <div className="text-[10px] text-zinc-500">Source: Board Member Tier</div>
              </div>
              <div className="text-sm font-mono font-black text-emerald-400">+$50.00</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
