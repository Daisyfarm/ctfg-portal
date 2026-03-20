"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Wheat, Coins } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function SellCrops() {
  const [crops, setCrops] = useState<any[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sb.from('market_prices').select('*').then(({data}) => setCrops(data || []));
  }, []);

  const handleSell = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await sb.auth.getUser();
    
    const { error } = await sb.rpc('sell_crops', {
      player_id: user?.id,
      crop_id: selectedCrop.id,
      amount_liters: parseInt(amount)
    });

    if (error) alert(error.message);
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
        content: `🌾 **GRAIN DELIVERY**\n**${user?.email}** delivered **${amount}L** of **${selectedCrop.crop_name}** and received **$${Math.round((parseInt(amount)/1000)*selectedCrop.base_price).toLocaleString()}**!`
      })});
      alert("Crops sold to Elevator!");
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'400px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', color:'#94a3b8', border:'none', cursor:'pointer', marginBottom:'20px'}}><ArrowLeft size={18}/> Back</button>
        <h2 style={{color:'#22c55e'}}>CTFG Grain Elevator</h2>
        
        <form onSubmit={handleSell} style={{ background:'#131926', padding:'20px', borderRadius:'20px', border:'1px solid #1e293b' }}>
          <label style={{fontSize:'12px', color:'#94a3b8'}}>Select Crop</label>
          <select required style={{width:'100%', padding:'10px', margin:'5px 0 15px', background:'#0b0f1a', color:'#fff', border:'1px solid #333'}} onChange={(e) => setSelectedCrop(crops.find(c => c.id === e.target.value))}>
            <option value="">-- Choose Crop --</option>
            {crops.map(c => <option key={c.id} value={c.id}>{c.crop_name} (${c.base_price}/1000L)</option>)}
          </select>

          <label style={{fontSize:'12px', color:'#94a3b8'}}>Amount in Liters (from Game)</label>
          <input type="number" placeholder="e.g. 50000" required style={{width:'100%', padding:'10px', margin:'5px 0 20px', background:'#0b0f1a', color:'#fff', border:'1px solid #333'}} value={amount} onChange={e=>setAmount(e.target.value)} />

          {selectedCrop && amount && (
            <div style={{ marginBottom:'20px', padding:'10px', background:'rgba(34,197,94,0.1)', borderRadius:'10px', textAlign:'center' }}>
              <p style={{margin:0, fontSize:'12px'}}>Estimated Payout:</p>
              <h3 style={{margin:0, color:'#22c55e'}}>${Math.round((parseInt(amount)/1000) * selectedCrop.base_price).toLocaleString()}</h3>
            </div>
          )}

          <button disabled={loading} type="submit" style={{width:'100%', padding:'15px', background:'#22c55e', color:'#fff', border:'none', borderRadius:'10px', fontWeight:'bold'}}>Complete Sale</button>
        </form>
      </div>
    </div>
  );
}
