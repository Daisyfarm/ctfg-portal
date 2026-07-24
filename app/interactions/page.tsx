import React from 'react';

export default function InteractionsPage() {
    const sharedMembers = [
        { name: 'Samuel Founder', role: 'Farm Owner', access: 'Full Control', server: 'Judith Plains North', status: 'Online' },
        { name: 'Hank Miller', role: 'Contract Operator', access: 'Vehicles & Fields', server: 'Judith Plains North', status: 'Online' },
        { name: 'Clara Oswald', role: 'Logistics Manager', access: 'Transport Only', server: 'Judith Plains South', status: 'Offline' },
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
                
                {/* Page Header Card */}
                <div style={{ 
                    background: 'rgba(17, 24, 39, 0.9)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '30px', 
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
                            Multiplayer Interactions & Co-Op Management
                        </h1>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                            Manage farm-sharing permissions, employee access levels, and server node delegation for <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>.
                        </p>
                    </div>
                    <div>
                        <button style={{ 
                            background: '#10b981', 
                            color: '#ffffff', 
                            border: 'none', 
                            padding: '12px 20px', 
                            borderRadius: '8px', 
                            fontSize: '13px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}>
                            + Grant New Access
                        </button>
                    </div>
                </div>

                {/* Two Column Layout: Permissions Control & Active Members */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Farm Sharing & Permissions Form */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
                            Co-Op Access Control
                        </h2>
                        
                        <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6', marginBottom: '24px' }}>
                            Authorize other network members to operate equipment, access silos, or manage specific agricultural land parcels on your active Judith Plains server slot.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Select Server Node
                                </label>
                                <select style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                    <option>Judith Plains North (Slots 1–8)</option>
                                    <option>Judith Plains South (Slots 9–16)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Target Player Username / ID
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., FarmerJohn (#042)" 
                                    style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Permission Tier
                                </label>
                                <select style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                    <option>Full Farm Control (Owner Level)</option>
                                    <option>Vehicle & Field Operations Only</option>
                                    <option>Logistics & Transport Only</option>
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
                                Update Permissions
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Authorized Members Table */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                            Authorized Farm Members
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Operator</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Node</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Access</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sharedMembers.map((member, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '14px 0' }}>
                                                <div style={{ fontWeight: 'bold', color: '#ffffff' }}>{member.name}</div>
                                                <div style={{ fontSize: '11px', color: '#9ca3af' }}>{member.role}</div>
                                            </td>
                                            <td style={{ padding: '14px 0', color: '#cbd5e1', fontSize: '12px' }}>{member.server}</td>
                                            <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#93c5fd' }}>{member.access}</td>
                                            <td style={{ padding: '14px 0' }}>
                                                <span style={{ 
                                                    background: member.status === 'Online' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(107, 114, 128, 0.15)', 
                                                    color: member.status === 'Online' ? '#34d399' : '#9ca3af', 
                                                    border: `1px solid ${member.status === 'Online' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.3)'}`, 
                                                    padding: '3px 8px', 
                                                    borderRadius: '4px', 
                                                    fontSize: '11px', 
                                                    fontWeight: 'bold', 
                                                    fontFamily: 'monospace' 
                                                }}>
                                                    {member.status}
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
