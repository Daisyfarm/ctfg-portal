"use client";
import React, { useState } from 'react';

export default function InteractionsPage() {
  const [activeTab, setActiveTab5] = useState('Contracts');
  const [contractAccepted, setContractAccepted] = useState(false);
  const [permitSuccess, setPermitSuccess] = useState('');

  const [availableContracts, setAvailableContracts] = useState([
    { id: 1, title: 'Harvest Wheat - Field 14', client: 'Daisy Hill NPC', pay: '$4,850', tokens: 2, requirements: 'None' },
    { id: 2, title: 'Transport Grain to Mill', client: 'North Plains Co-op', pay: '$2,100', tokens: 1, requirements: 'CDL License' },
    { id: 3, title: 'Field Cultivation & Spraying', client: 'Alpine Agro', pay: '$6,400', tokens: 3, requirements: 'Herbicide Permit' }
  ]);

  const [activeContract, setActiveContract] = useState<{ id: number; title: string; client: string; pay: string; tokens: number; requirements: string } | null>({
    id: 1,
    title: 'Harvest Wheat - Field 14',
    client: 'Daisy Hill NPC',
    pay: '$4,850',
    tokens: 2,
    requirements: 'None'
  });

  const permits = [
    { name: 'Commercial Driver\'s License (CDL)', cost: '$2,500', status: 'Acquired', desc: 'Required for driving heavy commercial transport and semi-trailers across server zones.' },
    { name: 'Herbicide Applicator Permit', cost: '$1,200', status: 'Required', desc: 'Mandatory certification to legally purchase and spray chemical weed control products.' },
    { name: 'Heavy Machinery Transport Permit', cost: '$3,500', status: 'Required', desc: 'Allows oversized agricultural combines and tracked vehicles on public roadways.' }
  ];

  const handleAccept = (contract: { id: number; title: string; client: string; pay: string; tokens: number; requirements: string }) => {
    setActiveContract(contract);
    setAvailableContracts(availableContracts.filter(c => c.id !== contract.id));
    setContractAccepted(true);
    setTimeout(() => setContractAccepted(false), 3000);
  };

  const handleBuyPermit = (permitName: string) => {
    setPermitSuccess(`Successfully purchased/renewed ${permitName}!`);
    setTimeout(() => setPermitSuccess(''), 3000);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Interactions</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Finances</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Data ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Market</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Marketplace</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Interactions, Contracts & Permit Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Take on farm operation contracts, manage active job progress, and acquire legal state permits.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Contracts', 'Permit Center'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab5(tab)}
              style={{
                background: activeTab === tab ? '#0284c7' : '#fff',
                color: activeTab === tab ? '#fff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {contractAccepted && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            Contract successfully accepted! Check your active operations dashboard.
          </div>
        )}

        {permitSuccess && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            {permitSuccess}
          </div>
        )}

        {/* Tab Content: Contracts */}
        {activeTab === 'Contracts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Active Contract Box */}
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase', marginBottom: '8px' }}>Active Contract Status</div>
              {activeContract ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 6px 0' }}>{activeContract.title}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Client: <strong style={{ color: '#334155' }}>{activeContract.client}</strong></div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Reward: <strong style={{ color: '#16a34a' }}>{activeContract.pay}</strong> &bull; Tokens: <strong style={{ color: '#0284c7' }}>+{activeContract.tokens}</strong></div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => alert('Contract completed and payout credited!')} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 18px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                      MARK COMPLETE
                    </button>
                    <button onClick={() => { setActiveContract(null); }} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '10px 18px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>You have no active contracts. Choose one from the available list below.</p>
              )}
            </div>

            {/* Available Contracts Grid */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Available Contracts Board</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {availableContracts.map((item) => (
                  <div key={item.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '6px' }}>{item.client}</div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 10px 0' }}>{item.title}</h4>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>{item.pay}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Tokens Reward: <strong style={{ color: '#334155' }}>+{item.tokens} Tokens</strong></div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>Required Permit: <strong style={{ color: '#334155' }}>{item.requirements}</strong></div>
                    </div>
                    <button 
                      onClick={() => handleAccept(item)}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}
                    >
                      ACCEPT CONTRACT
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab Content: Permit Center */}
        {activeTab === 'Permit Center' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {permits.map((permit, index) => (
              <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: permit.status === 'Acquired' ? '#16a34a' : '#d97706', textTransform: 'uppercase' }}>
                      {permit.status}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a' }}>{permit.cost}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 8px 0' }}>{permit.name}</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 15px 0', lineHeight: '1.5' }}>{permit.desc}</p>
                </div>
                <button 
                  onClick={() => handleBuyPermit(permit.name)}
                  style={{ background: permit.status === 'Acquired' ? '#334155' : '#0284c7', color: '#fff', border: 'none', padding: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}
                >
                  {permit.status === 'Acquired' ? 'RENEW / UPDATE' : 'PURCHASE PERMIT'}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
