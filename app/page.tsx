"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Lock, DollarSign, Send, Users, Wallet } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualTerminal() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [balance, setBalance] = useState(1250.00); // Mock balance for now
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    const getData = async () => {
      const { data } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
      if (data) setBoxes(data);
    };
    getData();
  }, []);

  const handleTransfer = () => {
    const amt = parseFloat(transferAmount);
    if (amt > 0 && amt <= balance) {
      setBalance(prev => prev - amt);
      setTransferAmount("");
      alert(`TRANSFER COMPLETE: $${amt} sent to Sector Command.`);
    }
  };

  if (!mounted || !L) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* LEFT SIDE: TACTICAL MAP */}
      <div style={{ flex: 1, position: 'relative', borderRight: '1px solid #d4af3733' }}>
        <header style={{ position: 'absolute', top:0, width:'100%', height:'50px', background:'rgba(0,0,0,0.8)', zIndex:2000, display:'flex', alignItems:'center', padding:'0 20px', borderBottom:'1px solid #d4af3733' }}>
           <Terminal size={18} style={{ color: '#d4af37', marginRight:'10px' }} />
           <span style={{ letterSpacing:'2px' }}>DAISY HILL // TACTICAL MAP</span>
        </header>

        <MapContainer center={[0, 0]} zoom={0} crs={L.CRS.Simple} style={{ height: '100%', width: '100%', background: '#000' }} attributionControl={false} zoomControl={false}>
          <ImageOverlay url="/map.png" bounds={[[-500, -500], [500, 500]]} />
          {boxes.map((box, i) => {
            const row = Math.floor(i / 11);
            const col = i % 11;
            const bounds = [[220 - (row * 35), -350 + (col * 55)], [220 - ((row + 1) * 35), -350 + ((col + 1) * 55)]] as [[number, number], [number, number]];
            return (
              <Rectangle key={box.id || i} bounds={bounds} pathOptions={{ color: box.status === 'captured' ? '#22c55e' : '#ff4444', fillOpacity: 0.25, weight: 1 }} />
            );
          })}
        </MapContainer>
      </div>

      {/* RIGHT SIDE: PLAYER DASHBOARD & FUNDS */}
      <div style={{ width: '350px', background: '#000', display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <div style={{ border: '1px solid #d4af3766', padding: '20px', marginBottom: '20px', background: '#0a0a0a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4af37', marginBottom: '15px' }}>
            <Wallet size={20} />
            <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>COMMANDER ASSETS</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#22c55e' }}>
            ${balance.toLocaleString()}
          </div>
          <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>AVAILABLE FUNDS</div>
        </div>

        <div style={{ border: '1px solid #333', padding: '20px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888', marginBottom: '20px' }}>
            <Send size={16} />
            <span style={{ fontSize: '10px', letterSpacing: '1px' }}>FUNDS TRANSFER</span>
          </div>
          
          <label style={{ fontSize: '9px', color: '#555', display: 'block', marginBottom: '5px' }}>RECIPIENT SECTOR</label>
          <select style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '8px', marginBottom: '15px', fontSize: '11px' }}>
            <option>MONTANA_OPERATIONS_HQ</option>
            <option>FIELD_RECON_TEAM_A</option>
            <option>LOGISTICS_DAISY_HILL</option>
          </select>

          <label style={{ fontSize: '9px', color: '#555', display: 'block', marginBottom: '5px' }}>AMOUNT (USD)</label>
          <input 
            type="number" 
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="0.00"
            style={{ width: '100%', background: '#111', border: '1px solid #333', color: 'white', padding: '8px', marginBottom: '20px' }} 
          />

          <button 
            onClick={handleTransfer}
            style={{ width: '100%', background: '#d4af37', border: 'none', color: 'black', padding: '12px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            AUTHORIZE TRANSFER <Send size={14} />
          </button>
        </div>

        <footer style={{ marginTop: '20px', fontSize: '9px', color: '#333', textAlign: 'center' }}>
          <Lock size={10} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> 
          SECURE BANKING PORTAL v4.2
        </footer>
      </div>
    </div>
  );
}
