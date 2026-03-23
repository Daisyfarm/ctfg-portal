"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { Trophy, Star, Sprout, ArrowLeft, Loader2 } from 'lucide-react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      const { data } = await sb.from('profiles').select('username, balance').order('balance', { ascending: false }).limit(10);
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
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f5dc', fontFamily: 'serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', marginBottom: '20px' }}>
            <ArrowLeft size={14} /> RETURN TO HUB
          </button>
          <Trophy color="#d4af37" size={48} style={{ marginBottom: '10px' }} />
          <h1 style={{ letterSpacing: '8px', margin: 0, color: '#d4af37' }}>HALL OF HARVEST</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {leaders.map((user, index) => (
            <div key={index} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #222', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '30px', fontWeight: 'bold', color: index < 3 ? '#d4af37' : '#444' }}>{index + 1}</div>
                <span style={{ fontWeight: 'bold' }}>{user.username?.toUpperCase()}</span>
              </div>
              <span style={{ color: '#8da989', fontSize: '20px', fontWeight: 'bold' }}>${user.balance?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
