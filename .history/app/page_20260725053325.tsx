'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      {/* Top Header Nav */}
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ color: '#ffffff', fontWeight: 900 }}>FARM NETWORK</span>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Enterprise Command System v2.4</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/fleet" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Fleet</Link>
            <Link href="/dispatch" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Dispatch</Link>
            <Link href="/event-center" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Events</Link>
            <Link href="/field-work" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Fields</Link>
            <Link href="/import-export" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Imports</Link>
          </div>
        </div>
      </header>

      {/* Main Command Center Layout */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
              Operational Sector Alpha • Status: Secure
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Regional Command Center
            </h1>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', padding: '12px 20px', borderRadius: '8px', fontSize: '12px', display: 'flex', gap: '16px' }}>
            <div>
              <span style={{ color: '#71717a' }}>Server Time: </span>
              <span style={{ color: '#ffffff', fontWeight: 900 }}>LIVE</span>
            </div>
            <span style={{ color: '#27272a' }}>|</span>
            <div>
              <span style={{ color: '#71717a' }}>FSN Status: </span>
              <span style={{ color: '#ef4444', fontWeight: 900 }}>OBSOLETE</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase', marginBottom: '8px' }}>Active Fleet Units</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#34d399' }}>3 / 5</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '4px' }}>2 Units on Standby / Maint</div>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase', marginBottom: '8px' }}>Active Logistics Tasks</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#60a5fa' }}>4 Pending</div>
            <div style={{ fontSize: '11px', color: '#a1a1aa', marginTop: '4px' }}>Next Grain Haul at 1,200T</div>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase', marginBottom: '8px' }}>Regional Grain Index</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#eab308' }}>$1,842 / T</div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>+4.2% up from yesterday</div>
          </div>
          <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: '#71717a', textTransform: 'uppercase', marginBottom: '8px' }}>Customs & Tariffs</div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff' }}>Optimal</div>
            <div style={{ fontSize: '11px', color: '#34d399', marginTop: '4px' }}>Rotterdam & Hamburg Ports Clear</div>
          </div>
        </div>

        {/* Live Farm Surveillance Feeds Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em', color: '#a1a1aa' }}>
              Live Field & Fleet Visual Feeds
            </h3>
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 900, textTransform: 'uppercase' }}>● FEED ACTIVE</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Sector 1 - Pasture & Grazing', img: '/farm1.jpg', status: 'Telemetry Normal - GPS Locked' },
              { title: 'Sector 2 - Rural Access Way', img: '/farm2.jpg', status: 'Gateway Secure - Traffic Clear' },
              { title: 'Sector 3 - Equipment Yard', img: '/farm3.jpg', status: 'Unit Maintenance - Ready' },
              { title: 'Sector 4 - Operations Center', img: '/farm4.jpg', status: 'Main Hub - Active Yield' }
            ].map((feed, idx) => (
              <div key={idx} style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={feed.img} alt={feed.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9)' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(5, 7, 10, 0.8)', border: '1px solid #27272a', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, color: '#34d399', textTransform: 'uppercase' }}>
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
        <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em', color: '#a1a1aa' }}>
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
              <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', transition: 'border-color 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#ffffff', margin: '0 0 8px 0', textTransform: 'uppercase' }}>{mod.title}</h4>
                  <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0, lineHeight: '1.5' }}>{mod.desc}</p>
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