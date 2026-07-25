'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AddCropSalePage() {
  const [server, setServer] = useState('Bjornholm - 19');
  const [crop, setCrop] = useState('');
  const [fulfillment, setFulfillment] = useState('Direct Sell');
  const [quantity, setQuantity] = useState('');
  const [field, setField] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Add Crop Sale</span>
          </div>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '10px' }}>&larr; Back to Market Index</Link>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 24px 0' }}>Add Crop Sale</h1>

          {submitted ? (
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
              <h3 style={{ color: '#34d399', margin: '0 0 8px 0' }}>SALE REQUEST LOGGED</h3>
              <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 16px 0' }}>Your transaction contract has been forwarded to the Customs Officer silo queue.</p>
              <button 
                onClick={() => setSubmitted(false)}
                style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Submit Another Sale
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>Server</label>
                <select 
                  value={server} 
                  onChange={(e) => setServer(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#ffffff', padding: '12px', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="Bjornholm - 19">Bjornholm - 19</option>
                  <option value="Midwest Horizon - 1">Midwest Horizon - 1</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>Item Shipping</label>
                <select 
                  value={crop} 
                  onChange={(e) => setCrop(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#ffffff', padding: '12px', borderRadius: '6px', fontSize: '14px' }}
                  required
                >
                  <option value="" disabled>SELECT CROP</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Barley">Barley</option>
                  <option value="Soybeans">Soybeans</option>
                  <option value="Canola">Canola</option>
                  <option value="Corn">Corn</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>Direct Sell or Warehouse? (Warehouse Disabled)</label>
                <select 
                  value={fulfillment} 
                  onChange={(e) => setFulfillment(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#ffffff', padding: '12px', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="Direct Sell">Direct Sell</option>
                  <option value="Send To Warehouse" disabled>Send To Warehouse (Disabled)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>Quantity in L or Bales</label>
                <input 
                  type="text" 
                  placeholder="e.g. 1000" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#ffffff', padding: '12px', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#a1a1aa', marginBottom: '8px', fontWeight: 'bold' }}>From Field (Leave Blank if No Field or Unknown)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Field 14" 
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#ffffff', padding: '12px', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                type="submit" 
                style={{ backgroundColor: '#f59e0b', color: '#000000', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 900, textTransform: 'uppercase', cursor: 'pointer', marginTop: '10px' }}
              >
                Head to Confirmation Page
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
