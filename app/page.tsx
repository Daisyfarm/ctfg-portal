"use client";
import { useState, useEffect } from 'react';
import { sb } from "../lib/supabase"; 

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --- AUTO-REDIRECT LOGIC ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        window.location.href = '/dashboard';
      } else {
        setCheckingAuth(false);
      }
    };
    checkUser();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/dashboard';
      } else {
        if (!username) return alert("Please enter a username");
        const { data: authData, error: authError } = await sb.auth.signUp({ email, password });
        if (authError) throw authError;

        if (authData.user) {
          const { error: profileError } = await sb.from("profiles").insert({
            id: authData.user.id,
            username: username,
            balance: 1000,
            rank: 'User'
          });
          if (profileError) throw profileError;
          alert("Account created! Logging you in...");
          window.location.href = '/dashboard';
        }
      }
    } catch (err: any) {
      alert(err.message || "Authentication Failed");
    } finally {
      setLoading(false);
    }
  };

  // Show a blank loading state while checking if they are already logged in
  if (checkingAuth) return (
    <div style={{background:'#111', color:'#d4af37', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <p style={{letterSpacing:'2px'}}>CHECKING CREDENTIALS...</p>
    </div>
  );

  return (
    <div style={{ background: '#111', color: '#f5f5dc', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' }}>
      <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '4px', width: '350px', border: '1px solid #d4af37' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#d4af37' }}>
          {isLogin ? 'DAISY NETWORK LOGIN' : 'CREATE OPERATOR'}
        </h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '10px', color: '#d4af37', display: 'block', marginBottom: '5px' }}>USERNAME</label>
              <input style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', boxSizing: 'border-box' }} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          )}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '10px', color: '#d4af37', display: 'block', marginBottom: '5px' }}>EMAIL</label>
            <input type="email" style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', boxSizing: 'border-box' }} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '10px', color: '#d4af37', display: 'block', marginBottom: '5px' }}>ACCESS KEY</label>
            <input type="password" style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', boxSizing: 'border-box' }} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#333' : '#d4af37', border: 'none', color: '#111', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'SYNCING...' : (isLogin ? 'AUTHORIZE' : 'INITIALIZE')}
          </button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px', color: '#555', cursor: 'pointer', textDecoration: 'underline' }}>
          {isLogin ? "New Operator? Register" : "Existing Operator? Login"}
        </p>
      </div>
    </div>
  );
}
