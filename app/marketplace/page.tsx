"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Marketplace() {
  const [items, setItems] = useState<any[]>([]);
  const [myId, setMyId] = useState("");

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    setMyId(user?.id || "");
    const { data } = await sb.from('fleet').select('*, profiles(username)').eq('is_for_sale', true);
    setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const buy = async (item: any) => {
    const { error } = await sb.rpc('buy_machinery', {
      buyer_id: myId,
      machinery_id: item.id,
      machinery_price: item.price,
      seller_id: item.owner_id
    });

    if (error) alert(error.message);
    else {
      alert("Purchase Successful! Check your fleet.");
      load();
    }
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'}>Back</button>
        <h2 style={{color:'#22c55e'}}>Used Equipment Market</h2>
        
        {items.length === 0 && <p>No equipment for sale right now.</p>}

        {items.map(i => (
          <div key={i.id} style={{ background:'#131926', padding:'20px', borderRadius:'15px', marginBottom:'15px', border:'1px solid #333' }}>
            <h3 style={{margin:0}}>{i.machinery_name}</h3>
            <p style={{color:'#22c55e', fontWeight:'bold', fontSize:'20px'}}>${i.price?.toLocaleString()}</p>
            <p style={{fontSize:'12px', color:'#94a3b8'}}>Seller: {i.profiles?.username}</p>
            {i.owner_id !== myId && (
              <button onClick={()=>buy(i)} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold', marginTop:'10px'}}>Buy Now</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
