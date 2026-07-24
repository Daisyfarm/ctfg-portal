"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InvestmentPortal() {
  const [goalProgress, setGoalProgress] = useState(0);
  
  // Simulation: Set this to your actual monthly progress (e.g., $15 out of $60)
  useEffect(() => {
    setTimeout(() => setGoalProgress(25), 500); // 25% of goal reached
  }, []);

  const tiers = [
    { 
      name: "Field Operator", 
      price: "$5", 
      desc: "Standard Entry Level",
      perks: ["Custom Truck/Tractor Skin", "Priority Server Slot", "Discord 'Operator' Role"],
      color: "border-zinc-800",
      btn: "Join_Fleet"
    },
    { 
      name: "Sector Mayor", 
      price: "$15", 
      desc: "Regional Governance",
      perks: ["Control a 4X Map Sector", "Tax Collection Rights", "Custom Town Name", "Staff Channel Access"],
      color: "border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.2)]",
      btn: "Claim_Sector"
    },
    { 
      name: "Board Member", 
      price: "$50", 
      desc: "Executive Oversight",
      perks: ["Global Admin Access", "Direct Mod Input", "Founder Private Line", "Website Wall of Fame"],
      color: "border-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.2)]",
      btn: "Partner_With_IDA"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      
      {/* BACKGROUND SCANLINES */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-0 bg-[length:100%_4px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">Corporate_Expansion_Fund</h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Secure External Investment // Ver_2026.03</p>
          </div>
          <Link href="/dashboard" className="text-[10px] font-black bg-zinc-900 border border-zinc-800 px-6 py-3 hover:bg-white hover:text-black transition-all rounded uppercase">
            Return_to_Command
          </Link>
        </div>

        {/* TORNADO EMERGENCY RECOVERY BOX */}
        <div className="mb-12 bg-red-950/20 border-2 border-red-600/50 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
                <div className="text-3xl animate-bounce">🌪️</div>
                <div>
                    <h3 className="text-lg font-black text-red-500 uppercase italic">Emergency_Asset_Recovery</h3>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Tractor Flipped? Tornado Damage? Get a Professional Reset.</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white mb-1">$2.00</span>
                <a href="https://paypal.me/YOUR_ID" className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 font-black text-[10px] uppercase italic tracking-tighter transition-all rounded">Initialize_Reset</a>
            </div>
        </div>

        {/* MONTHLY GOAL METER */}
        <div className="mb-16 bg-[#0f1117] border border-zinc-800 p-8 rounded-2xl relative">
            <div className="flex justify-between items-end mb-4">
                <h4 className="text-xs font-black uppercase text-zinc-500 tracking-widest text-blue-500">Monthly_Operational_Goal</h4>
                <span className="text-[10px] font-mono text-zinc-500">$15.00 / $60.00 USD</span>
            </div>
            <div className="w-full h-4 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                    style={{ width: `${goalProgress}%` }}
                ></div>
            </div>
            <p className="mt-4 text-[9px] text-zinc-600 uppercase font-bold text-center">Funds contribute to FS25 Dedicated Servers, ATS DLCs, and Domain Hosting.</p>
        </div>

        {/* TIERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`bg-[#0f1117] border-2 ${tier.color} p-8 rounded-2xl flex flex-col justify-between hover:translate-y-[-10px] transition-all duration-300 group`}>
              <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black italic uppercase text-white group-hover:text-blue-400 transition-colors">{tier.name}</h3>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">{tier.desc}</p>
                <div className="text-4xl font-black text-white mb-8 tabular-nums">{tier.price}<span className="text-xs text-zinc-600 font-bold uppercase ml-2">/ month</span></div>
                
                <ul className="space-y-4 mb-10">
                  {tier.perks.map(perk => (
                    <li key={perk} className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {perk}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a 
                href="https://paypal.me/YOUR_ID" 
                className="w-full bg-white text-black py-4 font-black text-[11px] uppercase italic tracking-tighter hover:bg-blue-500 hover:text-white transition-all text-center rounded-lg shadow-xl"
              >
                {tier.btn}
              </a>
            </div>
          ))}
        </div>

        {/* DISCLAIMER */}
        <div className="mt-16 text-center text-[8px] text-zinc-700 uppercase font-mono tracking-[0.4em]">
            Non-Refundable Investment // IDA_SYSTEMS_GLOBAL // 2026.03.26
        </div>

      </div>
    </div>
  );
}
