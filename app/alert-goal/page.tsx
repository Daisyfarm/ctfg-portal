import React from 'react';
// Corrected path to reach the root db folder from app/alert/goal/
import { supabase } from '../../../../db/supabase'; 

export default function GoalPage() {
  // In a real app, you'd fetch these numbers from Supabase. 
  // For now, I've set placeholders so the UI looks perfect.
  const currentSavings = 345000; 
  const goalAmount = 500000;
  const percentage = (currentSavings / goalAmount) * 100;

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'transparent' 
    }}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <span style={{ color: '#F2C94C' }}>●</span> CORPORATE EXPANSION GOAL
        </div>
        
        <div style={dataRow}>
          <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>ASSET: NEW MONTANA LAND TRACT</span>
          <span style={{ fontWeight: 'bold' }}>{percentage.toFixed(1)}%</span>
        </div>

        {/* PROGRESS BAR */}
        <div style={progressBase}>
          <div style={{ 
            ...progressFill, 
            width: `${percentage}%`,
            boxShadow: '0 0 10px #F2C94C' 
          }}></div>
        </div>

        <div style={footerStyle}>
          CURRENT TREASURY: <span style={{ color: '#F2C94C' }}>${currentSavings.toLocaleString()}</span> / ${goalAmount.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  background: 'rgba(13, 17, 23, 0.9)',
  border: '1px solid #30363d',
  padding: '20px',
  borderRadius: '4px',
  width: '400px',
  fontFamily: 'monospace'
};

const headerStyle = {
  fontSize: '0.9rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  marginBottom: '15px',
  borderBottom: '1px solid #30363d',
  paddingBottom: '10px'
};

const dataRow = {
  display: 'flex', 
  justifyContent: 'space-between', 
  marginBottom: '8px',
  alignItems: 'flex-end'
};

const progressBase = {
  height: '12px',
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '2px',
  overflow: 'hidden'
};

const progressFill = {
  height: '100%',
  background: '#F2C94C',
  transition: 'width 1s ease-in-out'
};

const footerStyle = {
  marginTop: '15px',
  fontSize: '0.75rem',
  textAlign: 'center' as const,
  color: '#8b949e'
};
