"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Globe, Users, Shield, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function DirectoryPage() {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPersonnel() {
      const { data } = await sb.from('profiles').select('*');
      if (data) setPersonnel(data);
      setLoading(false);
    }
    fetchPersonnel();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Personnel Directory</h1>
          <p style={{ fontSize: '12px', color: '#4a7ab5', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | SECURE REGISTRY</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #4a7ab5', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Accessing Secure Database...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {personnel.map((p, index) => (
            <div key={index} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Shield size={20} color="#22c55e" />
                <h3 style={{ margin: 0, fontSize: '18px' }}>{p.username || 'Operative'}</h3>
              </div>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '4px 0' }}>Rank: <strong style={{ color: '#f59e0b' }}>{p.rank || 'Standard'}</strong></p>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '4px 0' }}>EID Status: <strong style={{ color: '#22c55e' }}>Verified</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
