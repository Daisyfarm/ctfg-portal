"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function FleetPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [myId, setMyId] = useState("");

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    setMyId(user?.id || "");
    const { data } = await sb.from('fleet').select('*, profiles(username)');
    setList(data || []);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    await sb.from('fleet').insert([{ owner_id: myId, machinery_name: name, category: 'Tractor' }]);
    setName(""); load(); alert("Registered!");
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <button onClick={()=>window.location.href='/dashboard'}>Back</button>
      <h2>Fleet</h2>
      <div style={{ background:'#131926', padding:'15px', borderRadius:'10px', marginBottom:'20px' }}>
        <input placeholder="Equipment Name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:'10px', marginBottom:'10px', background:'#000', color:'#fff'}} />
        <button onClick={add} style={{width:'100%', padding:'10px', background:'#22c55e', border:'none', color:'#fff'}}>Register</button>
      </div>
      {list.map(i => (
        <div key={i.id} style={{ background:'#131926', padding:'10px', borderRadius:'10px', marginBottom:'10px', border:'1px solid #333' }}>
          <p><b>{i.machinery_name}</b> - {i.profiles?.username}</p>
        </div>
      ))}
    </div>
  );
}
