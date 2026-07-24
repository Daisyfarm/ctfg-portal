import React from 'react';
import Link from 'next/link';

export default function Home() {
    const modules = [
        { title: 'Auction House', description: 'Bid on heavy machinery and land lots.', href: '/auction-house', icon: '🔨' },
        { title: 'Competition Center', description: 'Track seasonal challenges and leaderboards.', href: '/competition', icon: '🏆' },
        { title: 'Contracting Centre', description: 'Accept fieldwork and transport sub-contracts.', href: '/contracting-centre', icon: '📋' },
        { title: 'Event Center', description: 'Stay updated on community meetups and convoys.', href: '/event-center', icon: '📅' },
        { title: 'Import & Export', description: 'Manage bulk commodity shipments and logistics.', href: '/import-export', icon: '🚢' },
        { title: 'Investment Center', description: 'Manage shared farm investments and loans.', href: '/investment-center', icon: '📈' },
        { title: 'Lotto Center', description: 'Participate in server raffles and jackpot draws.', href: '/lotto-center', icon: '🎰' },
        { title: 'Permit Centre', description: 'Apply for land development and transport licenses.', href: '/permit-centre', icon: '🪪' },
        { title: 'Registration Portal', description: 'Register your farm enterprise and profile.', href: '/registration', icon: '📝' },
    ];

    return (
        <div style={{ 
            minHeight: 'calc(100vh - 90px)', 
            backgroundImage: 'linear-gradient(rgba(3, 7, 18, 0.75), rgba(3, 7, 18, 0.85)), url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed',
            color: '#f3f4f6', 
            padding: '40px 20px', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Hero Header */}
                <div style={{ 
                    background: 'rgba(17, 24, 39, 0.9)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '40px',
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                }}>
                    <span style={{ 
                        background: 'rgba(52, 211, 153, 0.1)', 
                        color: '#34d399', 
                        border: '1px solid rgba(52, 211, 153, 0.2)', 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        display: 'inline-block',
                        marginBottom: '15px'
                    }}>
                        ACTIVE SERVER HUB
                    </span>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>
                        Judith Plains Montana 4X
                    </h1>
                    <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: '1.6', maxWidth: '800px', margin: 0 }}>
                        Welcome to the central network portal. Access all operational sectors, coordinate logistics, and manage your agricultural enterprise across the region.
                    </p>
                </div>

                {/* Module Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                    gap: '20px' 
                }}>
                    {modules.map((mod, index) => (
                        <Link 
                            key={index} 
                            href={mod.href} 
                            style={{ 
                                textDecoration: 'none', 
                                color: 'inherit' 
                            }}
                        >
                            <div style={{ 
                                background: 'rgba(17, 24, 39, 0.85)', 
                                backdropFilter: 'blur(10px)', 
                                border: '1px solid rgba(255, 255, 255, 0.08)', 
                                borderRadius: '14px', 
                                padding: '25px',
                                height: '100%',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                <div>
                                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{mod.icon}</div>
                                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 8px 0' }}>
                                        {mod.title}
                                    </h2>
                                    <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.5', margin: 0 }}>
                                        {mod.description}
                                    </p>
                                </div>
                                <div style={{ marginTop: '20px', fontSize: '12px', fontWeight: 'bold', color: '#34d399' }}>
                                    Open Portal →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
