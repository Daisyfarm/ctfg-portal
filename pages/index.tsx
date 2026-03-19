import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, ShieldCheck } from 'lucide-react';

// Database connection
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function CTFGPortal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async (e: any) => {
    e.preventDefault();
    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email, password, options: { data: { username } }
      });
      if (error) alert(error.message);
      else alert("Check your email or try logging in!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else alert("Login Successful! (Dashboard coming soon)");
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #334155' }}>
        <Tractor size={60} color="#22c55e" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 10px 0' }}>CTFG <span style={{ color: '#22c55e' }}>PORTAL</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>{isRegister ? 'Create your account' : 'Farmer Login'}</p>
        
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isRegister && (
            <input type="text" placeholder="In-Game Name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setUsername(e.target.value)} />
          )}
          <input type="email" placeholder="Email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={{ padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p onClick={() => setIsRegister(!isRegister)} style={{ marginTop: '20px', cursor: 'pointer', color: '#94a3b8', fontSize: '0.9rem' }}>
          {isRegister ? 'Already a member? Login' : 'New here? Register'}
        </p>
      </div>
    </div>
  );
}
