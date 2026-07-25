'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContractCenterPage() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [server, setServer] = useState('Bjornholm - 19');
  const [reward, setReward] = useState('');
  const [status, setStatus] = useState<'Active' | 'Pending'>('Active');

  const [contracts, setContracts] = useState([
    { id: 'CTR-1094', title: 'Export Wheat to Port Silo', server: 'Bjornholm - 19', reward: '$12,400', status: 'Active' },
    { id: 'CTR-1095', title: 'Barley Supply Agreement', server: 'Midwest Horizon - 1', reward: '$8,900', status: 'Pending' },
    { id: 'CTR-1096', title: 'Rapeseed Bulk Freight', server: 'Bjornholm - 19', reward: '$19,500', status: 'Active' },
  ]);

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !reward) return;

    const newId = `CTR-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedReward = reward.startsWith('$') ? reward : `$${reward}`;

    const newContract = {
      id: newId,
      title,
      server,
      reward: formattedReward,
      status,
    };

    setContracts([newContract, ...contracts]);
    setTitle('');
    setReward('');
    setIsModalOpen(false);
  };

  const filteredContracts = contracts.filter(c => filter === 'ALL' || c.status.toUpperCase() === filter);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Contract Center</span>
          </div>
          <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '10px' }}>&larr; Market Index</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #27272a', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>Contract Center</h1>
            <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0', textTransform: 'uppercase' }}>Manage active export agreements and logistics tasks.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['ALL', 'ACTIVE', 'PENDING'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={{
                    backgroundColor: filter === tab ? '#27272a' : '#0f1117',
                    color: filter === tab ? '#34d399' : '#a1a1aa',
                    border: '1px solid #27272a',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: '#34d399',
                color: '#05070a',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              + New Contract
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a', color: '#71717a', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Contract ID</th>
                <th style={{ padding: '12px' }}>Agreement Title</th>
                <th style={{ padding: '12px' }}>Server</th>
                <th style={{ padding: '12px' }}>Payout Reward</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} style={{ borderBottom: '1px solid #18181b' }}>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold', color: '#f59e0b' }}>{contract.id}</td>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>{contract.title}</td>
                  <td style={{ padding: '16px 12px', color: '#a1a1aa' }}>{contract.server}</td>
                  <td style={{ padding: '16px 12px' }}>{contract.reward}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      backgroundColor: contract.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(250, 204, 21, 0.1)', 
                      color: contract.status === 'Active' ? '#34d399' : '#facc15', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {contract.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Popup */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#0f1117',
            border: '1px solid #27272a',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '480px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>Create New Contract</h2>
            <p style={{ fontSize: '11px', color: '#71717a', margin: '0 0 24px 0', textTransform: 'uppercase' }}>Publish a new logistics or export agreement.</p>

            <form onSubmit={handleCreateContract} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '6px' }}>Agreement Title</label>
                <input
                  type="text"
                  placeholder="e.g. Soybeans Transport to Main Silo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ width: '100%', backgroundColor: '#05070a', border: '1px solid #27272a', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '6px' }}>Server</label>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#05070a', border: '1px solid #27272a', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="Bjornholm - 19">Bjornholm - 19</option>
                  <option value="Midwest Horizon - 1">Midwest Horizon - 1</option>
                  <option value="Hagenstedt - 4">Hagenstedt - 4</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '6px' }}>Payout Reward ($)</label>
                <input
                  type="text"
                  placeholder="15000"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  required
                  style={{ width: '100%', backgroundColor: '#05070a', border: '1px solid #27272a', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '6px' }}>Initial Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Active' | 'Pending')}
                  style={{ width: '100%', backgroundColor: '#05070a', border: '1px solid #27272a', borderRadius: '6px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ backgroundColor: 'transparent', color: '#a1a1aa', border: '1px solid #27272a', padding: '8px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: '#34d399', color: '#05070a', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  Publish Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}