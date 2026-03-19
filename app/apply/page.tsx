"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FileText, Send, ArrowLeft, User, Clock, Tractor } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HOOK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Apply() {
  const [form, setForm] = useState({ age: '', exp: '', style: '', about: '' });
  const [sent, setSent] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    const { data: { user } } = await sb.auth.getUser();
    
    // 1. Save to Database
    await sb.from('applications').insert([{
      user_id: user?.id,
      discord_tag: user?.email, // Using email as a backup for the tag
      age: parseInt(form.age),
      experience: form.exp,
      specialty: form.style,
      about_me: form.about
    }]);

    // 2. Alert Discord
    await fetch(HOOK, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: `📑 **NEW MEMBERSHIP APPLICATION**\n**User:** ${user?.email}\n**Age:** ${form.age}\n**Exp:** ${form.exp}\n**Role:** ${form.style}\n**Bio:** ${form.about}\n*Review this in the Staff Portal!*`
      })
    });

    setSent(true);
  };

  if (sent) return <div style={{background:'#0b0f1a',color:'white',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
    <h2 style={{color:'#22c55e'}}>Application Sent!</h2>
    <p>Samuel will review your request. Check Discord for a DM soon.</p>
    <button onClick={()=>window.location.href='/dashboard'} style={{background:'#1e293b',color:'white',border:'none',padding:'10px 20px',borderRadius:'10px',marginTop:'20px',cursor:'pointer'}}>Back to Dashboard</button>
  </div>;

  return (
    <div style={{ background:'#0b0f1a', minHeight:'100vh', color:'white', fontFamily:'sans-serif', padding:'30px' }}>
      <div style={{ maxWidth:'500px', margin:'0 auto' }}>
        <button onClick={()=>window.location.href='/dashboard'} style={{background:'none',border:'none',color:'#94a3b8',display:'flex',alignItems:'center',gap:'5px',cursor:'pointer',marginBottom:'20px'}}><ArrowLeft size={16}/> Dashboard</button>
        <h1 style={{fontSize:'28px',fontWeight:'bold',marginBottom:'10px'}}>Apply to <span style={{color:'#22c55e'}}>CTFG Fleet</span></h1>
        <p style={{color:'#94a3b8',marginBottom:'30px'}}>Tell us why you want to farm on the Montana 4x map.</p>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'15px', background:'#131926', padding:'25px', borderRadius:'24px', border:'1px solid #1e293b' }}>
          <input placeholder="Your Age" type="number" required style={{padding:'12px',borderRadius:'10px',background:'#0b0f1a',border:'1px solid #334155',color:'white'}} onChange={e=>setForm({...form, age: e.target.value})}/>
          <select required style={{padding:'12px',borderRadius:'10px',background:'#0b0f1a',border:'1px solid #334155',color:'white'}} onChange={e=>setForm({...form, exp: e.target.value})}>
            <option value="">Farming Experience?</option>
            <option>New to FS25</option>
            <option>100+ Hours</option>
            <option>Veteran (FS13-FS22)</option>
          </select>
          <select required style={{padding:'12px',borderRadius:'10px',background:'#0b0f1a',border:'1px solid #334155',color:'white'}} onChange={e=>setForm({...form, style: e.target.value})}>
            <option value="">Preferred Role?</option>
            <option>Grain Cart/Logistics</option>
            <option>Combine Operator</option>
            <option>Plowing/Tillage</option>
            <option>Livestock Manager</option>
          </select>
          <textarea placeholder="Tell us about your playstyle..." required style={{padding:'12px',borderRadius:'10px',background:'#0b0f1a',border:'1px solid #334155',color:'white',minHeight:'100px'}} onChange={e=>setForm({...form, about: e.target.value})}></textarea>
          
          <button type="submit" style={{background:'#22c55e',color:'white',border:'none',padding:'15px',borderRadius:'12px',fontWeight:'bold',cursor:'pointer',fontSize:'16px'}}>Submit Application</button>
        </form>
      </div>
    </div>
  );
}
