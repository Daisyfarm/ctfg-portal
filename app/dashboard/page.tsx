"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../db/supabase"; 
import { LogOut, Flower2, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) {
        window.location.href = '/';
        return;
      }
      const { data } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setProfile(data || { username: 'Operator', balance: 0 });
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) return (
    <div style={{ background: '#111', color: '#d4af37', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" />
    </div>
  );

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily: 'serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d4af37', paddingBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>DAISY'S HUB</h2>
        <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer' }}>
          <LogOut size={20} />
        </button>
      </div>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Flower2 color="#d4af37" size={48} />
        <p style={{ fontSize: '10px', color: '#555', marginTop: '20px', letterSpacing: '2px' }}>CREDIT BALANCE</p>
        <h1 style={{ fontSize: '64px', color: '#8da989', margin: 0 }}>${profile?.balance?.toLocaleString()}</h1>
      </div>
    </div>
  );
}
