"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { BookOpen, ShieldAlert, CheckSquare, Info, Award, FileText } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function RulesPage() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Accessing Corporate Governance Terminal...</div>;

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
          <button style={{...sideBtn, background:'#333', color:'#fff'}} onClick={()=>window.location.href='/rules'}><BookOpen size={16}/> Corporate Rules & Charter</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, background:'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600")', backgroundSize:'cover', position:'relative', overflowY:'auto' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)' }}></div>
          <div style={{ position:'relative', zIndex:1, padding:'40px', maxWidth:'1000px', margin:'0 auto' }}>
            
            <h1 style={{fontSize:'36px', textTransform:'uppercase', margin:0}}>Corporate Rules & Charter</h1>
            <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'10px 0 30px'}}>
              OPERATIONAL GUIDELINES, COMPLIANCE PROTOCOLS, AND CODE OF CONDUCT FOR ALL IRON DAISY AGRI PERSONNEL.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              
              <div style={{ background:'rgba(35,35,35,0.95)', padding:'30px', borderLeft:'6px solid #22c55e', borderRadius:'4px' }}>
                <h3 style={{margin:'0 0 10px 0', fontSize:'20px', color:'#22c55e', display:'flex', alignItems:'center', gap:'10px'}}>
                  <CheckSquare size={20}/> 1. Professional Conduct & Operations
                </h3>
                <p style={{margin:0, fontSize:'14px', color:'#ddd', lineHeight:'1.6'}}>
                  All registered operators are expected to maintain professional integrity when managing agricultural assets, executing logistics routes, and interacting through the commodities marketplace. Exploiting financial glitches, manipulating audit logs, or engaging in unauthorized asset transfers will result in immediate termination of corporate clearance.
                </p>
              </div>

              <div style={{ background:'rgba(35,35,35,0.95)', padding:'30px', borderLeft:'6px solid #f59e0b', borderRadius:'4px' }}>
                <h3 style={{margin:'0 0 10px 0', fontSize:'20px', color:'#f59e0b', display:'flex', alignItems:'center', gap:'10px'}}>
                  <ShieldAlert size={20}/> 2. Financial & Credit Compliance
                </h3>
                <p style={{margin:0, fontSize:'14px', color:'#ddd', lineHeight:'1.6'}}>
                  Corporate loans and credit lines must be accounted for accurately through the financial terminal. Operators borrowing against capital must ensure timely restructuring or repayment to maintain healthy credit standing within the network bureau.
                </p>
              </div>

              <div style={{ background:'rgba(35,35,35,0.95)', padding:'30px', borderLeft:'6px solid #4a7ab5', borderRadius:'4px' }}>
                <h3 style={{margin:'0 0 10px 0', fontSize:'20px', color:'#4a7ab5', display:'flex', alignItems:'center', gap:'10px'}}>
                  <FileText size={20}/> 3. Permitting & Regulatory Standards
                </h3>
                <p style={{margin:0, fontSize:'14px', color:'#ddd', lineHeight:'1.6'}}>
                  Large-scale land development, water usage rights, and heavy transport operations require active permits filed via the Regulatory Permits terminal. Operating without valid clearance may incur corporate fines or suspension of equipment dispatch privileges.
                </p>
              </div>

              <div style={{ background:'rgba(35,35,35,0.95)', padding:'30px', borderLeft:'6px solid #ef4444', borderRadius:'4px' }}>
                <h3 style={{margin:'0 0 10px 0', fontSize:'20px', color:'#ef4444', display:'flex', alignItems:'center', gap:'10px'}}>
                  <Award size={20}/> 4. Executive Directive Authority
                </h3>
                <p style={{margin:0, fontSize:'14px', color:'#ddd', lineHeight:'1.6'}}>
                  The Executive Directorate reserves the right to amend corporate bylaws, adjust commodity baseline values, and audit network logs at any time. All broadcasts and press releases issued through official channels are legally binding across regional sectors.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
