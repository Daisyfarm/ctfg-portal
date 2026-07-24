"use client";
import React, { useState } from 'react';

export default function WikiPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const articles = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      category: 'Basics',
      summary: 'Essential guide for registering your farm, earning Bux, and completing your first contract.',
      content: `So you've signed up, now what? This article is designed to give you the most basic information to starting your farming journey in Farm Simulator Network.

How do I earn Bux?
Bux are earned primarily through doing Contracts. Contracts can be offered by NPCs and by players. 
- Some contracts may require you to have permits to take them. Without the permit, you won't be able to take them.
- Each contract's pay will vary, and whatever the amount of the contract is will be credited to your web checking account (located at the top of your screen).
- In addition to Bux, you will earn "Contract Tokens." These can be redeemed later to set up contracts to have people help you on your farm once you have one.
- You can only take one contract at a time. If you find you can't do the work, you can cancel the contract. If you get part way done and have to go, you can hold an NPC contract for up to 24 hours and return to finish.`
    },
    {
      id: 'laws-regulations',
      title: 'Laws & Regulations',
      category: 'Policies',
      summary: 'Server rules regarding road etiquette, speed limits, traffic laws, and legal penalties.',
      content: `Adherence to server laws and regulations ensures a smooth, realistic multiplayer environment for everyone.
- Traffic Laws: Always drive on the right side of the road unless passing. Obey all posted speed limits when operating heavy machinery through town zones.
- Right of Way: Heavy agricultural transport vehicles and combines yield to emergency services and standard commuter traffic at intersections.
- Vehicle Resets: Do not abuse vehicle resets to bypass being stuck; use designated towing contracts or winch equipment where possible.`
    },
    {
      id: 'contracts',
      title: 'Contracts',
      category: 'Operations',
      summary: 'In-depth look at contracting, NPC vs player tasks, tokens, and time limits.',
      content: `Contracts are the lifeblood of early-game progression and cooperative server economy.
- NPC Contracts: Generated automatically by the system. Can be held for up to 24 hours if interrupted.
- Player Contracts: Posted by farm owners needing extra hands for harvesting, cultivating, or transport.
- Payouts: Automatically transferred upon completion verification via server logs.`
    },
    {
      id: 'permits',
      title: 'Permits',
      category: 'Policies',
      summary: 'Acquiring CDL licenses, herbicide applicator permits, and trade certificates.',
      content: `Certain high-value operations and specialized chemicals require official certification.
- Herbicide Applicator License: Required before spraying fields. Operating without one results in severe fines.
- Commercial Driver's License (CDL): Mandatory for driving semi-trucks and hauling heavy commercial trailers across server borders.`
    },
    {
      id: 'banking',
      title: 'Banking System',
      category: 'Finances',
      summary: 'Managing bank accounts, loans, daily interest accrual, and web checking balances.',
      content: `The banking system tracks all monetary transactions across servers.
- Loans: Players can take out bank loans (e.g., $150,000 at 3.5% APY). Daily interest is deducted automatically at midnight server time.
- Checking Accounts: Linked directly to your dashboard for instant payouts from contracts and market sales.`
    },
    {
      id: 'auctions',
      title: 'Auctions',
      category: 'Economy',
      summary: 'Bidding rules, auction schedules, and acquiring discounted machinery.',
      content: `Auctions allow players to bid on surplus machinery, seized equipment, and prime land plots. All bids are binding and funds are escrowed immediately upon placing a winning bid.`
    },
    {
      id: 'insurance',
      title: 'Insurance',
      category: 'Finances',
      summary: 'Protecting your fleet against accidental flips, fire, and water damage.',
      content: `Insurance policies cover catastrophic machinery failures and accidental damage incurred during transport or fieldwork. Premium payments are deducted weekly.`
    },
    {
      id: 'tax-system',
      title: 'Tax System',
      category: 'Finances',
      summary: 'Property taxes, corporate tax filings, and allowable deductions.',
      content: `Servers enforce periodic property and asset taxes based on land acreage and total machinery valuation to keep the in-game economy balanced.`
    }
  ];

  const filteredArticles = articles.filter(art => 
    (selectedCategory === 'All' || art.category === selectedCategory) &&
    (art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
     art.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentArticle = articles.find(a => a.id === activeArticle);

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
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Knowledge Base & Official Wiki
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Official server documentation, rules, guidelines, and gameplay mechanics.
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
          {['All', 'Basics', 'Policies', 'Operations', 'Economy', 'Finances'].map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setActiveArticle(null); }}
              style={{
                background: selectedCategory === cat && !activeArticle ? '#0284c7' : '#fff',
                color: selectedCategory === cat && !activeArticle ? '#fff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {cat}
            </button>
          ))}
          {activeArticle && (
            <button
              onClick={() => setActiveArticle(null)}
              style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              ← Back to Index
            </button>
          )}
        </div>

        {/* Main Content View */}
        {activeArticle && currentArticle ? (
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '35px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '8px' }}>
              {currentArticle.category}
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 20px 0' }}>
              {currentArticle.title}
            </h2>
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {currentArticle.content}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredArticles.map((item) => (
              <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {item.category}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                    {item.summary}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveArticle(item.id)}
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}
                >
                  READ ARTICLE
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
