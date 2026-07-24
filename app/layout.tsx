// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daisy Hill Tactical | Corporate Terminal',
  description: 'Agricultural management, logistics, and financial governance terminal for Daisy Hill operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#111', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
