"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, CheckCircle, ArrowLeft, Clock } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function Contracts() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    const { data } = await supabase.from('contracts').select('*').order('created_at', { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };

  const claimJob = async (jobId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('contracts').update({ status: 'taken', assigned_to: user?.id }).eq('id', jobId);
    alert("Job Claimed! Good luck in the fields.");
    fetchJobs();
  };

  const finishJob = async (jobId: string) => {
    await supabase.from('contracts').update({ status: 'pending' }).eq('id', jobId);
    alert("Submitted for verification. Samuel will pay you soon!");
    fetchJobs();
  };

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button onClick={() => window.location.href='/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginBottom: '20px' }}><ArrowLeft size={16}/> Dashboard</button>
        <h1 style={{ fontSize: '32px', marginBottom: '30px' }}>CTFG <span style={{ color: '#22c55e' }}>Job Board</span></h1>

        {jobs.map(job => (
          <div key={job.id} style={{ backgroundColor: '#131926', padding: '20px', borderRadius: '20px', border: '1px solid #1e293b', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{job.title}</h3>
              <p style={{ margin: 0, color: '#22c55e', fontWeight: 'bold' }}>Payout: ${job.payout.toLocaleString()}</p>
            </div>
            {job.status === 'available' && <button onClick={() => claimJob(job.id)} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Claim Job</button>}
            {job.status === 'taken' && <button onClick={() => finishJob(job.id)} style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Finish Job</button>}
            {job.status === 'pending' && <span style={{ color: '#94a3b8', fontSize: '14px' }}><Clock size={14}/> Pending Review</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
