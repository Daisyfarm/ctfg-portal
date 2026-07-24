import React from 'react';

export default function AuctionHousePage() {
    const auctions = [
        { id: 'AUC-104', item: 'John Deere 8R 410 Tractor', currentBid: '$185,000.00', bids: 14, timeRemaining: '2h 15m', status: 'Live' },
        { id: 'AUC-105', item: 'Case IH Axial-Flow 9250 Combine', currentBid: '$310,000.00', bids: 22, timeRemaining: '5h 40m', status: 'Live' },
        { id: 'AUC-106', item: 'Kinze 4905 Blue Drive Planter', currentBid: '$95,000.00', bids: 8, timeRemaining: '1d 3h', status: 'Upcoming' },
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
                            <span className="hover:text-white cursor-pointer">Investment Center</span>
                            <span className="text-white font-medium cursor-pointer">Auction House</span>
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
                        <h1 className="text-2xl font-bold text-white tracking-tight">Equipment Auction House</h1>
                        <p className="text-xs text-slate-400 mt-1">Bid on premium used machinery, surplus fleet vehicles, and agricultural hardware.</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/25 transition text-sm">
                        List Equipment for Auction
                    </button>
                </div>

                {/* Auction Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {auctions.map((auc) => (
                        <div key={auc.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono text-emerald-400">{auc.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${auc.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                        {auc.status}
                                    </span>
                                </div>
                                <h3 className="text-md font-bold text-white">{auc.item}</h3>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Current Bid:</span>
                                    <span className="font-mono text-emerald-400 font-semibold">{auc.currentBid}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Total Bids:</span>
                                    <span className="text-white font-semibold">{auc.bids} bids</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Time Left:</span>
                                    <span className="text-slate-300 font-mono">{auc.timeRemaining}</span>
                                </div>
                            </div>

                            <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-all shadow-lg shadow-emerald-900/20">
                                Place Bid
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
