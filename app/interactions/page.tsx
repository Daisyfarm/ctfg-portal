"use client";
import React, { useState } from 'react';

export default function InteractionsPage() {
  const [activeTab, setActiveTab] = useState('Contracts');

  const [activeContract, setActiveContract] = useState({
    title: 'Harvest Wheat - Field 14',
    client: 'Daisy Hill NPC',
    reward: '$4,850',
    tokens: '+2'
  });

  const availableContracts = [
    { id: 1, title: 'Harvest Wheat - Field 14', client: 'Daisy Hill NPC', reward: '$4,850', tokens: '+2 Tokens', permit: 'None' },
    { id: 2, title: 'Transport Grain to Mill', client: 'North Plains Co-op', reward: '$2,100', tokens: '+1 Token', permit: 'CDL License' },
    { id: 3, title: 'Field Cultivation & Spraying', client: 'Alpine Agro', reward: '$6,400', tokens: '+3 Tokens', permit: 'Herbicide Permit' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Interactions, Contracts & Permit Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Take on farm operation contracts, manage active job progress, and acquire legal state permits.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Contracts', 'Permit Center'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#0284c7' : '#fff',
                color: activeTab === tab ? '#fff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Contracts' && (
          <div>
            {/* Active Contract Status Card */}
            {activeContract && (
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '6px' }}>Active Contract Status</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 6px 0' }}>{activeContract.title}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>
                  Client: <strong style={{ color: '#334155' }}>{activeContract.client}</strong> | Reward: <strong style={{ color: '#16a34a' }}>{activeContract.reward}</strong> • Tokens: <strong style={{ color: '#0284c7' }}>{activeContract.tokens}</strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => alert('Contract marked as complete!')} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    MARK COMPLETE
                  </button>
                  <button onClick={() => setActiveContract(null as any)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    CANCEL
                  </button>
                </div>
              </div>
            )}

            {/* Available Contracts Board */}
            <h2 style={{ fontSize: '18px', color: '#332266', marginBottom: '15px' }}>Available Contracts Board</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {availableContracts.map((c) => (
                <div key={c.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>{c.client}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>{c.title}</h3>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>{c.reward}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Tokens Reward: <strong style={{ color: '#0284c7' }}>{c.tokens}</strong></div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>Required Permit: <strong style={{ color: '#334155' }}>{c.permit}</strong></div>
                  </div>
                  <button onClick={() => alert(`Accepted ${c.title}!`)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}>
                    ACCEPT CONTRACT
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Permit Center' && (
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px' }}>
            <h3 style={{ fontSize: '18px', color: '#1e3a8a', marginBottom: '10px' }}>State Agricultural Permits</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Acquire required legal certificates to unlock heavy transport contracts and restricted chemical operations.</p>
          </div>
        )}

      </div>
    </div>
  );
}
