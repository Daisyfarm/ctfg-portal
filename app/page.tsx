"use client";
import { useState } from 'react';
import { sb } from "../lib/supabase"; // Going back 1 step to root lib folder

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/dashboard';
      } else {
        // --- REGISTRATION LOGIC ---
        if (!username) return alert("Please enter a username");

        const { data: authData, error: authError } = await sb.auth.signUp({ 
          email, 
          password 
        });

        if (authError) throw authError;

        if (authData.user) {
          // Fixed the Type Error: Removed <ProfileInsert> generic
          const { error: profileError } = await sb
            .from("profiles")
            .insert({
              id: authData.user.id,
              username: username,
              balance: 1000,
              rank: 'User'
            });

          if (profileError) throw profileError;
          
          alert("Account created! You can now log in.");
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#111', color: '#fff', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#222', padding: '40px', borderRadius: '12px', width: '350px', borderTop: '4px solid #4a7ab5', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', letterSpacing: '1px' }}>
          {isLogin ? 'CTFG PORTAL LOGIN' : 'CREATE OPERATOR'}
        </h2>
        
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '10px', color: '#555', display: 'block', marginBottom: '5px' }}>USERNAME</label>
              <input 
                placeholder="Operator Handle" 
                style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', boxSizing: 'border-box' }} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '10px', color: '#555', display: 'block', marginBottom: '5px' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="name@email.com" 
              style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', boxSizing: 'border-box' }} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '10px', color: '#555', display: 'block', marginBottom: '5px' }}>ACCESS KEY</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', boxSizing: 'border-box' }} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: loading ? '#444' : '#22c55e', 
              border: 'none', 
              color: '#000', 
              fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: '0.2s'
            }}
          >
            {loading ? 'PROCESSING...' : (isLogin ? 'AUTHORIZE ACCESS' : 'INITIALIZE ACCOUNT')}
          </button>
        </form>
        
        <p 
          onClick={() => setIsLogin(!isLogin)} 
          style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px', color: '#4a7ab5', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? "New Operator? Register Here" : "Existing Operator? Login Here"}
        </p>
      </div>
    </div>
  );
}
