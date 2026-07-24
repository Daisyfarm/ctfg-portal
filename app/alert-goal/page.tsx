"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Bell, Target, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function AlertGoalPage() {
  const [u, setU] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [form, setForm] = useState({ title: '', target_amount: '', category: 'finance' });

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);

      const { data: userGoals } = await sb.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      setGoals(userGoals || []);

      const { data: userAlerts } = await sb.from('alerts').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      setAlerts(userAlerts || []);
    }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const createGoal = async (e: any) => {
    e.preventDefault();
    if (!u) return;

    const { error } = await sb.from('goals').insert([{
      user_id: u.id,
      title: form.title,
      target_amount: parseFloat(form.target_amount),
      current_amount: 0,
      category: form.category,
      status: 'active'
    }]);

    if (!error) {
      alert("Goal established successfully.");
      setShowForm(false);
      setForm({ title: '', target_amount: '', category: 'finance' });
      load();
    } else {
      alert("Error creating goal.");
    }
  };

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Alerts & Goals Registry...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#aaa', border:'none', marginBottom:'8px', textAlign:'left' as const, cursor:'pointer', fontWeight:'bold', fontSize:'12px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>OPERATIVE: {u.username || 'Authorized'}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'240px', background:'#222', padding:'20px', borderRight:'1px solid #000' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/alert-goal'}><Target size={16}/> Alerts & Goals</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Alerts & Goals</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              TRACK FINANCIAL OBJECTIVES, OPERATIONAL TARGETS, AND SYSTEM ALERTS FOR YOUR IRON DAISY AGRI ENTERPRISE.
            </p>

            <button onClick={()=>setShowForm(!showForm)} style={{ background:'#4a7ab5', border:'none', color:'#fff', padding:'10px 25px', fontWeight:'bold', cursor:'pointer', marginBottom:'30px', borderRadius:'2px' }}>
              {showForm ? 'CANCEL GOAL SETUP' : 'SET NEW GOAL'}
            </button>

            {showForm && (
              <form onSubmit={createGoal} style={{ background:'rgba(25,25,25,0.95)', padding:'30px', border:'1px solid #4a7ab5', borderRadius:'4px', marginBottom:'30px', display:'flex', flexDirection:'column', gap:'15px' }}>
                <h3 style={{marginTop:0}}>New Operational Goal</h3>
                <input placeholder="Goal Title (e.g. Save $50,000 for Fleet Upgrade)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
                <input type="number" placeholder="Target Amount ($)" required style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.target_amount} onChange={e=>setForm({...form, target_amount: e.target.value})} />
                <select style={{padding:'12px', background:'#111', color:'#fff', border:'1px solid #333'}} value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
                  <option value="finance">Finance / Cash</option>
                  <option value="fleet">Fleet Assets</option>
                  <option value="land">Land Acquisition</option>
                </select>
                <button type="submit" style={{padding:'15px', background:'#22c55e', color:'#fff', border:'none', fontWeight:'bold', cursor:'pointer'}}>ESTABLISH GOAL</button>
              </form>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'30px' }}>
              {/* GOALS SECTION */}
              <div>
                <h2 style={{ fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px' }}>Active Goals</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                  {goals.length === 0 ? (
                    <p style={{color:'#666', fontSize:'13px'}}>No goals set at this time.</p>
                  ) : (
                    goals.map(g => (
                      <div key={g.id} style={{ background:'rgba(40,40,40,0.9)', padding:'20px', borderLeft:'6px solid #22c55e', borderRadius:'4px' }}>
                        <h4 style={{margin:'0 0 5px 0', fontSize:'16px'}}>{g.title}</h4>
                        <p style={{margin:0, fontSize:'13px', color:'#ccc'}}>Target: ${g.target_amount?.toLocaleString()}</p>
                        <p style={{margin:'5px 0 0 0', fontSize:'11px', color:'#22c55e', fontWeight:'bold'}}>Status: {g.status.toUpperCase()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* ALERTS SECTION */}
              <div>
                <h2 style={{ fontSize:'22px', borderBottom:'1px solid #444', paddingBottom:'10px', marginBottom:'20px' }}>System Alerts</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                  {alerts.length === 0 ? (
                    <p style={{color:'#666', fontSize:'13px'}}>No unread alerts.</p>
                  ) : (
                    alerts.map(a => (
                      <div key={a.id} style={{ background:'rgba(40,40,40,0.9)', padding:'20px', borderLeft:'6px solid #f59e0b', borderRadius:'4px' }}>
                        <p style={{margin:0, fontSize:'13px', color:'#fff'}}>{a.message}</p>
                        <span style={{fontSize:'10px', color:'#aaa'}}>{new Date(a.created_at).toLocaleDateString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
