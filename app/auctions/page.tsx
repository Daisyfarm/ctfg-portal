"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Gavel, Cloud, LogOut, Briefcase, Map, TrendingUp, Tractor, Landmark, ChevronDown, ArrowLeft } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function AddAuction() {
  const [u, setU] = useState<any>(null);
  const [myFleet, setMyFleet] = useState<any[]>([]);
  const [w, setW] = useState("");
  const [ld, setLd] = useState(true);

  // Form State
  const [form, setForm] = useState({ fleet_id: '', hours: '', bid: '', length: '1 Day', details: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
        const { data: fleetData } = await sb.from('fleet').select('*').eq('owner_id', user.id);
        setMyFleet(fleetData || []);
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=-110.22&current=temperature_2m&temperature_unit=fahrenheit').then(r=>r.json()).then(d=>setW(Math.round(d.current.temperature_2m) + "°F")).catch(()=>0);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const selectedVeh = myFleet.find(v => v.id === form.fleet_id);
    
    const { error } = await sb.from('auctions').insert([{
      seller_id: u.id,
      fleet_id: form.fleet_id,
      highest_bid: parseInt(form.bid),
      hours: parseFloat(form.hours),
      duration: form.length,
      details: form.details,
      is_active: true
    }]);

    if (error) alert(error.message);
    else {
      await fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ 
        content: `🔨 **NEW EQUIPMENT AUCTION**\n**${u.username}** is auctioning a **${selectedVeh.machinery_name}**!\n💰 Starting Bid: **$${parseInt(form.bid).toLocaleString()}**\n⏳ Length: ${form.length}\n🚜 Hours: ${form.hours}` 
      })});
      alert("Auction Posted Successfully!");
      window.location.href = '/auctions';
    }
  };

  if (ld || !u) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;

  const sideBtn = { width:'100%', padding:'15px', background:'#5b84c1', color:'#fff', border:'none', marginBottom:'10px', textAlign:'center' as const, cursor:'pointer', fontWeight:'bold', fontSize:'13px', textTransform:'uppercase' as const };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', gap:'30px', alignItems:'center' }}>
          <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>CTFG NETWORK</span>
          <span style={{color:'#fff', fontSize:'11px'}}>WEATHER: {w}</span>
        </div>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <div style={{ width:'240px', background:'#333', padding:'20px' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/contracts'}>Field Work</button>
          <button style={sideBtn} onClick={()=>window.location.href='/land'}>Field Management</button>
          <button style={{...sideBtn, background:'#4a7ab5'}} onClick={()=>window.location.href='/auctions'}>Auctions</button>
          <button style={sideBtn} onClick={()=>window.location.href='/fleet'}>Equipment</button>
          <button style={{...sideBtn, background:'#555', marginTop:'20px'}} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <div style={{ background:'rgba(40,40,40,0.9)', padding:'35px', borderRadius:'2px' }}>
              <h1 style={{fontSize:'32px', margin:0, textTransform:'uppercase'}}>Add An Equipment Auction</h1>
              <p style={{fontSize:'13px', color:'#ccc', lineHeight:'1.8', margin:'20px 0'}}>
                IF YOU HAVE SOME EQUIPMENT THAT YOU ARE NO LONGER USING, BUT WOULD LIKE TO SEE BETTER RESALE VALUE THAN THE NPC STORE, YOU MAY CHOOSE TO PUT IT UP FOR AUCTION. PLEASE COMPLETE THE FOLLOWING STEPS BEFORE YOU POST THIS AUCTION.<br/><br/>
                1.) MOVE THE VEHICLE OR EQUIPMENT TO THE PARKING LOT OF THE MAINSTORE, PARK IT PROPERLY ALONG THE BACK OF THE LOT...<br/>
                2.) ONCE IT IS IN PLACE, ENSURE YOU HAVE THE PROPER INFORMATION GATHERED.<br/>
                3.) ONCE THE VEHICLE IS IN AUCTION YOU WILL NOT HAVE TO DO ANYTHING, DO NOT DELETE IT OR TRY TO MOVE IT.<br/>
                4.) AUCTIONS CANNOT BE STARTED ON EQUIPMENT WITH A MSRP UNDER 25,000 BUX. THESE MUST BE SOLD BACK TO NPC!
              </p>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                <div>
                  <label style={{fontSize:'12px', fontWeight:'bold', textTransform:'uppercase'}}>Equipment ID (In Your Equipment List)</label>
                  <select required style={{width:'100%', padding:'12px', background:'#eee', color:'#333', border:'none', marginTop:'5px'}} onChange={e=>setForm({...form, fleet_id: e.target.value})}>
                    <option value="">Select Equipment...</option>
                    {myFleet.map(v => <option key={v.id} value={v.id}>{v.machinery_name}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{fontSize:'12px', fontWeight:'bold', textTransform:'uppercase'}}>Hours on Equipment (Only in game hours)</label>
                  <input type="number" step="0.1" required style={{width:'100%', padding:'12px', background:'#eee', color:'#333', border:'none', marginTop:'5px'}} onChange={e=>setForm({...form, hours: e.target.value})} />
                </div>

                <div>
                  <label style={{fontSize:'12px', fontWeight:'bold', textTransform:'uppercase'}}>Starting Bid Amount (No commas or periods.)</label>
                  <input type="number" required style={{width:'100%', padding:'12px', background:'#eee', color:'#333', border:'none', marginTop:'5px'}} onChange={e=>setForm({...form, bid: e.target.value})} />
                </div>

                <div>
                  <label style={{fontSize:'12px', fontWeight:'bold', textTransform:'uppercase'}}>Auction Length</label>
                  <select style={{width:'100%', padding:'12px', background:'#eee', color:'#333', border:'none', marginTop:'5px'}} onChange={e=>setForm({...form, length: e.target.value})}>
                    <option>1 Day</option>
                    <option>2 Days</option>
                    <option>3 Days</option>
                  </select>
                </div>

                <div>
                  <label style={{fontSize:'12px', fontWeight:'bold', textTransform:'uppercase'}}>Details (Include any additional installed options, etc.)</label>
                  <textarea style={{width:'100%', padding:'12px', background:'#eee', color:'#333', border:'none', marginTop:'5px', minHeight:'150px'}} onChange={e=>setForm({...form, details: e.target.value})} />
                </div>

                <button type="submit" style={{background:'#4a7ab5', color:'#fff', border:'none', padding:'15px', fontWeight:'bold', cursor:'pointer', textTransform:'uppercase'}}>Post Auction</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
