"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CreditCard, Shield, CheckCircle, Zap, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function SubscriptionsPage() {
  const [u, setU] = useState<any>(null);
  const [subs, setSubs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ plan_name: 'Iron Executive Tier', tier: 'Enterprise', price: '5000', billing_cycle: 'Monthly' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: subData } = await sb
      .from('subscriptions')
      .select('*, subscriber:profiles!subscriptions_subscriber_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!subData) {
      const { data: fallbackSub } = await sb.from('subscriptions').select('*').order('created_at', { ascending: false });
      setSubs(fallbackSub || []);
    } else {
      setSubs(subData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const purchaseSubscription = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const priceVal = parseFloat(form.price || '0');

    if (u.balance < priceVal) {
      return alert(`Insufficient funds. This subscription tier requires $${priceVal.toLocaleString()}.`);
    }

    // Deduct balance
    const newBalance = u.balance - priceVal;
    await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

    const { error } = await sb.from('subscriptions').insert([{
      subscriber_id: u.id,
      plan_name: form.plan_name,
      tier: form.tier,
      price: priceVal,
      billing_cycle: form.billing_cycle,
      status: 'active'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `💳 **SUBSCRIPTION ACTIVATED**\n**Subscriber:** ${u.username}\n**Plan:** ${form.plan_name} (${form.tier})\n**Cost:** $${priceVal.toLocaleString()} (${form.billing_cycle})`
        })
      });

      alert(`Successfully subscribed to ${form.plan_name}!`);
      setShowForm(false);
      load();
    } else {
      alert("Error activating subscription: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Corporate Subscriptions Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/subscriptions'}><CreditCard size={16}/> Memberships & Subs</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Memberships & Subscriptions</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              MANAGE PREMIUM OPERATOR TIERS, NETWORK CLEARANCES, AND PRIORITY DISPATCH SUBSCRIPTIONS.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL SUBSCRIPTION' : 'ACQUIRE NEW MEMBERSHIP TIER'}
            </button>

            {showForm && (
              <form onSubmit={purchaseSubscription} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Membership Subscription Terminal</h3>
                <input placeholder="Plan Name (e.g. Iron Executive Tier)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.plan_name} onChange={e=>setForm({...form, plan_name: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.tier} onChange={e=>setForm({...form, tier: e.target.value})}>
                  <option value="Enterprise">Enterprise Executive Tier</option>
                  <option value="Operator Pro">Operator Pro Tier</option>
                  <option value="Fleet Priority">Fleet Priority Dispatch Tier</option>
                  <option value="Standard">Standard Operator Tier</option>
                </select>
                <input type="number" placeholder="Subscription Fee ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.price} onChange={e=>setForm({...form, price: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.billing_cycle} onChange={e=>setForm({...form, billing_cycle: e.target.value})}>
                  <option value="Monthly">Monthly Billing Cycle</option>
                  <option value="Quarterly">Quarterly Billing Cycle</option>
                  <option value="Annual">Annual Billing Cycle</option>
                </select>
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>CONFIRM & ACTIVATE SUBSCRIPTION</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {subs.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <CreditCard size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No active subscriptions registered in the database.</p>
                </div>
              ) : (
                subs.map(s => (
                  <div key={s.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #22c55e', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{s.plan_name}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#22c55e', fontWeight:'bold'}}>{s.tier?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>Billing Cycle: <b>{s.billing_cycle}</b></p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
                      <span style={{color:'#fff'}}>Fee: <b style={{color:'#22c55e'}}>${s.price?.toLocaleString()}</b></span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Subscriber: <b>{s.subscriber?.username || 'Authorized Operative'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Activated: {new Date(s.created_at || Date.now()).toLocaleDateString()}</span>
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
