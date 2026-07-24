"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wrench, Briefcase, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function ServicePage() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
      }
      const { data: srvData } = await sb.from('services').select('*');
      if (srvData) setServices(srvData);
      setLd(false);
    }
    loadData();
  }, []);

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Service Terminal...</div>;

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Fleet & Field Services</h1>
          <p style={{ fontSize: '12px', color: '#4a7ab5', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | MAINTENANCE DOCKET</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #4a7ab5', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Dashboard
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {services.length === 0 ? (
          <div style={{ color: '#888', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <Briefcase size={40} style={{ margin: '0 auto 10px', color: '#4a7ab5' }} />
            <p>No active service orders found in the registry.</p>
          </div>
        ) : (
          services.map((s, index) => (
            <div key={index} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Wrench size={20} color="#22c55e" />
                <h3 style={{ margin: 0, fontSize: '18px' }}>{s.title || 'Service Order'}</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#aaa', margin: '5px 0' }}>{s.description || 'No details provided.'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
