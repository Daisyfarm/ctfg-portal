"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { LogOut, Sprout, Landmark, User, Loader2, TrendingUp } from 'lucide-react';

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
    <div style={{ 
      background: '#0a0a0a', 
      minHeight: '100vh', 
      color: '#f5f5dc', 
      fontFamily: 'serif',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.95)), url("/image_1451a7.jpg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      {/* Top Navigation Bar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 40px', 
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sprout color="#d4af37" size={24} />
          <span style={{ letterSpacing: '3px', fontWeight: 'bold', color: '#d4af37' }}>DAISY'S HUB</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#8da989' }}>OPERATOR STATUS</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{profile?.username?.toUpperCase()}</p>
          </div>
          <button 
            onClick={() => sb.auth.signOut().then(() => window.location.href = '/')} 
            style={{ background: 'none', border: '1px solid #444', color: '#444', padding: '8px', cursor: 'pointer', borderRadius: '4px' }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          
          {/* Main Balance Card */}
          <div style={{ 
            background: 'rgba(20, 20, 20, 0.8)', 
            padding: '40px', 
            border: '1px solid #d4af37',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Landmark style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.05 }} size={200} />
            <p style={{ color: '#d4af37', fontSize: '12px', letterSpacing: '4px', margin: '0 0 10px 0' }}>AVAILABLE CREDITS</p>
            <h1 style={{ fontSize: '72px', color: '#8da989', margin: 0, fontWeight: 'normal' }}>
              <span style={{ fontSize: '32px', verticalAlign: 'top', marginRight: '10px' }}>$</span>
              {profile?.balance?.toLocaleString()}
            </h1>
            <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
               <div style={{ color: '#555', fontSize: '12px' }}>
                  <TrendingUp size={14} style={{ marginRight: '5px' }} />
                  NETWORK STABLE
               </div>
            </div>
          </div>

          {/* Quick Stats Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', border: '1px solid #222' }}>
              <p style={{ fontSize: '10px', color: '#555', margin: '0 0 10px 0' }}>FARM ID</p>
              <code style={{ color: '#d4af37' }}>#DFN-{profile?.id?.substring(0,8).toUpperCase()}</code>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', border: '1px solid #222' }}>
              <p style={{ fontSize: '10px', color: '#555', margin: '0 0 10px 0' }}>SECURITY LEVEL</p>
              <p style={{ margin: 0, color: '#fff' }}>STANDARD OPERATOR</p>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div style={{ marginTop: '100px', textAlign: 'center', opacity: 0.3 }}>
           <p style={{ fontSize: '10px', letterSpacing: '2px' }}>ENCRYPTED DATA STREAM ACTIVE // END-TO-END VERIFIED</p>
        </div>
      </main>
    </div>
  );
}
