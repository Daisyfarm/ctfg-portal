"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trophy, Medal, User, ArrowLeft, TrendingUp } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Leaderboard() {
  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await sb.from('profiles').select('*').order('balance', { ascending: false }).limit(10);
      setFarmers(data || []);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Calculating Rankings...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'600px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        
        <div style={{ textAlign:'center', marginBottom:'30px' }}>
          <Trophy size={48} color="#facc15" style={{ marginBottom:'10px' }} />
          <h1 style={{ fontSize:'32px', fontWeight:'bold', margin:0 }}>CTFG <span style={{color:'#22c55e'}}>Top Farmers</span></h1>
          <p style={{ color:'#94a3b8', fontSize:'14px' }}>The Richest Operators on Judith Plains</p>
        </div>

        <div style={{ background:'#131926', borderRadius:'24px', border:'1px solid #1e293b', overflow:'hidden' }}>
          {farmers.map((f, i) => (
            <div key={f.id} style={{ 
              display:'flex', 
              alignItems:'center', 
              justifyContent:'space-between', 
              padding:'20px', 
              borderBottom: i === farmers.length - 1 ? 'none' : '1px solid #1e293b',
              background: i === 0 ? 'rgba(250, 204, 21, 0.05)' : 'transparent' 
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
                <div style={{ width:'30px', fontSize:'18px', fontWeight:'bold', color: i === 0 ? '#facc15' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : '#475569' }}>
                  #{i + 1}
                </div>
                <div>
                  <p style={{ margin:0, fontWeight:'bold', fontSize:'16px' }}>
                    {f.username} {i === 0 && '👑'}
                  </p>
                  <p style={{ margin:0, fontSize:'12px', color:'#94a3b8' }}>{f.rank}</p>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <p style={{ margin:0, color:'#22c55e', fontWeight:'bold', fontFamily:'monospace', fontSize:'16px' }}>
                  ${f.balance?.toLocaleString()}
                </p>
                <div style={{ fontSize:'10px', color:'#475569' }}>Total Net Worth</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', marginTop:'30px', color:'#475569', fontSize:'12px' }}>
          Updated in real-time. Want to climb? Check the Job Board!
        </p>
      </div>
    </div>
  );
}
