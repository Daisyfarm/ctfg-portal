'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#05070a', 
      color: '#ffffff', 
      fontFamily: 'sans-serif',
      backgroundImage: 'linear-gradient(rgba(5, 7, 10, 0.55), rgba(5, 7, 10, 0.65)), url("/hero-farm.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Top Header Nav */}
      <header style={{ backgroundColor: 'rgba(11, 14, 20, 0.65)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ color: '#ffffff', fontWeight: 900 }}>FARM NETWORK</span>
            <span style={{ color: '#71717a' }}>|</span>
            <span style={{ color: '#34d399' }}>Enterprise Command System v2.4</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/fleet" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Fleet</Link>
            <Link href="/dispatch" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Dispatch</Link>
            <Link href="/event-center" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Events</Link>
            <Link href="/field-work" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Fields</Link>
            <Link href="/import-export" style={{ color: '#d4d4d8', textDecoration: 'none' }}>Imports</Link>
          </div>
        </div>
      </header>

      {/* Main Command Center Layout */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Operational Sector Alpha • Status: Secure
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
              Regional Command Center
            </h1>
          </div>
          <div style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '12px 20px', borderRadius: '8px', fontSize: '12px', display: 'flex', gap: '16px' }}>
            <div>
              <span style={{ color: '#a1a1aa' }}>Server Time: </span>
              <span style={{ color: '#ffffff', fontWeight: 900 }}>LIVE</span>
            </div>
            <span style={{ color: '#3f3f46' }}>|</span>
            <div>
              <span style={{ color: '#a1a1aa' }}>FSN Status: </span>
              <span style={{ color: '#ef4444', fontWeight: 900 }}>OBSOLETE</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '8px' }}>Active Fleet Units</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#34d399' }}>3 / 5</div>
            <div style={{ fontSize: '11px', color: '#d4d4d8', marginTop: '4px' }}>2 Units on Standby / Maint</div>
          </div>
          <div style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '8px' }}>Active Logistics Tasks</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#60a5fa' }}>4 Pending</div>
            <div style={{ fontSize: '11px', color: '#d4d4d8', marginTop: '4px' }}>Next Grain Haul at 1,200T</div>
          </div>
          <div style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '8px' }}>Regional Grain Index</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#eab308' }}>$1,842 / T</div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+4.2% up from yesterday</div>
          </div>
          <div style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '8px' }}>Customs & Tariffs</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff' }}>Optimal</div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Rotterdam & Hamburg Ports Clear</div>
          </div>
        </div>

        {/* Live Farm Surveillance Feeds Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              Live Field & Fleet Visual Feeds
            </h3>
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 900, textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>● FEED ACTIVE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Sector 1 - Pasture & Grazing', img: '/farm1.jpg', status: 'Telemetry Normal - GPS Locked' },
              { title: 'Sector 2 - Rural Access Way', img: '/farm2.jpg', status: 'Gateway Secure - Traffic Clear' },
              { title: 'Sector 3 - Equipment Yard', img: '/farm3.jpg', status: 'Unit Maintenance - Ready' },
              { title: 'Sector 4 - Operations Center', img: '/farm4.jpg', status: 'Main Hub - Active Yield' }
            ].map((feed, idx) => (
              <div key={idx} style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={feed.img} alt={feed.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) brightness(0.95)' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(5, 7, 10, 0.85)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, color: '#34d399', textTransform: 'uppercase' }}>
                    {feed.status}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff', margin: 0, textTransform: 'uppercase' }}>{feed.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Grid / Shortcuts */}
        <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          Portal Modules & Systems
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Fleet Telemetry', desc: 'Monitor heavy equipment status, operators, and fuel levels.', link: '/fleet' },
            { title: 'Task Dispatch', desc: 'Coordinate hauling operations, field prep, and supply chains.', link: '/dispatch' },
            { title: 'Market Index', desc: 'Track real-time crop pricing, commodities, and market swings.', link: '/market' },
            { title: 'Contracts Board', desc: 'Accept server contracts and secure high-payout operations.', link: '/contracts' },
            { title: 'Event Center', desc: 'View upcoming auctions, harvest competitions, and town halls.', link: '/event-center' },
            { title: 'Field Registry', desc: 'Inspect soil diagnostics, crop stages, and field health.', link: '/field-work' },
            { title: 'Import / Export', desc: 'Manage international port shipments, volumes, and tariffs.', link: '/import-export' },
          ].map((mod, i) => (
            <Link key={i} href={mod.link} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'rgba(11, 14, 20, 0.75)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '12px', padding: '24px', transition: 'border-color 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', textTransform: 'uppercase' }}>{mod.title}</h4>
                  <p style={{ fontSize: '12px', color: '#d4d4d8', margin: 0, lineHeight: '1.5' }}>{mod.desc}</p>
                </div>
                <div style={{ marginTop: '20px', fontSize: '11px', fontWeight: 900, color: '#34d399', textTransform: 'uppercase' }}>
                  Access Terminal ➔
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}