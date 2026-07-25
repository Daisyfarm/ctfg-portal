'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const plans = [
    {
      id: 'tier-1',
      name: 'Server Mayorship',
      price: '$14.99',
      period: 'month',
      badge: 'District Leader',
      description: 'Claim regional leadership rights, control local district zoning funds, and secure permanent server priority.',
      perks: [
        'Official [Mayor] ingame chat title & tag',
        'District treasury subsidy & tax management',
        'Priority server queue bypass (Instant join)',
        'Exclusive mayoral council discord access',
        'Custom land development veto rights'
      ]
    },
    {
      id: 'tier-2',
      name: 'Agribusiness Tycoon',
      price: '$29.99',
      period: 'month',
      badge: 'VIP Elite',
      description: 'The ultimate enterprise tier for heavy investors, enterprise syndicates, and network founders.',
      perks: [
        'All Server Mayorship mayoral privileges',
        'Unlimited contract & high-yield market placement',
        'Custom [Tycoon] gold chat badge',
        'Direct voting power on core server updates',
        'Dedicated corporate warehouse allocation'
      ]
    }
  ];

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    setIsSuccessModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Mayorship & Subscriptions</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '10px' }}>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>Server Leadership Tiers</h1>
          <p style={{ fontSize: '13px', color: '#71717a', textTransform: 'uppercase', margin: 0 }}>Secure your regional mayorship, unlock political controls, and fund network operations.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {plans.map((plan) => (
            <div 
              key={plan.id}
              style={{
                backgroundColor: '#0f1117',
                border: plan.badge === 'District Leader' ? '2px solid #34d399' : '1px solid #27272a',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {plan.badge === 'District Leader' && (
                <span style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  backgroundColor: '#34d399',
                  color: '#05070a',
                  fontSize: '9px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  Flagship Tier
                </span>
              )}

              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#34d399', textTransform: 'uppercase', marginBottom: '8px' }}>{plan.badge}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>{plan.name}</h3>
                <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 24px 0', lineHeight: '1.4' }}>{plan.description}</p>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px', borderBottom: '1px solid #27272a', paddingBottom: '24px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff' }}>{plan.price}</span>
                  <span style={{ fontSize: '12px', color: '#71717a', textTransform: 'uppercase' }}>/ {plan.period}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#d4d4d8' }}>
                  {plan.perks.map((perk, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#34d399', fontWeight: 'bold' }}>✓</span> {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(plan.name)}
                style={{
                  width: '100%',
                  backgroundColor: plan.badge === 'District Leader' ? '#34d399' : '#18181b',
                  color: plan.badge === 'District Leader' ? '#05070a' : '#ffffff',
                  border: plan.badge === 'District Leader' ? 'none' : '1px solid #27272a',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Claim {plan.name}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>👑</div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>Mayorship Registration</h3>
            <p style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', margin: '0 0 24px 0' }}>Initializing district license for <span style={{ color: '#34d399', fontWeight: 'bold' }}>{selectedPlan}</span>...</p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              style={{ backgroundColor: '#34d399', color: '#05070a', border: 'none', padding: '10px 24px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}