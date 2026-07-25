'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DispatchTask {
  id: string;
  title: string;
  type: string;
  assignedUnit: string;
  payout: string;
  status: 'Pending' | 'In Transit' | 'Completed';
}

const initialTasks: DispatchTask[] = [
  { id: 'TASK-101', title: 'District 4 Grain Haul to Mill', type: 'Logistics', assignedUnit: 'V-01 (9RX 640)', payout: '$45,000', status: 'In Transit' },
  { id: 'TASK-102', title: 'River Valley Field Prep / Lime', type: 'Field Work', assignedUnit: 'V-02 (9250)', payout: '$28,500', status: 'Pending' },
  { id: 'TASK-103', title: 'Central Depot Fertilizer Restock', type: 'Supply', assignedUnit: 'Unassigned', payout: '$19,000', status: 'Pending' },
  { id: 'TASK-104', title: 'North Ridge Soybean Transport', type: 'Logistics', assignedUnit: 'V-04 (Fastrac)', payout: '$32,000', status: 'Completed' },
];

export default function DispatchPage() {
  const [tasks, setTasks] = useState<DispatchTask[]>(initialTasks);

  const advanceStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus: DispatchTask['status'] = 
          t.status === 'Pending' ? 'In Transit' : 
          t.status === 'In Transit' ? 'Completed' : 'Pending';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#05070a', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: '#0b0e14', borderBottom: '1px solid #27272a', padding: '16px 24px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 900 }}>FARM NETWORK</Link>
            <span style={{ color: '#52525b' }}>|</span>
            <span style={{ color: '#34d399' }}>Central Dispatch & Operations</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
            <Link href="/market" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Market Index</Link>
            <Link href="/contracts" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Contracts</Link>
            <Link href="/dispatch" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 900 }}>Dispatch</Link>
            <Link href="/fleet" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Fleet</Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#34d399', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
              Active Server Logistics
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '0.05em' }}>
              Task Dispatch Board
            </h1>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1117', border: '1px solid #27272a', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr', padding: '16px 24px', backgroundColor: 'rgba(27, 31, 42, 0.5)', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#71717a', borderBottom: '1px solid #27272a', letterSpacing: '0.05em' }}>
            <div>Task ID</div>
            <div>Operation Title</div>
            <div>Assigned Unit</div>
            <div>Payout</div>
            <div>Status Action</div>
          </div>

          {tasks.map((task) => (
            <div key={task.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr', padding: '20px 24px', alignItems: 'center', borderBottom: '1px solid #1f232d', fontSize: '13px' }}>
              <div style={{ fontWeight: 900, color: '#34d399' }}>{task.id}</div>
              <div style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{task.title}</div>
              <div style={{ color: '#a1a1aa' }}>{task.assignedUnit}</div>
              <div style={{ fontWeight: 900, color: '#ffffff' }}>{task.payout}</div>
              <div>
                <button 
                  onClick={() => advanceStatus(task.id)}
                  style={{ 
                    backgroundColor: task.status === 'Completed' ? 'rgba(52, 211, 153, 0.1)' : task.status === 'In Transit' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(161, 161, 170, 0.1)',
                    color: task.status === 'Completed' ? '#34d399' : task.status === 'In Transit' ? '#eab308' : '#a1a1aa',
                    border: `1px solid ${task.status === 'Completed' ? 'rgba(52, 211, 153, 0.2)' : task.status === 'In Transit' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(161, 161, 170, 0.2)'}`,
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}>
                  {task.status} ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}