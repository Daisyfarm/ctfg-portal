import React from 'react';

export default function DataPage() {
    const serverTelemetry = [
        { server: 'Judith Plains North (Slots 1–8)', status: 'Optimal', ping: '24ms', uptime: '99.9%', players: '6 / 8 Active' },
        { server: 'Judith Plains South (Slots 9–16)', status: 'Optimal', ping: '28ms', uptime: '99.8%', players: '4 / 8 Active' },
    ];

    const fleetData = [
        { vehicle: 'John Deere 8R Series', node: 'Judith Plains North', operator: 'Samuel Founder', fuel: '78%', wear: '4.2%', status: 'Operating' },
        { vehicle: 'Claas Lexion 8900', node: 'Judith Plains North', operator: 'Hank Miller', fuel: '45%', wear: '12.8%', status: 'Harvesting' },
        { vehicle: 'Fendt 942 Vario', node: 'Judith Plains South', operator: 'Clara Oswald', fuel: '92%', wear: '1.1%', status: 'Idle / Transport' },
    ];

    const fieldStatus = [
        { field: 'Field #04 (North)', crop: 'Wheat', state: 'Ready to Harvest', fertilizer: '100%', yieldPotential: '142,500 L' },
        { field: 'Field #12 (North)', crop: 'Corn', state: 'Growing (Stage 3)', fertilizer: '75%', yieldPotential: '210,800 L' },
        { field: 'Field #09 (South)', crop: 'Soybeans', state: 'Harvested / Plow Needed', fertilizer: '0%', yieldPotential: '95,200 L' },
        { field: 'Field #01 (South)', crop: 'Barley', state: 'Cultivating', fertilizer: '50%', yieldPotential: '88,400 L' },
    ];

    const cropYields = [
        { crop: 'Wheat (Field #04)', node: 'Judith Plains North', yield: '142,500 L', status: 'Stored in Silo A', moisture: '13.2%' },
        { crop: 'Corn (Field #12)', node: 'Judith Plains North', yield: '210,800 L', status: 'Processing', moisture: '15.5%' },
        { crop: 'Soybeans (Field #09)', node: 'Judith Plains South', yield: '95,200 L', status: 'Ready for Sale', moisture: '11.8%' },
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
                            Server Telemetry & Agricultural Analytics
                        </h1>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                            Comprehensive fleet status, field conditions, and server telemetry for <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>.
                        </p>
                    </div>
                    <div>
                        <button style={{ 
                            background: '#2563eb', 
                            color: '#ffffff', 
                            border: 'none', 
                            padding: '12px 20px', 
                            borderRadius: '8px', 
                            fontSize: '13px', 
                            fontWeight: 'bold', 
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                        }}>
                            Export Telemetry Logs
                        </button>
                    </div>
                </div>

                {/* Server Cluster Status Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '30px' }}>
                    {serverTelemetry.map((srv, idx) => (
                        <div key={idx} style={{ 
                            background: 'rgba(17, 24, 39, 0.9)', 
                            backdropFilter: 'blur(12px)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '16px', 
                            padding: '24px',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>{srv.server}</h3>
                                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                    {srv.status}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#1f2937', padding: '14px', borderRadius: '8px', border: '1px solid #374151' }}>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Latency</div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', fontFamily: 'monospace' }}>{srv.ping}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Uptime</div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', fontFamily: 'monospace' }}>{srv.uptime}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Active Slots</div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#34d399', fontFamily: 'monospace' }}>{srv.players}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Section: Fleet Telematics & Field Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px', alignItems: 'start' }}>
                    
                    {/* Fleet Telematics Table */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '28px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
                            Fleet Telematics & Maintenance
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Vehicle</th>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Fuel</th>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Wear</th>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fleetData.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '12px 0' }}>
                                                <div style={{ fontWeight: 'bold', color: '#ffffff' }}>{item.vehicle}</div>
                                                <div style={{ fontSize: '10px', color: '#9ca3af' }}>{item.node}</div>
                                            </td>
                                            <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#34d399' }}>{item.fuel}</td>
                                            <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#f87171' }}>{item.wear}</td>
                                            <td style={{ padding: '12px 0' }}>
                                                <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Field Status Grid Table */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '28px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
                            Field Status & Crop Monitoring
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Field</th>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>State</th>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Fertilizer</th>
                                        <th style={{ paddingBottom: '10px', fontWeight: 'bold' }}>Est. Yield</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fieldStatus.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '12px 0' }}>
                                                <div style={{ fontWeight: 'bold', color: '#ffffff' }}>{item.field}</div>
                                                <div style={{ fontSize: '10px', color: '#9ca3af' }}>{item.crop}</div>
                                            </td>
                                            <td style={{ padding: '12px 0', color: '#cbd5e1' }}>{item.state}</td>
                                            <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#34d399' }}>{item.fertilizer}</td>
                                            <td style={{ padding: '12px 0', fontFamily: 'monospace', color: '#93c5fd' }}>{item.yieldPotential}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Crop Yields & Storage Table */}
                <div style={{ 
                    background: 'rgba(17, 24, 39, 0.9)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '32px',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                        Crop Yield & Storage Tracking
                    </h2>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                                    <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Crop & Source Field</th>
                                    <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Cluster Node</th>
                                    <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Harvest Volume</th>
                                    <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Moisture</th>
                                    <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cropYields.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#ffffff' }}>{item.crop}</td>
                                        <td style={{ padding: '14px 0', color: '#cbd5e1' }}>{item.node}</td>
                                        <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#34d399', fontWeight: 'bold' }}>{item.yield}</td>
                                        <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#93c5fd' }}>{item.moisture}</td>
                                        <td style={{ padding: '14px 0' }}>
                                            <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                                {item.status}
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
    );
}
