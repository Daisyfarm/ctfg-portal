"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Truck, MapPin, PackageCheck, DollarSign, PlusCircle, CheckCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function LogisticsPage() {
  const [u, setU] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ destination: '', cargo_type: 'Grain Harvest', weight_tons: '', payout: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: shipData } = await sb
      .from('logistics')
      .select('*, driver:profiles!logistics_driver_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!shipData) {
      const { data: fallbackShip } = await sb.from('logistics').select('*').order('created_at', { ascending: false });
      setShipments(fallbackShip || []);
    } else {
      setShipments(shipData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createShipment = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const tons = parseFloat(form.weight_tons || '0');
    const reward = parseFloat(form.payout || '0');

    const { error } = await sb.from('logistics').insert([{
      driver_id: u.id,
      destination: form.destination,
      cargo_type: form.cargo_type,
      weight_tons: tons,
      payout: reward,
      status: 'in-transit'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚛 **LOGISTICS DISPATCH CREATED**\n**Driver/Dispatcher:** ${u.username}\n**Cargo:** ${form.cargo_type} (${tons} Tons)\n**Destination:** ${form.destination}\n**Contract Payout:** $${reward.toLocaleString()}`
        })
      });

      alert("Logistics shipment route successfully established.");
      setShowForm(false);
      setForm({ destination: '', cargo_type: 'Grain Harvest', weight_tons: '', payout: '' });
      load();
    } else {
      alert("Error creating logistics contract: " + error.message);
    }
  };

  const completeShipment = async (shipment: any) => {
    if (!u) return;

    const { error } = await sb
      .from('logistics')
      .update({ status: 'delivered' })
      .eq('id', shipment.id);

    if (error) return alert("Error updating shipment status.");

    const newBalance = (u.balance || 0) + shipment.payout;
    await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📦 **SHIPMENT DELIVERED**\nCargo shipment to **${shipment.destination}** delivered successfully! **$${shipment.payout?.toLocaleString()}** credited to operator.`
      })
    });

    alert(`Shipment delivered! $${shipment.payout?.toLocaleString()} credited.`);
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Logistics Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/logistics'}><Truck size={16}/> Fleet & Logistics</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Logistics & Supply Routes</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              COORDINATE HAULING CONTRACTS, TRUCK DELIVERIES, AND COMMODITY DISTRIBUTION ACROSS THE REGIONAL NETWORK.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL ROUTE' : 'DISPATCH NEW SHIPMENT ROUTE'}
            </button>

            {showForm && (
              <form onSubmit={createShipment} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>New Shipping Route Form</h3>
                <input placeholder="Destination Terminal / Facility" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.destination} onChange={e=>setForm({...form, destination: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.cargo_type} onChange={e=>setForm({...form, cargo_type: e.target.value})}>
                  <option value="Grain Harvest">Grain Harvest (Wheat/Corn)</option>
                  <option value="Agricultural Machinery">Heavy Machinery & Tractors</option>
                  <option value="Fertilizer & Seeds">Bulk Fertilizer & Seeds</option>
                  <option value="Livestock Feed">Livestock Feed & Silage</option>
                </select>
                <input type="number" placeholder="Weight in Tons" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.weight_tons} onChange={e=>setForm({...form, weight_tons: e.target.value})} />
                <input type="number" placeholder="Contract Payout ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.payout} onChange={e=>setForm({...form, payout: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>DISPATCH SHIPMENT</button>
              </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
              {shipments.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <Truck size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active logistics shipments found in the network.</p>
                </div>
              ) : (
                shipments.map(s => (
                  <div key={s.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderLeft:`6px solid ${s.status === 'delivered' ? '#22c55e' : '#f59e0b'}`, borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{flex:1}}>
                      <h3 style={{margin:'0 0 5px 0', fontSize:'20px'}}>Destination: {s.destination}</h3>
                      <p style={{margin:'0 0 10px 0', fontSize:'13px', color:'#ccc'}}>Cargo: {s.cargo_type} ({s.weight_tons} Tons)</p>
                      <div style={{display:'flex', gap:'20px', fontSize:'14px'}}>
                        <span style={{color:'#22c55e', fontWeight:'bold'}}>Payout: ${s.payout?.toLocaleString()}</span>
                        <span style={{color:'#aaa', fontSize:'12px'}}>Driver: <b>{s.driver?.username || 'Authorized'}</b></span>
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:'flex-end'}}>
                      <span style={{fontSize:'10px', fontWeight:'bold', background: s.status === 'delivered' ? '#22c55e' : '#f59e0b', color:'#000', padding:'3px 8px', borderRadius:'3px'}}>
                        {s.status?.toUpperCase()}
                      </span>

                      {s.status !== 'delivered' && (
                        <button onClick={()=>completeShipment(s)} style={{padding:'8px 15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', borderRadius:'4px', marginTop:'10px'}}>
                          MARK DELIVERED
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
