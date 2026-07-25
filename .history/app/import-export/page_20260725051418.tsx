'use client';

import React from 'react';
import Link from 'next/link';

interface CargoShipment {
  id: string;
  destination: string;
  commodity: string;
  volume: string;
  tariffRate: string;
  status: 'Clearing Customs' | 'In Transit' | 'Docked & Unloading';
}

const shipments: CargoShipment[] = [
  { id: 'EXP-901', destination: 'Rotterdam Port (EU)', commodity: 'Grade A Wheat', volume: '1,200 Tons', tariffRate: '2.4%', status: 'In Transit' },
  { id: 'EXP-902', destination: 'Hamburg Terminal (DE)', commodity: 'Yellow Corn', volume: '2,500 Tons', tariffRate: '1.8%', status: 'Clearing Customs' },
  { id: 'IMP-401', destination: 'Central Regional Silo', commodity: 'Anhydrous Ammonia (Fertilizer)', volume: '800 Tons', tariffRate: '0.5%', status: 'Docked & Unloading' },
  { id: 'EXP-903', destination: 'Antwerp Port (BE)', commodity: 'Soybeans', volume: '950 Tons', tariffRate: '3.1%', status: 'In Transit' },
];

export default function ImportExportPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Global Trade & Import-Export</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/import-export" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 900 }}>Import/Export</Link>
            <Link href="/fleet" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Fleet</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
              International Shipping Hub
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Cargo & Port Terminal
            </h1>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1.2fr 1fr 1fr', padding: '16px 24px', backgroundColor: 'rgba(27, 31, 42, 0.5)', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#71717a', borderBottom: '1px solid #27272a', letterSpacing: '0.05em' }}>
            <div>Manifest ID</div>
            <div>Destination / Port</div>
            <div>Commodity</div>
            <div>Volume</div>
            <div>Tariff Rate</div>
            <div>Port Status</div>
          </div>

          {shipments.map((ship) => (
            <div key={ship.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1.2fr 1fr 1fr', padding: '20px 24px', alignItems: 'center', borderBottom: '1px solid #1f232d', fontSize: '13px' }}>
              <div style={{ fontWeight: 900, color: '#34d399' }}>{ship.id}</div>
              <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{ship.destination}</div>
              <div style={{ color: '#a1a1aa' }}>{ship.commodity}</div>
              <div style={{ fontWeight: 900, color: '#ffffff' }}>{ship.volume}</div>
              <div style={{ color: '#eab308' }}>{ship.tariffRate}</div>
              <div>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 900, 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  textTransform: 'uppercase',
                  backgroundColor: ship.status === 'Docked & Unloading' ? 'rgba(52, 211, 153, 0.1)' : ship.status === 'In Transit' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                  color: ship.status === 'Docked & Unloading' ? '#34d399' : ship.status === 'In Transit' ? '#60a5fa' : '#eab308',
                  border: `1px solid ${ship.status === 'Docked & Unloading' ? 'rgba(52, 211, 153, 0.2)' : ship.status === 'In Transit' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 179, 8, 0.2)'}`
                }}>
                  {ship.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}