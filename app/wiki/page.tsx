"use client";
import React, { useState } from 'react';

export default function WikiIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const wikiSections = [
    { title: 'Getting Started', category: 'Basics', desc: 'Essential guides for registering your farm and joining multiplayer servers.' },
    { title: 'Auctions', category: 'Economy', desc: 'Rules and schedules for bidding on exclusive equipment and properties.' },
    { title: 'Banking', category: 'Finances', desc: 'Managing accounts, loans, interest rates, and daily financial ledgers.' },
    { title: 'Contracts', category: 'Operations', desc: 'Accepting and completing farm operation contracts for cash payouts.' },
    { title: 'Crop Brokerages', category: 'Economy', desc: 'Tracking commodity markets, sellpoint demands, and grain prices.' },
    { title: 'Dealerships & Equipment', category: 'Fleet', desc: 'Purchasing machinery, maintaining equipment, and checking specs.' },
    { title: 'Homestead System', category: 'Property', desc: 'Managing farm land, buildings, and residential plots.' },
    { title: 'Insurance', category: 'Finances', desc: 'Protecting your machinery and assets against accidental loss or damage.' },
    { title: 'Land Brokerages', category: 'Property', desc: 'Buying, selling, and leasing farm land across servers.' },
    { title: 'Laws & Regulations', category: 'Policies', desc: 'Server rules, road etiquette, speed limits, and legal guidelines.' },
    { title: 'Maintenance & Breakdowns', category: 'Fleet', desc: 'Understanding wear and tear, repair costs, and service intervals.' },
    { title: 'Player Businesses', category: 'Economy', desc: 'Setting up and operating custom player-run companies and logistics.' },
    { title: 'Permits', category: 'Policies', desc: 'Acquiring CDL licenses, herbicide applicator permits, and trade certificates.' },
    { title: 'Retirement System', category: 'Basics', desc: 'Long-term progression, legacy planning, and retirement benefits.' },
    { title: 'Tax System', category: 'Finances', desc: 'Understanding property taxes, corporate filings, and deductions.' },
    { title: 'Ways To Play', category: 'Basics', desc: 'Different playstyles ranging from hardcore realism to casual contracting.' }
  ];

  const filteredSections = wikiSections.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title & Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Knowledge Base & Wiki Index
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Browse official documentation, gameplay mechanics, rules, and server guidelines.
            </p>
          </div>
          <input 
            type="text" 
            placeholder="Search documentation..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 15px', width: '280px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
          {['All', 'Basics', 'Economy', 'Operations', 'Fleet', 'Property', 'Policies', 'Finances'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#0284c7' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Wiki Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredSections.map((item, index) => (
            <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.category}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {item.desc}
                </p>
              </div>
              <button style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}>
                VIEW ARTICLE
              </button>
            </div>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
            No documentation found matching &quot;{searchQuery}&quot;.
          </div>
        )}

      </div>
    </div>
  );
}
