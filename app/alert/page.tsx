import React from 'react';
import { supabase } from '../../db/supabase'; 

export default function AlertPage() {
  return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ border: '2px solid #F2C94C', padding: '40px', background: '#161b22', textAlign: 'center' }}>
        <h2 style={{ color: '#F2C94C', margin: 0 }}>IDA DISPATCH ALERT</h2>
        <p style={{ color: '#8b949e' }}>SYSTEM ACTIVE: Monitoring Montana Field Comms...</p>
      </div>
    </div>
  );
}
