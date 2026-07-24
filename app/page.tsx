import React from 'react';
import Link from 'next/link';

export default function HomePortal() {
    const modules = [
        { name: 'Dashboard', path: '/dashboard', desc: 'Active properties, server sync, and core financials.', icon: '📊', color: '#10b981' },
        { name: 'Field Work', path: '/field-work', desc: 'Manage plowing, planting, harvesting, and task tracking.', icon: '🚜', color: '#3b82f6' },
        { name: 'Contracting Center', path: '/contract-center', desc: 'Accept multiplayer contracts and view job payouts.', icon: '📝', color: '#f59e0b' },
        { name: 'Investment Center', path: '/investment-center', desc: 'Corporate shares, infrastructure bonds, and passive ROI.', icon: '📈', color: '#8b5cf6' },
        { name: 'Auction House', path: '/auction-house', desc: 'Bid on heavy machinery and surplus fleet equipment.', icon: '🔨', color: '#ec4899' },
        { name: 'Competition Center', path: '/competition-center', desc: 'Server-wide harvest speedruns and yield contests.', icon: '🏆', color: '#eab308' },
        { name: 'Event Center', path: '/event-center', desc: 'Community tractor pulls, meetups, and server gatherings.', icon: '🎉', color: '#06b6d4' },
        { name: 'Import-Export Center', path: '/import-export-center', desc: 'Global shipping manifests, cargo, and tariffs.', icon: '🚢', color: '#14b8a6' },
        { name: 'Lotto Center', path: '/lotto-center', desc: 'Server-wide lotteries and high-stakes jackpot pools.', icon: '🎟️', color: '#f97316' },
        { name: 'Permit Center', path: '/permit-center', desc: 'Transport clearance and construction zoning licenses.', icon: '📜', color: '#6366f1' },
        { name: 'Register Farm', path: '/register', desc: 'Onboard new enterprises and sync user profiles.', icon: '✨', color: '#22c55e' },
    ];

    return (
        <div style={{ 
            minHeight: 'calc(100vh - 90px)', 
            backgroundImage: 'linear-gradient(rgba(3, 7, 18, 0.82), rgba(3, 7, 18, 0.90)), url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed',
            color: '#f3f4f6', 
            padding: '40px 20px', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Hero Section */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                        Farm Sim <span style={{ color: '#10b981' }}>Network Hub</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                        Select a module below to manage your agricultural empire, coordinate multiplayer operations, and track live telemetry.
                    </p>
                </div>

                {/* Module Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
                    {modules.map((mod) => (
                        <Link 
                            key={mod.path} 
                            href={mod.path} 
                            style={{ 
                                background: 'rgba(17, 24, 39, 0.85)', 
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)', 
                                borderLeft: `4px solid ${mod.color}`,
                                borderRadius: '12px', 
                                padding: '24px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between', 
                                textDecoration: 'none', 
                                color: 'inherit',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '32px', background: 'rgba(255,255,255,0.05)', width: 'fit-content', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' }}>
                                    {mod.icon}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>{mod.name}</h3>
                                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, lineHeight: '1.6' }}>{mod.desc}</p>
                            </div>

                            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: mod.color, fontWeight: 'bold' }}>
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
