'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContractCenterPage() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING'>('ALL');
  const [contracts] = useState([
    { id: 'CTR-1094', title: 'Export Wheat to Port Silo', server: 'Bjornholm - 19', reward: '$12,400', status: 'Active' },
    { id: 'CTR-1095', title: 'Barley Supply Agreement', server: 'Midwest Horizon - 1', reward: '$8,900', status: 'Pending' },
    { id: 'CTR-1096', title: 'Rapeseed Bulk Freight', server: 'Bjornholm - 19', reward: '$19,500', status: 'Active' },
  ]);

  const filteredContracts = contracts.filter(c => filter === 'ALL' || c.status.toUpperCase() === filter);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Contract Center</span>
          </div>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '10px' }}>&larr; Market Index</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Contract Center</h1>
            <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Manage active export agreements and logistics tasks.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['ALL', 'ACTIVE', 'PENDING'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  backgroundColor: filter === tab ? '#27272a' : '#0f1117',
                  color: filter === tab ? '#34d399' : '#a1a1aa',
                  border: '1px solid #27272a',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', color: '#71717a', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Contract ID</th>
                <th style={{ padding: '12px' }}>Agreement Title</th>
                <th style={{ padding: '12px' }}>Server</th>
                <th style={{ padding: '12px' }}>Payout Reward</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} style={{ borderBottom: '1px solid #18181b' }}>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#f59e0b' }}>{contract.id}</td>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>{contract.title}</td>
                  <td style={{ padding: '16px 12px', color: '#a1a1aa' }}>{contract.server}</td>
                  <td style={{ padding: '16px 12px' }}>{contract.reward}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      backgroundColor: contract.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(250, 204, 21, 0.1)', 
                      color: contract.status === 'Active' ? '#34d399' : '#facc15', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {contract.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}