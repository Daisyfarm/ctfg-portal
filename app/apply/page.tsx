"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileCheck, ArrowLeft, Send } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ApplyPage() {
  const [form, setForm] = useState({ name: '', discord: '', role: '', experience: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📝 **NEW OPERATIVE RECRUITMENT APPLICATION**\n**Name:** ${form.name}\n**Discord:** ${form.discord}\n**Desired Role:** ${form.role}\n**Experience:** ${form.experience}\n*Transmitted via Daisy Hill Farming Network.*`
        })
      });
      setSubmitted(true);
    } catch (err: any) {
      alert("Error submitting application: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #22c55e', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: 0, fontWeight: 900 }}>Operative Application Form</h1>
          <p style={{ fontSize: '12px', color: '#22c55e', margin: '5px 0 0' }}>DAISY HILL FARMING NETWORK | RECRUITMENT DIVISION</p>
        </div>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          style={{ background: '#222', color: '#fff', border: '1px solid #22c55e', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} /> Return to Dashboard
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '6px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <FileCheck size={48} color="#22c55e" style={{ margin: '0 auto 15px' }} />
            <h3 style={{ color: '#22c55e', fontSize: '22px' }}>APPLICATION SUBMITTED</h3>
            <p style={{ color: '#aaa', fontSize: '14px', marginTop: '10px' }}>Your recruitment credentials have been successfully transmitted to command.</p>
            <button onClick={() => window.location.href = '/dashboard'} style={{ marginTop: '20px', padding: '10px 20px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Operative / In-Game Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Farmer Sam" 
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Discord Handle *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. samuel#0001" 
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                value={form.discord}
                onChange={e => setForm({ ...form, discord: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Desired Role / Division *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Logistics Driver / Heavy Recovery Operator" 
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Experience & Background *</label>
              <textarea 
                required 
                placeholder="Summarize your experience with fleet operations, heavy hauling, etc..." 
                style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', minHeight: '120px' }}
                value={form.experience}
                onChange={e => setForm({ ...form, experience: e.target.value })}
              />
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ padding: '15px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Send size={16} /> {submitting ? 'TRANSMITTING...' : 'SUBMIT APPLICATION'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
