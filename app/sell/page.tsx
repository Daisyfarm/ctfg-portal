"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DollarSign, ShoppingBag, Package, ArrowRight, CheckCircle, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function SellPage() {
  const [u, setU] = useState<any>(null);
  const [sales, setSales] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ commodity: 'Wheat Harvest', tons: '', payout: '', buyer: 'Regional Grain Elevator' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: salesData } = await sb
      .from('sales')
      .select('*, seller:profiles!sales_seller_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!salesData) {
      const { data: fallbackSales } = await sb.from('sales').select('*').order('created_at', { ascending: false });
      setSales(fallbackSales || []);
    } else {
      setSales(salesData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const executeSale = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const tonsVal = parseFloat(form.tons || '0');
    const payoutVal = parseFloat(form.payout || '0');

    const { error } = await sb.from('sales').insert([{
      seller_id: u.id,
      commodity: form.commodity,
      tons: tonsVal,
      payout: payoutVal,
      buyer: form.buyer,
      status: 'completed'
    }]);

    if (!error) {
      // Credit operator balance
      const newBalance = (u.balance || 0) + payoutVal;
      await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `💰 **COMMODITY SALE EXECUTED**\n**Seller:** ${u.username}\n**Commodity:** ${form.commodity} (${tonsVal} Tons)\n**Buyer:** ${form.buyer}\n**Payout:** $${payoutVal.toLocaleString()}`
        })
      });

      alert(`Sale successful! $${payoutVal.toLocaleString()} credited to your balance.`);
      setShowForm(false);
      setForm({ commodity: 'Wheat Harvest', tons: '', payout: '', buyer: 'Regional Grain Elevator' });
      load();
    } else {
      alert("Error executing sale: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Direct Sales & Commodity Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/sell'}><ShoppingBag size={16}/> Direct Commodity Sales</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Direct Commodity Sales</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              OFFLOAD HARVESTED CROPS, GRAINS, AND AGRICULTURAL GOODS DIRECTLY TO BULK BUYERS FOR INSTANT LIQUIDITY.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL SALE' : 'EXECUTE NEW COMMODITY SALE'}
            </button>

            {showForm && (
              <form onSubmit={executeSale} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Commodity Sale Form</h3>
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.commodity} onChange={e=>setForm({...form, commodity: e.target.value})}>
                  <option value="Wheat Harvest">Wheat Harvest</option>
                  <option value="Corn Crop">Corn Crop</option>
                  <option value="Soybean Yield">Soybean Yield</option>
                  <option value="Barley & Oats">Barley & Oats</option>
                </select>
                <input type="number" placeholder="Quantity in Tons" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.tons} onChange={e=>setForm({...form, tons: e.target.value})} />
                <input type="number" placeholder="Total Payout ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.payout} onChange={e=>setForm({...form, payout: e.target.value})} />
                <input placeholder="Buyer Entity (e.g. Regional Grain Elevator)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.buyer} onChange={e=>setForm({...form, buyer: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>COMPLETE SALE & COLLECT FUNDS</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {sales.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <ShoppingBag size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No commodity sales recorded in the financial ledger.</p>
                </div>
              ) : (
                sales.map(s => (
                  <div key={s.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{s.commodity}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{s.tons} TONS</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>Sold To: <b>{s.buyer}</b></p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px'}}>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>Payout: +${s.payout?.toLocaleString()}</span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Seller: <b>{s.seller?.username || 'Authorized Operative'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>{new Date(s.created_at || Date.now()).toLocaleDateString()}</span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>{s.status?.toUpperCase()}</span>
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
