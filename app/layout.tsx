import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        background: '#0b0f1a', 
        color: 'white', 
        fontFamily: 'sans-serif' 
      }}>
        {/* --- IDA CORPORATE NAVIGATION --- */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: '#161b22',
          borderBottom: '2px solid #F2C94C', // Industrial Yellow Accent
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#F2C94C' }}>
            IRON DAISY AGRI
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" style={navLinkStyle}>Terminal</a>
            <a href="/about" style={navLinkStyle}>History</a>
            <a href="/permits" style={navLinkStyle}>Permits</a>
            <a href="/fleet" style={navLinkStyle}>Fleet</a>
            <a href="/rules" style={navLinkStyle}>Rules</a>
            <a href="https://discord.gg/yourlink" style={{
              ...navLinkStyle,
              background: '#F2C94C',
              color: 'black',
              padding: '5px 15px',
              borderRadius: '3px',
              fontWeight: 'bold'
            }}>Join Fleet</a>
          </div>
        </nav>

        {/* --- PAGE CONTENT --- */}
        <main style={{ minHeight: 'calc(100vh - 70px)' }}>
          {children}
        </main>

        {/* --- CORPORATE FOOTER --- */}
        <footer style={{
          padding: '2rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          borderTop: '1px solid #30363d',
          color: '#8b949e'
        }}>
          © 2026 IRON DAISY AGRI | PRECISION IN THE FIELD. POWER IN THE FLEET.
        </footer>
      </body>
    </html>
  )
}

// Simple style object for the links
const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '0.9rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px'
};
