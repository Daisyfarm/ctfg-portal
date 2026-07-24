import React from 'react';

export const metadata = {
  title: 'FSN Command Farm',
  description: 'Farm Sim Network Management Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
        
        {/* Unified Top Global Navigation Bar */}
        <div style={{ background: '#111827', borderBottom: '1px solid #374151', padding: '10px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto', fontSize: '13px' }}>
            
            {/* Left Brand Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ background: '#16a34a', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px' }}>FSN FARM</span>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>FARM SIM NETWORK</span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>Samuel Founder (#001) - FSN Command Farm $9,459,000 (IG)</span>
            </div>

            {/* Right Status Icons / Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#9ca3af', fontSize: '12px' }}>
              <span>🔔 3</span>
              <span>⚠️ 0</span>
              <span>👤 0</span>
              <span>⚙️ 0</span>
              <span style={{ color: '#fff' }}>2026-07-24 13:23:27</span>
            </div>

          </div>
        </div>

        {/* Sub Navigation Links Bar */}
        <div style={{ background: '#1f2937', borderBottom: '1px solid #374151', padding: '8px 30px' }}>
          <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#4ade80', textDecoration: 'none' }}>Myself</a>
            <a href="/interactions" style={{ color: '#9ca3af', textDecoration: 'none' }}>Interactions</a>
            <a href="/finances" style={{ color: '#9ca3af', textDecoration: 'none' }}>Finances</a>
            <a href="/data" style={{ color: '#9ca3af', textDecoration: 'none' }}>Data</a>
            <a href="/market" style={{ color: '#9ca3af', textDecoration: 'none' }}>Market</a>
            <a href="/wiki" style={{ color: '#9ca3af', textDecoration: 'none' }}>Wiki</a>
            <a href="/settings" style={{ color: '#9ca3af', textDecoration: 'none' }}>Settings</a>
          </div>
        </div>

        {/* Main Content Component Rendered Here */}
        {children}
        
      </body>
    </html>
  );
}
