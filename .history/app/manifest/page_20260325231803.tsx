"use client";
import React from 'react';
import Link from 'next/link';

export default function FleetManifest() {
  const assets = [
    {
      id: "R-01",
      name: "GENERAL LEE",
      type: "1969 Charger",
      status: "OPERATIONAL",
      cargo: "VHF_RADIO_KIT",
      fuel: "78%",
      tires: "32 PSI",
      lastService: "2026-03-20"
    },
    {
      id: "P-01",
      name: "SRT INTERCEPTOR",
      type: "Dodge SRT Hellcat",
      status: "PATROL",
      cargo: "TACTICAL_GEAR",
      fuel: "92%",
      tires: "35 PSI",
      lastService: "2026-03-24"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4 sm:p-8">
      <div className="max-w-5xl mx-auto border-2 border-[#003b11] bg-[#050505] shadow-[0_0_40px_rgba(0,59,17,0.4)]">
        
        {/* HEADER */}
        <div className="p-6 border-b-2 border-[#003b11] bg-black flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic text-white">FLEET_MANIFEST</h1>
            <p className="text-xs text-green-900 font-bold uppercase mt-1">IDA_Logistics_Division // Wheatland_Unit</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-700 font-black">LOG_ID: 88-ALPHA</p>
          </div>
        </div>

        {/* ASSET TABLE */}
        <div className="p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-green-900 text-zinc-500 text-[10px] uppercase font-black">
                <th className="pb-2">ID</th>
                <th className="pb-2">Unit_Name</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Cargo_Load</th>
                <th className="pb-2 text-right">Fuel</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-zinc-900 hover:bg-green-900/5 transition-colors">
                  <td className="py-4 font-black text-green-800">{asset.id}</td>
                  <td className="py-4">
                    <p className="font-black text-white">{asset.name}</p>
                    <p className="text-[10px] text-zinc-600">{asset.type}</p>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-[9px] font-black border ${
                      asset.status === 'PATROL' ? 'border-blue-900 text-blue-500' : 'border-green-900 text-green-500'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-4 text-[11px] italic text-zinc-400">{asset.cargo}</td>
                  <td className="py-4 text-right font-black text-white">{asset.fuel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER NAV */}
        <div className="p-6 border-t border-[#003b11] bg-black flex justify-between">
          <Link href="/map" className="text-xs font-black text-green-900 hover:text-green-400 transition-colors uppercase underline">
            ← RETURN_TO_TACTICAL_MAP
          </Link>
          <div className="flex gap-4">
             <span className="text-[10px] text-zinc-800 font-black">DB_SYNC: OK</span>
             <span className="text-[10px] text-zinc-800 font-black">AUTH: SRT_LEVEL_4</span>
          </div>
        </div>

      </div>
    </div>
  );
}