A Global Leaderboard is the perfect way to spark a little friendly competition. It turns the "Daisy's Dream" network into a living world where operators can see who the most successful farmers are.

To keep it professional, we’ll build a dedicated page that ranks users by their balance—from the "Grand Harvesters" at the top to the "New Seedlings" below.

🛠️ The Leaderboard Page (app/leaderboard/page.tsx)
Create this new file. It uses the same dark-gold aesthetic to keep the branding consistent.

TypeScript
"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { Trophy, Medal, Star, Sprout, ArrowLeft, Loader2 } from 'lucide-react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      // Fetch top 10 operators by balance
      const { data } = await sb
        .from('profiles')
        .select('username, balance')
        .order('balance', { ascending: false })
        .limit(10);
      
      setLeaders(data || []);
      setLoading(false);
    }
    fetchLeaders();
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
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url("/image_1451a7.jpg")',
      backgroundSize: 'cover',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', marginBottom: '20px' }}
          >
            <ArrowLeft size={14} /> RETURN TO HUB
          </button>
          <Trophy color="#d4af37" size={48} style={{ marginBottom: '10px' }} />
          <h1 style={{ letterSpacing: '8px', margin: 0, color: '#d4af37' }}>HALL OF HARVEST</h1>
          <p style={{ color: '#8da989', fontSize: '11px', letterSpacing: '3px', marginTop: '10px' }}>TOP NETWORK OPERATORS</p>
        </div>

        {/* Leaderboard List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {leaders.map((user, index) => {
            const isTopThree = index < 3;
            const rankColors = ['#d4af37', '#c0c0c0', '#cd7f32']; // Gold, Silver, Bronze

            return (
              <div key={index} style={{ 
                background: isTopThree ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255,255,255,0.02)', 
                border: `1px solid ${isTopThree ? rankColors[index] : '#222'}`,
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '2px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '30px', fontWeight: 'bold', color: isTopThree ? rankColors[index] : '#444' }}>
                    {index === 0 ? <Star size={18} /> : index + 1}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '1px' }}>
                      {user.username?.toUpperCase()}
                    </p>
                    <p style={{ margin: 0, fontSize: '10px', color: '#555' }}>VERIFIED OPERATOR</p>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: isTopThree ? rankColors[index] : '#8da989', fontSize: '20px', fontWeight: 'bold' }}>
                    ${user.balance?.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <footer style={{ marginTop: '50px', textAlign: 'center', opacity: 0.3 }}>
           <Sprout size={16} color="#d4af37" />
           <p style={{ fontSize: '9px', letterSpacing: '2px', marginTop: '10px' }}>DATA REFRESHES IN REAL-TIME</p>
        </footer>
      </div>
    </div>
  );
}
