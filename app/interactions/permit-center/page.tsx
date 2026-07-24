"use client";
import React, { useState } from 'react';

export default function PermitCenterPage() {
  const [licenses, setLicenses] = useState<{ [key: string]: boolean }>({
    cdl: true
  });

  const handlePurchase = (id: string) => {
    setLicenses(prev => ({ ...prev, [id]: true }));
  };

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
        
        {/* Page Title & Description */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Permit Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Purchase, renew, and manage skilled trade licenses, herbicide applicator permits, and operational certificates.
          </p>
        </div>

        {/* Permits List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Applicator License */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                Skilled Trade • Valid for 15 Days
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                Herbicide Applicator License
              </h3>
              <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                Required for any farmer or contractor wishing to spray herbicide. Operating without a license incurs heavy fines.
              </p>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Fee: <strong style={{ color: '#16a34a' }}>$5,000.00</strong>
              </div>
            </div>
            <div>
              <button 
                onClick={() => handlePurchase('applicator')}
                style={{ width: '100%', background: licenses['applicator'] ? '#16a34a' : '#ef4444', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                {licenses['applicator'] ? 'LICENSE ACTIVE' : 'BUY LICENSE ($5,000)'}
              </button>
            </div>
          </div>

          {/* CDL License */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                Skilled Trade • Expires: 2020-04-08
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                Commercial Driver&apos;s License (CDL)
              </h3>
              <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                Required by anyone wishing to operate semi-trucks and heavy transport vehicles across server routes.
              </p>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Renewal Fee: <strong style={{ color: '#16a34a' }}>$2,000.00</strong>
              </div>
            </div>
            <div>
              <button 
                onClick={() => handlePurchase('cdl')}
                style={{ width: '100%', background: '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                EXTEND PERMIT ($2,000)
              </button>
            </div>
          </div>

          {/* Horse Training License */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '25px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '4px' }}>
                Animals • Valid for 15 Days
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                Horse Training License
              </h3>
              <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                Required for any contractor looking to help train horses owned by farms.
              </p>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                Fee: <strong style={{ color: '#16a34a' }}>$5,000.00</strong>
              </div>
            </div>
            <div>
              <button 
                onClick={() => handlePurchase('horse')}
                style={{ width: '100%', background: licenses['horse'] ? '#16a34a' : '#ef4444', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
              >
                {licenses['horse'] ? 'LICENSE ACTIVE' : 'BUY LICENSE ($5,000)'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
