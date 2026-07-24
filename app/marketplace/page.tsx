"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Tag, DollarSign, Package, PlusCircle, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function MarketplacePage() {
  const [u, setU] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'crop', price: '', description: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: marketData } = await sb
      .from('marketplace')
      .select('*, seller:profiles!marketplace_seller_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!marketData) {
      const { data: fallbackMarket } = await sb.from('marketplace').select('*').order('created_at', { ascending: false });
      setItems(fallbackMarket || []);
    } else {
      setItems(marketData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createListing = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const priceVal = parseFloat(form.price || '0');

    const { error } = await sb.from('marketplace').insert([{
      seller_id: u.id,
      title: form.title,
      category: form.category,
      price: priceVal,
      description: form.description,
      status: 'active'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🏷️ **MARKETPLACE LISTING CREATED**\n**Seller:** ${u.username}\n**Item:** ${form.title} (${form.category.toUpperCase()})\n**Price:** $${priceVal.toLocaleString()}`
        })
      });

      alert("Item successfully listed on the marketplace.");
      setShowForm(false);
      setForm({ title: '', category: 'crop', price: '', description: '' });
      load();
    } else {
      alert("Error listing item: " + error.message);
    }
  };

  const buyItem = async (item: any) => {
    if (!u) return;

    if (item.seller_id === u.id) {
      return alert("You cannot purchase your own marketplace listing.");
    }

    if (u.balance < item.price) {
      return alert(`Insufficient funds. This listing costs $${item.price?.toLocaleString()}.`);
    }

    // Deduct from buyer
    const newBuyerBalance = u.balance - item.price;
    await sb.from('profiles').update({ balance: newBuyerBalance }).eq('id', u.id);

    // Credit seller (fetch seller profile first or update directly)
    const { data: sellerProfile } = await sb.from('profiles').select('balance, username').eq('id', item.seller_id).single();
    if (sellerProfile) {
      await sb.from('profiles').update({ balance: (sellerProfile.balance || 0) + item.price }).eq('id', item.seller_id);
    }

    // Mark listing as sold
    await sb.from('marketplace').update({ status: 'sold' }).eq('id', item.id);

    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🛒 **MARKETPLACE TRANSACTION**\n**Buyer:** ${u.username}\n**Item:** ${item.title}\n**Cost:** $${item.price?.toLocaleString()} paid to seller.`
      })
    });

    alert(`Successfully purchased ${item.title} for $${item.price?.toLocaleString()}!`);
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Marketplace Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/marketplace'}><ShoppingCart size={16}/> Commodities Marketplace</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Commodities Marketplace</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              TRADE HARVESTED CROPS, SEEDS, FERTILIZER, AND MACHINERY DIRECTLY WITH OTHER NETWORK OPERATIVES.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL LISTING' : 'CREATE NEW MARKET LISTING'}
            </button>

            {showForm && (
              <form onSubmit={createListing} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Market Listing Form</h3>
                <input placeholder="Item Title (e.g. 50 Tons Premium Winter Wheat)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  <option value="crop">Harvested Crops & Grains</option>
                  <option value="machinery">Machinery & Parts</option>
                  <option value="supplies">Seeds & Fertilizer</option>
                  <option value="livestock">Livestock & Feed</option>
                </select>
                <input type="number" placeholder="Asking Price ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
                <textarea placeholder="Item description, quality specifications, pickup location..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'80px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>PUBLISH LISTING</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {items.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <ShoppingCart size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active marketplace listings available in the network.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:`6px solid ${item.status === 'sold' ? '#777' : '#22c55e'}`, borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{item.title}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{item.category?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>{item.description}</p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px'}}>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>Price: ${item.price?.toLocaleString()}</span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Seller: <b>{item.seller?.username || 'Authorized'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <span style={{fontSize:'10px', fontWeight:'bold', color: item.status === 'sold' ? '#ef4444' : '#22c55e'}}>
                        {item.status?.toUpperCase()}
                      </span>

                      {item.status !== 'sold' && item.seller_id !== u.id && (
                        <button onClick={()=>buyItem(item)} style={{padding:'8px 18px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', borderRadius:'4px'}}>
                          BUY NOW
                        </button>
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
