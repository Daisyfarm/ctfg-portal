"use client";
import React, { useState } from 'react';

export default function SupportPage() {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const faqs = [
    { q: 'How do I join a multiplayer server?', a: 'Make sure you have the required mods installed and check the Server List in your dashboard for direct IP or session links.' },
    { q: 'When are daily loan interests deducted?', a: 'Loan interests and property taxes are automatically processed at midnight server time.' },
    { q: 'How do I acquire a Commercial Driver\'s License (CDL)?', a: 'Visit the Permit Center under Interactions to purchase or renew your CDL and herbicide applicator licenses.' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#000', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #cbd5e1', padding: '12px 30px' }}>
        <div style={{ display: 'flex', gap: '25px', maxWidth: '1400px', margin: '0 auto', fontSize: '13px', fontWeight: 'bold', color: '#2563eb', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer' }}>Myself ▾</span>
          <span style={{ cursor: 'pointer' }}>Interactions ▾</span>
          <span style={{ cursor: 'pointer' }}>Finances ▾</span>
          <span style={{ cursor: 'pointer' }}>Data ▾</span>
          <span style={{ cursor: 'pointer' }}>Market ▾</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Wiki</span>
          <span style={{ color: '#1e3a8a', borderBottom: '2px solid #2563eb', paddingBottom: '2px', cursor: 'pointer' }}>Support</span>
          <span style={{ color: '#64748b', fontWeight: 'normal', cursor: 'pointer' }}>Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '30px auto', padding: '0 30px' }}>
        
        {/* Page Title */}
        <div style={{ marginBottom: '25px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#332266', margin: '0 0 5px 0' }}>
            Support & Ticket Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0' }}>
            Need assistance? Browse frequently asked questions or submit a support ticket to the server administration team.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          
          {/* Submit Ticket Form */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Submit a Support Ticket</h3>
            
            {ticketSubmitted ? (
              <div style={{ background: '#dcfce7', color: '#16a34a', padding: '15px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>
                Support ticket submitted successfully! An admin will review it shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Subject</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Missing contract payout / Bug report" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#334155', marginBottom: '6px' }}>Description</label>
                  <textarea 
                    rows={4}
                    placeholder="Provide details about your issue..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#fff', color: '#000', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical' }}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '12px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  SUBMIT TICKET
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 15px 0' }}>Frequently Asked Questions</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{ paddingBottom: '12px', borderBottom: index !== faqs.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>{faq.q}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
