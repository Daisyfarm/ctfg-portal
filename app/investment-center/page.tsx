'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function InvestmentCenterPage() {
  const [invested, setInvested] = useState(false);

  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    setInvested(true);
    setTimeout(() => setInvested(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Investment Center // Capital Allocation</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Investment Center & Capital Allocation</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Fund cross-server infrastructure, expand slot capacities, and acquire machinery yields.</p>
        </div>

        {invested && (
          <div style={{ marginBottom: '24px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '12px', borderRadius: '8px', color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>
            Investment successfully routed to Judith Plains Network vault.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Tier 01 Package</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 12px 0' }}>North Node Expansion</h3>
              <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                Allocate capital towards high-yield field optimization and automated combine harvester integrations.
              </p>
            </div>
            <form onSubmit={handleInvest}>
              <button 
                type="submit"
                style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 900, fontSize: '12px', padding: '12px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Invest $500,000
              </button>
            </form>
          </div>

          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Tier 02 Package</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '8px 0 12px 0' }}>South Node Infrastructure</h3>
              <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                Fund secondary storage silo expansion and automated export haulage logistics lines.
              </p>
            </div>
            <form onSubmit={handleInvest}>
              <button 
                type="submit"
                style={{ width: '100%', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 900, fontSize: '12px', padding: '12px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Invest $1,000,000
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
