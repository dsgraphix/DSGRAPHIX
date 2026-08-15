import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { agencyInfo } from '../data/mockData';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickTemplates = [
    "Hi Dhananjay! I need UI/UX Design for my app.",
    "Hi Dhananjay! I'd like a quote for Brand Identity & Logo.",
    "Hi Dhananjay! We need Video Production & Reels.",
    "Hi DS-Graphix team! Can we book a quick discovery call?"
  ];

  const sendWhatsApp = (msg) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${agencyInfo.whatsapp}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1100 }}>
      {/* Expanded Chat Box Window */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '70px',
            right: 0,
            width: '340px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border-light)',
            overflow: 'hidden',
            animation: 'float 0.3s ease-out'
          }}
        >
          {/* Top Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: '#FFFFFF',
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#128C7E',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}
              >
                DC
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{agencyInfo.founder}</div>
                <div style={{ fontSize: '12px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}></span>
                  Online | DS-Graphix Lead
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', color: '#FFFFFF', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div style={{ padding: '20px', background: '#F8FAFC', maxHeight: '360px', overflowY: 'auto' }}>
            <div
              style={{
                background: '#FFFFFF',
                padding: '12px 16px',
                borderRadius: '12px',
                borderTopLeftRadius: '2px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                fontSize: '14px',
                color: 'var(--color-text-dark)',
                marginBottom: '16px'
              }}
            >
              👋 Hi there! I'm Dhananjay Chalke, Creative Director at DS-Graphix. How can we help elevate your brand or product today?
            </div>

            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>
              Quick Inquiry Templates:
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {quickTemplates.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => sendWhatsApp(tmpl)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--color-border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    fontSize: '13px',
                    textAlign: 'left',
                    color: 'var(--color-text-dark)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = '#128C7E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-light)'; e.currentTarget.style.color = 'var(--color-text-dark)'; }}
                >
                  💬 {tmpl}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && customMsg && sendWhatsApp(customMsg)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border-light)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => customMsg && sendWhatsApp(customMsg)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#25D366',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Pulse Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pulse-whatsapp"
        title="Chat on WhatsApp with Dhananjay"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
          border: 'none',
          cursor: 'pointer',
          transition: 'var(--transition)'
        }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
