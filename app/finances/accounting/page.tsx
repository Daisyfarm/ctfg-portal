"use client";
import React, { useState } from 'react';

export default function FinancesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanSuccess, setLoanSuccess] = useState(false);

  const [loans, setLoans] = useState([
    { id: 1, lender: 'Daisy Hill National Bank', principal: '$150,000', remaining: '$124,500', rate: '3.5% APY', payment: '$1,250/mo' },
    { id: 2, lender: 'AgriCorp Equipment Financing', principal: '$85,000', remaining: '$45,200', rate: '4.2% APY', payment: '$980/mo' }
  ]);

  const transactions = [
    { id: 1, date: '2026-06-24 14:10', type: 'Contract Payout', amount: '+$4,850.00', source: 'NPC Contract #402' },
    { id: 2, date: '2026-06-24 00:00', type: 'Daily Loan Interest', amount: '-$145.20', source: 'Daisy Hill Bank' },
    { id: 3, date: '2026-06-23 18:30', type: 'Market Sale', amount: '+$18,400.00', source: 'Grain Elevator (Wheat)' },
    { id: 4, date: '2026-06-22 12:00', type: 'Permit Purchase', amount: '-$2,500.00', source: 'CDL License' }
  ];

  const handleTakeLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanAmount) return;
    const newLoan = {
      id: loans.length + 1,
      lender: 'Daisy Hill National Bank',
      principal: `$${Number(loanAmount).toLocaleString()}`,
      remaining: `$${Number(loanAmount).toLocaleString()}`,
      rate: '3.8% APY',
      payment: `$${Math.round(Number(loanAmount) * 0.01)}/mo`
    };
    setLoans([...loans, newLoan]);
    setLoanAmount('');
    setLoanSuccess(true);
    setTimeout(() => setLoanSuccess(false), 3000);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Finances</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Market</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Marketplace</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Banking & Financial Ledgers
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Monitor web checking balances, active loans, interest accruals, and complete transaction histories.
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['Overview', 'Active Loans', 'Transaction History'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#0284c7' : '#fff',
                color: activeTab === tab ? '#fff' : '#334155',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {loanSuccess && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>
            Loan successfully approved and transferred to your checking account!
          </div>
        )}

        {/* Tab Content: Overview */}
        {activeTab === 'Overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '8px' }}>Web Checking Account</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '10px' }}>$84,250.40</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0' }}>Available funds for immediate purchases and machinery maintenance.</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#dc2626', textTransform: 'uppercase', marginBottom: '8px' }}>Total Outstanding Debt</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>$169,700.00</div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0' }}>Across {loans.length} active financial institution agreements.</p>
            </div>
          </div>
        )}

        {/* Tab Content: Active Loans */}
        {activeTab === 'Active Loans' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {loans.map((loan) => (
                <div key={loan.id} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '22px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase', marginBottom: '6px' }}>{loan.lender}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>Remaining: {loan.remaining}</h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Original Principal: <strong style={{ color: '#334155' }}>{loan.principal}</strong></div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Interest Rate: <strong style={{ color: '#334155' }}>{loan.rate}</strong></div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '15px' }}>Monthly Payment: <strong style={{ color: '#334155' }}>{loan.payment}</strong></div>
                  <button onClick={() => alert('Payment processed!')} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', width: '100%' }}>
                    MAKE PAYMENT
                  </button>
                </div>
              ))}
            </div>

            {/* Take Out a Loan Form */}
            <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', maxWidth: '600px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Request New Bank Loan</h3>
              <form onSubmit={handleTakeLoan} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Loan Amount ($)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 50000" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                  APPLY FOR LOAN
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content: Transaction History */}
        {activeTab === 'Transaction History' && (
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', color: '#334155' }}>
                  <th style={{ padding: '12px 15px' }}>Timestamp</th>
                  <th style={{ padding: '12px 15px' }}>Type</th>
                  <th style={{ padding: '12px 15px' }}>Source / Detail</th>
                  <th style={{ padding: '12px 15px', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 15px', color: '#64748b' }}>{tx.date}</td>
                    <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#1e293b' }}>{tx.type}</td>
                    <td style={{ padding: '12px 15px', color: '#334155' }}>{tx.source}</td>
                    <td style={{ padding: '12px 15px', textAlign: 'right', fontWeight: 'bold', color: tx.amount.startsWith('+') ? '#16a34a' : '#dc2626' }}>
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
