'use client';

import React from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>System Configuration</span>
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
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market</Link>
          <Link href="/wiki" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Wiki</Link>
          <Link href="/settings" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 'bold' }}>Settings</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>System Preferences</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Manage interface parameters, node security, and telemetry preferences.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase' }}>Security Level</span>
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 8px 0' }}>Enforced Encryption</h2>
            <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>All outgoing telemetry packets are secured using local protocol handshakes.</p>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase' }}>Telemetry</span>
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 8px 0' }}>Real-Time Sync</h2>
            <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>Active node frequency syncing enabled for all automated equipment modules.</p>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase' }}>Interface Theme</span>
            <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 8px 0' }}>Tactical Dark Mode</h2>
            <p style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>High-contrast dark layout optimized for command room displays.</p>
          </div>
        </div>
      </main>
    </div>
  );
}