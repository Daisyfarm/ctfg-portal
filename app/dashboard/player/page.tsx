'use client';

import React, { useState } from 'react';

export default function FSNPlayerDashboard() {
  const [activeTab, setActiveTab] = useState<'market' | 'yards' | 'contracts'>('market');
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 p-6 font-sans">
      {/* FSN Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-4 mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white">COURT FARM // FSN COMMAND</h1>
          <p className="text-xs text-gray-400">Connected to the FSN network. Managing UK sector operations and cross-server trade pipelines.</p>
        </div>
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          {/* Currency Toggle */}
          <button 
            onClick={() => setCurrency(currency === 'USD' ? 'GBP' : 'USD')}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded border border-gray-700 font-medium transition-colors"
          >
            Currency: <span className="text-white font-bold">{currency === 'USD' ? 'USD ($)' : 'GBP (£)'}</span>
          </button>

          <span className="px-3 py-1 bg-green-950 border border-green-800 text-green-400 text-xs rounded font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            FSN NODE ONLINE
          </span>
          <span className="text-xs text-gray-400 bg-gray-900 px-3 py-1 rounded border border-gray-800">Sync: Active</span>
        </div>
      </header>

      {/* FSN Navigation Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-800 pb-3">
        <button 
          onClick={() => setActiveTab('market')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${activeTab === 'market' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
        >
          Global Market & Export
        </button>
        <button 
          onClick={() => setActiveTab('yards')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${activeTab === 'yards' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
        >
          Court Farm Yards
        </button>
        <button 
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${activeTab === 'contracts' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
        >
          Contracts & Haulage
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Panel Content */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-lg p-5">
          {activeTab === 'market' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">FSN Global Commodity Index</h2>
                <span className="text-xs text-gray-500">Live Feed</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="p-3">Commodity</th>
                      <th className="p-3">Pricing Index</th>
                      <th className="p-3">Export Demand</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800 text-gray-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Wheat</td>
                      <td className="p-3">{currency === 'USD' ? '$320.40 / t' : '£252.30 / t'}</td>
                      <td className="p-3 text-green-400">High Demand</td>
                      <td className="p-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">Synced</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Barley</td>
                      <td className="p-3">{currency === 'USD' ? '$295.10 / t' : '£232.40 / t'}</td>
                      <td className="p-3 text-yellow-400">Stable</td>
                      <td className="p-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">Synced</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Linseed / Rapeseed</td>
                      <td className="p-3">{currency === 'USD' ? '$540.80 / t' : '£425.80 / t'}</td>
                      <td className="p-3 text-green-400">Peak Export</td>
                      <td className="p-3"><span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded border border-green-800">Synced</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'yards' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Court Farm Yard Management</h2>
                <span className="text-xs text-gray-500">Banwell, Somerset</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-800/40 border border-gray-800 rounded flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-white">Main Court Farm Yard</h3>
                    <p className="text-xs text-gray-400">Primary grain storage, main workshop, and livestock sheds.</p>
                  </div>
                  <span className="text-xs bg-blue-900/40 text-blue-400 px-2.5 py-1 rounded border border-blue-800">Active</span>
                </div>
                <div className="p-3 bg-gray-800/40 border border-gray-800 rounded flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-white">Stonebridge Secondary Yard</h3>
                    <p className="text-xs text-gray-400">Secondary implement storage and fuel depot.</p>
                  </div>
                  <span className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded border border-gray-700">Standby</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Active Haulage & Transport Contracts</h2>
                <span className="text-xs text-gray-500">9 Sell Points Active</span>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="p-3 bg-gray-800/40 border border-gray-800 rounded flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">Grain Transport: Main Yard to Mill</p>
                    <p className="text-xs text-gray-400">Route: Regional Highway B3131</p>
                  </div>
                  <span className="text-xs text-green-400 font-mono">In Progress</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Network & Node Status Panel */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Node Telemetry</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400">Active Map</span>
                <span className="font-medium text-white">Court Farm (UK)</span>
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
                <span className="text-gray-400">Export Pipeline</span>
                <span className="font-medium text-blue-400">Automated</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => alert('Node data synchronized successfully!')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Refresh Node Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
