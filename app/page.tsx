"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sb } from "../db/supabase"; 
import { Shield, Terminal, Wallet, Trophy, ShoppingCart, Box, Radar, MessageSquare, Send, LogOut } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(m => m.ImageOverlay), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(m => m.Rectangle), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

export default function VirtualTerminal() {
  const [session, setSession] = useState<any>(null);
  const [tab, setTab] = useState<'finance' | 'leaderboard' | 'store' | 'inventory' | 'chat'>('finance');
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);
  const [boxes, setBoxes] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((mod) => setL(mod.default));
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      refreshAll(session.user.id);
      // Real-time Chat Subscription
      const channel = sb.channel('global-chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          setMessages(prev => [payload.new, ...prev]);
        }).subscribe();
      return () => { sb.removeChannel(channel); };
    }
  }, [session]);

  const refreshAll = async (userId: string) => {
    const { data: mapData } = await sb.from('montana_conquest').select('*, players(email)').order('id', { ascending: true });
    if (mapData) setBoxes(mapData);
    const { data: pData } = await sb.from('players').select('*').eq('id', userId).single();
    if (pData) setPlayer(pData);
    const { data: msgData } = await sb.from('messages').select('*').order('created_at', { ascending: false }).limit(20);
    if (msgData) setMessages(msgData);
  };

  const sendChatMessage = async () => {
    if (!newMessage.trim()) return;
    await sb.from('messages').insert([{ user_id: session.user.id, username: session.user.email.split('@')[0], text: newMessage }]);
    setNewMessage("");
  };

  if (!mounted || !L) return <div style={{background:'#000', height:'100vh'}} />;

  if (!session) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#d4af37' }}>
        <div style={{ width: '350px', border: '1px solid #d4af3733', padding: '40px', background: '#050505',
