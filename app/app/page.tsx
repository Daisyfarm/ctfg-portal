
"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor } from 'lucide-react';

// PASTE YOUR ACTUAL DETAILS HERE TO BYPASS VERCEL SETTINGS
const supabase = createClient(
  'https://your-project-id.supabase.co', // https://yioyfxvabhzvkwuljcki.supabase.co
  'eyJhbG...your-anon-key'               // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpb3lmeHZhYmh6dmt3dWxqY2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzYyNjgsImV4cCI6MjA4OTQ1MjI2OH0.Ov36x2V6QfDYQhHdA57Bg8fzYkefjJFvG3JJakYMLPU
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
      else alert("Registration successful! Try logging in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else alert("Login Successful!");
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #334155' }}>
        <Tractor size={60} color="#22c55e" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>CTFG PORTAL</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>{isRegister ? 'Register' : 'Login'}</p>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isRegister && (
            <input type="text" placeholder="In-Game Name" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setUsername(e.target.value)} />
          )}
          <input type="email" placeholder="Email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={{ padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold' }}>
            {isRegister ? 'Create Account' : 'Enter Farm'}
          </button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)} style={{ marginTop: '20px', cursor: 'pointer', color: '#94a3b8' }}>
          {isRegister ? 'Already a member? Login' : 'New? Register here'}
        </p>
      </div>
    </div>
  );
}
