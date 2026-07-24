import React from 'react';

export const metadata = {
  title: 'Daisy Hill Farming Portal',
  description: 'Server Management & Economy Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
        {/* Global Top Navigation Bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
          <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/myself" style={{ color: '#2563eb', textDecoration: 'none' }}>Myself</a>
            <a href="/interactions" style={{ color: '#2563eb', textDecoration: 'none' }}>Interactions</a>
            <a href="/finances" style={{ color: '#2563eb', textDecoration: 'none' }}>Finances</a>
            <a href="/data" style={{ color: '#2563eb', textDecoration: 'none' }}>Data</a>
            <a href="/market" style={{ color: '#2563eb', textDecoration: 'none' }}>Market</a>
            <a href="/marketplace" style={{ color: '#2563eb', textDecoration: 'none' }}>Marketplace</a>
            <a href="/settings" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 'normal' }}>Settings</a>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
