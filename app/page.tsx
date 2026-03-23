"use client";
import { useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ArrowRight, Lock, Sprout } from 'lucide-react';

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
      backgroundAttachment: 'fixed',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'serif'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))' }} />

      <div style={{ 
        position: 'relative',
        background: 'rgba(10, 10, 10, 0.8)', 
        backdropFilter: 'blur(8px)',
        padding: '60px 40px',
        borderRadius: '4px',
        border: '1px solid #d4af37',
        textAlign: 'center',
        width: '420px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        {!showLogin ? (
          <>
            <div style={{ marginBottom: '30px' }}>
              <Sprout color="#d4af37" size={40} style={{ marginBottom: '10px' }} />
              <h1 style={{ color: '#d4af37', letterSpacing: '6px', fontSize: '32px', margin: 0 }}>DAISY'S DREAM</h1>
              <p style={{ color: '#8da989', fontSize: '11px', letterSpacing: '3px', marginTop: '10px' }}>FARMING NETWORK PORTAL</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                onClick={() => setShowLogin(true)}
                style={{ background: '#d4af37', color: '#000', padding: '16px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                ENTER NETWORK <ArrowRight size={18} />
              </button>

              <button 
                disabled
                style={{ background: 'rgba(255,255,255,0.05)', color: '#444', padding: '16px', border: '1px solid #222', fontWeight: 'bold', fontSize: '14px', cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <Lock size={16} /> STAFF CONSOLE
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ color: '#d4af37', fontSize: '18px', letterSpacing: '2px' }}>CREDENTIAL VERIFICATION</h2>
            <input 
              type="email" 
              placeholder="OPERATOR EMAIL" 
              required
              onChange={e => setEmail(e.target.value)}
              style={{ padding: '14px', background: '#000', border: '1px solid #333', color: '#fff', textAlign: 'center' }}
            />
            <input 
              type="password" 
              placeholder="ACCESS KEY" 
              required
              onChange={e => setPassword(e.target.value)}
              style={{ padding: '14px', background: '#000', border: '1px solid #333', color: '#fff', textAlign: 'center' }}
            />
            <button style={{ background: '#8da989', color: '#000', padding: '16px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              INITIATE UPLINK
            </button>
            <button 
              type="button"
              onClick={() => setShowLogin(false)}
              style={{ background: 'transparent', color: '#666', fontSize: '11px', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              RETURN TO MAIN
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
