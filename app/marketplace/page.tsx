"use client";
import React, { useState } from 'react';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showListingModal, setShowListingModal] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('Machinery');
  const [successMsg, setSuccessMsg] = useState(false);

  const [listings, setListings] = useState([
    { id: 1, title: 'John Deere 8R 410 (Low Hours)', category: 'Machinery', price: '$285,000', seller: 'FarmerJoe99', location: 'Server 19 - Daisy Hill' },
    { id: 2, title: 'Large Farmland Plot #14', category: 'Land', price: '$450,000', seller: 'DaisyAdmin', location: 'Server 19 - Daisy Hill' },
    { id: 3, title: 'Krampe Big Body 900 S', category: 'Trailers', price: '$42,000', seller: 'AgriLogistics', location: 'Server 8 - North Plains' },
    { id: 4, title: 'Horsch Maestro 12 RX Planter', category: 'Equipment', price: '$95,000', seller: 'CornKing', location: 'Server 19 - Daisy Hill' }
  ]);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle || !itemPrice) return;

    const newList = {
      id: listings.length + 1,
      title: itemTitle,
      category: itemCategory,
      price: itemPrice.startsWith('$') ? itemPrice : `$${itemPrice}`,
      seller: 'You (DaisyFarm)',
      location: 'Server 19 - Daisy Hill'
    };

    setListings([newList, ...listings]);
    setItemTitle('');
    setItemPrice('');
    setShowListingModal(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const filteredListings = selectedCategory === 'All'
    ? listings
    : listings.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Market</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Marketplace</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Header & Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Player Marketplace
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Buy and sell used machinery, land plots, trailers, and equipment directly with other players.
            </p>
          </div>
          <button 
            onClick={() => setShowListingModal(true)}
            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 18px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            + CREATE LISTING
          </button>
        </div>

        {successMsg && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            Listing posted successfully to the marketplace!
          </div>
        )}

        {/* Modal / Inline Form for Creating a Listing */}
        {showListingModal && (
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', marginBottom: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>New Marketplace Listing</h3>
            <form onSubmit={handleCreateListing} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Item Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Case IH Magnum 340" 
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Category</label>
                  <select 
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option>Machinery</option>
                    <option>Land</option>
                    <option>Trailers</option>
                    <option>Equipment</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Price ($)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 120,000" 
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button 
                  type="submit"
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                >
                  PUBLISH
                </button>
                <button 
                  type="button"
                  onClick={() => setShowListingModal(false)}
                  style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
          {['All', 'Machinery', 'Land', 'Trailers', 'Equipment'].map((cat) => (
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
                fontSize: '12px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredListings.map((item) => (
            <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.category}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>
                  {item.price}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
                  Seller: <strong style={{ color: '#334155' }}>{item.seller}</strong>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>
                  Location: <strong style={{ color: '#334155' }}>{item.location}</strong>
                </div>
              </div>
              <button 
                onClick={() => alert(`Contacted ${item.seller} regarding ${item.title}!`)}
                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}
              >
                CONTACT SELLER
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
