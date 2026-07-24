'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [nodeName, setNodeName] = useState('Judith Plains Montana 4X');
  const [autoSync, setAutoSync] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Network Configuration // Settings</span>
          </div>
          <Link href="/" style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none', fontSize: '10px', fontWeight: 'bold' }}>
            Back to Command
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>System Settings & Preferences</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Configure network identifiers, telemetry update frequency, and node parameters.</p>
        </div>

        {saved && (
          <div style={{ marginBottom: '24px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '12px', borderRadius: '8px', color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>
            Settings successfully saved and synced across network nodes.
          </div>
        )}

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', maxWidth: '600px' }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: '8px' }}>
                Node Hub Identifier
              </label>
              <input 
                type="text"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input 
                type="checkbox"
                id="autoSync"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
              />
              <label htmlFor="autoSync" style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', textTransform: 'uppercase', cursor: 'pointer' }}>
                Enable Live Telemetry Auto-Sync
              </label>
            </div>

            <button 
              type="submit"
              style={{ backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 900, fontSize: '12px', padding: '12px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', alignSelf: 'flex-start' }}
            >
              Save Configuration
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
