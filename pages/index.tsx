import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, Mail, Lock, User } from 'lucide-react';

// Connect to your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email, password, options: { data: { username } }
      });
      if (error) alert(error.message);
      else alert("Registration successful! You can now log in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#131926', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '400px', border: '1px solid #334155' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Tractor size={48} color="#22c55e" style={{ marginBottom: '10px' }} />
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>CTFG <span style={{ color: '#22c55e' }}>PORTAL</span></h1>
          <p style={{ color: '#94a3b8' }}>{isRegister ? 'Create your farmer account' : 'Welcome back, Farmer'}</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {isRegister && (
            <input type="text" placeholder="In-Game Username" required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} onChange={(e) => setUsername(e.target.value)} />
          )}
          <input type="email" placeholder="Email Address" required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required style={{ padding: '12px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0b0f1a', color: 'white' }} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" style={{ padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            {isRegister ? 'Register Account' : 'Login to Farm'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#94a3b8', fontSize: '14px' }}>
          {isRegister ? 'Already have an account?' : 'Need an account?'} 
          <span onClick={() => setIsRegister(!isRegister)} style={{ color: 'white', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}>
            {isRegister ? 'Log In' : 'Register Now'}
          </span>
        </p>
      </div>
    </div>
  );
}
