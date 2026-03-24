"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Lock, DollarSign, Send, Wallet, RefreshCw, AlertCircle, History, ArrowDownLeft } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualTerminal() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [transferAmount, setTransferAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    refreshData();
  }, []);

  const refreshData = async () => {
    const { data: mapData } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
    if (mapData) setBoxes(mapData);

    const { data: userData } = await sb.from('players').select('*').limit(1).single();
    if (userData) setPlayer(userData);

    const { data: logData } = await sb.from('transactions').select('*').order('timestamp', { ascending: false }).limit(5);
    if (logData) setHistory(logData);
  };

  const handleTransfer = async () => {
    const amt = parseFloat(transferAmount);
    if (!player || amt <= 0 || amt > player.balance) {
      alert("ERROR: Insufficient funds.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await sb.from('players').update({ balance: player.balance - amt }).eq('id', player.id);

    if (!updateError) {
      await sb.from('transactions').insert([{ sender_id: player.id, amount: amt, note: "Sector Deployment" }]);
      setTransferAmount("");
      await refreshData();
    }
    setLoading(false);
  };

  if (!mounted || !L) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* LEFT: MAP */}
      <div style={{ flex: 1, position: 'relative', borderRight: '1px solid rgba(212,175,55,0.2)' }}>
        <header style={{ position: 'absolute', top:0, width:'100%', height:'50px', background:'rgba(0,0,0,0.9)', zIndex:2000, display:'flex', alignItems:'center', padding:'0 20px', borderBottom:'1px solid rgba(212,175,55,0.2)' }}>
           <Terminal size={18} style={{ color: '#d4af37', marginRight: '10px' }} />
           <span style={{ letterSpacing:'3px', fontSize:'12px' }}>DAISY HILL // TACTICAL</span>
        </header>
        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} attributionControl={false} zoomControl={false}>
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
      <div style={{ width: '400px', background: '#000', display: 'flex', flexDirection: 'column', padding: '20px', gap: '15px', overflowY: 'auto' }}>
        
        {/* ASSETS */}
        <div style={{ border: '1px solid #d4af3766', padding: '20px', background: '#0a0a0a' }}>
          <div style={{ fontSize: '9px', color: '#d4af37', letterSpacing: '2px', marginBottom: '10px' }}>OPERATIVE ASSETS</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>${player ? player.balance.toLocaleString() : "0.00"}</div>
        </div>

        {/* TRANSFER */}
        <div style={{ border: '1px solid #222', padding: '20px' }}>
          <div style={{ fontSize: '10px', color: '#888', marginBottom: '15px' }}>NEW TRANSFER</div>
          <input 
            type="number" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="0.00"
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #333', color: '#fff', padding: '10px', marginBottom: '10px' }} 
          />
          <button onClick={handleTransfer} disabled={loading} style={{ width: '100%', background: '#d4af37', color: '#000', padding: '12px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
            {loading ? "PROCESSING..." : "CONFIRM TRANSFER"}
          </button>
        </div>

        {/* LEDGER / HISTORY */}
        <div style={{ border: '1px solid #222', padding: '20px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555', fontSize: '10px', marginBottom: '15px' }}>
            <History size={14} /> TRANSACTION LEDGER
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((tx) => (
              <div key={tx.id} style={{ padding: '10px', background: '#0a0a0a', borderLeft: '2px solid #22c55e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#eee' }}>DEBIT: OUTGOING</div>
                  <div style={{ fontSize: '8px', color: '#444' }}>{new Date(tx.timestamp).toLocaleString()}</div>
                </div>
                <div style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '12px' }}>-${tx.amount}</div>
              </div>
            ))}
            {history.length === 0 && <div style={{ fontSize: '10px', color: '#333', textAlign: 'center', marginTop: '20px' }}>NO RECENT ACTIVITY</div>}
          </div>
        </div>

        <footer style={{ fontSize: '8px', color: '#222', textAlign: 'center' }}>SECURE_TERMINAL_v5.2</footer>
      </div>
    </div>
  );
}
