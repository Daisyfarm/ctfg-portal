'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden' }}>
      
      {/* Top Bar / Navbar */}
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ color: '#ffffff', fontWeight: 900 }}>FARM NETWORK</span>
            <span style={{ color: '#52525b' }}>|</span>
            <span>Samuel Founder (#001)</span>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Judith Plains Network $8,100,000 (16 Slots)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span> NORTH: ONLINE</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span> SOUTH: ONLINE</span>
            <span style={{ color: '#71717a' }}>2026-07-24 18:24</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', display: 'flex', gap: '32px', borderTop: '1px solid rgba(39, 39, 42, 0.8)', paddingTop: '16px', overflowX: 'auto' }}>
          <Link href="/myself" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Myself</Link>
          <Link href="/interactions" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Interactions</Link>
          <Link href="/finance" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Finance</Link>
          <Link href="/data" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Data</Link>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market</Link>
          <Link href="/wiki" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Wiki</Link>
          <Link href="/settings" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Settings</Link>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontStyle: 'italic', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Judith Plains Montana 4X // Command Hub</h1>
            <p style={{ fontSize: '12px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '4px 0 0 0' }}>Multi-node operations, agricultural telemetry, and infrastructure management.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/investment-center" style={{ backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 900, fontSize: '12px', padding: '12px 20px', borderRadius: '6px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Investment Center
            </Link>
            <Link href="/registration" style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#ffffff', fontWeight: 900, fontSize: '12px', padding: '12px 20px', borderRadius: '6px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Registration
            </Link>
          </div>
        </div>

        {/* Grid Modules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sector Status</span>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 0 0', textTransform: 'uppercase' }}>North Node (Slots 1-8)</h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '8px 0 24px 0', lineHeight: 1.5 }}>Active farming operations, high-yield fields, and automated heavy machinery tracking.</p>
            <Link href="/data" style={{ fontSize: '12px', fontWeight: 900, color: '#60a5fa', textDecoration: 'none', textTransform: 'uppercase' }}>View Telemetry →</Link>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sector Status</span>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 0 0', textTransform: 'uppercase' }}>South Node (Slots 9-16)</h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '8px 0 24px 0', lineHeight: 1.5 }}>Secondary logistics hub, storage silos, and secondary crop production cycles.</p>
            <Link href="/data" style={{ fontSize: '12px', fontWeight: 900, color: '#60a5fa', textDecoration: 'none', textTransform: 'uppercase' }}>View Telemetry →</Link>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Treasury Vault</span>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#34d399', margin: '8px 0 0 0', textTransform: 'uppercase' }}>$8,100,000.00</h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '8px 0 24px 0', lineHeight: 1.5 }}>Global network balance, maintenance overhead deduction, and automated tax revenue.</p>
            <Link href="/finance" style={{ fontSize: '12px', fontWeight: 900, color: '#60a5fa', textDecoration: 'none', textTransform: 'uppercase' }}>Open Ledger →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
