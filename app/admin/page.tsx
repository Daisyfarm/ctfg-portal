"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, ArrowLeft, Plus, Banknote } from 'lucide-react';

const supabase = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function AdminPanel() {
  const [players, setPlayers] = useState<any[]>([]);
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [newJob, setNewJob] = useState({ title: '', payout: '' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const { data: pData } = await supabase.from('profiles').select('*').order('balance', { ascending: false });
    setPlayers(pData || []);
    const { data: jData } = await supabase.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPendingJobs(jData || []);
    setLoading(false);
  };

  useEffect(() => { 
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: p } = await supabase.from('profiles').select('rank').eq('id', user?.id).single();
      if (p?.rank !== 'Admin') window.location.href = '/dashboard';
      else fetchData();
    }
    checkAdmin();
  }, []);

  const createJob = async (e: any) => {
    e.preventDefault();
    const payoutNum = parseInt(newJob.payout);
    await supabase.from('contracts').insert([{ title: newJob.title, payout: payoutNum, status: 'available' }]);
    
    // DISCORD ALERT
    await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            content: `📢 **NEW CONTRACT POSTED**\nJob: **${newJob.title}**\n💰 Payout: **$${pay
