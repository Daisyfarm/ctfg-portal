"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        alert("Authentication failed: " + error.message);
        setLoading(false);
      } else {
        await fetch(HK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🔐 **OPERATOR LOGGED IN**\n**Email:** ${email}\n**Timestamp:** ${new Date().toISOString()}`
          })
        });
        window.location.href = '/dashboard';
      }
    } else {
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) {
        alert("Registration failed: " + error.message);
        setLoading(false);
      } else if (data.user) {
        // Create profile row
        await sb.from('profiles').insert([{
          id: data.user.id,
          username: username || email.split('@')[0],
          balance: 500000, // Starting capital
          role: 'Operator'
        }]);

        await fetch(HK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🌾 **NEW OPERATOR REGISTERED**\n**Username:** ${username || email.split('@')[0]}\n**Email:** ${email}`
          })
        });

        alert("Registration successful! Accessing terminal dashboard...");
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <div style={{
      background: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }}></div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(20, 20, 20, 0.95)',
        border: '1px solid #4a7ab5',
        borderRadius: '6px',
        padding: '40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Tractor size={48} color="#22c55e" style={{ marginBottom: '10px' }} />
          <h1 style={{ color: '#fff', fontSize: '24px', textTransform: 'uppercase', margin: 0, fontWeight: '900', fontStyle: 'italic' }}>
            Iron Daisy Agri
          </h1>
          <p style={{ color: '#4a7ab5', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', marginTop: '5px' }}>
            CORPORATE AGRICULTURAL & LOGISTICS TERMINAL
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <div>
              <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>OPERATOR CALLSIGN / USERNAME</label>
              <input
                type="text"
                required
                placeholder="e.g. Miller_01"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>SECURE EMAIL</label>
            <input
              type="email"
              required
              placeholder="operator@irondaisy.agri"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>PASSWORD CLEARANCE</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '10px',
              padding: '14px',
              background: '#22c55e',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px',
              textTransform: 'uppercase'
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Access Terminal' : 'Initialize Operative Account')}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', borderTop: '1px solid #333', paddingTop: '15px' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'transparent', border: 'none', color: '#4a7ab5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isLogin ? "Need a new operator account? Register here" : "Already have clearance? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
