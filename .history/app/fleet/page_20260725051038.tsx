'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  name: string;
  type: string;
  operator: string;
  status: 'Active' | 'Idle' | 'Maintenance' | 'Refueling';
  fuel: number;
  location: string;
}

const initialFleet: Vehicle[] = [
  { id: 'V-01', name: 'John Deere 9RX 640', type: 'Heavy Tractor', operator: 'Player_One', status: 'Active', fuel: 84, location: 'District 4 - North Ridge' },
  { id: 'V-02', name: 'Case IH Axial-Flow 9250', type: 'Harvester', operator: 'AgriKing', status: 'Active', fuel: 62, location: 'District 2 - River Valley' },
  { id: 'V-03', name: 'Fendt Ideal 10T', type: 'Harvester', operator: 'Unassigned', status: 'Idle', fuel: 100, location: 'Central Depot Bay B' },
  { id: 'V-04', name: 'JCB Fastrac 8330', type: 'Transport', operator: 'HaulMaster', status: 'Refueling', fuel: 15, location: 'Fuel Station 1' },
  { id: 'V-05', name: 'Krone Big M 450', type: 'Mower', operator: 'Unassigned', status: 'Maintenance', fuel: 45, location: 'Workshop Bay 3' },
];

export default function FleetPage() {
  const [fleet, setFleet] = useState<Vehicle[]>(initialFleet);

  const toggleStatus = (id: string) => {
    setFleet(fleet.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'Active' ? 'Idle' : 'Active';
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Fleet Telemetry & Logistics</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/dispatch" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Dispatch</Link>
            <Link href="/fleet" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 900 }}>Fleet</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
              Live Regional Telemetry
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Heavy Machinery Grid
            </h1>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '12px 20px', borderRadius: '8px', fontSize: '12px' }}>
            <span style={{ color: '#a1a1aa' }}>Total Active Units: </span>
            <span style={{ color: '#34d399', fontWeight: 900 }}>{fleet.filter(v => v.status === 'Active').length} / {fleet.length}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {fleet.map((vehicle) => (
            <div key={vehicle.id} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase' }}>{vehicle.id} • {vehicle.type}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: '4px 0 0 0', textTransform: 'uppercase' }}>{vehicle.name}</h3>
                  </div>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 900, 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    textTransform: 'uppercase',
                    backgroundColor: vehicle.status === 'Active' ? 'rgba(52, 211, 153, 0.1)' : vehicle.status === 'Maintenance' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                    color: vehicle.status === 'Active' ? '#34d399' : vehicle.status === 'Maintenance' ? '#ef4444' : '#eab308',
                    border: `1px solid ${vehicle.status === 'Active' ? 'rgba(52, 211, 153, 0.2)' : vehicle.status === 'Maintenance' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2'}`
                  }}>
                    {vehicle.status}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong style={{ color: '#ffffff' }}>Operator:</strong> {vehicle.operator}</div>
                  <div><strong style={{ color: '#ffffff' }}>Location:</strong> {vehicle.location}</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    <span style={{ color: '#71717a' }}>Fuel / Reserves</span>
                    <span style={{ color: vehicle.fuel < 20 ? '#ef4444' : '#34d399' }}>{vehicle.fuel}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#27272a', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${vehicle.fuel}%`, height: '100%', backgroundColor: vehicle.fuel < 20 ? '#ef4444' : '#34d399', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toggleStatus(vehicle.id)}
                style={{ 
                  width: '100%', 
                  backgroundColor: vehicle.status === 'Active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
                  color: vehicle.status === 'Active' ? '#ef4444' : '#34d399', 
                  border: `1px solid ${vehicle.status === 'Active' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(52, 211, 153, 0.2'}`, 
                  padding: '10px', 
                  borderRadius: '6px', 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  letterSpacing: '0.05em'
                }}>
                {vehicle.status === 'Active' ? 'Recall Unit / Set Idle' : 'Deploy Unit'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}