
import React from 'react';
import Link from 'next/link';

export default function ContractingCentrePage() {
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
                <div style={{ marginBottom: '20px' }}>
                    <Link href="/" style={{ color: '#34d399', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
                        ← Back to Network Hub
                    </Link>
                </div>

                <div style={{ 
                    background: 'rgba(17, 24, 39, 0.9)', 
                    backdropFilter: 'blur(12px)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '16px', 
                    padding: '40px',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.6)'
                }}>
                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>
                        Contracting Centre
                    </h1>
                    <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>
                        Accept harvest, transport, and fieldwork sub-contracts or hire out your fleet to fellow operators on <span style={{ color: '#34d399', fontWeight: 'bold' }}>Judith Plains Montana 4X</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
