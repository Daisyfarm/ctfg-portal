import React from 'react';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Top Navigation / Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold tracking-wider text-emerald-400">FSN</span>
                        <nav className="hidden md:flex space-x-6 text-sm text-slate-400">
                            <span className="text-white font-medium cursor-pointer">Myself</span>
                            <span className="hover:text-white cursor-pointer">Interactions</span>
                            <span className="hover:text-white cursor-pointer">Finances</span>
                            <span className="hover:text-white cursor-pointer">Data</span>
                            <span className="hover:text-white cursor-pointer">Market</span>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                            <span className="text-emerald-400 font-semibold">Cool Brook Farms (CBF)</span>
                        </div>
                        <div className="text-slate-400">$77,987.70 (IG)</div>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left/Main Column: Owned Property & Asset Management */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">Owned Property</h2>
                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Active Asset</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                                        <th className="py-3 px-4">UID</th>
                                        <th className="py-3 px-4">Server</th>
                                        <th className="py-3 px-4">Fields / Details</th>
                                        <th className="py-3 px-4">Base Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 text-sm">
                                    <tr className="hover:bg-slate-800/50 transition">
                                        <td className="py-4 px-4 font-mono text-emerald-400">1061</td>
                                        <td className="py-4 px-4">Bjornholm (#19)</td>
                                        <td className="py-4 px-4 text-slate-300">Fields 15 & 17 (5.37 Acres)</td>
                                        <td className="py-4 px-4 font-mono text-white">$522,039.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Server Synchronization Panel */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                        <h3 className="text-md font-bold text-white mb-2">Sync Button</h3>
                        <p className="text-xs text-slate-400 mb-4">Manage telemetry and connection states across servers.</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Server</label>
                                <div className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white">
                                    #1 - Midwest Horizon
                                </div>
                            </div>
                            <button className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-lg shadow-lg shadow-rose-900/20 transition-all text-sm">
                                Sync Incoming
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
