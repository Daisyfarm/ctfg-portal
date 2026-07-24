'use client';

import React from 'react';
import Link from 'next/link';

export default function InteractionsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Network Interactions & Dispatch Log</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Interactions & Dispatch Log</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Cross-node messaging, contractor contracts, and automated fleet assignments.</p>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 16px 0', color: '#a1a1aa' }}>Recent Dispatch Logs</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', color: '#71717a', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Timestamp</th>
                <th style={{ padding: '12px' }}>Operator / Unit</th>
                <th style={{ padding: '12px' }}>Action</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #18181b' }}>
                <td style={{ padding: '16px 12px', color: '#71717a', fontSize: '11px' }}>2026-07-24 18:05</td>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Contractor #04 (North Node)</td>
                <td style={{ padding: '16px 12px' }}>Combine Harvester Fleet Deployment</td>
                <td style={{ padding: '16px 12px', color: '#34d399', fontWeight: 'bold' }}>Completed</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 12px', color: '#71717a', fontSize: '11px' }}>2026-07-24 15:30</td>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Samuel Founder (#001)</td>
                <td style={{ padding: '16px 12px' }}>Silo Storage Transfer Authorization</td>
                <td style={{ padding: '16px 12px', color: '#60a5fa', fontWeight: 'bold' }}>Synced</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
