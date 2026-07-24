"use client";
import React, { useState } from 'react';

export default function SettingsPage() {
  const [farmName, setFarmName] = useState('FSN Command Farm');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSync, setAutoSync] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#332266', margin: '0 0 5px 0' }}>
            Account & Server Settings
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Manage your farmer profile configuration, notification preferences, and integration parameters.
          </p>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
          
          {/* Farm Identity Section */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '15px' }}>Farm Identity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', color: '#64748b' }}>Farm Name</label>
              <input 
                type="text" 
                value={farmName} 
                onChange={(e) => setFarmName(e.target.value)}
                style={{ padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px' }}
                required
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '15px' }}>Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', color: '#334155' }}>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                Enable Email Alerts for Contract Expirations & Loan Due Dates
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', color: '#334155' }}>
                <input 
                  type="checkbox" 
                  checked={autoSync} 
                  onChange={(e) => setAutoSync(e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                Automatic Server Economy Sync on Session Start
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', alignSelf: 'flex-start' }}
          >
            Save Settings
          </button>

        </form>

      </div>
    </div>
  );
}
