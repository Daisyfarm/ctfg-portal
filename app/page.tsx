import React from 'react';

export default function MyselfPage() {
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
                
                {/* Welcome Card */}
                <div style={{ 
                    background: 'rgba(17, 24, 39, 0.9)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '36px', 
                    marginBottom: '30px',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                }}>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
                        Welcome back, Samuel Founder
                    </h1>
                    <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                        You are currently managing the <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span> dual-server network (North Slots 1–8 & South Slots 9–16). Use the navigation tabs above to manage your funds, monitor field telemetry, or check live market pricing.
                    </p>
                </div>

                {/* Grid Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                    
                    {/* Active Farm Node Summary */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '28px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0' }}>Server Cluster Overview</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1f2937', padding: '10px 14px', borderRadius: '8px' }}>
                                <span>Judith Plains North</span>
                                <span style={{ color: '#34d399', fontWeight: 'bold', fontFamily: 'monospace' }}>6 / 8 Active</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1f2937', padding: '10px 14px', borderRadius: '8px' }}>
                                <span>Judith Plains South</span>
                                <span style={{ color: '#34d399', fontWeight: 'bold', fontFamily: 'monospace' }}>4 / 8 Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Financial Snapshot */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '28px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0' }}>Financial Standing</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1f2937', padding: '10px 14px', borderRadius: '8px' }}>
                                <span>Net Worth</span>
                                <span style={{ color: '#34d399', fontWeight: 'bold', fontFamily: 'monospace' }}>$8,100,000.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1f2937', padding: '10px 14px', borderRadius: '8px' }}>
                                <span>Transferrable Web Funds</span>
                                <span style={{ color: '#60a5fa', fontWeight: 'bold', fontFamily: 'monospace' }}>$154,611.70</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
