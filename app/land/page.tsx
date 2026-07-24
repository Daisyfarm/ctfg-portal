Fixing the /land Supabase URL Error
The current build error is coming from your /land page (app/land/page.tsx), which is failing during server pre-rendering due to an unconfigured Supabase client.

Replace the contents of your app/land/page.tsx file on GitHub with this complete, corrected version:

TypeScript
"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MapPin, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LandPage() {
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLand() {
      const { data } = await sb.from('land_registry').select('*');
      if (data) setPlots(data);
      setLoading(false);
    }
    fetchLand();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Land & Property Registry</h1>
          <p style={{ fontSize: '12px', color: '#4a7ab5', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | TERRITORY CONTROL</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #4a7ab5', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Scanning Regional Land Grids...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {plots.length === 0 ? (
            <div style={{ color: '#888', gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333' }}>
              <MapPin size={40} style={{ margin: '0 auto 10px', color: '#4a7ab5' }} />
              <p>No land plots currently registered in the database.</p>
            </div>
          ) : (
            plots.map((p, index) => (
              <div key={index} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <MapPin size={20} color="#22c55e" />
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{p.name || 'Sector Plot'}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#aaa', margin: '5px 0' }}>Owner: <strong style={{ color: '#fff' }}>{p.owner || 'Unclaimed'}</strong></p>
                <p style={{ fontSize: '13px', color: '#aaa', margin: '5px 0' }}>Status: <strong style={{ color: '#f59e0b' }}>{p.status || 'Active'}</strong></p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
