import React from 'react';
import Link from 'next/link';

export default function HomePortal() {
    const modules = [
        { name: 'Dashboard', path: '/dashboard', desc: 'Active properties, server sync, and core financials.', icon: '📊' },
        { name: 'Field Work', path: '/field-work', desc: 'Manage plowing, planting, harvesting, and task tracking.', icon: '🚜' },
        { name: 'Contracting Center', path: '/contract-center', desc: 'Accept multiplayer contracts and view job payouts.', icon: '📝' },
        { name: 'Investment Center', path: '/investment-center', desc: 'Corporate shares, infrastructure bonds, and passive ROI.', icon: '📈' },
        { name: 'Auction House', path: '/auction-house', desc: 'Bid on heavy machinery and surplus fleet equipment.', icon: '🔨' },
        { name: 'Competition Center', path: '/competition-center', desc: 'Server-wide harvest speedruns and yield contests.', icon: '🏆' },
        { name: 'Event Center', path: '/event-center', desc: 'Community tractor pulls, meetups, and server gatherings.', icon: '🎉' },
        { name: 'Import-Export Center', path: '/import-export-center', desc: 'Global shipping manifests, cargo, and tariffs.', icon: '🚢' },
        { name: 'Lotto Center', path: '/lotto-center', desc: 'Server-wide lotteries and high-stakes jackpot pools.', icon: '🎟️' },
        { name: 'Permit Center', path: '/permit-center', desc: 'Transport clearance and construction zoning licenses.', icon: '📜' },
        { name: 'Register Farm', path: '/register', desc: 'Onboard new enterprises and sync user profiles.', icon: '✨' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Top Navigation */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold tracking-wider text-emerald-400">FSN</span>
                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">Network v2.4</span>
                    </div>
                    <div className="text-sm font-medium text-slate-300">Cool Brook Farms</div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Farm Sim Network Hub</h1>
                    <p className="text-sm text-slate-400">Select a module below to manage your agricultural empire, coordinate multiplayer operations, and track live telemetry.</p>
                </div>

                {/* Module Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((mod) => (
                        <Link key={mod.path} href={mod.path} className="group bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl hover:border-emerald-500/50 hover:bg-slate-850 transition-all">
                            <div className="space-y-3">
                                <div className="text-3xl">{mod.icon}</div>
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{mod.name}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                                <span>Launch Module</span>
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
