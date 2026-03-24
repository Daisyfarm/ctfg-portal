"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Wallet, Trophy, ShoppingCart, Box, MessageSquare, Send, Settings, LogOut, Radar } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

export default function VirtualTerminal() {
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<'finance' | 'leaderboard' | 'store' | 'inventory' | 'chat' | 'admin' | 'missions'>('finance');
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [storeItems, setStoreItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminAmount, setAdminAmount] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      refreshAll();
      const channel = sb.channel('global-chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          setMessages(prev => [payload.new, ...prev]);
        }).subscribe();
      return () => { sb.removeChannel(channel); };
    }
  }, [session]);

  const refreshAll = async () => {
    if (!session) return;
    const { data: mapData } = await sb.from('montana_conquest').select('*, players(email)');
    if (mapData) setBoxes(mapData);
    const { data: pData } = await sb.from('players').select('*').eq('id', session.user.id).single();
    if (pData) setPlayer(pData);
    const { data: board } = await sb.from('tactical_leaderboard').select('*');
    if (board) setLeaderboard(board);
    const { data: msgData } = await sb.from('messages').select('*').order('created_at', { ascending: false }).limit(15);
    if (msgData) setMessages(msgData);
    const { data: items } = await sb.from('store_items').select('*');
    if (items) setStoreItems(items);
    const { data: inv } = await sb.from('player_inventory').select('*, store_items(*)').eq('player_id', session.user.id);
    if (inv) setInventory(inv);
  };

  const buyItem = async (item: any) => {
    if (!player || player.balance < item.price) return alert("INSUFFICIENT FUNDS");
    const { error } = await sb.from('players').update({ balance: player.balance - item.price }).eq('id', player.id);
    if (!error) {
      await sb.from('player_inventory').insert([{ player_id: player.id, item_id: item.id }]);
      refreshAll();
    }
  };

  const sendChatMessage = async () => {
    if (!newMessage.trim()) return;
    await sb.from('messages').insert([{ user_id: session.user.id, username: session.user.email.split('@')[0], text: newMessage }]);
    setNewMessage("");
  };

  const grantFunds = async () => {
    if (!selectedPlayer || !adminAmount) return;
    const { error } = await sb.rpc('adjust_player_balance', { target_id: selectedPlayer, amount: parseFloat(adminAmount) });
    if (!error) { alert("FUNDS INJECTED"); setAdminAmount(""); refreshAll(); }
  };

  if (!mounted || !L) return <div style={{background:'#000', height:'100vh'}} />;

  if (!session) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#d4af37' }}>
        <div style={{ width: '350px', border: '1px solid #d4af3733', padding: '40px', background: '#050505', textAlign: 'center' }}>
          <Shield size={40} style={{ marginBottom: '20px' }} />
          <h2 style={{ letterSpacing: '3px', fontSize: '12px', marginBottom: '30px' }}>DAISY HILL SECURE UPLINK</h2>
          <input type="email" placeholder="OPERATIVE EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', marginBottom: '10px' }} />
          <input type="password" placeholder="ACCESS KEY" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '12px', marginBottom: '20px' }} />
          <button onClick={() => sb.auth.signInWithPassword({ email, password })} style={{ width: '100%', background: '#d4af37', color: '#000', padding: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>INITIATE ACCESS</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      
      {/* MAP VIEWPORT */}
      <div style={{ flex: 1, position: 'relative' }}>
        <header style={{ position: 'absolute', top:0, width:'100%', height:'50px', background:'rgba(0,0,0,0.8)', zIndex:2000, display:'flex', alignItems:'center', padding:'0 20px', borderBottom:'1px solid #d4af3722', justifyContent: 'space-between' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={18} style={{ color: '#d4af37' }} />
              <span style={{ letterSpacing:'2px', fontSize:'10px' }}>MONTANA 122 // TACTICAL NETWORK</span>
           </div>
           <button onClick={() => sb.auth.signOut()} style={{ background: 'none', border: '1px solid #ff4444', color: '#ff4444', padding: '4px 10px', fontSize: '9px', cursor: 'pointer' }}>DISCONNECT</button>
        </header>

        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          {boxes.map((box, i) => (
            <Rectangle key={box.id || i} bounds={[[220 - (Math.floor(i/11)*35), -350 + ((i%11)*55)], [220 - ((Math.floor(i/11)+1)*35), -350 + (((i%11)+1)*55)]]} pathOptions={{ color: box.status === 'captured' ? '#22c55e' : '#ff4444', fillOpacity: 0.15 }} />
          ))}
        </MapContainer>
      </div>

      {/* COMMAND DASHBOARD */}
      <div style={{ width: '400px', background: '#000', borderLeft: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: player?.rank === 'COMMANDER' ? 'repeat(6, 1fr)' : 'repeat(5, 1fr)', borderBottom: '1px solid #222' }}>
          {['finance', 'leaderboard', 'store', 'inventory', 'chat'].map(t => (
            <button key={t} onClick={() => setTab(t as any)} style={{ padding: '15px 0', background: tab === t ? '#111' : 'none', color: tab === t ? '#d4af37' : '#444', border: 'none', cursor: 'pointer', fontSize: '8px' }}>{t.toUpperCase()}</button>
          ))}
          {player?.rank === 'COMMANDER' && <button onClick={() => setTab('admin')} style={{ padding: '15px 0', background: tab === 'admin' ? '#d4af37' : 'none', color: tab === 'admin' ? '#000' : '#d4af37', border: 'none', cursor: 'pointer', fontSize: '8px' }}>ADMIN</button>}
        </div>

        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          {tab === 'admin' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ fontSize: '10px', color: '#d4af37' }}>// COMMAND OVERRIDE</div>
              <select onChange={(e) => setSelectedPlayer(e.target.value)} style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '10px', fontSize: '11px' }}>
                <option>SELECT OPERATIVE</option>
                {leaderboard.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
              </select>
              <input type="number" placeholder="CREDIT VALUE" value={adminAmount} onChange={(e) => setAdminAmount(e.target.value)} style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '10px' }} />
              <button onClick={grantFunds} style={{ background: '#d4af37', color: '#000', padding: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>INJECT FUNDS</button>
            </div>
          ) : tab === 'chat' ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column-reverse', gap: '10px' }}>
                {messages.map((m, idx) => (
                  <div key={idx} style={{ fontSize: '11px', borderLeft: '1px solid #d4af3744', paddingLeft: '10px' }}>
                    <span style={{ color: '#d4af37' }}>{m.username}:</span> <span style={{ color: '#ccc' }}>{m.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()} style={{ flex: 1, background: '#111', border: '1px solid #333', color: '#fff', padding: '8px', fontSize: '11px' }} placeholder="COMMS..." />
                <button onClick={sendChatMessage} style={{ background: '#d4af37', border: 'none', padding: '8px' }}><Send size={14} /></button>
              </div>
            </div>
          ) : tab === 'store' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {storeItems.map(item => (
                <div key={item.id} style={{ border: '1px solid #333', padding: '15px', background: '#0a0a0a' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '11px' }}>{item.name}</span>
                    <span style={{ color: '#22c55e', fontSize: '11px' }}>${item.price}</span>
                  </div>
                  <button onClick={() => buyItem(item)} style={{ width: '100%', padding: '8px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}>PURCHASE</button>
                </div>
              ))}
            </div>
          ) : tab === 'inventory' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               {inventory.map((inv, idx) => (
                 <div key={idx} style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px' }}>{inv.store_items?.name}</span>
                    <button style={{ background: '#222', color: '#d4af37', border: '1px solid #333', padding: '4px 8px', fontSize: '9px' }}>READY</button>
                 </div>
               ))}
               {inventory.length === 0 && <div style={{ textAlign: 'center', color: '#333', marginTop: '50px', fontSize: '10px' }}>NO GEAR DETECTED</div>}
            </div>
          ) : (
            <div style={{ border: '1px solid #d4af3744', padding: '20px', background: 'linear-gradient(45deg, #050505, #0a0a0a)' }}>
               <div style={{ fontSize: '10px', color: '#d4af37', letterSpacing: '2px' }}>CREDIT BALANCE</div>
               <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0' }}>${player?.balance?.toLocaleString() || "0.00"}</div>
               <div style={{ fontSize: '9px', color: '#444' }}>STATUS: {player?.rank || "ACTIVE"}</div>
            </div>
          )}
        </div>
        <footer style={{ padding: '15px', textAlign: 'center', fontSize: '8px', color: '#222', borderTop: '1px solid #111' }}>DAISY HILL TACTICAL // SECURE TERMINAL</footer>
      </div>
    </div>
  );
}
