"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tractor } from 'lucide-react';

// YOUR ACTUAL DATABASE CONNECTION
const supabase = createClient(
  'https://yioyfxvabhzvkwuljcki.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlpb3lmeHZhYmh6dmt3dWxqY2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NzYyNjgsImV4cCI6MjA4OTQ1MjI2OH0.Ov36x2V6QfDYQhHdA57Bg8fzYkefjJFvG3JJakYMLPU'
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      // REGISTRATION LOGIC
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: username }
        }
      });
      if (error) {
        alert("Error: " + error.message);
      } else {
