"use client";

import { useEffect, useState } from "react";
import { sb } from "../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await sb.auth.getUser();
      if (!data.user) return (window.location.href = "/");
      setUser(data.user);
    };
    loadUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", color: "#fff", background: "#111", minHeight: "100vh" }}>
      <h1>Welcome, {user.email}</h1>
      <button onClick={() => sb.auth.signOut().then(() => (window.location.href = "/"))}>
        Sign Out
      </button>
    </div>
  );
}
