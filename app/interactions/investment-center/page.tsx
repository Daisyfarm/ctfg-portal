
"use client";
import React, { useState } from 'react';

export default function InvestmentCenterPage() {
  const [invested, setInvested] = useState<{ [key: string]: boolean }>({});

  const handleInvest = (id: string) => {
    setInvested(prev => ({ ...prev, [id]: true }));
  };

  const investments = [
    {
      id: 'inv-1',
      title: 'Regional Wind & Solar Energy Fund',
      category: 'Infrastructure',
      roi: '12.5% Annual ROI',
      minInvestment: '$25,000.00',
      server: 'Server 19',
      description: 'Invest in sustainable green energy grid expansions across rural map sectors for steady quarterly dividend payouts.'
    },
    {
      id: 'inv-2',
      title: 'Central Grain Silo Expansion Syndicate',
      category: 'Storage & Logistics',
      roi: '15.8% Annual ROI',
      minInvestment: '$50,000.00',
      server: 'Server 8',
      description: 'Fund high-capacity grain elevators and warehousing complexes to capture peak seasonal storage tariffs.'
    },
    {
      id: 'inv-3',
      title: 'Agro-Tech Automated Machinery Startup',
      category: 'Venture Capital',
      roi: '22.4% Projected ROI',
      minInvestment: '$10,000.00',
      server: 'Server 14',
      description: 'Back autonomous tractor software algorithms and precision seeding hardware engineering initiatives.'
    }
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
          <span style={{ cursor: 'pointer' }}>Market ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Investment Center
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Allocate capital into high-yield agricultural infrastructure, logistics syndicates, and tech startups.
            </p>
          </div>
          <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
            Portfolio Summary
          </button>
        </div>

        {/* Investments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {investments.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.category} • {item.server}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', gap: '25px', fontSize: '13px', color: '#64748b' }}>
                  <div>Return Rate: <strong style={{ color: '#16a34a' }}>{item.roi}</strong></div>
                  <div>Min Investment: <strong>{item.minInvestment}</strong></div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => handleInvest(item.id)}
                  style={{ width: '100%', background: invested[item.id] ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {invested[item.id] ? 'INVESTMENT ACTIVE' : 'INVEST FUNDS'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
