"use client";
import { useState, useEffect } from 'react';
import { sb } from "../db/supabase"; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = '/dashboard';
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' }}>
      <form onSubmit={handleLogin} style={{ background: '#1a1a1a', padding: '40px', border: '1px solid #d4af37', width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ color: '#d4af37', textAlign: 'center', margin: 0, letterSpacing: '2px' }}>DAISY FARM</h2>
        <input type="email" placeholder="EMAIL" style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff' }} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="KEY" style={{ padding: '10px', background: '#111', border: '1px solid #333', color: '#fff' }} onChange={e => setPassword(e.target.value)} required />
        <button disabled={loading} style={{ padding: '12px', background: '#d4af37', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'SYNCING...' : 'AUTHORIZE'}
        </button>
      </form>
    </div>
  );
}
