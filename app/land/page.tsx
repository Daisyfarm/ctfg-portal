"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Map, Tractor, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function LandRegistry() {
  const [fields, setFields] = useState<any[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user?.id).single();
    if (profile) setBalance(profile.balance);

    const { data: land } = await supabase.from('land_registry').select('*, profiles(username)').order('field_number');
    setFields(land || []);
    setLoading(false);
  };

  const buyField = async (field: any) => {
    if (balance < field.price) {
      alert("Insufficient funds to purchase this field!");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    // 1. Deduct Money
    await supabase.from('profiles').update({ balance: balance - field.price }).eq('id', user?.id);
    
    // 2. Assign Owner
    await supabase.from('land_registry').update({ owner_id: user?.id }).eq('id', field.id);

    alert(`Congratulations! You now own Field ${field.field_number}`);
    fetchData();
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <button onClick={() => window.location.href = '/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px' }}><ArrowLeft size={18} /> Back</button>
        
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>CTFG <span style={{ color: '#22c55e' }}>Land Registry</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: '40px' }}>Your Balance: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${balance.toLocaleString()}</span></p>

        <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '20px' }}>
          {fields.map(field => (
            <div key={field.id} style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '20px' }}>Field {field.field_number}</h3>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{field.acres} Acres</span>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0' }}>${field.price.toLocaleString()}</p>
              
              {field.owner_id ? (
                <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>Owned by: {field.profiles?.username}</div>
              ) : (
                <button 
                  onClick={() => buyField(field)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#22c55e', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
