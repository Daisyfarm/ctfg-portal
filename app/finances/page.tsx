import React from 'react';

export default function FinancesPage() {
    const recentRequests = [
        { id: '6244', type: 'TOGAME', amount: '$50,000.00', status: 'PROCESSED' },
        { id: '5910', type: 'TOGAME', amount: '$20,000.00', status: 'PROCESSED' },
        { id: '5855', type: 'TOWEB', amount: '$70,000.00', status: 'PROCESSED' },
        { id: '5759', type: 'TOGAME', amount: '$90,000.00', status: 'PROCESSED' },
        { id: '5273', type: 'TOWEB', amount: '$70,000.00', status: 'PROCESSED' },
        { id: '5033', type: 'TOGAME', amount: '$440,000.00', status: 'PROCESSED' },
    ];

    return (
        <div style={{ 
            minHeight: 'calc(100vh - 90px)', 
            backgroundImage: 'linear-gradient(rgba(3, 7, 18, 0.75), rgba(3, 7, 18, 0.85)), url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundAttachment: 'fixed',
            color: '#f3f4f6', 
            padding: '40px 20px', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Side-by-Side FSN Grid Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Funds Transfer Form */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
                            Funds Transfer
                        </h2>
                        
                        <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6', marginBottom: '24px' }}>
                            If you need to add funds to your web account, or move funds from your web account to your in-game account, this is how you do it! Fund transfer requests generally take 24 hours, but can take longer if there is a large waiting list. You currently have <span style={{ color: '#34d399', fontWeight: 'bold' }}>$154,611.70</span> that you can transfer out of web and to your regular account for this game year.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Transfer Type
                                </label>
                                <select style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                    <option>Transfer To Web Account</option>
                                    <option>Transfer To In-Game Account</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Transfer Amount
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="0.00" 
                                    style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Transfer Server (From Server)
                                </label>
                                <select style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                    <option>19 - FSN Command Farm</option>
                                </select>
                            </div>

                            <button style={{ 
                                background: '#2563eb', 
                                color: '#ffffff', 
                                border: 'none', 
                                padding: '12px 20px', 
                                borderRadius: '8px', 
                                fontSize: '14px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer',
                                marginTop: '10px',
                                transition: 'background 0.2s'
                            }}>
                                Transfer Funds
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Recent Requests Table */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                            Recent Requests
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>ID</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Type</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Amount</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.map((req, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#cbd5e1' }}>{req.id}</td>
                                            <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#93c5fd' }}>{req.type}</td>
                                            <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#ffffff' }}>{req.amount}</td>
                                            <td style={{ padding: '14px 0' }}>
                                                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                    {req.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
