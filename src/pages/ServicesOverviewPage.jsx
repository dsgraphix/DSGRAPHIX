import React from 'react';
import { ArrowRight, Layout, Sparkles, Palette, Video, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { servicesData } from '../data/mockData';

export default function ServicesOverviewPage({ setCurrentPage, openQuoteModal }) {
  return (
    <div style={{ paddingTop: '140px' }}>
      
      {/* Header */}
      <section className="bg-light-section" style={{ padding: '80px 0 60px' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="tag-badge">Services Catalog</span>
          <h1 style={{ fontSize: '48px', margin: '16px 0 20px' }}>
            Full-Spectrum <span className="text-orange">Creative Solutions</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-text-muted)' }}>
            From high-converting UI/UX app designs to iconic brand identities and viral social video reels, we deliver end-to-end creative assets tailored for market leaders.
          </p>
        </div>
      </section>

      {/* Services Grid Matrix */}
      <section className="section-padding" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {servicesData.map((s, idx) => (
              <div
                key={s.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '40px',
                  alignItems: 'center',
                  background: idx % 2 === 0 ? '#FFFFFF' : 'var(--color-bg-section)',
                  padding: '40px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '10px', borderRadius: '12px' }}>
                      {s.id === 'ui-ux-design' && <Layout size={28} />}
                      {s.id === 'logo-brand-identity' && <Sparkles size={28} />}
                      {s.id === 'graphic-design' && <Palette size={28} />}
                      {s.id === 'video-production-reels' && <Video size={28} />}
                    </div>
                    <span className="tag-badge">{s.turnaround} Turnaround</span>
                  </div>
                  
                  <h2 style={{ fontSize: '32px', marginBottom: '14px' }}>{s.title}</h2>
                  <p style={{ fontSize: '16px', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    {s.fullDesc}
                  </p>

                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <button onClick={() => setCurrentPage(`service-${s.id}`)} className="btn-primary">
                      Explore Service Detail <ArrowRight size={16} />
                    </button>
                    <button onClick={openQuoteModal} className="btn-outline">
                      Get Instant Estimate
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-light)' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                      Included Deliverables:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {s.deliverables.map((d, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600' }}>
                          <CheckCircle2 size={16} color="var(--color-primary)" /> {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
