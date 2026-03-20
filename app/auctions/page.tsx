"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Gavel, ArrowLeft, Landmark } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function AuctionHouse() {
  const [aucs, setAucs] = useState<any[]>([]);
  const [bid, setBid] = useState("");
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data } = await sb.from('auctions').select('*, profiles(username)').eq('is_active', true);
    setAucs(data || []); setLd(false);
  };
  useEffect(() => { load(); }, []);

  const placeBid = async (a: any) => {
    const amt = parseInt(bid);
    if (amt <= a.highest_bid) return alert("Bid higher!");
    const { data: { user } } = await sb.auth.getUser();
    const { data: p } = await sb.from('profiles').select('*').eq('id', user?.id).single();
    if (p.balance < amt) return alert("Insufficient funds!");

    await sb.from('auctions').update({ highest_bid: amt, highest_bidder_id: user?.id }).eq('id', a.id);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `🔨 **NEW HIGH BID!**\n**${p.username}** bid **$${amt.toLocaleString()}** on **Field ${a.field_number}**!` }) }).catch(()=>0);
    setBid(""); alert("Bid Placed!"); load();
  };

  if (ld) return <div style={{background:'#0b0f1a',color:'#fff',height:'100vh',padding:'20px'}}>Opening Auction Floor...</div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'#fff', padding:'20px', fontFamily:'sans-serif' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none',color:'#94a3b8',border:'none',cursor:'pointer',marginBottom:'20px'}}>← Back</button>
        <h2 style={{color:'#facc15'}}><Gavel style={{verticalAlign:'middle'}}/> CTFG Land Auctions</h2>
        {aucs.length === 0 && <p style={{color:'#475569'}}>No active auctions.</p>}
        {aucs.map(a => (
          <div key={a.id} style={{ background:'#131926', padding:'20px', borderRadius:'20px', border:'1px solid #facc15', marginBottom:'15px' }}>
            <h3 style={{margin:0}}>Field {a.field_number}</h3>
            <p style={{fontSize:'12px', color:'#94a3b8'}}>High Bidder: {a.profiles?.username || 'None'}</p>
            <h2 style={{color:'#22c55e'}}>${a.highest_bid.toLocaleString()}</h2>
            <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
              <input type="number" placeholder="Enter Bid" value={bid} onChange={e=>setBid(e.target.value)} style={{flex:1, padding:'10px', borderRadius:'8px', background:'#000', color:'#fff', border:'1px solid #333'}} />
              <button onClick={()=>placeBid(a)} style={{background:'#facc15', color:'#000', border:'none', padding:'10px 20px', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>BID</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
