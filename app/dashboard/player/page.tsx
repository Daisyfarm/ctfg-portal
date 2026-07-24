import React from 'react';

export default function FSNPlayerDashboard() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 p-6 font-sans">
      {/* FSN Header Bar */}
      <header className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white">DAISY HILL FARMS // FSN COMMAND</h1>
          <p className="text-xs text-gray-400">Connected directly to the FSN network ecosystem. Monitoring cross-server trade routes and market pricing.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-green-950 border border-green-800 text-green-400 text-xs rounded font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            FSN NODE ONLINE
          </span>
          <span className="text-xs text-gray-400 bg-gray-900 px-3 py-1 rounded border border-gray-800">Sync: Active</span>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Market Board Panel */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">FSN Global Market & Export Board</h2>
            <span className="text-xs text-gray-500">Updated just now</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase">
                <tr>
                  <th className="p-3">Commodity</th>
                  <th className="p-3">Global Index</th>
                  <th className="p-3">Export Demand</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                <tr>
                  <td className="p-3 font-medium text-white">Wheat</td>
                  <td className="p-3">$320.40 / t</td>
                  <td className="p-3 text-green-400">High Demand</td>
                  <td className="p-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">Synced</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Barley</td>
                  <td className="p-3">$295.10 / t</td>
                  <td className="p-3 text-yellow-400">Stable</td>
                  <td className="p-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">Synced</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-white">Canola / Rapeseed</td>
                  <td className="p-3">$540.80 / t</td>
                  <td className="p-3 text-green-400">Peak Export</td>
                  <td className="p-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">Synced</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Network & Node Status Panel */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Node Telemetry</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Active Sector</span>
                <span className="font-medium text-white">UK / Court Farm Hub</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Server Latency</span>
                <span className="font-medium text-green-400">18 ms</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Database Engine</span>
                <span className="font-medium text-white">Prisma / PostgreSQL</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">Pipeline Mode</span>
                <span className="font-medium text-blue-400">Automated</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors">
              Refresh Node Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
