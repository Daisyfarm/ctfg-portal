"use client";
import { useEffect, useState } from 'react';
import { sb } from "../../../lib/supabase"; 
import { ShieldAlert, ArrowLeft, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function StaffAuthority() {
  const [reqs, setReqs] = useState<any[]>([]);
  const [ld, setLd] = useState(true);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // 1. Check if user is even logged in
        const { data: { user } } = await sb.auth.getUser();
        if (!user) {
          window.location.href = '/';
          return;
        }

        // 2. Check Admin Rank
        const { data: profile } = await sb.from('profiles')
          .select('rank')
          .eq('id', user.id)
          .single();

        if (!profile || profile.rank !== 'Admin') {
          window.location.href = '/dashboard';
          return;
        }

        // 3. Fetch Transactions
        const { data: txData, error: txError } = await sb.from('transactions')
          .select('*, profiles(username, balance)')
          .eq('status', 'pending');
        
        if (txError) throw txError;
        setReqs(txData || []);
      } catch (e) {
        console.error("Critical Page Error:", e);
        setAuthError(true);
      } finally {
        setLd(false);
      }
    }
    init();
  }, []);

  if (ld) return (
    <div style={{background:'#1c1c1c', color:'#d4af37', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <Loader2 className="animate-spin" size={24} />
      <span style={{marginLeft:'10px'}}>DAISY'S SECURE BOOT...</span>
    </div>
  );

  if (authError) return (
    <div style={{background:'#1c1c1c', color:'#f5f5dc', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'serif'}}>
      <h2 style={{color:'#800000'}}>SYSTEM LINK FAILURE</h2>
      <p>Could not connect to the Farm Network.</p>
      <button onClick={() => window.location.reload()} style={{padding:'10px 20px', background:'#d4af37', border:'none', cursor:'pointer'}}>REBOOT</button>
    </div>
  );

  return (
    <div style={{ background: '#1c1c1c', minHeight: '100vh', color: '#f5f5dc', padding: '40px', fontFamily: 'serif' }}>
      <button onClick={()=>window.location.href='/dashboard'} style={{background:'none', border:'none', color: '#555', cursor:'pointer', marginBottom:'20px', display:'flex', alignItems:'center', gap:'5px'}}>
        <ArrowLeft size={16}/> BACK TO HUB
      </button>

      <div style={{display:'flex', alignItems:'center', gap:'15px', borderBottom:'1px solid #d4af37', paddingBottom:'20px', marginBottom:'40px'}}>
        <ShieldAlert size={32} color="#d4af37"/>
        <div>
          <h1 style={{margin:0, letterSpacing:'2px', fontSize:'24px'}}>NETWORK AUTHORITY</h1>
          <p style={{margin:0, fontSize:'10px', color: '#d4af37'}}>OFFICIAL STAFF TERMINAL</p>
        </div>
      </div>

      {reqs.length === 0 ? (
        <div style={{textAlign:'center', marginTop:'50px', color:'#444'}}>
          <p>NO PENDING LOGS FOUND IN THE ARCHIVE.</p>
        </div>
      ) : (
        reqs.map((r: any) => (
          <div key={r.id} style={{ background: '#262626', padding: '20px', marginBottom: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', border: '1px solid #333', borderRadius:'4px' }}>
            <div>
              <p style={{margin:0, color: '#555', fontSize:'9px', letterSpacing:'1px'}}>OPERATOR</p>
              <p style={{fontSize:'16px', fontWeight:'bold', margin:0}}>{r.profiles?.username || "Unknown"}</p>
            </div>
            
            <div style={{textAlign: 'center'}}>
              <p style={{margin:0, color: '#555', fontSize:'9px', letterSpacing:'1px'}}>AMOUNT</p>
              <p style={{fontSize:'20px', fontWeight:'bold', color: '#d4af37', margin:0}}>${r.amount?.toLocaleString()}</p>
            </div>

            <div style={{display:'flex', gap:'10px'}}>
              <button style={{background: '#8da989', color: '#1c1c1c', padding:'8px 16px', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'2px'}}><CheckCircle size={14} style={{display:'inline', marginRight:'5px'}}/> APPROVE</button>
              <button style={{background: '#800000', color: '#fff', padding:'8px 16px', border:'none', fontWeight:'bold', cursor:'pointer', borderRadius:'2px'}}><XCircle size={14} style={{display:'inline', marginRight:'5px'}}/> DENY</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
