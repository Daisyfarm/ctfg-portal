import React from 'react';

export default function PermitCenterPage() {
    const permits = [
        { id: 'PRM-01', title: 'Heavy Transport Overweight Permit', fee: '$2,500.00', server: 'Midwest Horizon - 1', status: 'Approved', validity: '30 Days' },
        { id: 'PRM-02', title: 'Livestock Expansion Zoning License', fee: '$15,000.00', server: 'Bjornholm - 19', status: 'Pending Review', validity: '1 Year' },
        { id: 'PRM-03', title: 'Commercial Grain Silo Construction', fee: '$8,200.00', server: 'Central Austria - 20', status: 'Available', validity: '90 Days' },
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
                            <span className="hover:text-white cursor-pointer">Lotto Center</span>
                            <span className="text-white font-medium cursor-pointer">Permit Center</span>
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
                        <h1 className="text-2xl font-bold text-white tracking-tight">Municipal Permit Center</h1>
                        <p className="text-xs text-slate-400 mt-1">Acquire operational licenses, transport clearance certificates, and construction zoning permits.</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/25 transition text-sm">
                        Apply for Permit
                    </button>
                </div>

                {/* Permit Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {permits.map((p) => (
                        <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono text-emerald-400">{p.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${p.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : p.status === 'Pending Review' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {p.status}
                                    </span>
                                </div>
                                <h3 className="text-md font-bold text-white">{p.title}</h3>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Permit Fee:</span>
                                    <span className="font-mono text-emerald-400 font-semibold">{p.fee}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Server Scope:</span>
                                    <span className="text-white font-semibold">{p.server}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Validity Period:</span>
                                    <span className="text-slate-300 font-mono">{p.validity}</span>
                                </div>
                            </div>

                            <button className={`w-full py-2.5 px-4 font-semibold rounded-lg text-sm transition-all shadow-lg ${p.status === 'Approved' ? 'bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'}`}>
                                {p.status === 'Approved' ? 'Active Permit' : 'Submit Application'}
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
