"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const FullCommandCenter = () => {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { name: 'Fleet Registry', path: '/fleet', icon: '🚜', status: 'ACTIVE' },
    { name: 'Moonshine Still', path: '/still', icon: '🥃', status: 'RUNNING' },
    { name: 'Asset Garage', path: '/garage', icon: '🔧', status: 'TUNING' },
    { name: 'Global Market', path: '/market', icon: '💹', status: 'STABLE' },
    { name: 'Service Audit', path: '/oversight', icon: '🛡️', status: '1_ALERT' },
    { name: 'The Vault', path: '/vault', icon: '🔒', status: 'SECURE' },
  ];

  const newsAlerts = [
    "LOCAL: Sheriff Rosco spotted near Sector-A1. General Lee advised to maintain speed.",
    "MARKET: Wheat prices surging 4.2% following IDA export clearance.",
    "SYSTEM: External AI subscription 'CTF_PORTAL' marked for termination - Support unresponsive.",
    "WEATHER: Storm front approaching. All heavy assets move to Hazzard Garage."
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-zinc-400 font-mono p-4 farm-grid">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP SYSTEM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-black border border-zinc-800 p-4 shadow-2xl">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase">IDA_COMMAND</h1>
              <p className="text-[10px] text-yellow-600 font-bold tracking-[0.3em]">OS_VERSION_2.6.0</p>
            </div>
            <div className="hidden md:block border-l border-zinc-800 pl-6">
              <p className="text-[9px] font-black uppercase text-zinc-600">Current_Uplink</p>
              <p className="text-xs font-bold text-green-500">SECURE_ENCRYPTED</p>
            </div>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-2xl font-black italic text-white tracking-widest">{time}</p>
            <p className="text-[9px] font-black text-zinc-700 uppercase">Hazzard_Standard_Time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT: QUICK NAV */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuItems.map((item, i) => (
              <Link href={item.path} key={i} className="group">
                <div className="bg-zinc-900/20 border border-zinc-800 p-6 hover:border-yellow-600 transition-all cursor-pointer relative overflow-hidden h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                    <span className={`text-[8px] font-black px-1 ${item.status === '1_ALERT' ? 'bg-red-600 text-white animate-pulse' : 'bg-zinc-800 text-zinc-500'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-black italic text-white group-hover:text-yellow-500 transition-colors uppercase underline decoration-zinc-800 group-hover:decoration-yellow-600">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT: LIVE FEED */}
          <div className="bg-black border border-zinc-800 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl font-black italic uppercase">Feed</div>
            <h2 className="text-xs font-black text-zinc-500 mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">Intelligence_Report</h2>
            <div className="space-y-6">
              {newsAlerts.map((alert, i) => (
                <div key={i} className="border-l-2 border-yellow-600/30 pl-4 py-1">
                  <p className="text-[10px] leading-relaxed font-bold text-zinc-400 uppercase italic">
                    {alert}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM TICKER */}
        <div className="bg-yellow-600/5 border border-yellow-600/20 p-2 overflow-hidden relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <p key={i} className="text-[10px] font-black text-yellow-700 uppercase tracking-[0.2em]">
                MARKET_DATA: WHEAT (+2.4%) // CORN (-0.8%) // FUEL_RESERVES (88%) // DISTILLERY_OUTPUT (ACTIVE) // SECURITY_STATUS (GREEN)
              </p>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FullCommandCenter;