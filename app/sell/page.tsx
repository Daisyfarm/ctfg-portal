"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Wheat } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function SellPage() {
  const [crops, setCrops] = useState<any[]>([]);
  const [sel, setSel] = useState<any>(null);
  const [amt, setAmt] = useState("");

  useEffect(() => {
    sb.from('market_prices').select('*').then(({data}) => setCrops(data || []));
  }, []);

  const handleSell = async (e: any) => {
    e.preventDefault();
    const { data: { user } } = await sb.auth.getUser();
    const { error } = await sb.rpc('sell_crops', { player_id: user?.id, crop_id: sel.id, amount_liters: parseInt(amt) });

    if (error) alert(error.message);
    else {
      const payout = Math.round((parseInt(amt)/1000)*sel.base_price);
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🌾 **GRAIN DELIVERY**\n**${user?.email}** sold **${amt}L** of **${sel.crop_name}** for **$${payout.toLocaleString()}**!` 
      })});
      alert("Sold! Money added to bank.");
      window.location.href = '/dashboard';
    }
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'400px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', color:'#94a3b8', border:'none', cursor:'pointer', marginBottom:'20px'}}>← Back</button>
        <h2 style={{color:'#22c55e'}}>Grain Elevator</h2>
        <form onSubmit={handleSell} style={{ background:'#131926', padding:'20px', borderRadius:'15px', display:'flex', flexDirection:'column', gap:'15px' }}>
          <select required onChange={(e) => setSel(crops.find(c => c.id === e.target.value))} style={{padding:'10px', background:'#0b0f1a', color:'#fff', borderRadius:'8px'}}>
            <option value="">-- Select Crop --</option>
            {crops.map(c => <option key={c.id} value={c.id}>{c.crop_name} (${c.base_price})</option>)}
          </select>
          <input type="number" placeholder="Liters (e.g. 50000)" required value={amt} onChange={e=>setAmt(e.target.value)} style={{padding:'10px', background:'#0b0f1a', color:'#fff', borderRadius:'8px', border:'1px solid #333'}} />
          <button type="submit" style={{padding:'15px', background:'#22c55e', border:'none', borderRadius:'10px', fontWeight:'bold', color:'#fff', cursor:'pointer'}}>Sell to CTFG Elevator</button>
        </form>
      </div>
    </div>
  );
}
