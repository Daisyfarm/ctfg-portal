"use client";
import React, { useState } from 'react';

export default function DataPage() {
  const [activeTab, setActiveTab] = useState('Server Logs');

  const serverLogs = [
    { id: 1, timestamp: '2026-06-24 14:15:22', event: 'Contract Completed', server: 'Server 19 (Daisy Hill Main)', details: 'FarmerJoe99 completed Harvest Wheat - Field 14' },
    { id: 2, timestamp: '2026-06-24 12:00:00', event: 'Daily Maintenance', server: 'All Servers', details: 'Automated loan interest deductions & property taxes processed' },
    { id: 3, timestamp: '2026-06-24 10:45:12', event: 'Market Price Shift', server: 'Server 8 (North Plains)', details: 'Canola demand increased by +6.8%' },
    { id: 4, timestamp: '2026-06-24 09:30:00', event: 'Permit Issued', server: 'Server 19 (Daisy Hill Main)', details: 'DaisyFarmer acquired Commercial Driver\'s License (CDL)' }
  ];

  const economyStats = [
    { label: 'Total Currency in Circulation', value: '$14,285,400', change: '+5.4% this week' },
    { label: 'Active Contracts Worldwide', value: '142 Contracts', change: '18 pending completion' },
    { label: 'Total Grain Harvested', value: '4,850,000 Liters', change: 'Wheat leading output' },
    { label: 'Registered Farm Plots', value: '88 Farms', change: '12 available for auction' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Data</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Market</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Marketplace</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Server Telemetry & Data Records
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Inspect live server activity logs, historical event records, and global economic statistics.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Server Logs', 'Economy Statistics'].map((tab) => (
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

        {/* Tab Content: Server Logs */}
        {activeTab === 'Server Logs' && (
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                  <th style={{ padding: '12px 15px' }}>Timestamp</th>
                  <th style={{ padding: '12px 15px' }}>Event Type</th>
                  <th style={{ padding: '12px 15px' }}>Server</th>
                  <th style={{ padding: '12px 15px' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {serverLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 15px', color: '#64748b' }}>{log.timestamp}</td>
                    <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#0284c7' }}>{log.event}</td>
                    <td style={{ padding: '12px 15px', color: '#334155' }}>{log.server}</td>
                    <td style={{ padding: '12px 15px', color: '#1e293b' }}>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content: Economy Statistics */}
        {activeTab === 'Economy Statistics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {economyStats.map((stat, index) => (
              <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>{stat.label}</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 'bold' }}>{stat.change}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
