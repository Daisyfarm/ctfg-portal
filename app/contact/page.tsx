"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Mail, MessageSquare, Send, PhoneCall, Globe, Shield } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ContactPage() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);
  const [form, setForm] = useState({ subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const senderName = u ? u.username : 'Anonymous Operative';

      // Send dispatch via Discord Webhook
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📬 **INCOMING EXECUTIVE DISPATCH**\n**Sender:** ${senderName}\n**Subject:** ${form.subject}\n**Message:** ${form.message}\n*Transmitted via Iron Daisy Agri Contact Portal.*`
        })
      });

      setSubmitted(true);
    } catch (err: any) {
      alert("Error transmitting dispatch: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (ld) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Secure Communications Terminal...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href=u ? '/dashboard' : '/'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>SECURE DISPATCH LINE</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {u && (
          {/* SIDEBAR FOR LOGGED-IN USERS */}
          <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
            <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
            <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
            <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/contact'}><Mail size={16}/> Contact Board</button>
            <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.75)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'800px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Executive Contact Portal</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              TRANSMIT SECURE INQUIRIES, PARTNERSHIP PROPOSALS, OR DIRECT COMMUNICATIONS TO THE IRON DAISY AGRI BOARD OF DIRECTORS.
            </p>

            <div style={{ background:'rgba(25,25,25,0.95)', padding:'35px', border:'1px solid #4a7ab5', borderRadius:'6px', boxShadow:'0 10px 30px rgba(0,0,0,0.6)' }}>
              {submitted ? (
                <div style={{ textAlign:'center', padding:'30px 0' }}>
                  <h3 style={{ color:'#22c55e', fontSize:'24px' }}>DISPATCH TRANSMITTED SUCCESSFULLY</h3>
                  <p style={{ color:'#ccc', fontSize:'14px', marginTop:'10px' }}>Your message has been securely relayed to the executive communication relay. Stand by for response.</p>
                  <button onClick={()=>window.location.href=u ? '/dashboard' : '/'} style={{ marginTop:'20px', padding:'12px 25px', background:'#4a7ab5', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px' }}>
                    Return to Portal
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
                  <div>
                    <label style={{ display:'block', fontSize:'12px', fontWeight:'bold', marginBottom:'8px', color:'#ddd' }}>Subject / Inquiry Title *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Partnership Proposal / Operations Inquiry" 
                      style={{ width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'4px' }}
                      value={form.subject}
                      onChange={e=>setForm({...form, subject: e.target.value})}
                    />
                  </div>

                  <div>
                    <label style={{ display:'block', fontSize:'12px', fontWeight:'bold', marginBottom:'8px', color:'#ddd' }}>Message / Dispatch Body *</label>
                    <textarea 
                      required 
                      placeholder="State your communication details clearly..." 
                      style={{ width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'4px', minHeight:'140px' }}
                      value={form.message}
                      onChange={e=>setForm({...form, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    style={{ padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'4px', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}
                  >
                    <Send size={16} /> {submitting ? 'TRANSMITTING DISPATCH...' : 'SEND EXECUTIVE DISPATCH'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
