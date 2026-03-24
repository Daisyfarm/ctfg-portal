"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Lock, DollarSign, Send, Wallet, RefreshCw, AlertCircle } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function VirtualTerminal() {
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    
    // Initial Load
    refreshData();
  }, []);

  const refreshData = async () => {
    // Get Map Data
    const { data: mapData } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
    if (mapData) setBoxes(mapData);

    // Get Player Data (Mocking ID 1 for now - replace with auth.uid() later)
    const { data: userData } = await sb.from('players').select('*').limit(1).single();
    if (userData) setPlayer(userData);
  };

  const handleTransfer = async () => {
    const amt = parseFloat(transferAmount);
    if (!player || amt <= 0 || amt > player.balance) {
      alert("INVALID TRANSACTION: Insufficient funds or invalid amount.");
      return;
    }

    setLoading(true);
    
    // 1. Deduct from Player
    const { error: updateError } = await sb
      .from('players')
      .update({ balance: player.balance - amt })
      .eq('id', player.id);

    if (!updateError) {
      // 2. Log Transaction
      await sb.from('transactions').insert([
        { sender_id: player.id, amount: amt, note: "Sector Deployment Funds" }
      ]);
      
      setTransferAmount("");
      await refreshData();
      alert(`TRANSACTION SECURE: $${amt} deployed.`);
    }
    
    setLoading(false);
  };

  if (!mounted || !L) return <div style={{background:'#000', height:'100vh'}} />;

  return (
    <div style={{ height: '100vh', width: '100%', background: '#050505', display: 'flex', color: 'white', fontFamily: 'monospace', overflow: 'hidden' }}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* LEFT SIDE: TACTICAL MAP */}
      <div style={{ flex: 1, position: 'relative', borderRight: '1px solid rgba(212,175,55,0.2)' }}>
        <header style={{ position: 'absolute', top:0, width:'100%', height:'50px', background:'rgba(0,0,0,0.9)', zIndex:2000, display:'flex', alignItems:'center', padding:'
