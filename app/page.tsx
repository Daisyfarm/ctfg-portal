"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Send, LogOut, Lock } from 'lucide-react';

// Dynamic Leaflet Imports to prevent SSR errors
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });

export default function MontanaTerminal() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const refreshData = async () => {
    if (!session) return;
    const { data: mapData } = await sb.from('montana_conquest').select('*');
    if (mapData) setBoxes(mapData);
    const { data: pData } = await sb.from('players').select('*').eq('id', session.user.id).single();
    if (pData) setPlayer(pData);
  };

  useEffect(() => { if (session) refreshData(); }, [session]);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) alert("ACCESS DENIED: " + error.message);
    setLoading(false);
  };

  if (!mounted || !L) return <div style={{ background: '#000
