'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MarketPage() {
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Global Market Index</span>
          </div>
          <button 
            onClick={() => setCurrency(currency === 'USD' ? 'GBP' : 'USD')}
            style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}
          >
            Currency: {currency === 'USD' ? 'USD ($)' : 'GBP (£)'}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>FSN Global Commodity Index</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Live cross-server pricing and export demand telemetry.</p>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', color: '#71717a', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Commodity</th>
                <th style={{ padding: '12px' }}>Pricing Index</th>
                <th style={{ padding: '12px' }}>Export Demand</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #18181b' }}>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Wheat</td>
                <td style={{ padding: '16px 12px' }}>{currency === 'USD' ? '$320.40 / t' : '£252.30 / t'}</td>
                <td style={{ padding: '16px 12px', color: '#34d399' }}>High Demand</td>
                <td style={{ padding: '16px 12px' }}><span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>Synced</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #18181b' }}>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Barley</td>
                <td style={{ padding: '16px 12px' }}>{currency === 'USD' ? '$295.10 / t' : '£232.40 / t'}</td>
                <td style={{ padding: '16px 12px', color: '#facc15' }}>Stable</td>
                <td style={{ padding: '16px 12px' }}><span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>Synced</span></td>
              </tr>
              <tr>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Linseed / Rapeseed</td>
                <td style={{ padding: '16px 12px' }}>{currency === 'USD' ? '$540.80 / t' : '£425.80 / t'}</td>
                <td style={{ padding: '16px 12px', color: '#34d399' }}>Peak Export</td>
                <td style={{ padding: '16px 12px' }}><span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '10px' }}>Synced</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
