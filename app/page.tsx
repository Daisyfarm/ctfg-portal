// app/page.tsx
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#090a0f] text-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-800 bg-[#0d0f17] flex flex-col justify-between p-6">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold tracking-wider text-amber-500">DAISY HILL</h1>
            <p className="text-xs text-gray-400 tracking-widest">TACTICAL COMMAND</p>
          </div>
          
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Operations</div>
          <nav className="space-y-1 mb-6">
            <a href="#" className="flex items-center px-3 py-2 rounded bg-gray-800 text-white font-medium text-sm">Dashboard</a>
            <a href="#" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">War Theatre</a>
            <a href="#" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Sectors</a>
            <a href="#" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Fleet Registry</a>
          </nav>

          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Legal & Finance</div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Board Vault</a>
            <a href="#" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Asset Auction</a>
            <a href="#" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Maintenance</a>
          </nav>
        </div>

        <div className="text-xs text-gray-600">
          DAISY HILL TACTICAL | SECURE TERMINAL v2.0.26
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header Bar */}
        <header className="border-b border-gray-800 p-6 flex justify-between items-center bg-[#0d0f17]">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">COMMAND DASHBOARD</h2>
            <p className="text-xs text-gray-400">SATELLITE UPLINK: MONTANA / DAISY HILL DIVISION</p>
          </div>
          <div className="flex items-center space-x-2 border border-green-800 bg-green-950/30 px-3 py-1.5 rounded text-xs text-green-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>SYSTEM INTEGRITY: ACTIVE</span>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 space-y-6">
          {/* Live Dispatch Alert Banner */}
          <div className="border border-red-900/50 bg-red-950/20 p-4 rounded text-sm text-red-300 flex items-center space-x-3">
            <span className="font-bold uppercase tracking-wider text-red-400">Live Dispatch:</span>
            <span>"Standby" — Sector 4-G Plowing Ops Protected.</span>
          </div>

          {/* Operator Card */}
          <div className="border border-gray-800 bg-[#121520] p-6 rounded-lg relative overflow-hidden">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Chief Operator / Founder</div>
            <div className="text-3xl font-extrabold text-white mb-2">Samuel_Founder</div>
            <div className="text-3xl font-mono font-bold text-green-400 mb-6">$9,459,000</div>
            <div className="flex space-x-6 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">EID STATUS</span>
                <span className="text-green-400 font-bold">VERIFIED</span>
              </div>
              <div>
                <span className="text-gray-500 block">RANK</span>
                <span className="text-amber-400 font-bold">EXECUTIVE</span>
              </div>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-4">
            <button className="border border-gray-700 bg-[#151925] hover:bg-[#1c2233] p-4 rounded font-medium text-sm transition text-center">
              REQUEST DISPATCH
            </button>
            <button className="border border-gray-700 bg-[#151925] hover:bg-[#1c2233] p-4 rounded font-medium text-sm transition text-center">
              LOG FUEL
            </button>
            <button className="border border-gray-700 bg-[#151925] hover:bg-[#1c2233] p-4 rounded font-medium text-sm transition text-center">
              VIEW SATELLITE
            </button>
            <button className="border border-amber-600/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 p-4 rounded font-medium text-sm transition text-center">
              STAFF PANEL
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
