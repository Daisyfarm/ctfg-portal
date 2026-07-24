
"use client";
import React from 'react';
import Link from 'next/link';

export default function InteractionsHubPage() {
  const centers = [
    { name: 'Auction House', path: '/interactions/auction-house', icon: '🏛️', desc: 'Browse and bid on items and equipment.' },
    { name: 'Competition Center', path: '/interactions/competition-center', icon: '🏆', desc: 'View and participate in active community competitions.' },
    { name: 'Contract Center', path: '/interactions/contract-center', icon: '📋', desc: 'Accept contracts, view logs, and manage tasks.' },
    { name: 'Event Center', path: '/interactions/event-center', icon: '🎉', desc: 'Check upcoming server events and community schedules.' },
    { name: 'Import/Export Center', path: '/interactions/import-export-center', icon: '🚢', desc: 'Manage global trade, exports, and imports.' },
    { name: 'Investment Center', path: '/interactions/investment-center', icon: '📈', desc: 'Invest funds and monitor financial growth.' },
    { name: 'Lotto Center', path: '/interactions/lotto-center', icon: '🎟️', desc: 'Try your luck with community lotteries and draws.' },
    { name: 'Permit Center', path: '/interactions/permit-center', icon: '🛡️', desc: 'Purchase and renew required licenses and permits.' },
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
        <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 10px 0' }}>
          Interactions Hub
        </h1>
        <p style={{ fontSize: '13px', color: '#334155', marginBottom: '30px' }}>
          Select a center below to manage your activities, contracts, permits, and trades.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {centers.map((center, index) => (
            <Link key={index} href={center.path} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', height: '100%', boxSizing: 'border-box' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-2px)';
                     e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                   }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{center.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>{center.name}</h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0', lineHeight: '1.5' }}>{center.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
