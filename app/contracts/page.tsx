"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileText, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContracts() {
      const { data } = await sb.from('contracts').select('*');
      if (data) setContracts(data);
      setLoading(false);
    }
    fetchContracts();
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Active Contracts Board</h1>
          <p style={{ fontSize: '12px', color: '#4a7ab5', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | OPERATIONS & LOGISTICS</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #4a7ab5', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Decrypting Field Contracts...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {contracts.length === 0 ? (
            <div style={{ color: '#888', gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '6px', border: '1px solid #333' }}>
              <FileText size={40} style={{ margin: '0 auto 10px', color: '#4a7ab5' }} />
              <p>No active logistics contracts in the queue. All sectors clear.</p>
            </div>
          ) : (
            contracts.map((c, index) => (
              <div key={index} style={{ background: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <FileText size={20} color="#f59e0b" />
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{c.title || 'Logistics Operation'}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#aaa', margin: '8px 0' }}>{c.description || 'No operational details logged.'}</p>
                <div style={{ marginTop: '12px', fontSize: '11px', color: '#22c55e', fontWeight: 'bold' }}>STATUS: ACTIVE DISPATCH</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
