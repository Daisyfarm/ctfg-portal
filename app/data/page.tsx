
"use client";
import React, { useState } from 'react';

export default function DataAnalyticsPage() {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const serverMetrics = [
    { server: 'Server 19', activePlayers: '48 / 64', totalHarvested: '2,450,000 L', economyHealth: 'Stable (98%)', status: 'Online' },
    { server: 'Server 8', activePlayers: '32 / 64', totalHarvested: '1,890,000 L', economyHealth: 'Booming (104%)', status: 'Online' },
    { server: 'Server 14', activePlayers: '26 / 50', totalHarvested: '1,200,000 L', economyHealth: 'Growing (95%)', status: 'Online' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer', color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px' }}>Data ▾</span>
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
              Data & Network Analytics
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Examine global server telemetry, harvest aggregates, player statistics, and database logs.
            </p>
          </div>
          <button 
            onClick={handleExport}
            style={{ background: exported ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
          >
            {exported ? 'DATA EXPORTED SUCCESSFULLY' : 'EXPORT JSON TELEMETRY'}
          </button>
        </div>

        {/* Server Telemetry Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {serverMetrics.map((item, index) => (
            <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', margin: '0' }}>{item.server}</h3>
                <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{item.status}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155' }}>
                <div>Active Players: <strong>{item.activePlayers}</strong></div>
                <div>Total Harvested: <strong style={{ color: '#16a34a' }}>{item.totalHarvested}</strong></div>
                <div>Economy Health: <strong style={{ color: '#0284c7' }}>{item.economyHealth}</strong></div>
              </div>
            </div>
          ))}
        </div>

        {/* Database Logs Section */}
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Recent Database Event Logs</h3>
          
          <div style={{ background: '#0f172a', color: '#38bdf8', padding: '15px 20px', borderRadius: '6px', fontFamily: 'Courier New, monospace', fontSize: '12px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>[2026-07-24 14:10:22] [INFO] Server 19: Contract #17909 successfully validated and completed.</div>
            <div>[2026-07-24 14:08:05] [SYNC] Database cluster auto-backup completed successfully (0.42s).</div>
            <div>[2026-07-24 13:55:12] [TRANSACTION] User balance updated for Cool Brook Farms (-$2,000.00 permit fee).</div>
            <div>[2026-07-24 13:40:01] [WARNING] Server 8 high traffic load detected (32 concurrent farmers online).</div>
          </div>
        </div>

      </div>
    </div>
  );
}
