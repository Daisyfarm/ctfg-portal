"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor } from 'lucide-react';

// CONNECTING TO YOUR NEW CTFG DATABASE
const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email, password, options: { data: { username: username } }
      });
      if (error) alert("Error: " + error.message);
      else alert("Registration successful! You can now log in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert("Login Error: " + error.message);
      else window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #334155' }}>
        <Tractor size={60} color="#22c55e" style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', fontStyle: 'italic' }}>CTFG PORTAL</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>{isRegister ? 'Join the community' : 'Farmer Login'}</p>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isRegister && (
            <input type="text" placeholder="In-Game Username" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setUsername(e.target.value)} />
          )}
          <input type="email" placeholder="Email" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required style={{ padding: '14px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} style={{ padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Processing...' : (isRegister ? 'Register Account' : 'Login to Farm')}
          </button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)} style={{ marginTop: '25px', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' }}>
          {isRegister ? 'Already a member? Login' : 'Need an account? Register here'}
        </p>
      </div>
    </div>
  );
}
