'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      {/* Header matching the dark FSN command theme */}
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Operator Profile // Samuel Founder (#001)</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>

        {/* Global Navigation Links */}
        <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', display: 'flex', gap: '32px', borderTop: '1px solid rgba(39, 39, 42, 0.8)', paddingTop: '16px', overflowX: 'auto' }}>
          <Link href="/myself" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 'bold' }}>Myself</Link>
          <Link href="/interactions" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Interactions</Link>
          <Link href="/finance" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Finance</Link>
          <Link href="/data" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Data</Link>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market</Link>
          <Link href="/wiki" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Wiki</Link>
          <Link href="/settings" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Settings</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Player Profile & Farm Overview</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Manage your personal farmer identity, active machinery fleet, and farm property details.</p>
        </div>

        {/* Sub Navigation Tabs with Interactive Styling */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {['Profile', 'Fleet & Equipment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#2563eb' : '#0f1117',
                color: activeTab === tab ? '#ffffff' : '#a1a1aa',
                border: '1px solid #27272a',
                padding: '10px 18px',
                fontWeight: 900,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {profileUpdated && (
          <div style={{ marginBottom: '24px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '12px', borderRadius: '8px', color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>
            Profile updated successfully across network nodes!
          </div>
        )}

        {activeTab === 'Profile' && (
          <form onSubmit={handleSave} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '8px' }}>Farmer Username</label>
                <input 
                  type="text" 
                  defaultValue="DaisyFarmer"
                  style={{ width: '100%', padding: '12px', backgroundColor: '#18181b', color: '#ffffff', border: '1px solid #3f3f46', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
                  readOnly
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '8px' }}>Farm Name</label>
                <input 
                  type="text" 
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#18181b', color: '#ffffff', border: '1px solid #3f3f46', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', borderTop: '1px solid #27272a', borderBottom: '1px solid #27272a', padding: '20px 0' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', marginBottom: '4px' }}>Contract Tokens</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#34d399' }}>14 Tokens</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', marginBottom: '4px' }}>Total Playtime</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff' }}>142 Hours</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase', marginBottom: '4px' }}>Server Status</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#34d399' }}>Online</div>
              </div>
            </div>

            <div>
              <button 
                type="submit"
                style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 24px', fontWeight: 900, borderRadius: '6px', cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase' }}
              >
                Save Profile
              </button>
            </div>

          </form>
        )}

        {activeTab === 'Fleet & Equipment' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {vehicles.map((v) => (
              <div key={v.id} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#71717a', textTransform: 'uppercase' }}>Vehicle #{v.id}</span>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#34d399', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>{v.status}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px 0' }}>{v.name}</h3>
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '6px' }}>Current Location: <strong style={{ color: '#ffffff' }}>{v.location}</strong></div>
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '20px' }}>Fuel Level: <strong style={{ color: '#ffffff' }}>{v.fuel}</strong></div>
                </div>
                <button 
                  onClick={() => alert(`Locating ${v.name} on server map!`)} 
                  style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px', fontWeight: 900, borderRadius: '6px', cursor: 'pointer', fontSize: '12px', width: '100%', textTransform: 'uppercase' }}
                >
                  Track Vehicle
                </button>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
