'use client';

import React from 'react';
import Link from 'next/link';

interface FieldData {
  id: string;
  name: string;
  owner: string;
  crop: string;
  growthStage: string;
  status: 'Ready' | 'Growing' | 'Needs Fertilization' | 'Harvested';
  health: number;
}

const fields: FieldData[] = [
  { id: 'FLD-01', name: 'North Ridge Sector A', owner: 'Player_One', crop: 'Wheat', growthStage: 'Harvest Ready', status: 'Ready', health: 98 },
  { id: 'FLD-02', name: 'River Valley Plot 12', owner: 'AgriKing', crop: 'Corn', growthStage: 'V6 Vegetative', status: 'Growing', health: 85 },
  { id: 'FLD-03', name: 'East Hills Pasture', owner: 'HaulMaster', crop: 'Soybeans', growthStage: 'Emergence', status: 'Needs Fertilization', health: 64 },
  { id: 'FLD-04', name: 'South Basin Lot 4', owner: 'Unassigned', crop: 'Barley', growthStage: 'Stubble', status: 'Harvested', health: 100 },
];

export default function FieldWorkPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Field Telemetry & Agronomy</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/field-work" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 900 }}>Field Work</Link>
            <Link href="/fleet" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Fleet</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
              Agronomic Surveillance
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Field Registry & Status
            </h1>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {fields.map((fld) => (
            <div key={fld.id} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase' }}>{fld.id} • {fld.crop}</span>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 900, 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    textTransform: 'uppercase',
                    backgroundColor: fld.status === 'Ready' ? 'rgba(52, 211, 153, 0.1)' : fld.status === 'Needs Fertilization' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    color: fld.status === 'Ready' ? '#34d399' : fld.status === 'Needs Fertilization' ? '#ef4444' : '#eab308',
                    border: `1px solid ${fld.status === 'Ready' ? 'rgba(52, 211, 153, 0.2)' : fld.status === 'Needs Fertilization' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`
                  }}>
                    {fld.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '0 0 12px 0', textTransform: 'uppercase' }}>{fld.name}</h3>

                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong style={{ color: '#ffffff' }}>Owner:</strong> {fld.owner}</div>
                  <div><strong style={{ color: '#ffffff' }}>Stage:</strong> {fld.growthStage}</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    <span style={{ color: '#71717a' }}>Field Health / Yield Index</span>
                    <span style={{ color: fld.health < 70 ? '#ef4444' : '#34d399' }}>{fld.health}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#27272a', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${fld.health}%`, height: '100%', backgroundColor: fld.health < 70 ? '#ef4444' : '#34d399', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              </div>

              <button 
                style={{ 
                  width: '100%', 
                  backgroundColor: 'rgba(52, 211, 153, 0.1)', 
                  color: '#34d399', 
                  border: '1px solid rgba(52, 211, 153, 0.2)', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  letterSpacing: '0.05em'
                }}>
                Inspect Soil & Diagnostics
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}