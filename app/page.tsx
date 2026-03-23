"use client";
import { useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) alert("Access Denied: " + error.message);
    else window.location.href = '/dashboard';
  };

  return (
    <main style={{ 
      backgroundImage: 'url("/image_1451a7.jpg")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'serif'
    }}>
      {/* Overlay for readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />

      <div style={{ 
        position: 'relative',
        background: 'rgba(15, 15, 15, 0.85)', 
        backdropFilter: 'blur(12px)',
        padding: '50px',
        borderRadius: '2px', // Sharper corners for a "vault" feel
        border: '1px solid #d4af37',
        textAlign: 'center',
        width: '400px',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
      }}>
        {!showLogin ? (
          <>
            <h1 style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '28px', margin: '0 0 10px 0' }}>DAISY'S DREAM</h1>
            <p style={{ color: '#8da989', fontSize: '12px', letterSpacing: '2px', marginBottom: '40px' }}>NETWORK TERMINAL v1.0</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                onClick={() => setShowLogin(true)}
                style={{ background: '#d4af37', color: '#000', padding: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                DEPLOY OPERATOR <ArrowRight size={18} />
              </button>

              <button 
                disabled
                style={{ background: 'transparent', color: '#555', padding: '15px', border: '1px solid #333', fontWeight: 'bold', cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <Lock size={16} /> STAFF PANEL
              </button>
              <p style={{ color: '#444', fontSize: '10px', marginTop: '10px' }}>OFFLINE - UNDER MAINTENANCE</p>
            </div>
          </>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h2 style={{ color: '#d4af37', margin: 0, fontSize: '20px' }}>AUTHORIZATION</h2>
              <p style={{ color: '#555', fontSize: '10px' }}>SECURE ENCRYPTED UPLINK</p>
            </div>

            <input 
              type="email" 
              placeholder="OPERATOR ID (EMAIL)" 
              onChange={e => setEmail(e.target.value)}
              style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', textAlign: 'center' }}
            />
            <input 
              type="password" 
              placeholder="ACCESS KEY" 
              onChange={e => setPassword(e.target.value)}
              style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', textAlign: 'center' }}
            />
            
            <button style={{ background: '#8da989', color: '#000', padding: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              INITIATE CONNECTION
            </button>
            
            <button 
              type="button"
              onClick={() => setShowLogin(false)}
              style={{ background: 'transparent', color: '#555', fontSize: '11px', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              CANCEL REQUEST
            </button>
          </form>
        )}
      </div>

      <p style={{ position: 'absolute', bottom: '20px', color: '#d4af37', fontSize: '10px', opacity: 0.5, letterSpacing: '3px' }}>
        © 2026 DAISY FARM OPERATIONS
      </p>
    </main>
  );
}
