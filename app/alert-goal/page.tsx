import React from 'react';
import { supabase } from '../../../db/supabase'; 

export default function GoalPage() {
  const current = 345000;
  const goal = 500000;
  const progress = (current / goal) * 100;

  return (
    <div style={{ padding: '20px', background: 'rgba(13, 17, 23, 0.9)', border: '1px solid #30363d', width: '350px' }}>
      <div style={{ fontSize: '0.8rem', color: '#F2C94C', marginBottom: '10px' }}>CAPITAL EXPANSION GOAL</div>
      <div style={{ height: '10px', background: '#0d1117', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#F2C94C' }}></div>
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        ${current.toLocaleString()} / ${goal.toLocaleString()}
      </div>
    </div>
  );
}
