"use client";
import React, { useState } from 'react';

export default function AccountingPage() {
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: 1, date: '2026-06-24', account: 'Operating Revenue', category: 'Crop Sales', debit: '$0.00', credit: '$18,200.00' },
    { id: 2, date: '2026-06-24', account: 'Operating Expenses', category: 'Fuel & Maintenance', debit: '$1,450.00', credit: '$0.00' },
    { id: 3, date: '2026-06-24', account: 'Liabilities', category: 'Bank Loan Principal', debit: '$3,200.00', credit: '$0.00' },
    { id: 4, date: '2026-06-23', account: 'Operating Revenue', category: 'Contract Payouts', debit: '$0.00', credit: '$4,850.00' }
  ]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Double-Entry Accounting Ledger
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Detailed breakdown of debits, credits, and account balances for audit compliance.
          </p>
        </div>

        {/* Accounting Table */}
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                <th style={{ padding: '12px 15px' }}>Date</th>
                <th style={{ padding: '12px 15px' }}>Account</th>
                <th style={{ padding: '12px 15px' }}>Category</th>
                <th style={{ padding: '12px 15px' }}>Debit</th>
                <th style={{ padding: '12px 15px' }}>Credit</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 15px', color: '#64748b' }}>{entry.date}</td>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#1e3a8a' }}>{entry.account}</td>
                  <td style={{ padding: '12px 15px', color: '#334155' }}>{entry.category}</td>
                  <td style={{ padding: '12px 15px', color: '#dc2626', fontWeight: entry.debit !== '$0.00' ? 'bold' : 'normal' }}>{entry.debit}</td>
                  <td style={{ padding: '12px 15px', color: '#16a34a', fontWeight: entry.credit !== '$0.00' ? 'bold' : 'normal' }}>{entry.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
