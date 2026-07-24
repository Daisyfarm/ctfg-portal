import React from 'react';
import Link from 'next/link';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0, padding: 0, background: '#030712', fontFamily: 'Arial, sans-serif' }}>
                
                {/* Top FSN Status & Navigation Bar */}
                <header style={{ 
                    background: '#111827', 
                    borderBottom: '1px solid #1f2937', 
                    color: '#9ca3af', 
                    fontSize: '13px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: '50px' }}>
                        
                        {/* Left: Network Title & Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ fontWeight: 'bold', color: '#34d399', letterSpacing: '0.5px' }}>FARM NETWORK</span>
                            <span style={{ color: '#4b5563' }}>|</span>
                            <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Samuel Founder (#001)</span>
                            <span style={{ color: '#93c5fd' }}>Judith Plains Network $8,100,000 (16 Slots)</span>
                        </div>

                        {/* Right: Quick Telemetry Icons/Status */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '12px', fontFamily: 'monospace' }}>
                            <span style={{ color: '#34d399' }}>● NORTH: ONLINE</span>
                            <span style={{ color: '#34d399' }}>● SOUTH: ONLINE</span>
                            <span style={{ color: '#9ca3af' }}>2026-07-24 18:24</span>
                        </div>
                    </div>

                    {/* Navigation Tabs Bar */}
                    <div style={{ background: '#0f172a', borderTop: '1px solid #1e293b' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4px', padding: '0 20px' }}>
                            <Link href="/" style={{ padding: '12px 18px', color: '#ffffff', textDecoration: 'none', fontWeight: 'bold', borderBottom: '2px solid #2563eb', fontSize: '13px' }}>Myself</Link>
                            <Link href="/interactions" style={{ padding: '12px 18px', color: '#9ca3af', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Interactions</Link>
                            <Link href="/finances" style={{ padding: '12px 18px', color: '#9ca3af', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Finances</Link>
                            <Link href="/data" style={{ padding: '12px 18px', color: '#9ca3af', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Data</Link>
                            <Link href="/market" style={{ padding: '12px 18px', color: '#9ca3af', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Market</Link>
                            <Link href="/wiki" style={{ padding: '12px 18px', color: '#9ca3af', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Wiki</Link>
                            <Link href="/settings" style={{ padding: '12px 18px', color: '#9ca3af', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Settings</Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main>
                    {children}
                </main>

            </body>
        </html>
    );
}
