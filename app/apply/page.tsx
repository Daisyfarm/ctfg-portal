"use client";
import { useState } from 'react';
import { supabase } from '../../db/supabase';

const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function ApplyPage() {
  const [form, setForm] = useState({ discordName: '', experience: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Insert application into Supabase database
      const { error } = await supabase.from('applications').insert([
        {
          discord_name: form.discordName,
          experience: form.experience,
          reason: form.reason,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      // Send alert via Discord Webhook
      await fetch(HK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **NEW RECRUITMENT APPLICATION**\n**Discord Name:** ${form.discordName}\n**Experience:** ${form.experience}\n*Check the Iron Daisy Agri executive suite portal to review.*`
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
    <div style={{ background: '#111', minHeight: '100vh', color: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* TOP BAR */}
      <div style={{ background: '#222', padding: '12px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #4a7ab5' }}>
        <span onClick={() => window.location.href='/'} style={{ color: '#22c55e', fontWeight: '900', fontSize: '20px', fontStyle: 'italic', cursor: 'pointer' }}>IRON DAISY AGRI</span>
        <span style={{ color: '#fff', fontSize: '11px', textTransform: 'uppercase' }}>Recruitment Portal</span>
      </div>

      <div style={{ flex: 1, background: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize: 'cover', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, background: 'rgba(25,25,25,0.95)', padding: '40px', border: '1px solid #4a7ab5', borderRadius: '6px', maxWidth: '600px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
          <h1 style={{ fontSize: '28px', textTransform: 'uppercase', margin: '0 0 10px 0', color: '#fff' }}>IDA Recruitment Form</h1>
          <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 25px 0' }}>
            You are now applying to join the Iron Daisy Agri network. Fill out the fields below to submit your evaluation to the Board of Directors.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <h3 style={{ color: '#22c55e', fontSize: '22px' }}>APPLICATION SUBMITTED</h3>
              <p style={{ color: '#ccc', fontSize: '14px', marginTop: '10px' }}>Your records have been transmitted to the board. Stand by for review.</p>
              <button onClick={() => window.location.href='/'} style={{ marginTop: '20px', padding: '10px 25px', background: '#4a7ab5', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>Return Home</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Discord Name / Handle *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Total" 
                  style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                  value={form.discordName}
                  onChange={e => setForm({ ...form, discordName: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Farming / Simulation Experience *</label>
                <textarea 
                  required 
                  placeholder="Briefly describe your background with Farm Sim / multiplayer operations..." 
                  style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', minHeight: '90px' }}
                  value={form.experience}
                  onChange={e => setForm({ ...form, experience: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#ddd' }}>Why Iron Daisy Agri? *</label>
                <textarea 
                  required 
                  placeholder="What brings you to our corporation?" 
                  style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: '1px solid #333', borderRadius: '4px', minHeight: '90px' }}
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                style={{ padding: '15px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', fontSize: '14px', transition: 'background 0.2s' }}
              >
                {submitting ? 'TRANSMITTING...' : 'SUBMIT APPLICATION'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
