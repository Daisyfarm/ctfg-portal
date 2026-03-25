import React from 'react';

export default function FleetPage() {
  const fleet = [
    { id: 'IDA-01', type: 'Case IH Quadtrac 620', status: 'In Service', operator: 'Lead Director' },
    { id: 'IDA-02', type: 'John Deere 8R 410', status: 'Maintenance', operator: 'Contractor 04' },
    { id: 'IDA-03', type: 'Fendt 1050 Vario', status: 'In Service', operator: 'Contractor 09' },
  ];

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#F2C94C', fontSize: '2rem', marginBottom: '10px', textTransform: 'uppercase' }}>
        Fleet Registry
      </h1>
      <p style={{ color: '#8b949e', marginBottom: '40px' }}>Active Montana Asset Inventory</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#161b22' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #F2C94C', color: '#8b949e', fontSize: '0.8rem' }}>
            <th style={tableHeader}>UNIT ID</th>
            <th style={tableHeader}>MACHINE TYPE</th>
            <th style={tableHeader}>STATUS</th>
            <th style={tableHeader}>ASSIGNED OPERATOR</th>
          </tr>
        </thead>
        <tbody>
          {fleet.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #30363d' }}>
              <td style={tableCell}>{item.id}</td>
              <td style={tableCell}>{item.type}</td>
              <td style={{ ...tableCell, color: item.status === 'In Service' ? '#4ade80' : '#fbbf24' }}>
                ● {item.status}
              </td>
              <td style={tableCell}>{item.operator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeader = { padding: '15px' };
const tableCell = { padding: '15px', fontSize: '0.9rem' };
