export const dynamic = 'force-dynamic';

"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tractor } from 'lucide-react';
import { sb } from '../lib/supabase'; // ✅ FIXED IMPORT

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [farmName, setFarmName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const { data, error } = await sb.auth.signUp({
        email,
        password
      });

      if (error) {
        alert(error.message);
      } else {
        const user = data.user;

        if (user) {
          const { error: profileError } = await sb.from('profiles').insert({
            user_id: user.id,
            username: username,
            farm_name: farmName
          });

          if (profileError) {
            console.error(profileError);
            alert("Profile creation failed");
          }
        }

        alert("Registration Successful! Please log in.");
      }

    } else {
      const { error } = await sb.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        alert(error.message);
      } else {
        router.push('/dashboard');
      }
    }

    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: 'white',
    outline: 'none',
    marginBottom: '10px'
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ backgroundColor: '#131926', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>

        <Tractor size={50} color="#22c55e" style={{ marginBottom: '15px' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0', color: '#fff' }}>
          CTFG <span style={{ color: '#22c55e' }}>NETWORK</span>
        </h1>

        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>
          {isRegister ? 'New Member Registration' : 'Operator Login'}
        </p>

        <form onSubmit={handleAuth}>
          {isRegister && (
            <>
              <div style={{ textAlign: 'left', color: '#22c55e', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>
                IN-GAME NAME
              </div>
              <input
                type="text"
                required
                style={inputStyle}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div style={{ textAlign: 'left', color: '#22c55e', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>
                FARM OR COMPANY NAME
              </div>
              <input
                type="text"
                required
                style={inputStyle}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </>
          )}

          <div style={{ textAlign: 'left', color: '#94a3b8', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>
            EMAIL ADDRESS
          </div>
          <input
            type="email"
            required
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ textAlign: 'left', color: '#94a3b8', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px' }}>
            PASSWORD
          </div>
          <input
            type="password"
            required
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#22c55e',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading
              ? 'Loading...'
              : isRegister
                ? 'Register Account'
                : 'Login to Network'}
          </button>
        </form>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ marginTop: '25px', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' }}
        >
          {isRegister
            ? 'Already have an account? Login'
            : 'Need an account? Register here'}
        </p>
      </div>
    </div>
  );
}
