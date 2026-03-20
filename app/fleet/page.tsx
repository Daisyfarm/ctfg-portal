"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor, ArrowLeft, Plus } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Fleet() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Tractor");

  const load = async () => {
    const { data } = await sb.from('fleet').select('*, profiles(username)');
    setList(data || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    const { data: { user } } = await sb.auth.getUser();
    await sb.from('fleet').insert([{ owner_id: user?.id, machinery_name: name, category: cat }]);
    setName(""); load();
    alert("Equipment Registered!");
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        <h2 style={{color:'#22c55e'}}><Tractor style={{verticalAlign:'middle'}}/> CTFG Fleet Registry</h2>
        
        <div style={{ background:'#131926', padding:'20px', borderRadius:'15px', marginBottom:'20px', border:'1px solid #1e293b' }}>
          <input placeholder="Equipment Name (e.g. JD 8R)" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:'10px', marginBottom:'10px', background:'#0b0f1a', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} />
          <select value={cat} onChange={e=>setCat(e.target.value)} style={{width:'100%', padding:'10px', marginBottom:'10px', background:'#0b0f1a', color:'#fff', border:'1px solid #333', borderRadius:'8px'}}>
            <option>Tractor</option><option>Harvester</option><option>Truck</option><option>Implement</option>
          </select>
          <button onClick={add} style={{width:'100%', padding:'12px', background:'#22c55e', border:'none', color:'#fff', fontWeight:'bold', borderRadius:'8px', cursor:'pointer'}}>Register Machinery</button>
        </div>

        {list.map(i => (
          <div key={i.id} style={{ background:'#131926', padding:'15px', borderRadius:'10px', marginBottom:'10px', border:'1px solid #1e293b', display:'flex', justifyContent:'space-between' }}>
            <div>
              <p style={{margin:0, fontWeight:'bold'}}>{i.machinery_name}</p>
              <p style={{margin:0, fontSize:'11px', color:'#94a3b8'}}>Owner: {i.profiles?.username}</p>
            </div>
            <span style={{fontSize:'10px', background:'#0b0f1a', padding:'4px 8px', borderRadius:'5px', alignSelf:'center'}}>{i.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
