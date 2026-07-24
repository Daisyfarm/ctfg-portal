export default function RegisterPage() {
    return (
        <div className="h-full min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 font-sans">
            <div className="max-w-md w-full space-y-8 bg-slate-900 p-8 rounded-2xl border border-emerald-500/20 shadow-2xl">
                
                {/* Header Branding */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 mb-4 border border-emerald-500/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Join Farm Sim Network</h2>
                    <p className="mt-2 text-sm text-slate-400">Establish your agricultural enterprise and sync your operations.</p>
                </div>
                
                {/* Registration Form */}
                <form className="mt-8 space-y-5" action="#" method="POST">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Username</label>
                        <input type="text" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="ReubyJuice" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                        <input type="email" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="farmer@fsn.com" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                        <input type="password" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="••••••••" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Farm Name</label>
                        <input type="text" required className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" placeholder="Cool Brook Farms" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Primary Server</label>
                        <select className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all">
                            <option>Midwest Horizon - 1</option>
                            <option>Bjornholm - 19</option>
                            <option>Central Austria - 20</option>
                        </select>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/40 transition-all">
                            Create Farm Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
