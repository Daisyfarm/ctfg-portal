
"use client";
import React, { useState } from 'react';

export default function MarketPage() {
  const [selectedServer, setSelectedServer] = useState('Server 19');

  const marketPrices = [
    { item: 'Wheat', category: 'Crops', price: '$720.00 / 1000L', change: '+4.2%', trend: 'up' },
    { item: 'Barley', category: 'Crops', price: '$650.00 / 1000L', change: '-1.5%', trend: 'down' },
    { item: 'Canola', category: 'Crops', price: '$940.00 / 1000L', change: '+2.8%', trend: 'up' },
    { item: 'Sunflower', category: 'Crops', price: '$980.00 / 1000L', change: '+0.5%', trend: 'up' },
    { item: 'Soybeans', category: 'Crops', price: '$1,150.00 / 1000L', change: '+6.1%', trend: 'up' },
    { item: 'Milk', category: 'Animal Products', price: '$850.00 / 1000L', change: '-0.8%', trend: 'down' },
    { item: 'Eggs', category: 'Animal Products', price: '$420.00 / Pallet', change: '+1.2%', trend: 'up' },
    { item: 'Wool', category: 'Animal Products', price: '$1,300.00 / Pallet', change: '+3.4%', trend: 'up' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ cursor: 'pointer', color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px' }}>Market ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title & Server Filter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Market Pricing & Economy
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Track live commodity prices, sellpoint demands, and regional economic trends across servers.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Server 8', 'Server 14', 'Server 19'].map((server) => (
              <button
                key={server}
                onClick={() => setSelectedServer(server)}
                style={{
                  background: selectedServer === server ? '#0284c7' : '#fff',
                  color: selectedServer === server ? '#fff' : '#334155',
                  border: '1px solid #cbd5e1',
                  padding: '8px 16px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                {server}
              </button>
            ))}
          </div>
        </div>

        {/* Market Table */}
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '20px 25px', borderBottom: '1px solid #cbd5e1', background: '#f8fafc' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', margin: '0' }}>
              Live Commodities ({selectedServer})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {marketPrices.map((row, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '18px 25px', borderBottom: index !== marketPrices.length - 1 ? '1px solid #e2e8f0' : 'none', alignItems: 'center', fontSize: '14px' }}>
                <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{row.item}</div>
                <div style={{ color: '#64748b', fontSize: '13px' }}>{row.category}</div>
                <div style={{ fontWeight: 'bold', color: '#16a34a' }}>{row.price}</div>
                <div style={{ fontWeight: 'bold', color: row.trend === 'up' ? '#16a34a' : '#dc2626' }}>
                  {row.change} {row.trend === 'up' ? '▲' : '▼'}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
