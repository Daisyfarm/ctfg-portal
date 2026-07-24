"use client";
import React, { useState } from 'react';

export default function MarketplacePage() {
  const [listings, setListings] = useState([
    { id: 1, title: 'John Deere 8R 410 (Low Hours)', category: 'Heavy Machinery', price: '$285,000', seller: 'DaisyFarmer', server: 'Server 19' },
    { id: 2, title: 'Field 22 Plot (14.5 Hectares)', category: 'Land Parcels', price: '$450,000', seller: 'NorthPlainsCoop', server: 'Server 8' },
    { id: 3, title: 'Seed Potato Pallets (Bulk x10)', category: 'Supplies', price: '$4,200', seller: 'AlpineAgro', server: 'Server 4' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Heavy Machinery');

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    setListings([
      { id: listings.length + 1, title, category, price: `$${price}`, seller: 'Samuel Founder', server: 'Server 19' },
      ...listings
    ]);
    setTitle('');
    setPrice('');
    setShowModal(false);
  };

  return (
    <div style={{ background: '#111827', minHeight: 'calc(100vh - 90px)', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header & Create Listing Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' }}>
              Player Marketplace & Classifieds
            </h1>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '0' }}>
              Buy and sell used machinery, land plots, and farm supplies directly with other network players.
            </p>
          </div>
          
          <button 
            onClick={() => setShowModal(!showModal)}
            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 18px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
          >
            + New Listing
          </button>
        </div>

        {/* Modal for New Listing */}
        {showModal && (
          <form onSubmit={handleAddListing} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>Create Marketplace Listing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="Item Title / Description" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '8px', background: '#374151', color: '#fff', border: '1px solid #4b5563', borderRadius: '4px', fontSize: '13px' }}
                required
              />
              <input 
                type="text" 
                placeholder="Price ($)" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                style={{ padding: '8px', background: '#374151', color: '#fff', border: '1px solid #4b5563', borderRadius: '4px', fontSize: '13px' }}
                required
              />
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '8px', background: '#374151', color: '#fff', border: '1px solid #4b5563', borderRadius: '4px', fontSize: '13px' }}
              >
                <option>Heavy Machinery</option>
                <option>Land Parcels</option>
                <option>Supplies</option>
              </select>
            </div>
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
              Publish Listing
            </button>
          </form>
        )}

        {/* Listings Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {listings.map((item) => (
            <div key={item.id} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#60a5fa', textTransform: 'uppercase' }}>{item.category}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af' }}>{item.server}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>{item.title}</h3>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4ade80', marginBottom: '12px' }}>{item.price}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '15px' }}>Seller: <strong style={{ color: '#fff' }}>{item.seller}</strong></div>
              </div>
              <button onClick={() => alert(`Contacted seller for ${item.title}!`)} style={{ background: '#374151', color: '#fff', border: '1px solid #4b5563', padding: '8px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                CONTACT SELLER
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
