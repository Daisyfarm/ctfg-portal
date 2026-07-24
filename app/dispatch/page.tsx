// app/dispatch/page.tsx
import React from 'react';
import { supabase } from '@/db/supabase';

async function getDispatches() {
  const { data, error } = await supabase
    .from('dispatches')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error || !data || data.length === 0) {
    return [
      { id: 1, message: '"Standby" — Sector 4-G Plowing Ops Protected.', status: 'ACTIVE', time: '10:00 AM' },
      { id: 2, message: 'Heavy Transport En Route to Sector 2.', status: 'COMPLETED', time: '08:30 AM' },
      { id: 3, message: 'Fuel Refill Authorized at Main Depot.', status: 'ARCHIVED', time: 'Yesterday' },
    ];
  }
  return data;
}

export default async function DispatchPage() {
  const dispatches = await getDispatches();

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
            <a href="/" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Dashboard</a>
            <a href="/dispatch" className="flex items-center px-3 py-2 rounded bg-gray-800 text-white font-medium text-sm">Dispatch Logs</a>
            <a href="/fleet" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Fleet Registry</a>
            <a href="/land" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Land Sectors</a>
          </nav>

          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Legal & Finance</div>
          <nav className="space-y-1">
            <a href="/contracts" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Contracts</a>
            <a href="/invoices" className="flex items-center px-3 py-2 rounded text-gray-400 hover:bg-gray-900 hover:text-white text-sm">Invoices</a>
          </nav>
        </div>

        <div className="text-xs text-gray-600">
          DAISY HILL TACTICAL | SECURE TERMINAL v2.0.26
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="border-b border-gray-800 p-6 flex justify-between items-center bg-[#0d0f17]">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">DISPATCH OPERATIONS</h2>
            <p className="text-xs text-gray-400">REAL-TIME COMMUNICATIONS & DIRECTIVES</p>
          </div>
          <div className="flex items-center space-x-2 border border-green-800 bg-green-950/30 px-3 py-1.5 rounded text-xs text-green-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>SYSTEM INTEGRITY: ACTIVE</span>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="border border-gray-800 bg-[#121520] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 font-bold text-sm tracking-wider uppercase text-gray-400">
              Active & Past Directives
            </div>
            <div className="divide-y divide-gray-800">
              {dispatches.map((item: any, idx: number) => (
                <div key={idx} className="p-4 flex justify-between items-center hover:bg-[#151925] transition">
                  <div className="space-y-1">
                    <div className="text-sm text-white font-medium">{item.message}</div>
                    <div className="text-xs text-gray-500 font-mono">LOGGED: {item.time || 'RECENT'}</div>
                  </div>
                  <div>
                    <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                      item.status === 'ACTIVE' ? 'bg-red-950/40 text-red-400 border border-red-900' : 'bg-gray-900 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
