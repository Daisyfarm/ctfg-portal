"use client";
import React, { useState } from 'react';

export default function MyselfPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [farmName, setFarmName] = useState('Daisy Hill Acres');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 3000);
  };

  const vehicles = [
    { id: 1, name: 'John Deere 8R 410', status: 'Operational', location: 'Field 14', fuel: '84%' },
    { id: 2, name: 'Fendt 942 Vario', status: 'In Transit', location: 'Road North', fuel: '45%' },
    { id: 3, name: 'Case IH Axial-Flow 9250', status: 'Idle', location: 'Main Farm Yard', fuel: '92%' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Myself</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Interactions</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Finances</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Data ▾</span>
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
            Player Profile & Farm Overview
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Manage your personal farmer identity, active machinery fleet, and farm property details.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Profile', 'Fleet & Equipment'].map((tab) => (
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

        {profileUpdated && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px', maxWidth: '800px' }}>
            Profile updated successfully!
          </div>
        )}

        {activeTab === 'Profile' && (
          <form onSubmit={handleSave} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Farmer Username</label>
                <input 
                  type="text" 
                  defaultValue="DaisyFarmer"
                  style={{ width: '100%', padding: '10px', background: '#f8fafc', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                  readOnly
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Farm Name</label>
                <input 
                  type="text" 
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Contract Tokens</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0284c7' }}>14 Tokens</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Total Playtime</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>142 Hours</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Server Status</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a' }}>Online</div>
              </div>
            </div>

            <div>
              <button 
                type="submit"
                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                SAVE PROFILE
              </button>
            </div>

          </form>
        )}

        {activeTab === 'Fleet & Equipment' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {vehicles.map((v) => (
              <div key={v.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase' }}>Vehicle #{v.id}</span>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '4px' }}>{v.status}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>{v.name}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current Location: <strong style={{ color: '#334155' }}>{v.location}</strong></div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>Fuel Level: <strong style={{ color: '#334155' }}>{v.fuel}</strong></div>
                </div>
                <button onClick={() => alert(`Locating ${v.name} on server map!`)} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}>
                  TRACK VEHICLE
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
