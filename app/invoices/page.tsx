"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileSpreadsheet, DollarSign, PlusCircle, CheckCircle, Clock } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function InvoicesPage() {
  const [u, setU] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: '', amount: '', description: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: invData } = await sb
      .from('invoices')
      .select('*, issuer:profiles!invoices_issuer_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!invData) {
      const { data: fallbackInv } = await sb.from('invoices').select('*').order('created_at', { ascending: false });
      setInvoices(fallbackInv || []);
    } else {
      setInvoices(invData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createInvoice = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const amt = parseFloat(form.amount || '0');

    const { error } = await sb.from('invoices').insert([{
      issuer_id: u.id,
      client_name: form.client_name,
      amount: amt,
      description: form.description,
      status: 'pending'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📄 **CORPORATE INVOICE ISSUED**\n**Issuer:** ${u.username}\n**Client:** ${form.client_name}\n**Amount:** $${amt.toLocaleString()}\n**Description:** ${form.description}`
        })
      });

      alert("Invoice successfully generated and dispatched.");
      setShowForm(false);
      setForm({ client_name: '', amount: '', description: '' });
      load();
    } else {
      alert("Error generating invoice: " + error.message);
    }
  };

  const markPaid = async (invoice: any) => {
    if (!u) return;

    const { error } = await sb
      .from('invoices')
      .update({ status: 'paid' })
      .eq('id', invoice.id);

    if (error) return alert("Error updating invoice status.");

    const newBalance = (u.balance || 0) + invoice.amount;
    await sb.from('profiles').update({ balance: newBalance }).eq('id', u.id);

    await fetch(HK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `💰 **INVOICE SETTLED**\nInvoice for **$${invoice.amount?.toLocaleString()}** issued to **${invoice.client_name}** has been marked as **PAID**!`
      })
    });

    alert(`Invoice settled! $${invoice.amount?.toLocaleString()} credited.`);
    load();
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Invoicing Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/invoices'}><FileSpreadsheet size={16}/> Corporate Invoices</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Invoices</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              GENERATE AND TRACK BILLING INVOICES FOR AGRICULTURAL SUPPLY DELIVERIES, CONTRACT WORK, AND PARTNER SERVICES.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL INVOICE' : 'GENERATE NEW INVOICE'}
            </button>

            {showForm && (
              <form onSubmit={createInvoice} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>New Invoice Form</h3>
                <input placeholder="Client / Entity Name" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.client_name} onChange={e=>setForm({...form, client_name: e.target.value})} />
                <input type="number" placeholder="Invoice Amount ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} />
                <textarea placeholder="Description of Goods / Services Rendered..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'90px'}} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>DISPATCH INVOICE</button>
              </form>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
              {invoices.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777' }}>
                  <FileSpreadsheet size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No corporate invoices found in the system registry.</p>
                </div>
              ) : (
                invoices.map(inv => (
                  <div key={inv.id} style={{ background:'rgba(40,40,40,0.9)', padding:'25px', borderLeft:`6px solid ${inv.status === 'paid' ? '#22c55e' : '#f59e0b'}`, borderRadius:'4px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{flex:1}}>
                      <h3 style={{margin:'0 0 5px 0', fontSize:'20px'}}>Client: {inv.client_name}</h3>
                      <p style={{margin:'0 0 10px 0', fontSize:'13px', color:'#ccc'}}>{inv.description}</p>
                      <div style={{display:'flex', gap:'20px', fontSize:'14px'}}>
                        <span style={{color:'#22c55e', fontWeight:'bold'}}>Amount: ${inv.amount?.toLocaleString()}</span>
                        <span style={{color:'#aaa', fontSize:'12px'}}>Issuer: <b>{inv.issuer?.username || 'Authorized'}</b></span>
                      </div>
                    </div>

                    <div style={{display:'flex', flexDirection:'column', gap:'10px', alignItems:'flex-end'}}>
                      <span style={{fontSize:'10px', fontWeight:'bold', background: inv.status === 'paid' ? '#22c55e' : '#f59e0b', color:'#000', padding:'3px 8px', borderRadius:'3px'}}>
                        {inv.status?.toUpperCase()}
                      </span>

                      {inv.status !== 'paid' && (
                        <button onClick={()=>markPaid(inv)} style={{padding:'8px 15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', fontSize:'12px', borderRadius:'4px', marginTop:'10px'}}>
                          MARK PAID
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
