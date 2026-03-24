"use client";
import { useEffect, useState } from 'react';
import { sb } from '@/db/supabase';

export default function GoalAlert() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await sb.from('montana_conquest').select('sponsor_amount');
      if (data) {
        const total = data.reduce((sum, f) => sum + (f.sponsor_amount || 0), 0);
        setProgress(total);
      }
      setLoading(false);
    };
    fetchProgress();
  }, []);

  if (loading) return null;

  return (
    <div className="p-4 bg-black/50 text-[#F5BD02] font-black uppercase italic text-xl">
      Monitor Fund: £{progress} / £150
    </div>
  );
}
