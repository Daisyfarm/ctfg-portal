"use client";
import React, { useEffect, useState } from 'react';
import { sb } from "../db/supabase"; 
// ... (Your other imports like Shield, MapContainer, etc.)

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for existing session
    sb.auth.getSession().then(({ data: { session } }) => setSession(session));
    // Listen for login/logout changes
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  if (!mounted) return null;

  // --- STATE 1: NOT LOGGED IN (Show the Video Login) ---
  if (!session) {
    return (
      <div style={{ /* The Login Screen Code I gave you earlier */ }}>
         {/* ... Video element and Login Box ... */}
      </div>
    );
  }

  // --- STATE 2: LOGGED IN (Show the Map & Dashboard) ---
  return (
    <div style={{ /* Your Map and Sidebar Code */ }}>
       {/* ... MapContainer and Sidebar ... */}
    </div>
  );
}
