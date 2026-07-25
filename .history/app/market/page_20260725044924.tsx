'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const marketItems = [
    { id: 1, name: 'Wheat', price: '$245 / ton', change: '+4.2%', trend: 'up', category: 'Crops' },
    { id: 2, name: 'Barley', price: '$210 / ton', change: '-1.5%', trend: 'down', category: 'Crops' },
    { id: 3, name: 'Canola', price: '$380 / ton', change: '+6.8%', trend: 'up', category: 'Crops' },
    { id: 4, name: 'Milk', price: '$620 / 1000L', change: '+0.5%', trend: 'up', category: 'Dairy' },
    { id: 5, name: 'Diesel Fuel', price: '$1.45 / L', change: '-2.1%', trend: 'down', category: 'Logistics' },
    { id: 6, name: 'Fertilizer', price: '$450 / ton', change: '+1.1%', trend: 'up', category: 'Supplies' }
  ];

  const filteredItems = marketItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: 'linear-gradient(rgba(5, 7, 10, 0.9), rgba(5, 7, 10, 0.95)), url(/screenshot4.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#ffffff', 
      fontFamily: 'sans-serif' 
    }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Market Index & Pricing</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '10px' }}>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/membership" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Membership</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>Global Commodity Index</h1>
          <p style={{ fontSize: '13px', color: '#a1a1aa', textTransform: 'uppercase', margin: 0 }}>Real-time valuation for regional crops, fuel, and agricultural supply chains.</p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 32px auto' }}>
          <input 
            type="text"
            placeholder="Search commodities or categories (e.g. Crops, Wheat)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(15, 17, 23, 0.9)',
              border: '1px solid #27272a',
              borderRadius: '8px',
              padding: '14px 20px',
              color: '#ffffff',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>

        {/* Commodity Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              style={{
                backgroundColor: 'rgba(15, 17, 23, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#34d399', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{item.category}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>{item.name}</h3>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff' }}>{item.price}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: 900, 
                  color: item.trend === 'up' ? '#34d399' : '#f87171',
                  backgroundColor: item.trend === 'up' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                  padding: '6px 10px',
                  borderRadius: '6px'
                }}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}