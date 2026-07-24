import React from 'react';
import Link from 'next/link';

export default function HubPage() {
    const modules = [
        { title: 'Dashboard', desc: 'Active properties, server sync, and core financials.', link: '/', icon: '📊' },
        { title: 'Field Work', desc: 'Manage plowing, planting, harvesting, and task tracking.', link: '/field-work', icon: '🚜' },
        { title: 'Contracting Center', desc: 'Accept multiplayer contracts and view job payouts.', link: '/contracting-centre', icon: '📝' },
        { title: 'Investment Center', desc: 'Corporate shares, infrastructure bonds, and passive ROI.', link: '/investment', icon: '📈' },
        { title: 'Auction House', desc: 'Bid on heavy machinery and surplus fleet equipment.', link: '/auction-house', icon: '🔨' },
        { title: 'Competition Center', desc: 'Server-wide harvest speedruns and yield contests.', link: '/competition', icon: '🏆' },
        { title: 'Import-Export', desc: 'Global shipping containers, tariffs, and bulk trade routes.', link: '/import-export', icon: '🚢' },
        { title: 'Permit Centre', desc: 'Acquire heavy transport permits, land zoning, and building licenses.', link: '/permit-centre', icon: '🪪' },
        { title: 'Event Center', desc: 'Community tractor pulls, livestock shows, and server celebrations.', link: '/event-center', icon: '🎪' },
        { title: 'Lotto Center', desc: 'Weekly server jackpot draws and community lottery tickets.', link: '/lotto-center', icon: '🎟️' },
        { title: 'Registration Form', desc: 'Register new farm enterprises and join the FSN network.', link: '/registration', icon: '✍️' },
        { title: 'Interactions & Wiki', desc: 'Co-op permissions, server rules, and network guides.', link: '/interactions', icon: '🤝' },
    ];

    return (
        <div style={{ 
            minHeight: 'calc(100vh - 90px)', 
            backgroundImage: 'linear-gradient(rgba(3, 7, 18, 0.75), rgba(3, 7, 18, 0.85)), url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed',
            color: '#f3f4f6', 
            padding: '50px 20px', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Header Banner */}
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
                        Farm Sim <span style={{ color: '#34d399' }}>Network Hub</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '650px', margin: '0 auto', lineHeight: '1.5' }}>
                        Select a module below to manage your agricultural empire, coordinate multiplayer operations on <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>, and track live telemetry.
                    </p>
                </div>

                {/* Module Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                    {modules.map((mod, idx) => (
                        <Link key={idx} href={mod.link} style={{ textDecoration: 'none' }}>
                            <div style={{ 
                                background: 'rgba(17, 24, 39, 0.9)', 
                                backdropFilter: 'blur(12px)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)', 
                                borderRadius: '16px', 
                                padding: '28px',
                                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)',
                                transition: 'transform 0.2s, border-color 0.2s',
                                cursor: 'pointer',
                                height: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{mod.icon}</div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 8px 0' }}>{mod.title}</h3>
                                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 20px 0', lineHeight: '1.5' }}>{mod.desc}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '13px', fontWeight: 'bold' }}>
                                    Launch Module <span>→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
