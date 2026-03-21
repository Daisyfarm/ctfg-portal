"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, User, Building2, Mail, Lock } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [farmName, setFarmName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async (e: any) => {
    e.preventDefault();
    if (isRegister) {
      const { error } = await sb.auth.signUp({
        email, password,
        options: { data: { username: username, farm_name: farmName } }
      });
      if (error) alert(error.message);
      else alert("Registration Successful! Please log in.");
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else window.location.href = '/dashboard';
    }
  };

  const inputStyle = { width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #334155', backgroundColor:'#0f172a', color:'white', outline:'none', marginBottom:'10px' };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ backgroundColor: '#131926', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        
        <Tractor size={50} color="#22c55e" style={{ marginBottom: '15px' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0', color: '#fff' }}>CTFG <span style={{color:'#22c55e'}}>NETWORK</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>{isRegister ? 'New Member Registration' : 'Operator Login'}</p>
        
        <form onSubmit={handleAuth}>
          {isRegister && (
            <>
              <div style={{textAlign:'left', color:'#22c55e', fontSize:'11px', fontWeight:'bold', marginBottom:'5px'}}>IN-GAME NAME (AS SEEN ON SERVER)</div>
              <input type="text" placeholder="e.g. Farmer_John" required style={inputStyle} onChange={(e) => setUsername(e.target.value)} />
              
              <div style={{textAlign:'left', color:'#22c55e', fontSize:'11px', fontWeight:'bold', marginBottom:'5px'}}>FARM OR COMPANY NAME</div>
              <input type="text" placeholder="e.g. Montana Harvest Co." required style={inputStyle} onChange={(e) => setFarmName(e.target.value)} />
            </>
          )}
          
          <div style={{textAlign:'left', color:'#94a3b8', fontSize:'11px', fontWeight:'bold', marginBottom:'5px'}}>EMAIL ADDRESS</div>
          <input type="email" placeholder="email@example.com" required style={inputStyle} onChange={(e) => setEmail(e.target.value)} />
          
          <div style={{textAlign:'left', color:'#94a3b8', fontSize:'11px', fontWeight:'bold', marginBottom:'5px'}}>PASSWORD</div>
          <input type="password" placeholder="••••••••" required style={inputStyle} onChange={(e) => setPassword(e.target.value)} />
          
          <button type="submit" style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'none', backgroundColor:'#22c55e', color:'white', fontWeight:'bold', fontSize:'16px', cursor:'pointer', marginTop:'10px' }}>
            {isRegister ? 'Register Account' : 'Login to Network'}
          </button>
        </form>
        
        <p onClick={() => setIsRegister(!isRegister)} style={{ marginTop: '25px', cursor: 'pointer', color: '#94a3b8', fontSize: '14px' }}>
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register here'}
        </p>
      </div>
    </div>
  );
}
