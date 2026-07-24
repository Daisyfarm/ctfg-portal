"use client";
import React, { useState } from 'react';

export default function DataPage() {
  const [telemetry, setTelemetry] = useState([
    { id: 1, unit: 'John Deere 8R 410', status: 'Active (Field 14)', fuel: '78%', engineHours: '420 hrs', location: 'Sector 4-G' },
    { id: 2, unit: 'Fendt Vario 942', status: 'Idle (Main Farm)', fuel: '94%', engineHours: '215 hrs', location: 'HQ Yard' },
    { id: 3, unit: 'Case IH Axial-Flow 9250', status: 'Harvesting', fuel: '45%', engineHours: '680 hrs', location: 'Field 14' }
  ]);

  const fieldYields = [
    { id: 1, field: 'Field 14', crop: 'Wheat', size: '12.4 ha', expectedYield: '45,200 L', status: 'In Progress' },
    { id: 2, field: 'Field 8', crop: 'Canola', size: '8.2 ha', expectedYield: '28,100 L', status: 'Harvested' },
    { id: 3, field: 'Field 22', crop: 'Corn', size: '15.0 ha', expectedYield: '62,400 L', status: 'Growing' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#332266', margin: '0 0 5px 0' }}>
            Fleet Telemetry & Yield Analytics
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Real-time equipment diagnostics, fuel monitoring, and historical field harvest yields.
          </p>
        </div>

        {/* Fleet Telemetry Section */}
        <h2 style={{ fontSize: '18px', color: '#332266', marginBottom: '15px' }}>Active Fleet Telemetry</h2>
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', marginBottom: '35px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                <th style={{ padding: '12px 15px' }}>Equipment Unit</th>
                <th style={{ padding: '12px 15px' }}>Operational Status</th>
                <th style={{ padding: '12px 15px' }}>Fuel Level</th>
                <th style={{ padding: '12px 15px' }}>Engine Hours</th>
                <th style={{ padding: '12px 15px' }}>Current Location</th>
              </tr>
            </thead>
            <tbody>
              {telemetry.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#1e3a8a' }}>{item.unit}</td>
                  <td style={{ padding: '12px 15px', color: '#16a34a', fontWeight: 'bold' }}>{item.status}</td>
                  <td style={{ padding: '12px 15px', color: '#0f172a' }}>{item.fuel}</td>
                  <td style={{ padding: '12px 15px', color: '#64748b' }}>{item.engineHours}</td>
                  <td style={{ padding: '12px 15px', color: '#334155' }}>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Field Yield Analytics Section */}
        <h2 style={{ fontSize: '18px', color: '#332266', marginBottom: '15px' }}>Field Yield Analytics</h2>
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                <th style={{ padding: '12px 15px' }}>Field Parcel</th>
                <th style={{ padding: '12px 15px' }}>Planted Crop</th>
                <th style={{ padding: '12px 15px' }}>Hectares</th>
                <th style={{ padding: '12px 15px' }}>Expected Yield</th>
                <th style={{ padding: '12px 15px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {fieldYields.map((fy) => (
                <tr key={fy.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#1e3a8a' }}>{fy.field}</td>
                  <td style={{ padding: '12px 15px', color: '#0f172a' }}>{fy.crop}</td>
                  <td style={{ padding: '12px 15px', color: '#64748b' }}>{fy.size}</td>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#16a34a' }}>{fy.expectedYield}</td>
                  <td style={{ padding: '12px 15px' }}>
                    <span style={{ 
                      background: fy.status === 'In Progress' ? '#d97706' : fy.status === 'Harvested' ? '#16a34a' : '#2563eb', 
                      color: '#fff', 
                      padding: '3px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 'bold' 
                    }}>
                      {fy.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
