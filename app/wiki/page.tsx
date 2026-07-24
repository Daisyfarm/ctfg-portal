"use client";
import React, { useState } from 'react';

export default function WikiPage() {
  const [activeTab, setActiveTab] = useState('Rules');

  const rules = [
    { id: 1, title: 'Respect Property Boundaries', description: 'Do not harvest or drive equipment across unowned or other players fields without explicit permission.' },
    { id: 2, title: 'Realistic Driving & Traffic', description: 'Observe road rules when transporting heavy machinery through main town areas and intersections.' },
    { id: 3, title: 'Proper Equipment Return', description: 'Always return leased or shared cooperative machinery to its designated pad clean and refueled.' }
  ];

  const mods = [
    { id: 1, name: 'FSN Network Core Framework', version: 'v2.0.26', category: 'System', status: 'Required' },
    { id: 2, name: 'Precision Farming DLC', version: 'v1.1.0', category: 'Gameplay', status: 'Required' },
    { id: 3, name: 'Global Company Economy Pack', version: 'v1.4.2', category: 'Economy', status: 'Required' },
    { id: 4, name: 'Extended Vehicle Pack Vol. 3', version: 'v2.0.0', category: 'Vehicles', status: 'Optional' }
  ];

  const guides = [
    { id: 1, title: 'How to Apply for Farm Contracts', summary: 'Navigate to the Interactions tab to accept field and transport operations. Ensure you hold required permits.' },
    { id: 2, title: 'Managing Bank Loans & Interest', summary: 'Keep track of daily loan installments under Finances to avoid penalties and negative credit ratings.' },
    { id: 3, title: 'Participating in Live Auctions', summary: 'Check the Auction House for seized surplus equipment or land plots. Bidding closes automatically upon timer expiration.' }
  ];

  return (
    <div style={{ background: '#111827', minHeight: 'calc(100vh - 90px)', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>
            Server Wiki & Knowledge Base
          </h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0' }}>
            Official server regulations, required mod lists, and gameplay walkthroughs for network members.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Rules', 'Mod List', 'Guides'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#2563eb' : '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
                padding: '8px 16px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Rules Tab Content */}
        {activeTab === 'Rules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {rules.map((rule) => (
              <div key={rule.id} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#60a5fa', margin: '0 0 6px 0' }}>{rule.id}. {rule.title}</h3>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0', lineHeight: '1.4' }}>{rule.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mod List Tab Content */}
        {activeTab === 'Mod List' && (
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#374151', color: '#d1d5db', borderBottom: '1px solid #4b5563' }}>
                  <th style={{ padding: '12px 15px' }}>Mod Name</th>
                  <th style={{ padding: '12px 15px' }}>Version</th>
                  <th style={{ padding: '12px 15px' }}>Category</th>
                  <th style={{ padding: '12px 15px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mods.map((mod) => (
                  <tr key={mod.id} style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#fff' }}>{mod.name}</td>
                    <td style={{ padding: '12px 15px', color: '#9ca3af' }}>{mod.version}</td>
                    <td style={{ padding: '12px 15px', color: '#93c5fd' }}>{mod.category}</td>
                    <td style={{ padding: '12px 15px' }}>
                      <span style={{ 
                        background: mod.status === 'Required' ? '#065f46' : '#374151', 
                        color: '#fff', 
                        padding: '3px 8px', 
                        borderRadius: '4px', 
                        fontSize: '11px', 
                        fontWeight: 'bold' 
                      }}>
                        {mod.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Guides Tab Content */}
        {activeTab === 'Guides' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {guides.map((guide) => (
              <div key={guide.id} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 10px 0' }}>{guide.title}</h3>
                  <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0 0 20px 0', lineHeight: '1.4' }}>{guide.summary}</p>
                </div>
                <button onClick={() => alert(`Opening guide: ${guide.title}`)} style={{ background: '#374151', color: '#fff', border: '1px solid #4b5563', padding: '8px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                  READ FULL GUIDE
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
