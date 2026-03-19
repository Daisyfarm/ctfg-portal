"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Briefcase, CheckCircle, ArrowLeft, Clock, Tractor } from 'lucide-react';

const supabase = createClient(
  'https://dlwhztcqntalrhfrefsk.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY'
);

export default function JobBoard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => { 
    fetchData(); 
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setMyId(user?.id || null);

    const { data } = await supabase.from('contracts').select('*').order('created_at', { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };

  const claimJob = async (jobId: string) => {
    if (!myId) return;
    await supabase.from('contracts').update({ status: 'taken', assigned_to: myId }).eq('id', jobId);
    alert("Contract Signed! Get to work, farmer.");
    fetchData();
  };

  const finishJob = async (jobId: string) => {
    await supabase.from('contracts').update({ status: 'pending' }).eq('id', jobId);
    alert("Job submitted for review. Samuel will pay you once verified!");
    fetchData();
  };

  if (loading) return <div style={{backgroundColor:'#0b0f1a', color:'white', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>Loading Job Board...</div>;

  return (
    <div style={{ backgroundColor: '#0b0f1a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <button onClick={() => window.location.href='/dashboard'} style={{ background: 'none', border: 'none', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>CTFG <span style={{ color: '#22c55e' }}>Job Board</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Claim contracts and earn money for your farm.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {jobs.length === 0 && <p style={{color: '#475569'}}>No contracts available currently.</p>}
          
          {jobs.map(job => (
            <div key={job.id} style={{ backgroundColor: '#131926', padding: '25px', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <Briefcase size={16} color="#22c55e" />
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{job.title}</h3>
                </div>
                <p style={{ margin: 0, color: '#22c55e', fontWeight: 'bold', fontSize: '20px' }}>${job.payout.toLocaleString()}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                {job.status === 'available' && (
                  <button onClick={() => claimJob(job.id)} style={{ backgroundColor: '#22c55e', border: 'none', color: 'white', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Claim Job
                  </button>
                )}

                {job.status === 'taken' && job.assigned_to === myId && (
                  <button onClick={() => finishJob(job.id)} style={{ backgroundColor: '#f97316', border: 'none', color: 'white', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Mark Finished
                  </button>
                )}

                {job.status === 'taken' && job.assigned_to !== myId && (
                  <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: 'bold' }}>Occupied</span>
                )}

                {job.status === 'pending' && (
                  <div style={{ color: '#94a3b8', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={16} /> Reviewing...
                  </div>
                )}

                {job.status === 'completed' && (
                  <div style={{ color: '#22c55e', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <CheckCircle size={16} /> Paid
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
