import React from 'react';

export default function CommandDashboard() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white p-6 font-sans">
      {/* Top Header */}
      <header className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-white">COMMAND DASHBOARD</h1>
          <p className="text-sm text-gray-400">SATELLITE UPLINK: MONTANA / IDAHO DIVISION</p>
        </div>
        <div className="bg-emerald-950 border border-emerald-600 text-emerald-400 px-3 py-1 rounded text-xs font-semibold tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM INTEGRITY: ACTIVE
        </div>
      </header>

      {/* Live Dispatch Alert */}
      <div className="bg-zinc-900 border border-red-900/50 p-4 rounded-lg mb-6 flex items-center gap-3">
        <span className="text-red-500 font-bold text-lg">📡</span>
        <p className="text-sm text-gray-300">
          <strong className="text-red-400 tracking-wide">LIVE DISPATCH:</strong> &ldquo;Standby&rdquo; — Sector 4-G Plowing Ops Protected.
        </p>
      </div>

      {/* User Stats Card */}
      <section className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-xl relative overflow-hidden mb-8 shadow-xl">
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-1">Chief Operator / Founder</p>
          <h2 className="text-3xl font-extrabold text-white mb-3">Samuel_Founder</h2>
          <div className="text-4xl font-black text-emerald-400 mb-4">$9,459,000</div>
          
          <div className="flex gap-6 text-xs font-medium uppercase tracking-wider text-zinc-400">
            <div>EID Status: <span className="text-emerald-400 font-bold">Verified</span></div>
            <div>Rank: <span className="text-amber-400 font-bold">Executive</span></div>
          </div>
        </div>
      </section>

      {/* Action Buttons Grid */}
      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200 font-semibold py-4 px-6 rounded-lg border border-zinc-700 text-sm tracking-wide">
          REQUEST DISPATCH
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200 font-semibold py-4 px-6 rounded-lg border border-zinc-700 text-sm tracking-wide">
          LOG FUEL
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200 font-semibold py-4 px-6 rounded-lg border border-zinc-700 text-sm tracking-wide">
          VIEW SATELLITE
        </button>
        <button className="bg-amber-500 hover:bg-amber-400 transition text-black font-bold py-4 px-6 rounded-lg shadow-lg text-sm tracking-wide">
          STAFF PANEL
        </button>
      </nav>

      {/* Footer Terminal ID */}
      <footer className="mt-16 text-center text-xs text-zinc-600 tracking-widest">
        DAISY HILL FARMING NETWORK | SECURE TERMINAL V2.0.26
      </footer>
    </main>
  );
}
