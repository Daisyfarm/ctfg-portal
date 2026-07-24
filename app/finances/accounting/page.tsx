
"use client";
import React, { useState } from 'react';

export default function FinancesPage() {
  const [loanPaid, setLoanPaid] = useState(false);

  const transactions = [
    { id: '1', date: '2026-07-24 14:10', description: 'Contract Payout #17909', type: 'Credit', amount: '+$759.00', status: 'Completed' },
    { id: '2', date: '2026-07-23 09:30', description: 'Permit Purchase - CDL Renewal', type: 'Debit', amount: '-$2,000.00', status: 'Completed' },
    { id: '3', date: '2026-07-22 16:45', description: 'Equipment Maintenance - Fendt 1050', type: 'Debit', amount: '-$1,250.00', status: 'Completed' },
    { id: '4', date: '2026-07-21 11:15', description: 'Auction Sale - Wheat Harvest', type: 'Credit', amount: '+$45,000.00', status: 'Completed' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer', color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ cursor: 'pointer' }}>Market ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Financial Overview
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Monitor bank accounts, manage farm loans, review transaction ledgers, and track balance sheets.
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Total Bank Balance</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#16a34a' }}>$342,509.00</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>Across Server 8, 14, and 19</div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Active Bank Loan</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc2626' }}>{loanPaid ? '$0.00' : '$150,000.00'}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>Interest Rate: 3.5% APY</div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Net Daily Revenue</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0284c7' }}>+$18,420.00</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>Based on recent contracts & sales</div>
          </div>

        </div>

        {/* Loan Management Section */}
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 5px 0' }}>Bank Loan Management</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>You can pay off your active bank loan early to avoid daily interest accrual.</p>
          </div>
          <button 
            onClick={() => setLoanPaid(true)}
            style={{ background: loanPaid ? '#16a34a' : '#0284c7', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            {loanPaid ? 'LOAN FULLY PAID' : 'PAY OFF LOAN ($150,000)'}
          </button>
        </div>

        {/* Transaction Ledger */}
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 20px 0' }}>Recent Financial Transactions</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {transactions.map((tx) => (
              <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '3px' }}>{tx.description}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{tx.date} • Status: <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{tx.status}</span></div>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: tx.type === 'Credit' ? '#16a34a' : '#dc2626' }}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
