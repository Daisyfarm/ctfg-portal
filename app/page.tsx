import React from 'react';
import Link from 'next/link';

export default function HomePortal() {
    const modules = [
        { name: 'Dashboard', path: '/dashboard', desc: 'Active properties, server sync, and core financials.', icon: '📊' },
        { name: 'Field Work', path: '/field-work', desc: 'Manage plowing, planting, harvesting, and task tracking.', icon: '🚜' },
        { name: 'Contracting Center', path: '/contract-center', desc: 'Accept multiplayer contracts and view job payouts.', icon: '📝' },
        { name: 'Investment Center', path: '/investment-center', desc: 'Corporate shares, infrastructure bonds, and passive ROI.', icon: '📈' },
        { name: 'Auction House', path: '/auction-house', desc: 'Bid on heavy machinery and surplus fleet equipment.', icon: '🔨' },
        { name: 'Competition Center', path: '/competition-center', desc: 'Server-wide harvest speedruns and yield contests.', icon: '🏆' },
        { name: 'Event Center', path: '/event-center', desc: 'Community tractor pulls, meetups, and server gatherings.', icon: '🎉' },
        { name: 'Import-Export Center', path: '/import-export-center', desc: 'Global shipping manifests, cargo, and tariffs.', icon: '🚢' },
        { name: 'Lotto Center', path: '/lotto-center', desc: 'Server-wide lotteries and high-stakes jackpot pools.', icon: '🎟️' },
        { name: 'Permit Center', path: '/permit-center', desc: 'Transport clearance and construction zoning licenses.', icon: '📜' },
        { name: 'Register Farm', path: '/register', desc: 'Onboard new enterprises and sync user profiles.', icon: '✨' },
    ];

    return (
        <div style={{ minHeight: 'calc(100vh - 90px)', background: '#030712', color: '#f3f4f6', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace', marginBottom: '10px' }}>
                        Network v2.4 • Cool Brook Farms
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>Farm Sim Network Hub</h1>
                    <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Select a module below to manage your agricultural empire, coordinate multiplayer operations, and track live telemetry.</p>
                </div>

                {/* Module Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                    {modules.map((mod) => (
                        <Link 
                            key={mod.path} 
                            href={mod.path} 
                            style={{ 
                                background: '#111827', 
                                border: '1px solid #1f2937', 
                                borderRadius: '12px', 
                                padding: '24px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between', 
                                textDecoration: 'none', 
                                color: 'inherit',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                transition: 'border-color 0.2s'
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{mod.icon}</div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 8px 0' }}>{mod.name}</h3>
                                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.5' }}>{mod.desc}</p>
                            </div>
                            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#34d399', fontWeight: 'bold' }}>
                                <span>Launch Module</span>
                                <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
