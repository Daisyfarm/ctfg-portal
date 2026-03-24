"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';

export default function FieldAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [fieldNum, setFieldNum] = useState(null);

  useEffect(() => {
    // Listen for real-time updates to your database
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'montana_conquest' },
        (payload) => {
          if (payload.new.is_owned === true) {
            setFieldNum(payload.new.field_number);
            setShowAlert(true);
            // Hide alert after 8 seconds
            setTimeout(() => setShowAlert(false), 8000);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (!showAlert) return null;

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-transparent font-sans">
      <div className="bg-black/80 border-y-4 border-[#F5BD02] w-full py-8 flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <span className="text-[#F5BD02] text-xs font-black uppercase tracking-[0.5em] mb-2">
          Mission Update // Territory Expansion
        </span>
        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
          Field #{fieldNum} <span className="text-[#F5BD02]">Acquired</span>
        </h1>
        <div className="mt-4 flex gap-2">
          <div className="h-1 w-20 bg-[#2D5A27] animate-pulse"></div>
          <div className="h-1 w-20 bg-[#F5BD02] animate-pulse delay-75"></div>
          <div className="h-1 w-20 bg-[#2D5A27] animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}
