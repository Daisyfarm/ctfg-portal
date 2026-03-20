"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Marketplace() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await sb.from('fleet').select('*, profiles(username)').eq('is_for_sale', true);
      setItems(data || []);
    };
    load();
  }, []);

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        <h2 style={{color:'#f97316'}}><ShoppingCart style={{verticalAlign:'middle'}}/> Used Equipment Market</h2>
        
        {items.length === 0 ? <p style={{color:'#475569', textAlign:'center', marginTop:'50px'}}>No equipment currently for sale.</p> : items.map(i => (
          <div key={i.id} style={{ background:'#131926', padding:'20px', borderRadius:'15px', marginBottom:'15px', border:'1px solid #333' }}>
            <h3 style={{margin:0}}>{i.machinery_name}</h3>
            <p style={{color:'#22c55e', fontWeight:'bold', fontSize:'20px'}}>${i.price?.toLocaleString()}</p>
            <p style={{fontSize:'12px', color:'#94a3b8'}}>Seller: {i.profiles?.username}</p>
            <button style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold', marginTop:'10px', borderRadius:'8px'}}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
