'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContractsPage() {
  const [acceptedContract, setAcceptedContract] = useState<string | null>(null);

  const contracts = [
    {
      id: 'c-1',
      title: 'District Grain Transport',
      employer: 'Northfield Syndicate',
      payout: '$4,500',
      duration: '3 Days',
      description: 'Haul high-yield barley from the primary storage silos to the regional processing plant.',
      requirements: ['Class 2 Transport License', 'Standard Grain Trailer']
    },
    {
      id: 'c-2',
      title: 'Heavy Machinery Relocation',
      employer: 'Stonewall Agribusiness',
      payout: '$8,200',
      duration: '5 Days',
      description: 'Transport heavy tillage equipment across district sectors for seasonal soil preparation.',
      requirements: ['Lowloader Trailer', 'District Mayorship or Tycoon Tier']
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: 'linear-gradient(rgba(5, 7, 10, 0.9), rgba(5, 7, 10, 0.95)), url(/screenshot5.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#ffffff', 
      fontFamily: 'sans-serif' 
    }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Contracts & Operations</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '10px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/membership" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Membership</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>Active Work Contracts</h1>
          <p style={{ fontSize: '13px', color: '#a1a1aa', textTransform: 'uppercase', margin: 0 }}>Secure regional hauling and agricultural contracts to fund your enterprise.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {contracts.map((contract) => (
            <div 
              key={contract.id}
              style={{
                backgroundColor: 'rgba(15, 17, 23, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #27272a',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#34d399', textTransform: 'uppercase', marginBottom: '8px' }}>{contract.employer}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>{contract.title}</h3>
                <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '0 0 24px 0', lineHeight: '1.4' }}>{contract.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', borderBottom: '1px solid #27272a', paddingBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', display: 'block' }}>Payout</span>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#34d399' }}>{contract.payout}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '10px', color: '#71717a', textTransform: 'uppercase', display: 'block' }}>Time Limit</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{contract.duration}</span>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#d4d4d8' }}>
                  {contract.requirements.map((req, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#34d399' }}>•</span> {req}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setAcceptedContract(contract.title)}
                style={{
                  width: '100%',
                  backgroundColor: acceptedContract === contract.title ? '#05070a' : '#18181b',
                  color: '#ffffff',
                  border: '1px solid #34d399',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {acceptedContract === contract.title ? 'Contract Active ✓' : 'Accept Contract'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}