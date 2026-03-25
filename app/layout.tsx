import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        background: '#0b0f1a', 
        color: 'white', 
        fontFamily: 'system-ui, -apple-system, sans-serif' 
      }}>
        {/* --- IDA CORPORATE NAVIGATION --- */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: '#161b22',
          borderBottom: '2px solid #F2C94C', 
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#F2C94C', letterSpacing: '1px' }}>
            IRON DAISY AGRI
          </div>
          
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <a href="/" style={navLinkStyle}>Terminal</a>
            <a href="/about" style={navLinkStyle}>History</a>
            <a href="/permits" style={navLinkStyle}>Permits</a>
            <a href="/fleet" style={navLinkStyle}>Fleet</a>
            <a href="/rules" style={navLinkStyle}>Rules</a>
            <a href="https://discord.gg/yourlink" target="_blank" style={{
              ...navLinkStyle,
              background: '#F2C94C',
              color: 'black',
              padding: '8px 16px',
              borderRadius: '2px',
              fontWeight: 'bold'
            }}>Join Fleet</a>
          </div>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main style={{ minHeight: 'calc(100vh - 140px)' }}>
          {children}
        </main>

        {/* --- CORPORATE FOOTER --- */}
        <footer style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          borderTop: '1px solid #30363d',
          color: '#8b949e',
          background: '#0d1117'
        }}>
          <p style={{ letterSpacing: '2px', marginBottom: '10px', color: '#c9d1d9' }}>
            IRON DAISY AGRI | MONTANA OPERATIONS
          </p>
          <p>PRECISION IN THE FIELD. POWER IN THE FLEET.</p>
          <p style={{ marginTop: '20px', opacity: 0.5 }}>© 2026 IDA BOARD OF DIRECTORS. ALL RIGHTS RESERVED.</p>
        </footer>
      </body>
    </html>
  );
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '0.85rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  transition: 'color 0.2s'
};
