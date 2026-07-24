'use client';

import React from 'react';
import Link from 'next/link';

export default function FinancePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Treasury Vault Ledger</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Treasury Vault & Financial Ledger</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Global network balance, maintenance overhead deduction, and automated tax revenue.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Vault Balance</span>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#34d399', margin: '8px 0 0 0' }}>$8,100,000.00</h3>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Daily Overhead Cost</span>
            <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#f87171', margin: '8px 0 0 0' }}>-$14,500.00</h3>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 16px 0', color: '#a1a1aa' }}>Recent Ledger Transactions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', color: '#71717a', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Timestamp</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Node</th>
                <th style={{ padding: '12px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #18181b' }}>
                <td style={{ padding: '16px 12px', color: '#71717a', fontSize: '11px' }}>2026-07-24 17:10</td>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Automated Export Dividend (Wheat)</td>
                <td style={{ padding: '16px 12px' }}>North Node</td>
                <td style={{ padding: '16px 12px', color: '#34d399', fontWeight: 'bold' }}>+$42,500.00</td>
              </tr>
              <tr>
                <td style={{ padding: '16px 12px', color: '#71717a', fontSize: '11px' }}>2026-07-24 12:00</td>
                <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>Heavy Equipment Maintenance</td>
                <td style={{ padding: '16px 12px' }}>South Node</td>
                <td style={{ padding: '16px 12px', color: '#f87171', fontWeight: 'bold' }}>-$8,200.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
