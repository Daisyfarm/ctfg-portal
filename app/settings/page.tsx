import React from 'react';

export default function SettingsPage() {
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
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                }}>
                    <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
                        Account & Server Settings
                    </h1>
                    <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                        Manage your profile configurations, default slot preferences, and security settings for <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>.
                    </p>
                </div>

                {/* Two Column Layout: Profile Configurations & Preferences */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Profile Details Form */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                            Profile Configurations
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Username / In-Game Name
                                </label>
                                <input 
                                    type="text" 
                                    defaultValue="Samuel Founder" 
                                    style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Discord Tag / ID
                                </label>
                                <input 
                                    type="text" 
                                    defaultValue="SamFounder#0001" 
                                    style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Default Server Node Preference
                                </label>
                                <select style={{ width: '100%', background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '12px', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}>
                                    <option>Judith Plains North (Slots 1–8)</option>
                                    <option>Judith Plains South (Slots 9–16)</option>
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
                                marginTop: '10px'
                            }}>
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Security & Notifications */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        {/* Security Box */}
                        <div style={{ 
                            background: 'rgba(17, 24, 39, 0.9)', 
                            backdropFilter: 'blur(12px)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '16px', 
                            padding: '32px',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                                Account Security
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>Two-Factor Authentication</div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>Secure your account using Discord OAuth</div>
                                    </div>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                        ENABLED
                                    </span>
                                </div>

                                <hr style={{ border: 'none', borderTop: '1px solid #374151', margin: '8px 0' }} />

                                <button style={{ 
                                    background: '#374151', 
                                    color: '#ffffff', 
                                    border: 'none', 
                                    padding: '10px 16px', 
                                    borderRadius: '8px', 
                                    fontSize: '13px', 
                                    fontWeight: 'bold', 
                                    cursor: 'pointer'
                                }}>
                                    Reset Access Tokens
                                </button>
                            </div>
                        </div>

                        {/* Notification Preferences Box */}
                        <div style={{ 
                            background: 'rgba(17, 24, 39, 0.9)', 
                            backdropFilter: 'blur(12px)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '16px', 
                            padding: '32px',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                                Notifications
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#cbd5e1' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb', width: '16px', height: '16px' }} />
                                    <span>Discord alerts for fund transfer approvals</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked style={{ accentColor: '#2563eb', width: '16px', height: '16px' }} />
                                    <span>Server restart warnings (North & South nodes)</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ accentColor: '#2563eb', width: '16px', height: '16px' }} />
                                    <span>Daily market shift price reports</span>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
