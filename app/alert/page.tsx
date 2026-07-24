"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function AlertPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      const { data } = await sb.from('alerts').select('*');
      if (data) setAlerts(data);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ef4444', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Emergency Alerts & Broadcasts</h1>
          <p style={{ fontSize: '12px', color: '#ef4444', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | PRIORITY SECURITY CHANNEL</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #ef4444', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Scanning Emergency Frequencies...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {alerts.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333' }}>
              <AlertTriangle size={40} style={{ margin: '0 auto 10px', color: '#22c55e' }} />
              <p>All sectors secure. No active emergency alerts reported.</p>
            </div>
          ) : (
            alerts.map((a, index) => (
              <div key={index} style={{ background: '#1a1a1a', border: '1px solid #ef4444', padding: '20px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <AlertTriangle size={20} color="#ef4444" />
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{a.title || 'Emergency Broadcast'}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#aaa', margin: '8px 0' }}>{a.message || 'No additional details provided.'}</p>
                <div style={{ marginTop: '12px', fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>PRIORITY ALERT</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
