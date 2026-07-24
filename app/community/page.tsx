"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, MessageSquare, Send, LogOut } from 'lucide-react';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function CommunityPage() {
  const [u, setU] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [ld, setLd] = useState(true);

  const load = async () => {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
      setU(profile);
    }

    const { data: msgData } = await sb
      .from('community_messages')
      .select('*, sender:profiles!community_messages_sender_id_fkey(username)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (msgData) {
      setMessages(msgData);
    }
    setLd(false);
  };

  useEffect(() => { load(); }, []);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!u || !newMessage.trim()) return;

    const { error } = await sb.from('community_messages').insert([{
      sender_id: u.id,
      content: newMessage
    }]);

    if (!error) {
      setNewMessage('');
      load();
    } else {
      alert("Error sending message: " + error.message);
    }
  };

  if (ld || !u) return <div style={{background:'#f8fafc',color:'#1e293b',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>Loading DFC Community Hub...</div>;

  const sideBtn = { width:'100%', padding:'12px 15px', background:'transparent', color:'#475569', border:'none', marginBottom:'6px', textAlign:'left' as const, cursor:'pointer', fontWeight:'600', fontSize:'13px', borderRadius:'6px', display:'flex', alignItems:'center', gap:'10px' };

  return (
    <div style={{ background:'#f1f5f9', minHeight:'100vh', color:'#1e293b', fontFamily:'Inter, Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#ffffff', padding:'14px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #e2e8f0', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#16a34a', fontWeight:'900', fontSize:'22px', letterSpacing:'-0.5px', cursor:'pointer'}}>DAISY HILL DFC</span>
        <span style={{color:'#0f172a', fontSize:'12px', background:'#f0fdf4', border:'1px solid #bbf7d0', padding:'4px 10px', borderRadius:'4px'}}>OPERATOR BALANCE: <b>${u.balance?.toLocaleString()}</b></span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* SIDEBAR */}
        <div style={{ width:'250px', background:'#ffffff', padding:'20px', borderRight:'1px solid #e2e8f0' }}>
          <button style={sideBtn} onClick={()=>window.location.href='/dashboard'}>Dashboard</button>
          <button style={sideBtn} onClick={()=>window.location.href='/accounting'}>Accounting</button>
          <button style={sideBtn} onClick={()=>window.location.href='/invoices'}>Corporate Invoices</button>
          <button style={{...sideBtn, background:'#f0fdf4', color:'#16a34a'}} onClick={()=>window.location.href='/community'}><Users size={16}/> Community Hub</button>
          <button style={sideBtn} onClick={()=>sb.auth.signOut().then(()=>window.location.href='/')}>Logout</button>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, padding:'40px', overflowY:'auto' }}>
          <div style={{ maxWidth:'900px', margin:'0 auto', display:'flex', flexDirection:'column', height:'calc(100vh - 160px)' }}>
            
            <h1 style={{fontSize:'30px', fontWeight:'800', textTransform:'uppercase', margin:0, color:'#0f172a'}}>Community Hub</h1>
            <p style={{fontSize:'12px', color:'#64748b', fontWeight:'600', margin:'8px 0 25px 0'}}>
              CONNECT WITH FELLOW FARM OPERATORS, SHARE LOGISTICS UPDATES, AND COORDINATE REGIONAL STRATEGIES.
            </p>

            {/* CHAT CONTAINER */}
            <div style={{ background:'#ffffff', border:'1px solid #e2e8f0', borderRadius:'8px', display:'flex', flexDirection:'column', flex:1, overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
              
              {/* MESSAGES LIST */}
              <div style={{ flex:1, padding:'20px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'12px' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign:'center', color:'#64748b', marginTop:'40px' }}>
                    <MessageSquare size={32} style={{opacity:0.4, marginBottom:'8px'}} />
                    <p style={{margin:0, fontSize:'14px'}}>No broadcasts yet. Be the first operator to transmit a message!</p>
                  </div>
                ) : (
                  messages.slice().reverse().map(m => (
                    <div key={m.id} style={{ background:'#f8fafc', padding:'14px 18px', border:'1px solid #e2e8f0', borderRadius:'6px' }}>
                      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'4px'}}>
                        <span style={{fontWeight:'700', fontSize:'13px', color:'#16a34a'}}>{m.sender?.username || 'Operator'}</span>
                        <span style={{fontSize:'11px', color:'#94a3b8'}}>{new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <p style={{margin:0, fontSize:'13px', color:'#334155'}}>{m.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* INPUT FORM */}
              <form onSubmit={sendMessage} style={{ borderTop:'1px solid #e2e8f0', padding:'15px', background:'#ffffff', display:'flex', gap:'10px' }}>
                <input 
                  placeholder="Broadcast message to the DFC community..." 
                  value={newMessage} 
                  onChange={e=>setNewMessage(e.target.value)} 
                  style={{flex:1, padding:'10px 14px', background:'#f8fafc', border:'1px solid #cbd5e1', borderRadius:'6px', color:'#0f172a', fontSize:'13px'}} 
                />
                <button type="submit" style={{padding:'10px 20px', background:'#16a34a', color:'#fff', border:'none', fontWeight:'600', cursor:'pointer', borderRadius:'6px', display:'flex', alignItems:'center', gap:'6px', fontSize:'13px'}}>
                  <Send size={14}/> Send
                </button>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
