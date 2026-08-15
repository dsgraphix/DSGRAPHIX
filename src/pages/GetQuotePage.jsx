import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import QuoteModal from '../components/QuoteModal';

export default function GetQuotePage({ openQuoteModal }) {
  return (
    <div style={{ paddingTop: '140px', paddingBottom: '100px' }}>
      <section className="bg-light-section" style={{ padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="tag-badge">High Conversion Booking Hub</span>
          <h1 style={{ fontSize: '48px', margin: '16px 0 20px' }}>
            Book a <span className="text-orange">Discovery Call</span> & Get a Custom Estimate
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            Schedule a 15-minute consultation with Founder Dhananjay Chalke or use our interactive calculator to estimate your project budget.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={openQuoteModal} className="btn-primary" style={{ padding: '16px 36px' }}>
              Launch Interactive Calculator <Sparkles size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>What Happens On Your Discovery Call?</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', margin: '24px 0 32px' }}>
              {[
                "Scope & Goals Review: We analyze your current brand position and product UI goals.",
                "Strategic Recommendations: Dhananjay shares immediate UI/UX and brand enhancements.",
                "Transparent Timeline & Cost: Exact milestone pricing and deliverables schedule proposal.",
                "Zero High-Pressure Sales: Clear actionable advice regardless of whether we partner."
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '15px', fontWeight: '600' }}>
                  <CheckCircle2 size={20} color="var(--color-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={openQuoteModal} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
              Calculate Quote & Schedule Call <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
