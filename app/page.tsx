"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Lock, Send, Wallet, Trophy, ShoppingCart, Box, Zap, ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    sb.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) refreshAll(session.user.id);
    });
  }, []);

  const refreshAll = async (userId: string) => {
    // 1. Map Data
    const { data: mapData } = await sb.from('montana_conquest').select('*').order('id', { ascending: true });
