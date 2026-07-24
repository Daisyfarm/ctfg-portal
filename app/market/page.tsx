import React from 'react';

export default function MarketPage() {
    const commodities = [
        { crop: 'Wheat', price: '$420.50', change: '+4.2%', trend: 'Up', bestSellPoint: 'Judith Plains Grain Elevator' },
        { crop: 'Barley', price: '$385.00', change: '-1.5%', trend: 'Down', bestSellPoint: 'Central Feed Mill' },
        { crop: 'Corn', price: '$460.25', change: '+6.8%', trend: 'Up', bestSellPoint: 'North River Ethanol Plant' },
        { crop: 'Soybeans', price: '$650.10', change: '+2.1%', trend: 'Up', bestSellPoint: 'Montana Export Port' },
        { crop: 'Canola', price: '$590.80', change: '-0.8%', trend: 'Down', bestSellPoint: 'Central Feed Mill' },
        { crop: 'Sunflower', price: '$610.00', change: '+3.4%', trend: 'Up', bestSellPoint: 'Judith Plains Grain Elevator' },
    ];

    const sellPoints = [
        { name: 'Judith Plains Grain Elevator', distance: '2.4 km', activeDemands: 'Wheat, Sunflower', status: 'Open' },
        { name: 'Central Feed Mill', distance: '5.1 km', activeDemands: 'Barley, Canola', status: 'Open' },
        { name: 'North River Ethanol Plant', distance: '11.8 km', activeDemands: 'Corn', status: 'Open' },
        { name: 'Montana Export Port', distance: '24.5 km', activeDemands: 'Soybeans', status: 'Open' },
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
                            Global Commodity Market & Pricing
                        </h1>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                            Real-time commodity valuation, market trends, and regional sell points for <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>.
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
                            Refresh Market Rates
                        </button>
                    </div>
                </div>

                {/* Two Column Layout: Commodity Prices & Sell Points */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Commodity Pricing Table */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                            Current Crop Pricing (Per 1,000 L)
                        </h2>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #374151', color: '#9ca3af' }}>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Commodity</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Price</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>24h Trend</th>
                                        <th style={{ paddingBottom: '12px', fontWeight: 'bold' }}>Best Destination</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commodities.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#ffffff' }}>{item.crop}</td>
                                            <td style={{ padding: '14px 0', fontFamily: 'monospace', color: '#34d399', fontWeight: 'bold' }}>{item.price}</td>
                                            <td style={{ padding: '14px 0' }}>
                                                <span style={{ 
                                                    background: item.trend === 'Up' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                                                    color: item.trend === 'Up' ? '#34d399' : '#f87171', 
                                                    border: `1px solid ${item.trend === 'Up' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3'}`, 
                                                    padding: '3px 8px', 
                                                    borderRadius: '4px', 
                                                    fontSize: '11px', 
                                                    fontWeight: 'bold', 
                                                    fontFamily: 'monospace' 
                                                }}>
                                                    {item.change}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 0', color: '#93c5fd', fontSize: '12px' }}>{item.bestSellPoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Sell Points & Demands */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                            Regional Sell Points
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {sellPoints.map((point, idx) => (
                                <div key={idx} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '10px', padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>{point.name}</h3>
                                        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                            {point.status}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                                        Distance from Farm: <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{point.distance}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                                        Active Demand: <span style={{ color: '#34d399', fontWeight: 'bold' }}>{point.activeDemands}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
