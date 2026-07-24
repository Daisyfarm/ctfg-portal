
"use client";
import React, { useState } from 'react';

export default function ContractCenterPage() {
  const [accepted, setAccepted] = useState<{ [key: string]: boolean }>({});

  const handleAccept = (id: string) => {
    setAccepted(prev => ({ ...prev, [id]: true }));
  };

  const contracts = [
    {
      id: '17910',
      type: 'Transport & Delivery',
      server: 'Server 8',
      farm: 'Cool Brook Farms',
      reward: '$1,250.00',
      description: 'Transport 45,000 liters of soybeans from North Silo to the central grain mill before the deadline expires.'
    },
    {
      id: '17911',
      type: 'Field Cultivation',
      server: 'Server 19',
      farm: 'Green Valley Ag',
      reward: '$2,100.00',
      description: 'Perform deep cultivation on Field 14 using heavy-duty subsoilers. Ensure 100% coverage.'
    },
    {
      id: '17912',
      type: 'Export Audit',
      server: 'Server 14',
      farm: 'Riverview Logistics',
      reward: '$850.00',
      description: 'Verify custom silo inventories and manage export manifests for upcoming trade routes.'
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
        
        {/* Page Title */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Contract Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Browse available server contracts, accept assignments, and fulfill farm operations for cash rewards.
          </p>
        </div>

        {/* Contracts List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {contracts.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Contract #{item.id} • {item.type} • {item.server}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>
                  Assigned Farm: {item.farm}
                </h3>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {item.description}
                </p>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Reward: <strong style={{ color: '#16a34a' }}>{item.reward}</strong>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => handleAccept(item.id)}
                  style={{ width: '100%', background: accepted[item.id] ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {accepted[item.id] ? 'CONTRACT ACCEPTED' : 'ACCEPT CONTRACT'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
