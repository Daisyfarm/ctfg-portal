"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient('https://dlwhztcqntalrhfrefsk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd2h6dGNxbnRhbHJoZnJlZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzM2ODgsImV4cCI6MjA4OTQ0OTY4OH0.z_TOBv8Ky9Ksx3hTu19ScXHGcO86-GmwjdYFbdOt8ZY');
const HK = "https://discord.com/api/webhooks/1484184649847804016/o_bj5hINtTTZEux2RBegwBEqLUlNYIMS7Azomm4xadN7S6g353sEJhaaIiExvh0Ct4Za";

export default function Admin() {
  const [ps, setPs] = useState<any[]>([]);
  const [js, setJs] = useState<any[]>([]);
  const [form, setForm] = useState({ t: '', p: '' });
  const [status, setStatus] = useState("");

  const refresh = async () => {
    const { data: p } = await sb.from('profiles').select('*').order('balance', { ascending: false });
    const { data: j } = await sb.from('contracts').select('*, profiles(username)').eq('status', 'pending');
    setPs(p || []); setJs(j || []);
  };

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await sb.auth.getUser();
      const { data: r } = await sb.from('profiles').select('rank').eq('id', user?.id).single();
      if (r?.rank !== 'Admin') window.location.href = '/dashboard';
      else refresh();
    };
    check();
  }, []);

  const post = async (e: any) => {
    e.preventDefault();
    setStatus("Posting...");
    await sb.from('contracts').insert([{ title: form.t, payout: parseInt(form.p), status: 'available' }]);
    fetch(HK, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ content: `📢 **NEW JOB:** ${form.t} ($${form.p})` }) }).catch(()=>0);
    setForm({ t: '', p: '' });
    setStatus("✅ Job Posted to Board!");
    refresh();
  };

  const pay = async (j: any) => {
    setStatus("Processing Pay...");
    const { data: u } = await sb.from('profiles').select('balance').eq('id', j.assigned_to).single();
    await sb.from('profiles').update({ balance
