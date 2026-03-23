"use client";
import { useState } from 'react';
import { sb } from "@/lib/supabase"; // Use the @ alias here too

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e: any) => {
    e.preventDefault();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = '/dashboard';
  };

  return (
    <div style={{ background: '#111', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={login} style={{ background: '#1a1a1a', padding: '40px', border: '1px solid #d4af37', display:'flex', flexDirection:'column', gap:'10px' }}>
        <h2 style={{color:'#d4af37', textAlign:'center'}}>DAISY FARM</h2>
        <input type="email" placeholder="EMAIL" onChange={e => setEmail(e.target.value)} style={{padding:'10px', background:'#111', border:'1px solid #333', color:'#fff'}} />
        <input type="password" placeholder="KEY" onChange={e => setPassword(e.target.value)} style={{padding:'10px', background:'#111', border:'1px solid #333', color:'#fff'}} />
        <button style={{padding:'10px', background:'#d4af37', fontWeight:'bold', cursor:'pointer'}}>ACCESS</button>
      </form>
    </div>
  );
}
