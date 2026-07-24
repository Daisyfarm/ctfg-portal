
"use client";
import React, { useState } from 'react';

export default function ImportExportCenterPage() {
  const [dispatched, setDispatched] = useState<{ [key: string]: boolean }>({});

  const handleDispatch = (id: string) => {
    setDispatched(prev => ({ ...prev, [id]: true }));
  };

  const shipments = [
    {
      id: 'EXP-9021',
      destination: 'Hamburg Port, Germany',
      cargo: '120,000L Premium Wheat',
      status: 'Ready for Customs Clearance',
      value: '$84,000.00',
      server: 'Server 19'
    },
    {
      id: 'IMP-4412',
      origin: 'Rotterdam Terminal, Netherlands',
      cargo: 'High-Grade Fertilizer (50 Pallets)',
      status: 'In Transit',
      value: '$32,500.00',
      server: 'Server 8'
    },
    {
      id: 'EXP-9022',
      destination: 'Rotterdam Terminal, Netherlands',
      cargo: '85,000L Canola Oil',
      status: 'Pending Documentation',
      value: '$68,200.00',
      server: 'Server 14'
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
              Import/Export Center
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Manage international cargo manifests, clear customs audits, and dispatch global shipping containers.
            </p>
          </div>
          <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
            + Create New Manifest
          </button>
        </div>

        {/* Shipments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {shipments.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Manifest #{item.id} • {item.server} • Status: <span style={{ color: '#d97706' }}>{item.status}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  {item.cargo}
                </h3>
                <div style={{ fontSize: '13px', color: '#334155', marginBottom: '10px' }}>
                  Destination/Origin: <strong>{item.destination || item.origin}</strong>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Declared Value: <strong style={{ color: '#16a34a' }}>{item.value}</strong>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button 
                  onClick={() => handleDispatch(item.id)}
                  style={{ width: '100%', background: dispatched[item.id] ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  {dispatched[item.id] ? 'MANIFEST DISPATCHED' : 'PROCESS & DISPATCH'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
