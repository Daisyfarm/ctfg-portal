'use client';

import React from 'react';
import Link from 'next/link';

export default function WikiPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Network Knowledge Base // Wiki</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Network Wiki & Protocols</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Standard operating procedures, node guidelines, and machinery manuals.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Protocol 01</span>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 12px 0' }}>Multi-Node Operations</h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.6, margin: 0 }}>
              Guidelines for managing multi-sector production, ensuring smooth cross-node grain transfers, and maintaining automated heavy machinery workflows.
            </p>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Protocol 02</span>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 12px 0' }}>Treasury & Maintenance</h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.6, margin: 0 }}>
              Details on daily overhead cost deductions, automated dividend distributions from global commodity export markets, and emergency reserve vaults.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
