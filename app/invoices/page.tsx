"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileText, Plus, Home, ArrowLeft, Cloud, CheckCircle, XCircle, Send, Clock } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Invoices() {
  const [u, setU] = useState<any>(null);
  const [inbound, setInbound] = useState<any[]>([]);
  const [outbound, setOutbound] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ target: '', amt: '', desc: '' });
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
        const { data: prof } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(prof);
        const { data: inb } = await sb.from('invoices').select('*, profiles!invoices_sender_id_fkey(username)').eq('receiver_id', user.id).order('created_at', { ascending: false });
        const { data: out } = await sb.from('invoices').select('*, profiles!invoices_receiver_id_fkey(username)').eq('sender_id', user.id).order('created_at', { ascending: false });
        setInbound(inb || []); setOutbound(out || []);
    }
    setLd(false);
  };
  useEffect(() => { load(); }, []);

  const createInvoice = async (e: any) => {
    e.preventDefault();
    const { data: targetUser } = await sb.from('profiles').select('id').eq('username', form.target).single();
    if (!targetUser) return alert("Player not found!");
    
    await sb.from('invoices').insert([{ sender_id: u.id, receiver_id: targetUser.id, amount: parseInt(form.amt), description: form.desc }]);
    await fetch(HK, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ content: `🧾 **NEW INVOICE**\n**${u.username}** sent a bill for **$${parseInt(form.amt).toLocaleString()}** to **${form.target}**!` })});
    alert("Invoice Sent!"); setShowAdd(false); setForm({target:'', amt:'', desc:''}); load();
  };

  const pay = async (id: number) => {
    if (confirm("Authorize payment for this invoice?")) {
        const { error } = await sb.rpc('pay_invoice', { inv_id: id, p_id: u.id });
        if (error) alert(error.message); else { alert("Invoice Settled!"); load(); }
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Billing System...</div>;

  const tableHeader = { display:'flex', borderBottom:'1px solid #fff', padding:'10px', fontSize:'14px', fontWeight:'bold', textTransform:'uppercase' as const, color:'#ddd' };
  const tableRow = { display:'flex', alignItems:'center', padding:'15px 10px', background:'rgba(30,30,30,0.6)', borderBottom:'1px solid #222', marginBottom:'2px', fontSize:'14px' };

  return (
    <div style={{ background:'#222', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif' }}>
      {/* HEADER */}
      <div style={{ background:'#333', padding:'20px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'15px' }}>
            <h1 style={{ margin:0, fontSize:'28px' }}>Contracting Invoice System</h1>
            <div style={{ display:'flex', gap:'20px', marginLeft:'40px' }}>
                <span onClick={()=>window.location.href='/dashboard'} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#aaa'}}><Home size={18} color="#4a7ab5"/> INVOICES HOMEPAGE</span>
                <span onClick={()=>setShowAdd(!showAdd)} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#aaa'}}><Plus size={18} color="#4a7ab5"/> NEW INVOICE</span>
            </div>
        </div>
      </div>

      <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', minHeight:'100vh' }}>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
        <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
          
          <p style={{fontSize:'12px', color:'#ccc', marginBottom:'30px'}}>THIS IS THE CONTRACT INVOICE SYSTEM. YOU CAN VIEW ALL INBOUND AND OUTBOUND INVOICES HERE. YOU CAN MAKE A NEW INVOICE BY CLICKING THE BUTTON.</p>

          {showAdd && (
            <form onSubmit={createInvoice} style={{ background:'#333', padding:'20px', borderRadius:'4px', border:'1px solid #4a7ab5', marginBottom:'20px', display:'flex', gap:'10px' }}>
                <input placeholder="Recipient Username" value={form.target} onChange={e=>setForm({...form, target:e.target.value})} style={{flex:1, padding:'10px'}} required />
                <input placeholder="Amount $" type="number" value={form.amt} onChange={e=>setForm({...form, amt:e.target.value})} style={{flex:1, padding:'10px'}} required />
                <input placeholder="Description" value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} style={{flex:2, padding:'10px'}} required />
                <button type="submit" style={{background:'#4a7ab5', color:'#fff', border:'none', padding:'10px 20px', fontWeight:'bold', cursor:'pointer'}}>SEND</button>
            </form>
          )}

          {/* INBOUND */}
          <h3 style={{textTransform:'uppercase', fontSize:'16px'}}>Inbound Invoices</h3>
          <div style={tableHeader}>
            <div style={{width:'150px'}}>Invoice ID</div>
            <div style={{width:'250px'}}>Sent By</div>
            <div style={{width:'150px'}}>Amount</div>
            <div style={{width:'150px'}}>Status</div>
            <div style={{flex:1, textAlign:'right'}}>Options</div>
          </div>
          {inbound.map(i => (
            <div key={i.id} style={tableRow}>
                <div style={{width:'150px'}}>{1000 + i.id}</div>
                <div style={{width:'250px'}}>{i.profiles?.username}</div>
                <div style={{width:'150px'}}>${i.amount.toLocaleString()}</div>
                <div style={{width:'150px', color: i.status === 'PAID' ? '#22c55e' : '#f59e0b'}}>{i.status}</div>
                <div style={{flex:1, textAlign:'right'}}>
                    {i.status === 'PENDING' && <button onClick={()=>pay(i.id)} style={{background:'#4a7ab5', color:'#fff', border:'none', padding:'5px 20px', fontWeight:'bold', cursor:'pointer', borderRadius:'2px'}}>PAY INVOICE</button>}
                </div>
            </div>
          ))}

          {/* OUTBOUND */}
          <h3 style={{textTransform:'uppercase', fontSize:'16px', marginTop:'40px'}}>Outbound Invoices</h3>
          <div style={tableHeader}>
            <div style={{width:'150px'}}>Invoice ID</div>
            <div style={{width:'250px'}}>Sent To</div>
            <div style={{width:'150px'}}>Amount</div>
            <div style={{width:'150px'}}>Status</div>
            <div style={{flex:1, textAlign:'right'}}>Options</div>
          </div>
          {outbound.map(i => (
            <div key={i.id} style={tableRow}>
                <div style={{width:'150px'}}>{1000 + i.id}</div>
                <div style={{width:'250px'}}>{i.profiles?.username}</div>
                <div style={{width:'150px'}}>${i.amount.toLocaleString()}</div>
                <div style={{width:'150px', color: i.status === 'PAID' ? '#22c55e' : '#f59e0b'}}>{i.status}</div>
                <div style={{flex:1, textAlign:'right'}}>
                    <span style={{fontSize:'12px', color:'#555'}}>VIEW DETAILS</span>
                </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
