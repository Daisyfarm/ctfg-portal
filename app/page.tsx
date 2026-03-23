"use client";
import { useState } from 'react';
import { sb } from "@/db/supabase"; 
import { ArrowRight, Lock, Sprout, UserPlus } from 'lucide-react';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });

    if (isRegistering) {
      const { error } = await sb.auth.signUp({ email, password });
      if (error) setStatus({ type: 'error', msg: error.message });
      else setStatus({ type: 'success', msg: "Account Created! Check email or login." });
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setStatus({ type: 'error', msg: "Access Denied: " + error.message });
      else window.location.href = '/dashboard';
    }
  };

  return (
    <main style={{ 
      backgroundImage: 'url("/image_1451a7.jpg")', 
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))' }} />

      <div style={{ 
        position: 'relative', background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(10px)',
        padding: '50px 40px', borderRadius: '2px', border: '1px solid #d4af37',
        textAlign: 'center', width: '400px', boxShadow: '0 25px 50px rgba(0,0,0,0.9)'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <Sprout color="#d4af37" size={40} style={{ marginBottom: '10px' }} />
          <h1 style={{ color: '#d4af37', letterSpacing: '6px', fontSize: '28px', margin: 0 }}>DAISY'S DREAM</h1>
          <p style={{ color: '#8da989', fontSize: '10px', letterSpacing: '2px', marginTop: '10px' }}>
            {isRegistering ? 'NEW OPERATOR ENROLLMENT' : 'ESTABLISHED UPLINK REQUIRED'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" placeholder="OPERATOR EMAIL" required
            onChange={e => setEmail(e.target.value)}
            style={{ padding: '14px', background: '#000', border: '1px solid #333', color: '#fff', textAlign: 'center', fontSize: '12px' }}
          />
          <input 
            type="password" placeholder="SECURE ACCESS KEY" required
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '14px', background: '#000', border: '1px solid #333', color: '#fff', textAlign: 'center', fontSize: '12px' }}
          />
          
          <button style={{ 
            background: isRegistering ? '#8da989' : '#d4af37', 
            color: '#000', padding: '16px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
            letterSpacing: '2px', transition: '0.3s'
          }}>
            {isRegistering ? 'CREATE IDENTITY' : 'INITIATE UPLINK'}
          </button>

          {status.msg && (
            <p style={{ color: status.type === 'error' ? '#ff4d4d' : '#8da989', fontSize: '11px' }}>{status.msg}</p>
          )}

          <div style={{ marginTop: '20px', borderTop: '1px solid #222', paddingTop: '20px' }}>
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              style={{ background: 'transparent', color: '#666', fontSize: '11px', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isRegistering ? 'ALREADY REGISTERED? LOGIN' : 'REQUEST NETWORK ACCESS'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
