"use client";
import React, { useState } from 'react';

export default function MarketPage() {
  const [selectedCrop, setSelectedCrop] = useState('All');

  const marketPrices = [
    { crop: 'Wheat', sellPoint: 'Daisy Hill Grain Elevator', price: '$1,450 / 1,000L', trend: '+4.2%', status: 'High Demand' },
    { crop: 'Barley', sellPoint: 'North Plains Silo', price: '$1,320 / 1,000L', trend: '-1.1%', status: 'Stable' },
    { crop: 'Canola', sellPoint: 'Alpine Oil Mill', price: '$2,180 / 1,000L', trend: '+6.8%', status: 'Peak Demand' },
    { crop: 'Corn', sellPoint: 'Daisy Hill Grain Elevator', price: '$1,290 / 1,000L', trend: '+0.5%', status: 'Stable' },
    { crop: 'Sugarbeet', sellPoint: 'Sugar Factory', price: '$410 / 1,000L', trend: '-2.3%', status: 'Low Demand' },
    { crop: 'Soybeans', sellPoint: 'North Plains Port', price: '$2,450 / 1,000L', trend: '+3.9%', status: 'High Demand' }
  ];

  const filteredMarket = selectedCrop === 'All' 
    ? marketPrices 
    : marketPrices.filter(item => item.crop.toLowerCase() === selectedCrop.toLowerCase());

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Market</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Commodity Market & Brokerages
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Track live crop prices, sellpoint demands, and regional trading boards across server maps.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
          {['All', 'Wheat', 'Barley', 'Canola', 'Corn', 'Soybeans'].map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              style={{
                background: selectedCrop === crop ? '#0284c7' : '#fff',
                color: selectedCrop === crop ? '#fff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Market Data Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredMarket.map((item, index) => (
            <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase' }}>
                    {item.crop}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: item.trend.startsWith('+') ? '#16a34a' : '#dc2626', background: item.trend.startsWith('+') ? '#dcfce7' : '#fee2e2', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.trend}
                  </span>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 6px 0' }}>
                  {item.price}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 15px 0' }}>
                  Sellpoint: <strong style={{ color: '#334155' }}>{item.sellPoint}</strong>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Status: <strong style={{ color: '#0f172a' }}>{item.status}</strong></span>
                <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                  VIEW ROUTES
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
