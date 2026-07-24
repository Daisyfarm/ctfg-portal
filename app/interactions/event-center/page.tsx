import React from 'react';

export default function EventCenterPage() {
    const events = [
        { id: 'EVT-01', title: 'Midwest Annual Tractor Pull', date: 'Aug 15, 2026', location: 'Server #1 Fairgrounds', organizer: 'FSN Admin', status: 'Registered' },
        { id: 'EVT-02', title: 'Fall Harvest Community BBQ', date: 'Sep 02, 2026', location: 'Central Austria Co-Op', organizer: 'Cool Brook Farms', status: 'Open' },
        { id: 'EVT-03', title: 'Vintage Machinery Showcase', date: 'Sep 20, 2026', location: 'Bjornholm Village Square', organizer: 'Global Logistics', status: 'Open' },
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
                            <span className="text-white font-medium cursor-pointer">Event Center</span>
                            <span className="hover:text-white cursor-pointer">Competition Center</span>
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
                        <h1 className="text-2xl font-bold text-white tracking-tight">Community Event Center</h1>
                        <p className="text-xs text-slate-400 mt-1">Participate in network-wide multiplayer events, community meetups, and server celebrations.</p>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-900/25 transition text-sm">
                        Host New Event
                    </button>
                </div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {events.map((evt) => (
                        <div key={evt.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-mono text-emerald-400">{evt.id}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${evt.status === 'Registered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                        {evt.status}
                                    </span>
                                </div>
                                <h3 className="text-md font-bold text-white">{evt.title}</h3>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Date:</span>
                                    <span className="text-slate-200 font-mono">{evt.date}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Location:</span>
                                    <span className="text-white font-semibold">{evt.location}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Organizer:</span>
                                    <span className="text-slate-300">{evt.organizer}</span>
                                </div>
                            </div>

                            <button className={`w-full py-2.5 px-4 font-semibold rounded-lg text-sm transition-all shadow-lg ${evt.status === 'Registered' ? 'bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'}`}>
                                {evt.status === 'Registered' ? 'Attending' : 'RSVP / Join Event'}
                            </button>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
