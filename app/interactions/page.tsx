"use client";
import React from 'react';

export default function InteractionsHubPage() {
  const interactionsList = [
    { title: 'Auction House', description: 'Bid on exclusive equipment, machinery, and properties.', path: '/interactions/auction-house' },
    { title: 'Competition Center', description: 'Enter community tournaments and win prize pools.', path: '/interactions/competition-center' },
    { title: 'Contract Center', description: 'Browse and accept server farm operation contracts.', path: '/interactions/contract-center' },
    { title: 'Event Center', description: 'Check community gatherings and server convoys.', path: '/interactions/event-center' },
    { title: 'Import/Export Center', description: 'Manage cargo manifests and customs audits.', path: '/interactions/import-export-center' },
    { title: 'Investment Center', description: 'Allocate capital into infrastructure and startups.', path: '/interactions/investment-center' },
    { title: 'Lotto Center', description: 'Purchase tickets and test your luck in community draws.', path: '/interactions/lotto-center' },
    { title: 'Permit Center', description: 'Manage skilled trade licenses and operational certificates.', path: '/interactions/permit-center' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer', color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px' }}>Interactions ▾</span>
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
            Interactions Hub
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Select an interaction portal below to manage auctions, contracts, investments, permits, and more.
          </p>
        </div>

        {/* Grid of Interactions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {interactionsList.map((item, index) => (
            <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 20px 0', lineHeight: '1.5' }}>{item.description}</p>
              </div>
              <a 
                href={item.path}
                style={{ background: '#0284c7', color: '#fff', textDecoration: 'none', textAlign: 'center', padding: '10px', fontWeight: 'bold', borderRadius: '4px', fontSize: '13px', display: 'block' }}
              >
                OPEN PORTAL
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
