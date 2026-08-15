import React, { useState } from 'react';

export default function LegalPage({ initialTab = 'privacy' }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div style={{ paddingTop: '140px', paddingBottom: '100px' }}>
      <section className="bg-light-section" style={{ padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="tag-badge">Legal Documentation</span>
          <h1 style={{ fontSize: '42px', margin: '16px 0 20px' }}>
            Terms, Privacy & <span className="text-orange">Cookie Compliance</span>
          </h1>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
            {[
              { id: 'privacy', label: 'Privacy Policy' },
              { id: 'terms', label: 'Terms & Conditions' },
              { id: 'cookies', label: 'Cookie Policy' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '700',
                  fontSize: '14px',
                  background: tab === t.id ? 'var(--color-primary)' : '#FFFFFF',
                  color: tab === t.id ? '#FFFFFF' : 'var(--color-text-dark)',
                  border: '1px solid var(--color-border-light)',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '800px', lineHeight: '1.8', color: 'var(--color-text-dark)' }}>
          {tab === 'privacy' && (
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Privacy Policy</h2>
              <p style={{ marginBottom: '16px' }}>DS-Graphix values your privacy. We collect personal information solely to provide quote proposals, schedule discovery calls, and deliver contracted creative services.</p>
              <h4 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>1. Information We Collect</h4>
              <p>Name, work email address, phone number, company name, and project specification details provided through our quote calculator or contact forms.</p>
              <h4 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>2. Data Protection & IP Ownership</h4>
              <p>We do not share, sell, or rent your data to third parties. All project designs and client source files are protected under non-disclosure standards.</p>
            </div>
          )}

          {tab === 'terms' && (
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Terms & Conditions</h2>
              <p style={{ marginBottom: '16px' }}>By engaging DS-Graphix for UI/UX design, branding, graphic design, or video reel services, you agree to our engagement terms.</p>
              <h4 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>1. Payment & Deposit Schedule</h4>
              <p>Standard projects require a 50% initial deposit upon kickoff and 50% final payment prior to final source file release.</p>
              <h4 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '8px' }}>2. Intellectual Property Rights</h4>
              <p>100% full commercial copyright is transferred to the client upon full project settlement.</p>
            </div>
          )}

          {tab === 'cookies' && (
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Cookie Policy</h2>
              <p style={{ marginBottom: '16px' }}>We use essential cookies to maintain website performance, store user theme preferences, and analyze anonymized visitor traffic.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
