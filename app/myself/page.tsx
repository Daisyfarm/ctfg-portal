
"use client";
import React, { useState } from 'react';

export default function MyselfPage() {
  const [profileUpdated, setProfileUpdated] = useState(false);

  const handleSave = () => {
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  const ownedEquipment = [
    { name: 'Fendt 1050 Vario', hours: '420 hrs', condition: 'Excellent', location: 'Server 19' },
    { name: 'John Deere X9 1100', hours: '210 hrs', condition: 'Good', location: 'Server 19' },
    { name: 'Mack Super-Liner Truck', hours: '850 hrs', condition: 'Fair', location: 'Server 8' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer', color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px' }}>Myself ▾</span>
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
            My Profile & Farm Management
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Manage your farmer credentials, active server permissions, and personal machinery inventory.
          </p>
        </div>

        {/* Profile Card & Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Farmer Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334155' }}>
              <div>Farmer Name: <strong>Admin / Daisy Hill Tactical</strong></div>
              <div>Primary Server: <strong>Server 19</strong></div>
              <div>License Status: <span style={{ color: '#16a34a', fontWeight: 'bold' }}>CDL & Applicator Active</span></div>
              <div>Reputation Rank: <strong style={{ color: '#0284c7' }}>Master Contractor (Level 42)</strong></div>
            </div>
            <button 
              onClick={handleSave}
              style={{ width: '100%', marginTop: '20px', background: profileUpdated ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s' }}
            >
              {profileUpdated ? 'PROFILE SAVED' : 'UPDATE CREDENTIALS'}
            </button>
          </div>

          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Server Access Privileges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
                <span>Server 8 (North Plains)</span>
                <strong style={{ color: '#16a34a' }}>Full Access</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
                <span>Server 14 (Alpine Ridge)</span>
                <strong style={{ color: '#16a34a' }}>Full Access</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #e2e8f0' }}>
                <span>Server 19 (Daisy Hill Main)</span>
                <strong style={{ color: '#16a34a' }}>Administrator</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Owned Equipment Table */}
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 20px 0' }}>Owned Machinery & Fleet</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {ownedEquipment.map((eq, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: index !== ownedEquipment.length - 1 ? '1px solid #e2e8f0' : 'none', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b', marginBottom: '3px' }}>{eq.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Location: <strong>{eq.location}</strong> • Condition: <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{eq.condition}</span></div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0284c7', background: '#f1f5f9', padding: '6px 12px', borderRadius: '4px' }}>
                  {eq.hours}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
