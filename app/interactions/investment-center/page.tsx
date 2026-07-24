import React from 'react';

export default function InvestmentCenterPage() {
    const investments = [
        { id: 'INV-01', name: 'Greenhouse Expansion Phase II', cost: '$120,000.00', roi: '14.5% Annual', status: 'Active' },
        { id: 'INV-02', name: 'Solar Grid Infrastructure', cost: '$85,400.00', roi: '11.2% Annual', status: 'Available' },
        { id: 'INV-03', name: 'Regional Grain Silo Share', cost: '$250,000.00', roi: '18.0% Annual', status: 'Available' },
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
                            <span className="text-white font-medium cursor-pointer">Investment Center</span>
                            <span className="hover:text-white cursor-pointer">Auction House</span>
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
                        <h1 className="text-2xl font-bold text-white tracking-tight">Investment Center</h1>
                        <p className="text-xs text-slate-400 mt-1">Manage corporate shares, infrastructure bonds, and passive farm revenue streams.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm">
                        <span className="text-slate-400">Total Portfolio Value: </span>
                        <span className="font-mono text-emerald-400 font-bold">$120,000.00</span>
                    </div>
                </div>

                {/* Investment Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {investments.map((inv) => (
                        <div key={inv.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono text-emerald-400">{inv.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${inv.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {inv.status}
                                    </span>
                                </div>
                                <h3 className="text-md font-bold text-white">{inv.name}</h3>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Capital Cost:</span>
                                    <span className="font-mono text-white font-semibold">{inv.cost}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Projected ROI:</span>
                                    <span className="font-mono text-emerald-400 font-semibold">{inv.roi}</span>
                                </div>
                            </div>

                            <button className={`w-full py-2.5 px-4 font-semibold rounded-lg text-sm transition-all shadow-lg ${inv.status === 'Active' ? 'bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'}`}>
                                {inv.status === 'Active' ? 'Owned Asset' : 'Invest Capital'}
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
