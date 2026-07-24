"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Send } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function DispatchPage() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);
  const [form, setForm] = useState({ sector: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
      }
      setLd(false);
    }
    load();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const senderName = u ? u.username : 'Anonymous Dispatcher';
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **NEW FIELD DISPATCH REQUEST**\n**Operative:** ${senderName}\n**Sector:** ${form.sector}\n**Details:** ${form.description}\n*Transmitted via Daisy Hill Farming Network.*`
        })
      });
      setSubmitted(true);
    } catch (err: any) {
      alert("Error sending dispatch: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (ld) return <div style={{background:'#111',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Dispatch Terminal...</div>;

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Field Dispatch Request</h1>
          <p style={{ fontSize: '12px', color: '#4a7ab5', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | OPERATIONS COMMAND</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #4a7ab5', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '6px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h3 style={{ color: '#22c55e', fontSize: '22px' }}>DISPATCH TRANSMITTED</h3>
            <p style={{ color: '#aaa', fontSize: '14px', marginTop: '10px' }}>Your field request has been successfully broadcast to command.</p>
            <button onClick={() => window.location.href = '/dashboard'} style={{ marginTop: '20px', padding: '10px 20px', background: '#4a7ab5', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Sector / Location *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Sector 4-G / Drowned Foothills" 
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                value={form.sector}
                onChange={e => setForm({ ...form, sector: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Dispatch Details / Requirements *</label>
              <textarea 
                required 
                placeholder="Describe machinery needed, recovery status, or supplies..." 
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', minHeight: '120px' }}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ padding: '15px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Send size={16} /> {submitting ? 'BROADCASTING...' : 'TRANSMIT DISPATCH'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
