import React from 'react';

export default function ContractsPage() {
    const contracts = [
        { id: '34267', provider: 'Midwest Wildlife Management', payout: '$1,539.00', server: 'Training MW Horizon (#10)' },
        { id: '34260', provider: 'Midwest Wildlife Management', payout: '$2,629.00', server: 'Training MW Horizon (#10)' },
        { id: '34259', provider: 'Midwest Wildlife Management', payout: '$2,061.00', server: 'Training MW Horizon (#10)' },
        { id: '34256', provider: 'Midwest Wildlife Management', payout: '$1,519.00', server: 'Training MW Horizon (#10)' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Navigation Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold tracking-wider text-emerald-400">FSN</span>
                        <nav className="hidden md:flex space-x-6 text-sm text-slate-400">
                            <span className="text-white font-medium cursor-pointer">Contracting Center</span>
                            <span className="hover:text-white cursor-pointer">My Contracts</span>
                            <span className="hover:text-white cursor-pointer">Support</span>
                        </nav>
                    </div>
                    <div className="text-sm text-slate-400">Cool Brook Farms</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                
                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Contracting Center</h1>
                    <div className="flex space-x-3 text-sm">
                        <button className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-emerald-400 rounded-lg transition font-medium">+ Add Contract</button>
                        <button className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg transition font-medium">My Contracts</button>
                    </div>
                </div>

                {/* Contract Listing Cards */}
                <div className="space-y-4">
                    {contracts.map((contract) => (
                        <div key={contract.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-xl gap-4 hover:border-slate-700 transition">
                            <div className="space-y-1">
                                <h3 className="text-md font-bold text-white">{contract.provider}</h3>
                                <div className="flex items-center space-x-3 text-xs text-slate-400">
                                    <span className="font-mono text-emerald-400">ID: {contract.id}</span>
                                    <span>•</span>
                                    <span className="text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{contract.server}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                                <div className="text-left sm:text-right">
                                    <div className="text-emerald-400 font-bold font-mono text-lg">{contract.payout}</div>
                                    <div className="flex space-x-3 text-xs text-slate-400 mt-0.5">
                                        <span className="hover:underline cursor-pointer text-blue-400 font-medium">Details</span>
                                        <span>•</span>
                                        <span className="hover:underline cursor-pointer text-sky-400 font-medium">How-To?</span>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all text-sm whitespace-nowrap">
                                    Accept Contract
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
