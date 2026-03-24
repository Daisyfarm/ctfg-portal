"use client";
import { useEffect, useState } from 'react';
import { sb } from "@/db/supabase"; 

export default function OverlayPage() {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      const { data } = await sb.from('montana_conquest').select('*').order('field_number', { ascending: true });
      if (data) setFields(data);
      setLoading(false);
    };
    fetchFields();
  }, []);

  async function handleFieldClick(fieldNumber: number, currentStatus: boolean) {
    const { error } = await sb
      .from('montana_conquest')
      .update({ is_owned: !currentStatus, updated_at: new Date().toISOString() })
      .eq('field_number', fieldNumber);

    if (!error) {
      setFields(prev => prev.map(f => f.field_number === fieldNumber ? { ...f, is_owned: !currentStatus } : f));
    }
  }

  if (loading) return <div className="p-10 text-[#F5BD02] font-black italic uppercase">Syncing Satellite...</div>;

  return (
    <div className="bg-black/80 p-4 min-h-screen">
      <div className="grid grid-cols-10 gap-1">
        {fields.map((field) => (
          <button 
            key={field.field_number}
            onClick={() => handleFieldClick(field.field_number, field.is_owned)}
            className={`aspect-square text-[10px] font-bold border transition-all ${
              field.is_owned ? 'bg-[#2D5A27] border-[#2D5A27] text-white' : 'bg-transparent border-white/10 text-gray-600'
            }`}
          >
            {field.field_number}
          </button>
        ))}
      </div>
    </div>
  );
}
