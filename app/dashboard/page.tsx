"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  LogOut, Sprout, Loader2, Tractor, Activity, 
  ShieldCheck, ShoppingCart, TrendingUp, Users,
  Coins, Fuel, Map as MapIcon, Database
} from 'lucide-react';

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ops');
  const [fields, setFields] = useState<any[]>([]);

  // Static Farm Data
  const farmData = [
    {
      id: 1,
      name: "Daisy Farmz",
      money: 1313639.75,
      loan: 0,
      stats: {
        distance: "631.87 km",
        fuel: "3811.12 L",
        animals: { cows: 5, sheep: 61 },
        topPlayer: "CHUNK"
      }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      // Auth Check
      const { data: { user } } = await sb.auth.getUser();
      if (!user) { window.location.href = '/'; return; }
      
      // Fetch Profile
      const { data: pData } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setProfile(pData || { username: 'Operator', balance: 0 });

      // Fetch 122-Field Grid Data
      const { data: fData } = await sb.from('montana_conquest').select('*').order('field_number', { ascending: true });
      if (fData) setFields(fData);

      setLoading(false);
    };
    fetchData();
  }, []);

  // Update Function for the Map
  async function handleFieldClick(fieldNumber: number, currentStatus: boolean) {
    const { error } = await sb
      .from('montana_conquest')
      .update({ is_owned: !currentStatus, updated_at: new Date().toISOString() })
      .eq('field_number', fieldNumber);

    if (!error) {
      setFields(prev => prev.map(f => 
        f.field_number === fieldNumber ? { ...f, is_owned: !currentStatus } : f
      ));
    }
  }

  if (loading) return (
    <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="animate-spin" color="#d4af37" size={40} />
    </div>
  );

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', color: '#f5f5dc', fontFamily: 'monospace' }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', background: '#0d0d0d', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 20px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sprout color="#d4af37" size={24} />
            <span style={{ letterSpacing: '4px', fontWeight: 'bold', color: '#d4af37', fontSize: '13px' }}>DAISY'S HUB</span>
          </div>
        </div>

        <nav style={{ flex: 1, paddingTop: '10px' }}>
          {[
            { id: 'ops', label: 'FARM OVERVIEW', icon: <Activity size={18} /> },
            { id: 'land', label: 'LAND REGISTRY', icon: <MapIcon size={18} /> },
            { id: 'fin', label: 'FINANCIALS', icon: <TrendingUp size={18} /> },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px', width: '100%',
                background: activeTab === item.id ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                border: 'none', color: activeTab === item.id ? '#d
