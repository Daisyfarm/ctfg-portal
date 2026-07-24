"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Gavel, Clock, DollarSign, Tag, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function AuctionsPage() {
  const [u, setU] = useState<any>(null);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', starting_bid: '' });
  const [bidAmounts, setBidAmounts] = useState<{ [key: string]: string }>({});

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: auctionData } = await sb
      .from('auctions')
      .select('*, seller:profiles!auctions_seller_id_fkey(username)')
      .order('created_at', { ascending: false });

    setAuctions(auctionData || []);
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createAuction = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('auctions').insert([{
      seller_id: u.id,
      title: form.title,
      description: form.description,
      starting_bid: parseFloat(form.starting_bid),
      current_bid: parseFloat(form.starting_bid),
      status: 'active'
    }]);

    if (!error) {
      alert("Auction listing successfully created.");
      setShowCreate(false);
      setForm({ title: '', description: '', starting_bid: '' });
      load();
    } else {
      alert("Error publishing auction item.");
    }
  };

  const placeBid = async (auctionId: string, currentHighest: number) => {
    const bidVal = parseFloat(bidAmounts[auctionId] || '0');
    if (bidVal <= currentHighest) {
      return alert("Bid must be higher than the current bid amount.");
    }
    if (!u || u.balance < bidVal) {
      return alert("Insufficient funds in account balance to place this bid.");
    }

    const { error } = await sb
      .from('auctions')
      .update({ current_bid: bidVal, highest_bidder_id: u.id })
      .eq('id', auctionId);

    if (!error) {
      alert("Bid placed successfully.");
      load();
    } else {
      alert("Error processing bid.");
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Live Auction Floor...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>OPERATOR BALANCE: ${u.balance?.toLocaleString()}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/auctions'}><Gavel size={16}/> Live Auctions</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Live Auctions</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              BID ON EXCLUSIVE EQUIPMENT, ASSETS, AND SURPLUS GOODS LISTED BY MEMBERS OF THE IRON DAISY AGRI NETWORK.
            </p>

            <button onClick={()=>setShowCreate(!showCreate)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showCreate ? 'CANCEL LISTING' : 'LIST ITEM FOR AUCTION'}
            </button>

            {showCreate && (
              <form onSubmit={createAuction} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>New Auction Listing</h3>
                <input placeholder="Item Title (e.g. John Deere 8R Tractor)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <textarea placeholder="Description & Condition..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <input type="number" placeholder="Starting Bid ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.starting_bid} onChange={e=>setForm({...form, starting_bid: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>PUBLISH LISTING</button>
              </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              {auctions.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <Gavel size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active auctions running right now.</p>
                </div>
              ) : (
                auctions.map(a => (
                  <div key={a.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{flex:1}}>
                      <h3 style={{margin:'0 0 5px 0', fontSize:'20px'}}>{a.title}</h3>
                      <p style={{margin:'0 0 10px 0', fontSize:'12px', color:'#aaa'}}>Listed by: <b>{a.seller?.username || 'Unknown'}</b></p>
                      <p style={{margin:'0 0 15px 0', fontSize:'13px', color:'#ccc', fontStyle:'italic'}}>"{a.description}"</p>
                      <div style={{display:'flex', gap:'20px', fontSize:'14px'}}>
                        <span style={{color:'#22c55e', fontWeight:'bold'}}>Current Bid: ${a.current_bid?.toLocaleString()}</span>
                        <span style={{color:'#888'}}>Starting: ${a.starting_bid?.toLocaleString()}</span>
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:'flex-end'}}>
                      <span style={{fontSize:'10px', fontWeight:'bold', background:'#22c55e', color:'#fff', padding:'3px 6px', borderRadius:'3px'}}>{a.status.toUpperCase()}</span>
                      {a.seller_id !== u.id && (
                        <div style={{display:'flex', gap:'5px', marginTop:'10px'}}>
                          <input 
                            type="number" 
                            placeholder="Enter Bid" 
                            style={{width:'100px', padding:'8px', background:'#111', color:'#fff', border:'1px solid #333', fontSize:'12px'}}
                            value={bidAmounts[a.id] || ''}
                            onChange={e=>setBidAmounts({...bidAmounts, [a.id]: e.target.value})}
                          />
                          <button onClick={()=>placeBid(a.id, a.current_bid)} style={{padding:'8px 15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px'}}>
                            BID
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
