"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FolderTree, FileCode, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');

export default function ProjectFolderView() {
  const [u, setU] = useState<any>(null);
  const [ld, setLd] = useState(true);

  const folders = [
    'insurance', 'invoices', 'land', 'leaderboard', 'loans', 
    'logistics', 'marketplace', 'news', 'overlay', 'permits', 
    'press', 'rules', 'sell', 'service', 'subscriptions', 
    'support', 'sync', 'tiers', 'wiki'
  ];

  const files = [
    { name: 'layout.tsx', path: '/layout' },
    { name: 'page.tsx', path: '/' }
  ];

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await sb.auth.getUser();
      if (user) {
        const { data: profile } = await sb.from('profiles').select('*').eq('id', user.id).single();
        setU(profile);
      }
      setLd(false);
    }
    loadUser();
  }, []);

  if (ld || !u) return <div style={{background:'#1a1a1a',color:'#fff',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading Project Structure...</div>;

  return (
    <div style={{ background:'#111', minHeight:'100vh', color:'#fff', fontFamily:'Arial, sans-serif', display:'flex', flexDirection:'column' }}>
      {/* TOP BAR */}
      <div style={{ background:'#222', padding:'12px 25px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #4a7ab5' }}>
        <span onClick={()=>window.location.href='/dashboard'} style={{color:'#22c55e', fontWeight:'900', fontSize:'20px', fontStyle:'italic', cursor:'pointer'}}>IRON DAISY AGRI</span>
        <span style={{color:'#fff', fontSize:'11px'}}>OPERATOR BALANCE: ${u.balance?.toLocaleString()}</span>
      </div>

      <div style={{ display:'flex', flex:1 }}>
        <Sidebar />

        {/* MAIN CONTENT - GITHUB FOLDER DIRECTORY */}
        <div style={{ flex:1, padding:'40px', background:'rgba(0,0,0,0.7)', overflowY:'auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px' }}>
            <FolderTree size={32} color="#4a7ab5" />
            <h1 style={{fontSize:'32px', textTransform:'uppercase', margin:0}}>Project App Directory</h1>
          </div>
          <p style={{fontSize:'12px', color:'#4a7ab5', fontWeight:'bold', margin:'0 0 30px'}}>
            REPOSITORY PATH: <span style={{color:'#fff'}}>daisy-hill-tactical / app /</span>
          </p>

          <div style={{ background:'rgba(20,20,20,0.95)', border:'1px solid #333', borderRadius:'6px', overflow:'hidden' }}>
            
            {/* FOLDERS LIST */}
            {folders.map((folder, index) => (
              <div 
                key={folder}
                onClick={() => {
                  if (folder === 'marketplace') window.location.href = '/marketplace';
                  else if (folder === 'sell') window.location.href = '/sell';
                  else if (folder === 'service') window.location.href = '/service';
                  else if (folder === 'subscriptions') window.location.href = '/subscriptions';
                  else if (folder === 'support') window.location.href = '/support';
                  else if (folder === 'sync') window.location.href = '/sync';
                  else if (folder === 'tiers') window.location.href = '/tiers';
                  else if (folder === 'wiki') window.location.href = '/wiki';
                  else window.location.href = `/${folder}`;
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: '1px solid #222',
                  background: index % 2 === 0 ? 'rgba(25,25,25,0.5)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a2a'}
                onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'rgba(25,25,25,0.5)' : 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#4a7ab5', fontWeight: 'bold', fontSize: '13px' }}>
                  📁 {folder} /
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#888' }}>
                  <span>Update page.tsx</span>
                  <span style={{ color: '#555' }}>10-19 minutes ago</span>
                  <ArrowRight size={14} color="#666" />
                </div>
              </div>
            ))}

            {/* ROOT FILES */}
            {files.map((file, index) => (
              <div 
                key={file.name}
                onClick={() => window.location.href = file.path}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 20px',
                  borderBottom: index < files.length - 1 ? '1px solid #222' : 'none',
                  background: 'rgba(30,30,30,0.8)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a2a'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30,30,30,0.8)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#22c55e', fontWeight: 'bold', fontSize: '13px' }}>
                  <FileCode size={16} /> {file.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#888' }}>
                  <span>Update {file.name}</span>
                  <span style={{ color: '#555' }}>3-6 minutes ago</span>
                  <ArrowRight size={14} color="#666" />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
