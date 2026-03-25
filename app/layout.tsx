import React from 'react';

export const metadata = {
  title: 'Iron Daisy Agri | Portal',
  description: 'Official Management Terminal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0b0f1a', color: 'white', fontFamily: 'sans-serif' }}>
        <nav style={{
          display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem',
          background: '#161b22', borderBottom: '2px solid #F2C94C', position: 'sticky', top: 0, zIndex: 100
        }}>
          <div style={{ fontWeight: 'bold', color: '#F2C94C', letterSpacing: '1px' }}>IRON DAISY AGRI</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/" style={navLink}>Home</a>
            <a href="/fleet" style={navLink}>Fleet</a>
            <a href="/permits" style={navLink}>Permits</a>
            <a href="/rules" style={navLink}>Rules</a>
          </div>
        </nav>
        <main>{children}</main>
        <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.8rem', color: '#8b949e', borderTop: '1px solid #30363d' }}>
          © 2026 IRON DAISY AGRI | MONTANA DIVISION
        </footer>
      </body>
    </html>
  );
}

const navLink = { color: 'white', textDecoration: 'none', fontSize: '0.9rem', textTransform: 'uppercase' as const };
