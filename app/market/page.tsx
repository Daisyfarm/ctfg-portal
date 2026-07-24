"use client";
import React, { useState } from 'react';

export default function MarketPage() {
  const [selectedServer, setSelectedServer] = useState('Server 19 (Daisy Hill Main)');

  const commodities = [
    { id: 1, name: 'Wheat', price: '$420', change: '+5.4%', trend: 'up', bestSellPoint: 'Central Grain Mill', demand: 'High Demand' },
    { id: 2, name: 'Barley', price: '$380', change: '-1.2%', trend: 'down', bestSellPoint: 'North Port Elevator', demand: 'Normal' },
    { id: 3, name: 'Canola', price: '$710', change: '+8.1%', trend: 'up', bestSellPoint: 'BioDiesel Plant', demand: 'Surging' },
    { id: 4, name: 'Corn', price: '$450', change: '+2.0%', trend: 'up', bestSellPoint: 'Animal Feed Co.', demand: 'Stable' },
    { id: 5, name: 'Soybeans', price: '$940', change: '-0.5%', trend: 'down', bestSellPoint: 'Export Harbor', demand: 'Normal' },
    { id: 6, name: 'Milk', price: '$1,200', change: '+3.5%', trend: 'up', bestSellPoint: 'Dairy Processing Plant', demand: 'High Demand' },
    { id: 7, name: 'Eggs', price: '$1,550', change: '+12.4%', trend: 'up', bestSellPoint: 'Supermarket Central', demand: 'Peak' }
  ];

  return (
    <div style={{ background: '#111827', minHeight: 'calc(100vh - 90px)', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header & Server Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>
              Live Commodity Market & Pricing
            </h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0' }}>
              Real-time global crop prices, demand indexes, and optimal sell points across servers.
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>Active Server Market:</span>
            <select 
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              style={{ padding: '8px 12px', background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '4px', fontSize: '13px' }}
            >
              <option>Server 19 (Daisy Hill Main)</option>
              <option>Server 8 (North Plains)</option>
              <option>Server 4 (Alpine Agro)</option>
            </select>
          </div>
        </div>

        {/* Market Trend Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Market Sentiment</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4ade80' }}>Bullish (+4.2%)</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Driven by high canola & grain demand</div>
          </div>
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Top Performing Crop</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fbbf24' }}>Eggs ($1,550 / 1kL)</div>
            <div style={{ fontSize: '12px', color: '#4ade80', marginTop: '4px' }}>+12.4% price shift in 24h</div>
          </div>
          <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Active Sell Points</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#60a5fa' }}>14 Locations Online</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>All delivery nodes operational</div>
          </div>
        </div>

        {/* Commodities Table */}
        <div style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#374151', color: '#d1d5db', borderBottom: '1px solid #4b5563' }}>
                <th style={{ padding: '12px 15px' }}>Commodity</th>
                <th style={{ padding: '12px 15px' }}>Current Price (1,000L)</th>
                <th style={{ padding: '12px 15px' }}>24h Change</th>
                <th style={{ padding: '12px 15px' }}>Optimal Sell Point</th>
                <th style={{ padding: '12px 15px' }}>Demand Status</th>
              </tr>
            </thead>
            <tbody>
              {commodities.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#fff' }}>{item.name}</td>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#4ade80' }}>{item.price}</td>
                  <td style={{ padding: '12px 15px', color: item.trend === 'up' ? '#4ade80' : '#ef4444', fontWeight: 'bold' }}>{item.change}</td>
                  <td style={{ padding: '12px 15px', color: '#93c5fd' }}>{item.bestSellPoint}</td>
                  <td style={{ padding: '12px 15px' }}>
                    <span style={{ 
                      background: item.demand === 'Peak' || item.demand === 'Surging' ? '#065f46' : '#1e3a8a', 
                      color: '#fff', 
                      padding: '3px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 'bold' 
                    }}>
                      {item.demand}
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
