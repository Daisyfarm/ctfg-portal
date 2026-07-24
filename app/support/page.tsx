"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LifeBuoy, HelpCircle, MessageSquare, Send, CheckCircle, PlusCircle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function SupportPage() {
  const [u, setU] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: '', category: 'Technical Issue', priority: 'Normal', message: '' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: ticketData } = await sb
      .from('support_tickets')
      .select('*, creator:profiles!support_tickets_creator_id_fkey(username)')
      .order('created_at', { ascending: false });

    if (!ticketData) {
      const { data: fallbackTickets } = await sb.from('support_tickets').select('*').order('created_at', { ascending: false });
      setTickets(fallbackTickets || []);
    } else {
      setTickets(ticketData);
    }

    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createTicket = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('support_tickets').insert([{
      creator_id: u.id,
      subject: form.subject,
      category: form.category,
      priority: form.priority,
      message: form.message,
      status: 'open'
    }]);

    if (!error) {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🎧 **SUPPORT TICKET OPENED**\n**Operator:** ${u.username}\n**Subject:** ${form.subject} (${form.category})\n**Priority:** ${form.priority.toUpperCase()}\n\n${form.message}`
        })
      });

      alert("Support ticket successfully submitted to corporate dispatch.");
      setShowForm(false);
      setForm({ subject: '', category: 'Technical Issue', priority: 'Normal', message: '' });
      load();
    } else {
      alert("Error submitting ticket: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Support & Dispatch Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/support'}><LifeBuoy size={16}/> Support & Helpdesk</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1100px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Operator Support & Helpdesk</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              SUBMIT ASSISTANCE TICKETS, REPORT SYSTEM ANOMALIES, AND COMMUNICATE WITH CORPORATE DISPATCH.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL TICKET' : 'OPEN NEW SUPPORT TICKET'}
            </button>

            {showForm && (
              <form onSubmit={createTicket} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>Support Ticket Terminal</h3>
                <input placeholder="Ticket Subject / Summary" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.subject} onChange={e=>setForm({...form, subject: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  <option value="Technical Issue">Technical & System Issue</option>
                  <option value="Financial Inquiry">Financial & Ledger Inquiry</option>
                  <option value="Logistics & Equipment">Logistics & Equipment Dispatch</option>
                  <option value="General Support">General Support</option>
                </select>
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})}>
                  <option value="Normal">Normal Priority</option>
                  <option value="Urgent">Urgent Priority</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
                <textarea placeholder="Describe your issue or request in detail..." required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', minHeight:'100px'}} value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>SUBMIT SUPPORT TICKET</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
              {tickets.length === 0 ? (
                <div style={{ background:'rgba(35,35,35,0.9)', padding:'30px', textAlign:'center', borderRadius:'4px', color:'#777', gridColumn:'1 / -1' }}>
                  <LifeBuoy size={32} style={{marginBottom:'10px', opacity:0.5}} />
                  <p style={{margin:0}}>No support tickets found in the helpdesk database.</p>
                </div>
              ) : (
                tickets.map(t => (
                  <div key={t.id} style={{ background:'rgba(35,35,35,0.95)', padding:'25px', borderLeft:'6px solid #4a7ab5', borderRadius:'4px', display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <h3 style={{margin:0, fontSize:'18px'}}>{t.subject}</h3>
                      <span style={{fontSize:'10px', background:'#222', padding:'3px 8px', borderRadius:'3px', color:'#4a7ab5', fontWeight:'bold'}}>{t.category?.toUpperCase()}</span>
                    </div>

                    <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>{t.message}</p>

                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'13px'}}>
                      <span style={{color:'#fff'}}>Priority: <b style={{color:'#f59e0b'}}>{t.priority?.toUpperCase()}</b></span>
                      <span style={{color:'#aaa', fontSize:'12px'}}>Operative: <b>{t.creator?.username || 'Authorized Operative'}</b></span>
                    </div>

                    <div style={{borderTop:'1px solid #444', paddingTop:'10px', marginTop:'5px', display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#888'}}>
                      <span>Submitted: {new Date(t.created_at || Date.now()).toLocaleDateString()}</span>
                      <span style={{color:'#22c55e', fontWeight:'bold'}}>{t.status?.toUpperCase()}</span>
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
