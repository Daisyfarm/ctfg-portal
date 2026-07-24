'use client';

import React from 'react';
import Link from 'next/link';

export default function FinancePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Treasury & Financial Ledger</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>

        <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', display: 'flex', gap: '32px', borderTop: '1px solid rgba(39, 39, 42, 0.8)', paddingTop: '16px', overflowX: 'auto' }}>
          <Link href="/myself" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Myself</Link>
          <Link href="/interactions" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Interactions</Link>
          <Link href="/finance" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 'bold' }}>Finance</Link>
          <Link href="/data" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Data</Link>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market</Link>
          <Link href="/wiki" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Wiki</Link>
          <Link href="/settings" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Settings</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Treasury Vault & Ledger</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Monitor accounts, operating funds, and recent transaction history.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Net Worth</span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#34d399', margin: '8px 0 0 0' }}>$1,482,900</h2>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Available Operating Capital</span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', margin: '8px 0 0 0' }}>$245,600</h2>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Monthly Subsidies / Grants</span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#3b82f6', margin: '8px 0 0 0' }}>$34,200</h2>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 20px 0' }}>Recent Financial Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#05070a', borderRadius: '8px', border: '1px solid #27272a' }}>
              <span style={{ color: '#ffffff' }}>Global Grain Export Co. (Contract Payout)</span>
              <strong style={{ color: '#34d399' }}>+$12,400</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#05070a', borderRadius: '8px', border: '1px solid #27272a' }}>
              <span style={{ color: '#ffffff' }}>County Agricultural Dept (Subsidy Grant)</span>
              <strong style={{ color: '#34d399' }}>+$5,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#05070a', borderRadius: '8px', border: '1px solid #27272a' }}>
              <span style={{ color: '#ffffff' }}>Heavy Machinery Maintenance & Diesel Refuel</span>
              <strong style={{ color: '#ef4444' }}>-$4,850</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
