import React from 'react';
import Link from 'next/link';

export default function HomePortal() {
    const modules = [
        { name: 'Dashboard', path: '/dashboard', desc: 'Active properties, server sync, and core financials.', icon: '📊', color: '#10b981', badge: 'Live Sync' },
        { name: 'Field Work', path: '/field-work', desc: 'Manage plowing, planting, harvesting, and task tracking.', icon: '🚜', color: '#3b82f6', badge: 'Active' },
        { name: 'Contracting Center', path: '/contract-center', desc: 'Accept multiplayer contracts and view job payouts.', icon: '📝', color: '#f59e0b', badge: 'Contracts' },
        { name: 'Investment Center', path: '/investment-center', desc: 'Corporate shares, infrastructure bonds, and passive ROI.', icon: '📈', color: '#8b5cf6', badge: 'Yields' },
        { name: 'Auction House', path: '/auction-house', desc: 'Bid on heavy machinery and surplus fleet equipment.', icon: '🔨', color: '#ec4899', badge: 'Bidding' },
        { name: 'Competition Center', path: '/competition-center', desc: 'Server-wide harvest speedruns and yield contests.', icon: '🏆', color: '#eab308', badge: 'Contest' },
        { name: 'Event Center', path: '/event-center', desc: 'Community tractor pulls, meetups, and server gatherings.', icon: '🎉', color: '#06b6d4', badge: 'Events' },
        { name: 'Import-Export Center', path: '/import-export-center', desc: 'Global shipping manifests, cargo, and tariffs.', icon: '🚢', color: '#14b8a6', badge: 'Logistics' },
        { name: 'Lotto Center', path: '/lotto-center', desc: 'Server-wide lotteries and high-stakes jackpot pools.', icon: '🎟️', color: '#f97316', badge: 'Jackpot' },
        { name: 'Permit Center', path: '/permit-center', desc: 'Transport clearance and construction zoning licenses.', icon: '📜', color: '#6366f1', badge: 'Zoning' },
        { name: 'Register Farm', path: '/register', desc: 'Onboard new enterprises and sync user profiles.', icon: '✨', color: '#22c55e', badge: 'Onboarding' },
    ];

    return (
        <div style={{ minHeight: 'calc(100vh - 90px)', background: '#0b0f19', color: '#f3f4f6', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Hero Section with FSN Glow */}
                <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '15px', boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' }}>
                        <span style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%', display: 'inline-block' }}></span>
                        Network v2.4 • Cool Brook Farms Active
                    </div>
                    <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
                        Farm Sim <span style={{ color: '#10b981' }}>Network Hub</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: '#9ca3af', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Select a module below to manage your agricultural empire, coordinate multiplayer operations, and track live telemetry.
                    </p>
                </div>

                {/* Module Cards Grid with Colorful Accents */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
                    {modules.map((mod) => (
                        <Link 
                            key={mod.path} 
                            href={mod.path} 
                            style={{ 
                                background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)', 
                                border: '1px solid #1e293b', 
                                borderLeft: `4px solid ${mod.color}`,
                                borderRadius: '12px', 
                                padding: '24px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between', 
                                textDecoration: 'none', 
                                color: 'inherit',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                                transition: 'all 0.2s ease-in-out',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                                    <span style={{ fontSize: '32px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>{mod.icon}</span>
                                    <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', background: `${mod.color}22`, color: mod.color, padding: '4px 10px', borderRadius: '6px', border: `1px solid ${mod.color}44` }}>
                                        {mod.badge}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>{mod.name}</h3>
                                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.6' }}>{mod.desc}</p>
                            </div>

                            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: mod.color, fontWeight: 'bold' }}>
                                <span>Launch Module</span>
                                <span style={{ fontSize: '16px' }}>→</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
