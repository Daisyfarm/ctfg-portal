import React from 'react';

export default function ImportExportCenterPage() {
    const shipments = [
        { id: 'IMP-901', commodity: 'Organic Wheat (Bulk)', quantity: '50,000 L', destination: 'Rotterdam Port', status: 'In Transit', cost: '$42,000.00' },
        { id: 'EXP-402', commodity: 'Premium Soybeans', quantity: '25,000 L', destination: 'Hamburg Depot', status: 'Customs Clearance', cost: '$28,500.00' },
        { id: 'IMP-903', commodity: 'Specialty Fertilizer', quantity: '10,000 L', destination: 'Cool Brook Silos', status: 'Delivered', cost: '$15,200.00' },
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
                            <span className="text-white font-medium cursor-pointer">Import-Export Center</span>
                            <span className="hover:text-white cursor-pointer">Event Center</span>
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
                        <h1 className="text-2xl font-bold text-white tracking-tight">Import-Export Logistics Center</h1>
                        <p className="text-xs text-slate-400 mt-1">Manage international cargo manifests, custom tariffs, and bulk commodity trading routes.</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/25 transition text-sm">
                        New Cargo Manifest
                    </button>
                </div>

                {/* Shipment Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {shipments.map((item) => (
                        <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono text-emerald-400">{item.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${item.status === 'Delivered' ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className="text-md font-bold text-white">{item.commodity}</h3>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Volume:</span>
                                    <span className="text-slate-200 font-mono">{item.quantity}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Destination:</span>
                                    <span className="text-white font-semibold">{item.destination}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Manifest Value:</span>
                                    <span className="font-mono text-emerald-400 font-semibold">{item.cost}</span>
                                </div>
                            </div>

                            <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-all shadow-lg shadow-emerald-900/20">
                                Track Shipment
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
