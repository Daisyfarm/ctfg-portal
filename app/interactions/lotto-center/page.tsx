import React from 'react';

export default function LottoCenterPage() {
    const lotteries = [
        { id: 'LOT-01', title: 'Spring Harvest Jackpot', pot: '$250,000.00', ticketPrice: '$5,000.00', entries: 42, status: 'Active', drawTime: '12h remaining' },
        { id: 'LOT-02', title: 'Midwest Weekly Raffle', pot: '$75,000.00', ticketPrice: '$1,000.00', entries: 89, status: 'Active', drawTime: '3d remaining' },
        { id: 'LOT-03', title: 'Co-Op Monthly Mega-Draw', pot: '$1,200,000.00', ticketPrice: '$25,000.00', entries: 156, status: 'Upcoming', drawTime: 'Next Sunday' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Navigation Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold tracking-wider text-emerald-400">FSN</span>
                        <nav className="hidden md:flex space-x-6 text-sm text-slate-400">
                            <span className="hover:text-white cursor-pointer">Dashboard</span>
                            <span className="text-white font-medium cursor-pointer">Lotto Center</span>
                            <span className="hover:text-white cursor-pointer">Permit Center</span>
                        </nav>
                    </div>
                    <div className="text-sm text-slate-400">Cool Brook Farms</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Community Lotto & Raffles</h1>
                        <p className="text-xs text-slate-400 mt-1">Purchase tickets for server-wide lotteries and high-stakes financial jackpot pools.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm">
                        <span className="text-slate-400">My Tickets: </span>
                        <span className="font-mono text-emerald-400 font-bold">3 Active</span>
                    </div>
                </div>

                {/* Lottery Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {lotteries.map((lot) => (
                        <div key={lot.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono text-emerald-400">{lot.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${lot.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                        {lot.status}
                                    </span>
                                </div>
                                <h3 className="text-md font-bold text-white">{lot.title}</h3>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Current Jackpot:</span>
                                    <span className="font-mono text-emerald-400 font-semibold">{lot.pot}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Ticket Price:</span>
                                    <span className="text-white font-mono">{lot.ticketPrice}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Draw Timer:</span>
                                    <span className="text-slate-300 font-mono">{lot.drawTime}</span>
                                </div>
                            </div>

                            <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-all shadow-lg shadow-emerald-900/20">
                                Buy Ticket
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
