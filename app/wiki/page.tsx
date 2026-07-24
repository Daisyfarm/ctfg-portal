import React from 'react';

export default function WikiPage() {
    const wikiArticles = [
        { title: 'Judith Plains Montana 4X: Map Overview', category: 'Map Guide', author: 'FSN Administration', date: '2026-06-15', readTime: '4 min read' },
        { title: 'Server Rules & Code of Conduct (North & South)', category: 'Server Rules', author: 'Moderation Team', date: '2026-05-01', readTime: '3 min read' },
        { title: 'Custom Modpack Installation & Requirements', category: 'Technical Support', author: 'Dev Team', date: '2026-07-10', readTime: '5 min read' },
        { title: 'Fund Transfers & Web-to-Game Economy Guide', category: 'Finances', author: 'Financial Officer', date: '2026-06-20', readTime: '3 min read' },
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
                            Server Documentation & Wiki
                        </h1>
                        <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                            Guides, server regulations, and modpack instructions for <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>.
                        </p>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Search wiki articles..." 
                            style={{ background: '#1f2937', border: '1px solid #374151', color: '#ffffff', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', width: '250px' }} 
                        />
                    </div>
                </div>

                {/* Main Content Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Article List */}
                    <div style={{ 
                        background: 'rgba(17, 24, 39, 0.9)', 
                        backdropFilter: 'blur(12px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', 
                        borderRadius: '16px', 
                        padding: '32px',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
                            Knowledge Base Articles
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {wikiArticles.map((article, idx) => (
                                <div key={idx} style={{ background: '#1f2937', border: '1px solid #374151', borderRadius: '10px', padding: '20px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                            {article.category}
                                        </span>
                                        <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace' }}>{article.readTime}</span>
                                    </div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 8px 0' }}>{article.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9ca3af' }}>
                                        <span>By {article.author}</span>
                                        <span style={{ fontFamily: 'monospace' }}>{article.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Quick Links & Rules Summary */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        
                        <div style={{ 
                            background: 'rgba(17, 24, 39, 0.9)', 
                            backdropFilter: 'blur(12px)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '16px', 
                            padding: '28px',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
                                Quick Categories
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>▶ Server Regulations & PVE Guidelines</a></li>
                                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>▶ Judith Plains Field Claiming Policy</a></li>
                                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>▶ Economic Transfers & Bank Help</a></li>
                                <li><a href="#" style={{ color: '#93c5fd', textDecoration: 'none' }}>▶ Voice Comms & Discord Integration</a></li>
                            </ul>
                        </div>

                        <div style={{ 
                            background: 'rgba(17, 24, 39, 0.9)', 
                            backdropFilter: 'blur(12px)', 
                            border: '1px solid rgba(255, 255, 255, 0.1)', 
                            borderRadius: '16px', 
                            padding: '28px',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
                                Need Assistance?
                            </h2>
                            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.5', marginBottom: '16px' }}>
                                If you run into any issues on Judith Plains North or South slots, reach out to staff on our official support channels.
                            </p>
                            <button style={{ 
                                width: '100%',
                                background: '#2563eb', 
                                color: '#ffffff', 
                                border: 'none', 
                                padding: '10px', 
                                borderRadius: '8px', 
                                fontSize: '13px', 
                                fontWeight: 'bold', 
                                cursor: 'pointer'
                            }}>
                                Open Support Ticket
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
