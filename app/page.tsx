"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Lock, Send, Wallet, Trophy, ShoppingCart, Box, RefreshCw } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualTerminal() {
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<'finance' | 'leaderboard' | 'store' | 'inventory'>('finance');
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [storeItems, setStoreItems] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) refreshAll(session.user.id);
    });
  }, []);

  const refreshAll = async (userId: string) => {
    const { data: mapData } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
    if (mapData) setBoxes(mapData);

    const { data: pData } = await sb.from('players').select('*').eq('id', userId).single();
    if (pData) setPlayer(pData);

    const { data: board } = await sb.from('tactical_leaderboard').select('*');
    if (board) setLeaderboard(board);

    const { data: items } = await sb.from('store_items').select('*');
    if (items) setStoreItems(items);

    const { data: inv } = await sb.from('player_inventory').select('*, store_items(*)').eq('player_id', userId);
    if (inv) setInventory(inv);
  };

  const buyItem = async (item: any) => {
    if (!player || player.balance < item.price) return alert("INSUFFICIENT FUNDS");
    setLoading(true);
    const { error } = await sb.from('players').update({ balance: player.balance - item.price }).eq('id', player.id);
    if (!error) {
      await sb.from('player_inventory').insert([{ player_id: player.id, item_id: item.id }]);
      await refreshAll(player.id);
      alert(`${item.name.toUpperCase()} PURCHASED`);
    }
    setLoading(false);
  };

  if (!mounted || !L || !session) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* LEFT: MAP */}
      <div style={{ flex: 1, position: 'relative', borderRight: '1px solid #d4af3722' }}>
        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} zoomControl={false}>
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          {boxes.map((box, i) => {
             const row = Math.floor(i / 11);
             const col = i % 11;
             const bounds = [[220 - (row * 35), -350 + (col * 55)], [220 - ((row + 1) * 35), -350 + ((col + 1) * 55)]] as [[number, number], [number, number]];
             return <Rectangle key={box.id || i} bounds={bounds} pathOptions={{ color: box.status === 'captured' ? '#22c55e' : '#ff4444', fillOpacity: 0.2, weight: 1 }} />;
          })}
        </MapContainer>
      </div>

      {/* RIGHT: DASHBOARD */}
      <div style={{ width: '400px', background: '#000', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #222' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid #222' }}>
          <button onClick={() => setTab('finance')} style={{ padding: '15px 5px', background: tab === 'finance' ? '#111' : 'none', color: '#d4af37', border: 'none', cursor: 'pointer', fontSize: '8px' }}><Wallet size={14}/><br/>BANK</button>
          <button onClick={() => setTab('leaderboard')} style={{ padding: '15px 5px', background: tab === 'leaderboard' ? '#111' : 'none', color: '#d4af37', border: 'none', cursor: 'pointer', fontSize: '8px' }}><Trophy size={14}/><br/>INTEL</button>
          <button onClick={() => setTab('store')} style={{ padding: '15px 5px', background: tab === 'store' ? '#111' : 'none', color: '#d4af37', border: 'none', cursor: 'pointer', fontSize: '8px' }}><ShoppingCart size={14}/><br/>STORE</button>
          <button onClick={() => setTab('inventory')} style={{ padding: '15px 5px', background: tab === 'inventory' ? '#111' : 'none', color: '#d4af37', border: 'none', cursor: 'pointer', fontSize: '8px' }}><Box size={14}/><br/>GEAR</button>
        </div>

        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          {tab === 'finance' && (
            <div style={{ border: '1px solid #d4af3744', padding: '20px', background: '#0a0a0a' }}>
              <div style={{ fontSize: '10px', color: '#d4af37' }}>OPERATIVE BALANCE</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0' }}>${player?.balance?.toLocaleString() || "0.00"}</div>
              <div style={{ fontSize: '9px', color: '#444' }}>RANK: {player?.rank}</div>
            </div>
          )}

          {tab === 'leaderboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {leaderboard.map((entry, idx) => (
                <div key={idx} style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#d4af37', fontSize: '11px' }}>{entry.email?.split('@')[0].toUpperCase()}</span>
                  <span style={{ color: '#22c55e', fontSize: '11px' }}>{entry.sectors_secured} SECTORS</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'store' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {storeItems.map(item => (
                <div key={item.id} style={{ border: '1px solid #333', padding: '15px', background: '#080808' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{item.name}</span>
                    <span style={{ color: '#22c55e' }}>${item.price}</span>
                  </div>
                  <button onClick={() => buyItem(item)} disabled={loading} style={{ width: '100%', padding: '10px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>BUY NOW</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'inventory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {inventory.map((inv, idx) => (
                <div key={idx} style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontSize: '11px' }}>{inv.store_items?.name}</span>
                  <button style={{ padding: '5px', background: '#222', color: '#d4af37', fontSize: '9px', border: '1px solid #333' }}>DEPLOY</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer style={{ padding: '15px', textAlign: 'center', fontSize: '8px', color: '#222' }}>
          DAISY HILL TACTICAL // SECURE TERMINAL ACTIVE
        </footer>
      </div>
    </div>
  );
}
