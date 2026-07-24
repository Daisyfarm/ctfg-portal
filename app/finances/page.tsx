"use client";
import React, { useState } from 'react';

export default function FinancesPage() {
  const [loans, setLoans] = useState([
    { id: 1, bank: 'First National Bank', amount: '$150,000', interestRate: '4.5%', nextPayment: '$3,200 (Due in 3 days)' },
    { id: 2, bank: 'Agricultural Equipment Financing', amount: '$45,000', interestRate: '6.0%', nextPayment: '$1,150 (Due in 12 days)' }
  ]);

  const transactions = [
    { id: 1, date: '2026-06-24 14:15', description: 'Contract Payout - Field 14 Harvest', amount: '+$4,850', type: 'credit' },
    { id: 2, date: '2026-06-24 10:00', description: 'Bank Loan Repayment', amount: '-$3,200', type: 'debit' },
    { id: 3, date: '2026-06-23 16:30', description: 'Seed & Fertilizer Purchase', amount: '-$1,450', type: 'debit' },
    { id: 4, date: '2026-06-23 09:15', description: 'Grain Sale to Milling Co.', amount: '+$18,200', type: 'credit' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif', padding: '30px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
              Financial Management & Loan Portfolio
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
              Monitor cash flow, track active banking loans, and inspect historical balance changes.
            </p>
          </div>
          <a href="/finances/accounting" style={{ background: '#2563eb', color: '#fff', padding: '8px 14px', borderRadius: '4px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
            View Accounting Ledger →
          </a>
        </div>

        {/* Quick Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Current Balance (IG)</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#16a34a' }}>$9,459,000</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Total Active Debt</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#dc2626' }}>$195,000</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Daily Loan Interest</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e3a8a' }}>$435 / day</div>
          </div>
        </div>

        {/* Active Loans Section */}
        <h2 style={{ fontSize: '18px', color: '#332266', marginBottom: '15px' }}>Active Bank Loans</h2>
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', marginBottom: '35px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                <th style={{ padding: '12px 15px' }}>Bank / Institution</th>
                <th style={{ padding: '12px 15px' }}>Principal Amount</th>
                <th style={{ padding: '12px 15px' }}>Interest Rate</th>
                <th style={{ padding: '12px 15px' }}>Next Installment</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#1e3a8a' }}>{loan.bank}</td>
                  <td style={{ padding: '12px 15px', color: '#0f172a' }}>{loan.amount}</td>
                  <td style={{ padding: '12px 15px', color: '#64748b' }}>{loan.interestRate}</td>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#d97706' }}>{loan.nextPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transaction History Section */}
        <h2 style={{ fontSize: '18px', color: '#332266', marginBottom: '15px' }}>Recent Transaction Ledger</h2>
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                <th style={{ padding: '12px 15px' }}>Timestamp</th>
                <th style={{ padding: '12px 15px' }}>Description</th>
                <th style={{ padding: '12px 15px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px 15px', color: '#64748b' }}>{tx.date}</td>
                  <td style={{ padding: '12px 15px', color: '#1e293b' }}>{tx.description}</td>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: tx.type === 'credit' ? '#16a34a' : '#dc2626' }}>{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
