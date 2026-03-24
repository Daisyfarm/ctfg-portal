"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 
import { 
  Sprout, Loader2, Activity, 
  TrendingUp, Map as MapIcon
} from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ops');
  const [fields, setFields] = useState<any[]>([]);

  const farmData = [
    {
      id: 1,
      name: "Daisy Farmz",
      money: 1313639.75,
      stats: { distance: "631.87 km", fuel: "3811.12 L" }
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: fData } = await sb.from('montana_conquest').select('*').order('field_number', { ascending: true });
      if (fData) setFields(fData);
      setLoading(false);
    };
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div style={{ background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin" color="#d4af37" size={40} />
      </div>
    );
  }

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
                border: 'none', color: activeTab === item.id ? '#d4af37' : '#444',
                cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', fontSize: '11px', letterSpacing: '2px',
                borderLeft: activeTab === item.id ? '3px solid #d4af37' : '3px solid transparent',
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '40px', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px' }}>
          <h2 style={{ margin: 0, letterSpacing: '5px', fontSize: '11px', color: '#555' }}>SYSTEM // {activeTab.toUpperCase()}</h2>
        </header>

        {activeTab === 'ops' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {farmData.map(farm => (
              <div key={farm.id} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '25px' }}>
                <h3 style={{ margin: '0 0 20px 0', color: '#d4af37', fontSize: '14px' }}>{farm.name.toUpperCase()}</h3>
                <div style={{ display: 'flex', gap: '20px' }}>
                   <div><p style={{fontSize:'9px', color:'#444'}}>CASH</p><p>${farm.money.toLocaleString()}</p></div>
                   <div><p style={{fontSize:'9px', color:'#444'}}>FUEL</p><p>{farm.stats.fuel}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'land' && (
          <div>
            <h3 style={{ color: '#d4af37', fontSize: '14px', marginBottom: '20px' }}>TACTICAL CONQUEST MAP</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(10, 1fr)', 
              gap: '5px',
              background: '#0d0d0d',
              padding: '20px',
              border: '1px solid #1a1a1a'
            }}>
              {fields.map((field) => (
                <button 
                  key={field.field_number}
                  onClick={() => handleFieldClick(field.field_number, field.is_owned)}
                  style={{
                    aspectRatio: '1/1',
                    background: field.is_owned ? '#2d5a27' : 'transparent',
                    border: field.is_owned ? '1px solid #2d5a27' : '1px solid #1a1a1a',
                    color: field.is_owned ? '#fff' : '#444',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {field.field_number}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
