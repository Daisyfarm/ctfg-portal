"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function LandPage() {
  const [land, setLand] = useState<any[]>([]);
  const [bal, setBal] = useState(0);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    const { data: p } = await sb.from('profiles').select('balance').eq('id', user?.id).single();
    if (p) setBal(p.balance);
    const { data: l } = await sb.from('land_registry').select('*, profiles(username)').order('field_number');
    setLand(l || []);
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <button onClick={()=>window.location.href='/dashboard'}>Back</button>
      <h2 style={{color:'#22c55e'}}>Montana Land Registry</h2>
      <p>Balance: ${bal.toLocaleString()}</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:'20px' }}>
        {land.map(f => (
          <div key={f.id} style={{ background:'#131926', borderRadius:'15px', overflow:'hidden', border:'1px solid #333' }}>
            {/* THIS SHOWS THE PICTURE */}
            <img src={f.image_url || 'https://via.placeholder.com/300x150?text=No+Preview'} style={{ width:'100%', height:'150px', objectFit:'cover' }} />
            
            <div style={{ padding:'15px' }}>
              <h3 style={{ margin:0 }}>Field {f.field_number}</h3>
              <p style={{ margin:'5px 0', fontSize:'13px', color:'#94a3b8' }}>{f.acres} Acres</p>
              <p style={{ fontWeight:'bold', color:'#22c55e' }}>${f.price?.toLocaleString()}</p>
              {f.owner_id ? <p style={{fontSize:'12px'}}>Owned by: {f.profiles?.username}</p> : <button style={{width:'100%', background:'#22c55e', color:'#fff', border:'none', padding:'8px', borderRadius:'5px'}}>Buy Field</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
