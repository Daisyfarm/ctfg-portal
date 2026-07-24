'use client';

import React from 'react';
import Link from 'next/link';

export default function MarketPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Commodity Market & Contracts</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>

        <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', display: 'flex', gap: '32px', borderTop: '1px solid rgba(39, 39, 42, 0.8)', paddingTop: '16px', overflowX: 'auto' }}>
          <Link href="/myself" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Myself</Link>
          <Link href="/interactions" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Interactions</Link>
          <Link href="/finance" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Finance</Link>
          <Link href="/data" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Data</Link>
          <Link href="/market" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 'bold' }}>Market</Link>
          <Link href="/wiki" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Wiki</Link>
          <Link href="/settings" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Settings</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Live Commodity Exchange</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Real-time crop pricing, export futures, and regional supply index.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase' }}>Wheat (Grade A)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '8px 0 4px 0' }}>$248.50 <span style={{ fontSize: '12px', color: '#34d399' }}>+4.2%</span></h2>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>High demand across regional distribution hubs.</p>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase' }}>Corn (Yellow Field)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '8px 0 4px 0' }}>$192.10 <span style={{ fontSize: '12px', color: '#ef4444' }}>-1.1%</span></h2>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Stable domestic reserve inventories.</p>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase' }}>Soybeans (Premium)</span>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: '8px 0 4px 0' }}>$412.80 <span style={{ fontSize: '12px', color: '#34d399' }}>+6.8%</span></h2>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Surging export contracts to international ports.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
