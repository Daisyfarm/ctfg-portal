import React from 'react';

export default function DashboardPage() {
    const stats = [
        { label: 'Net Worth (IG)', value: '$9,459,000.00', change: '+4.2%', positive: true, icon: '💰' },
        { label: 'Active Fields', value: '14 Units', change: '8 Harvesting', positive: true, icon: '🌾' },
        { label: 'Fleet Machinery', value: '28 Active', change: '3 Maintenance', positive: false, icon: '🚜' },
        { label: 'Daily Operating Cost', value: '$12,450.00', change: '-1.5%', positive: true, icon: '📊' },
    ];

    const activeOperations = [
        { id: 'OPS-101', field: 'Field #04 (Wheat)', status: 'Harvesting', progress: '88%', machine: 'John Deere X9 1100', color: '#10b981' },
        { id: 'OPS-102', field: 'Field #12 (Corn)', status: 'Cultivating', progress: '42%', machine: 'Fendt Ideal 10T', color: '#3b82f6' },
        { id: 'OPS-103', field: 'Field #09 (Soybeans)', status: 'Transporting', progress: '100%', machine: 'Case IH Magnum 400', color: '#f59e0b' },
    ];

    const serverLogs = [
        { time: '13:22:10', event: 'Server auto-save completed successfully.', type: 'info' },
        { time: '13:15:40', event: 'Contract #402 (Wheat Delivery) completed by Samuel Founder.', type: 'success' },
        { time: '12:50:12', event: 'Fleet maintenance alert: John Deere 8R due for service.', type: 'warning' },
    ];

    return (
        <div style={{ minHeight: 'calc(100vh - 90px)', background: '#030712', color: '#f3f4f6', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* Page Header */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #1f2937', paddingBottom: '20px', marginBottom: '30px', gap: '15px' }}>
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '10px' }}>
                            ● Live Server Sync Active
                        </div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 5px 0' }}>Command Farm Dashboard</h1>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>Real-time telemetry, asset valuation, and active agricultural operations.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button style={{ background: '#1f2937', color: '#f3f4f6', border: '1px solid #374151', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Export Logs
                        </button>
                        <button style={{ background: '#10b981', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
                            Sync Server Data
                        </button>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    {stats.map((stat, idx) => (
                        <div key={idx} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 'bold' }}>{stat.label}</span>
                                <span style={{ fontSize: '18px' }}>{stat.icon}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', fontFamily: 'monospace' }}>{stat.value}</span>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', background: stat.positive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: stat.positive ? '#34d399' : '#f87171' }}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
                    
                    {/* Live Field Operations */}
                    <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', borderBottom: '1px solid #1f2937', paddingBottom: '12px' }}>
                            🚜 Active Field Operations
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {activeOperations.map((op) => (
                                <div key={op.id} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '8px', padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#9ca3af' }}>{op.id}</span>
                                        <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', background: `${op.color}22`, color: op.color, border: `1px solid ${op.color}44` }}>
                                            {op.status}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>{op.field}</div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>Machine: <span style={{ color: '#f3f4f6' }}>{op.machine}</span></div>
                                    
                                    {/* Progress Bar */}
                                    <div style={{ background: '#111827', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
                                        <div style={{ background: op.color, height: '100%', width: op.progress }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Server Telemetry Logs */}
                    <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', borderBottom: '1px solid #1f2937', paddingBottom: '12px' }}>
                            📡 Recent Server Logs
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {serverLogs.map((log, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#1f2937', padding: '12px', borderRadius: '8px', border: '1px solid #374151' }}>
                                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#9ca3af', background: '#111827', padding: '2px 6px', borderRadius: '4px' }}>{log.time}</span>
                                    <span style={{ fontSize: '13px', color: '#e5e7eb', lineHeight: '1.4' }}>{log.event}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
