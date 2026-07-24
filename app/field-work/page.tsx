import React from 'react';

export default function FieldWorkPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Navigation Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <span className="text-xl font-bold tracking-wider text-emerald-400">FSN</span>
                        <nav className="hidden md:flex space-x-6 text-sm text-slate-400">
                            <span className="text-white font-medium cursor-pointer">Field Work</span>
                            <span className="hover:text-white cursor-pointer">Field Management</span>
                            <span className="hover:text-white cursor-pointer">Crop Sales</span>
                            <span className="hover:text-white cursor-pointer">Task Management</span>
                        </nav>
                    </div>
                    <div className="text-sm text-slate-400">Cool Brook Farms</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                {/* Begin Field Work Form */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-1">Begin Field Work</h2>
                    <p className="text-xs text-slate-400 mb-6">Select server destination, target field, and operational task type.</p>
                    
                    <form className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Server</label>
                            <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-all">
                                <option>Midwest Horizon - 1</option>
                                <option>Bjornholm - 19</option>
                                <option>Central Austria - 20</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Field</label>
                            <input type="text" placeholder="Enter Field # (e.g., 7)" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-all" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Work Type</label>
                            <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-all">
                                <option>Plow</option>
                                <option>Cultivate</option>
                                <option>Weed</option>
                                <option>Transport</option>
                                <option>Plant</option>
                                <option>Bale</option>
                                <option>Harvest</option>
                                <option>Spread Solid Fertilizer</option>
                                <option>Spray Herbicide</option>
                                <option>Spray Fertilizer</option>
                                <option>Spread Manure</option>
                                <option>Spread Slurry</option>
                                <option>Lime</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/20 transition-all">
                            Begin Field Work
                        </button>
                    </form>
                </div>

                {/* Mark Open Work As Complete Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4">Mark Open Work As Complete</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                                    <th className="py-3 px-4">Job ID</th>
                                    <th className="py-3 px-4">Job Type</th>
                                    <th className="py-3 px-4">Field #</th>
                                    <th className="py-3 px-4">Mark</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-sm">
                                <tr className="hover:bg-slate-800/50 transition">
                                    <td className="py-4 px-4 font-mono text-emerald-400">2004</td>
                                    <td className="py-4 px-4 text-slate-200">PLANT</td>
                                    <td className="py-4 px-4 text-slate-300">7</td>
                                    <td className="py-4 px-4">
                                        <select className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500">
                                            <option>Complete Work</option>
                                            <option>Cancel Work</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                        <button className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all text-sm">
                            Update Work
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}
