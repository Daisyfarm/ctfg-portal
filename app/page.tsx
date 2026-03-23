"use client";
import { useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ArrowRight, Lock, Sprout, UserPlus, ShieldCheck } from 'lucide-react';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });

    if (isRegistering) {
      // Create New Operator
      const { data, error } = await sb.auth.signUp({ 
        email, 
        password,
        options: {
          data: { username: email.split('@')[0] } // Default username from email
        }
      });
      if (error) setStatus({ type: 'error', msg: error.message });
      else setStatus({ type: 'success', msg: "ENROLLMENT SUCCESSFUL. YOU MAY NOW LOGIN." });
    } else {
      // Existing Operator Login
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setStatus({ type: 'error', msg: "ACCESS DENIED: INVALID CREDENTIALS" });
      else window.location.href = '/dashboard';
    }
  };

  return (
    <main style={{ 
      backgroundImage: 'url("/image_1451a7.jpg")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundAttachment: 'fixed',
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'serif'
    }}>
      {/* Dark Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))' }} />

      <div style={{ 
        position: 'relative', 
        background: 'rgba(10, 10, 10, 0.9)', 
        backdropFilter: 'blur(12px)',
        padding: '60px 45px', 
        borderRadius: '2px', 
        border: '1px solid #d4af37',
        textAlign: 'center', 
        width: '420px', 
        boxShadow: '0 30px 60px rgba(0,0,0,0.9)'
      }}>
        
        {/* Logo Section */}
        <div style={{ marginBottom: '40px' }}>
          <Sprout color="#d4af37" size={45} style={{ marginBottom: '15px' }} />
          <h1 style={{ color: '#d4af37', letterSpacing: '8px', fontSize: '32px', margin: 0, fontWeight: 'bold' }}>DAISY'S DREAM</h1>
          <p style={{ color: '#8da989', fontSize: '11px', letterSpacing: '3px', marginTop: '12px' }}>
            {isRegistering ? 'NEW OPERATOR ENROLLMENT' : 'SECURE FARMING NETWORK'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ color: '#444', fontSize: '10px', letterSpacing: '1px', marginLeft: '5px' }}>OFFICIAL EMAIL</label>
            <input 
              type="email" 
              required
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '14px', background: '#000', border: '1px solid #222', color: '#fff', fontSize: '13px', marginTop: '5px', outline: 'none' }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ color: '#444', fontSize: '10px', letterSpacing: '1px', marginLeft: '5px' }}>ACCESS KEY</label>
            <input 
              type="password" 
              required
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '14px', background: '#000', border: '1px solid #222', color: '#d4af37', fontSize: '13px', marginTop: '5px', outline: 'none' }}
            />
          </div>
          
          <button style={{ 
            background: isRegistering ? '#8da989' : '#d4af37', 
            color: '#000', 
            padding: '18px', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            letterSpacing: '3px', 
            fontSize: '13px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            {isRegistering ? <UserPlus size={18}/> : <ShieldCheck size={18}/>}
            {isRegistering ? 'REGISTER IDENTITY' : 'INITIATE UPLINK'}
          </button>

          {/* Status Message */}
          {status.msg && (
            <div style={{ 
              padding: '10px', 
              background: status.type === 'error' ? 'rgba(255,0,0,0.1)' : 'rgba(141,169,137,0.1)',
              border: `1px solid ${status.type === 'error' ? '#ff4d4d' : '#8da989'}`,
              borderRadius: '2px'
            }}>
              <p style={{ color: status.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '11px', margin: 0 }}>
                {status.msg}
              </p>
            </div>
          )}

          {/* Toggle Button */}
          <div style={{ marginTop: '25px', borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ background: 'transparent', color: '#555', fontSize: '11px', border: 'none', cursor: 'pointer', textDecoration: 'underline', letterSpacing: '1px' }}
            >
              {isRegistering ? 'RETURN TO LOGIN TERMINAL' : 'REQUEST NEW OPERATOR ACCESS'}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Version Tag */}
      <div style={{ position: 'absolute', bottom: '20px', color: '#333', fontSize: '10px', letterSpacing: '2px' }}>
        DAISY_OS v2.0.4 - ENCRYPTED CONNECTION
      </div>
    </main>
  );
}
