"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../db/supabase"; 
import { LogOut, Loader2, Map as MapIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

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
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <main style={{ 
      minHeight: '100vh',
      backgroundColor: '#000',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("/hub-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#fff',
      fontFamily: 'serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Branded Header */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '30px 50px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img src="/brand-identity.jpg" alt="CTFG Logo" style={{ height: '70px', border: '2px solid #d4af37', boxShadow: '0 0 15px rgba(212,175,55,0.2)' }} />
          <div>
            <h2 style={{ margin: 0, letterSpacing: '3px', color: '#d4af37', fontSize: '22px' }}>DAISY HILL</h2>
            <p style={{ margin: 0, fontSize: '10px', color: '#8da989', letterSpacing: '2px' }}>OPERATIONAL PORTAL</p>
          </div>
        </div>
        <button onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', opacity: 0.7 }}>
          <LogOut size={24} />
        </button>
      </nav>

      {/* Main Stats Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
        <ShieldCheck color="#d4af37" size={50} strokeWidth={1} style={{ marginBottom: '20px' }} />
        <span style={{ fontSize: '11px', color: '#8da989', letterSpacing: '5px', textTransform: 'uppercase' }}>Available Credits</span>
        <h1 style={{ fontSize: '90px', margin: '10px 0', fontWeight: '900', textShadow: '2px 4px 20px rgba(0,0,
