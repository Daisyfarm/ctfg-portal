'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function InteractionsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [contractAccepted, setContractAccepted] = useState<string | null>(null);

  const interactions = [
    { id: 1, sender: 'Global Grain Export Co.', type: 'Contract Offer', details: 'Transport 450t of wheat from Silo 3 to Port Terminal.', reward: '$12,400', status: 'Pending' },
    { id: 2, sender: 'County Agricultural Dept', type: 'Subsidy Grant', details: 'Inspection clearance passed for sustainable tillage practices.', reward: '$5,000', status: 'Completed' },
    { id: 3, sender: 'Neighboring Farm (Smith & Sons)', type: 'Equipment Rental', details: 'Requested 3-day lease of Case IH Axial-Flow combine.', reward: '$3,200', status: 'Pending' }
  ];

  const filteredInteractions = activeTab === 'All' 
    ? interactions 
    : interactions.filter(i => i.status === activeTab);

  const handleAction = (id: number, type: string) => {
    setContractAccepted(`Successfully ${type.toLowerCase()} interaction #${id}!`);
    setTimeout(() => setContractAccepted(null), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Operator Interactions // Communications Hub</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>

        <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', display: 'flex', gap: '32px', borderTop: '1px solid rgba(39, 39, 42, 0.8)', paddingTop: '16px', overflowX: 'auto' }}>
          <Link href="/myself" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Myself</Link>
          <Link href="/interactions" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 'bold' }}>Interactions</Link>
          <Link href="/finance" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Finance</Link>
          <Link href="/data" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Data</Link>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market</Link>
          <Link href="/wiki" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Wiki</Link>
          <Link href="/settings" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Settings</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Network Interactions & Contracts</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Manage incoming contract offers, trade proposals, and external communication logs.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {['All', 'Pending', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#2563eb' : '#0f1117',
                color: activeTab === tab ? '#ffffff' : '#a1a1aa',
                border: '1px solid #27272a',
                padding: '10px 18px',
                fontWeight: 900,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {contractAccepted && (
          <div style={{ marginBottom: '24px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '12px', borderRadius: '8px', color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>
            {contractAccepted}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredInteractions.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase' }}>{item.type}</span>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: item.status === 'Pending' ? '#f59e0b' : '#34d399', backgroundColor: item.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.status}
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', margin: '0 0 6px 0' }}>{item.sender}</h3>
                <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 12px 0' }}>{item.details}</p>
                <div style={{ fontSize: '12px', color: '#71717a' }}>Estimated Value: <strong style={{ color: '#34d399' }}>{item.reward}</strong></div>
              </div>

              {item.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => handleAction(item.id, 'Accepted')}
                    style={{ backgroundColor: '#10b981', color: '#ffffff', border: 'none', padding: '10px 20px', fontWeight: 900, borderRadius: '6px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleAction(item.id, 'Declined')}
                    style={{ backgroundColor: '#27272a', color: '#a1a1aa', border: '1px solid #3f3f46', padding: '10px 20px', fontWeight: 900, borderRadius: '6px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
