"use client";
import { useState } from 'react';
import { sb } from "@/db/supabase"; 
import { UserCircle, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfileSection({ initialProfile }: { initialProfile: any }) {
  const [newUsername, setNewUsername] = useState(initialProfile?.username || '');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const updateProfile = async () => {
    setLoading(true);
    setMsg({ type: '', text: '' });

    const { data: { user } } = await sb.auth.getUser();
    if (!user) return;

    const { error } = await sb
      .from('profiles')
      .update({ username: newUsername })
      .eq('id', user.id);

    if (error) {
      setMsg({ type: 'error', text: 'Update Failed' });
    } else {
      setMsg({ type: 'success', text: 'Identity Verified' });
      // Optional: window.location.reload(); to sync everything
    }
    setLoading(false);
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #222', padding: '25px', borderRadius: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <UserCircle size={18} color="#d4af37" />
        <h3 style={{ margin: 0, fontSize: '13px', letterSpacing: '2px', color: '#d4af37' }}>OPERATOR IDENTITY</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '10px', color: '#555', marginBottom: '5px' }}>CODENAME</p>
          <input 
            type="text" 
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{ 
              background: '#000', 
              border: '1px solid #333', 
              color: '#fff', 
              padding: '12px', 
              width: '100%',
              borderRadius: '2px',
              fontSize: '14px'
            }}
          />
        </div>

        <button 
          onClick={updateProfile}
          disabled={loading}
          style={{ 
            background: '#d4af37', 
            color: '#000', 
            border: 'none', 
            padding: '12px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {loading ? 'SYNCING...' : <><Save size={16} /> SAVE CHANGES</>}
        </button>

        {msg.text && (
          <div style={{ 
            fontSize: '11px', 
            color: msg.type === 'error' ? '#ff4d4d' : '#8da989', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            justifyContent: 'center'
          }}>
            {msg.type === 'error' ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
            {msg.text}
          </div>
        )}
      </div>
    </div>
  );
}
