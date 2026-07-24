"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TreasuryPage() {
  const [balance, setBalance] = useState(9459000);

  // Simulation: Passive Income from Farmers/Truckers
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const marketPrices = [
    { crop: "Wheat", price: "$980", trend: "+2.4%", up: true },
    { crop: "Canola", price: "$1,420", trend: "-1.1%", up: false },
    { crop: "Rice (FS25)", price: "$2,100", trend: "+5.8%", up: true },
    { crop: "Soybeans", price: "$3,200", trend: "+0.4%", up: true },
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-8 font-sans relative overflow-hidden">
      
      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b border-zinc-800 pb-6 mb-12">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-green-500 uppercase">IDA_TREASURY</h1>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Financial Asset Management // V.9.2</p>
          </div>
          <Link href="/dashboard" className="text-[10px] font-black bg-zinc-900 border border-zinc-800 px-4 py-2 hover:bg-white hover:text-black transition-all rounded">
            RETURN_TO_HUB
          </Link>
        </div>

        {/* LIVE BALANCE CARD */}
        <div className="bg-[#0f1117] border border-zinc-800 p-10 rounded-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className="text-[8px] font-black text-green-500/50 uppercase animate-pulse">Live_Uplink_Streaming</span>
          </div>
          <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Total Conglomerate Liquidity</p>
          <h2 className="text-6xl font-black tracking-tighter text-white tabular-nums">
            ${balance.toLocaleString()}
          </h2>
          <div className="mt-6 flex gap-4">
            <div className="px-3 py-1 bg-green-950 text-green-400 text-[9px] font-black rounded border border-green-900">NET_PROFIT: +14.2%</div>
            <div className="px-3 py-1 bg-blue-950 text-blue-400 text-[9px] font-black rounded border border-blue-900">OPERATIONAL: 100%</div>
          </div>
        </div>

        {/* MARKET PRICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketPrices.map((item) => (
            <div key={item.crop} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 transition-all group">
              <p className="text-[9px] font-black text-zinc-600 uppercase mb-1 tracking-widest">{item.crop}</p>
              <div className="flex justify-between items-end">
                <span className="text-xl font-black italic">{item.price}</span>
                <span className={`text-[10px] font-black ${item.up ? 'text-green-500' : 'text-red-500'}`}>
                  {item.trend}
                </span>
              </div>
              <div className="mt-4 w-full h-[2px] bg-zinc-800 overflow-hidden">
                <div className={`h-full ${item.up ? 'bg-green-500' : 'bg-red-500'} w-2/3`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* ASSET LIST */}
        <div className="mt-12 bg-zinc-950 border border-zinc-900 p-8 rounded-xl">
            <h3 className="text-xs font-black uppercase text-zinc-500 mb-6 tracking-widest">Fixed_Asset_Inventory</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-zinc-900 pb-3 font-bold">
                    <span className="text-zinc-400 uppercase">Claas Xerion 5000 (Fleet x4)</span>
                    <span className="text-white">$1,840,000</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-900 pb-3 font-bold">
                    <span className="text-zinc-400 uppercase">Montana Grain Elevator #2</span>
                    <span className="text-white">$3,200,000</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-zinc-900 pb-3 font-bold">
                    <span className="text-zinc-400 uppercase">Peterbilt 579 Fleet (ATS)</span>
                    <span className="text-white">$950,000</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}