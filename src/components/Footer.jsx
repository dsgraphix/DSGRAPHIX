import React from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, Globe, Share2, MessageCircle, ExternalLink, Heart } from 'lucide-react';
import { agencyInfo } from '../data/mockData';

export default function Footer({ setCurrentPage, openQuoteModal }) {
  const handleNav = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--color-dark-neutral)', color: '#FFFFFF', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        
        {/* Top Newsletter / CTA Grid */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255,102,54,0.15) 0%, rgba(30,30,29,0.8) 100%)',
            border: '1px solid rgba(255, 102, 54, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            marginBottom: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ maxWidth: '540px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Transform Your Creative Vision
            </span>
            <h3 style={{ fontSize: '30px', color: '#FFFFFF', marginTop: '6px' }}>
              Ready to elevate your product UX & brand identity?
            </h3>
            <p style={{ color: '#A0A09E', fontSize: '15px', marginTop: '8px' }}>
              Partner with DS-Graphix today. Get a custom estimate or discovery call within 24 hours.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={openQuoteModal} className="btn-primary">
              Get Instant Quote <ArrowRight size={16} />
            </button>
            <button onClick={() => handleNav('contact')} className="btn-outline" style={{ color: '#FFFFFF', borderColor: '#555' }}>
              Contact Direct
            </button>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: '900'
                }}
              >
                DS
              </div>
              <span style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#FFFFFF' }}>
                DS-GRAPHIX
              </span>
            </div>
            <p style={{ color: '#A0A09E', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              Full-service creative & digital design agency delivering high-converting UI/UX, branding, graphic design, and video reels under one roof.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <Globe size={18} />, href: '#' },
                { icon: <Share2 size={18} />, href: '#' },
                { icon: <MessageCircle size={18} />, href: '#' },
                { icon: <ExternalLink size={18} />, href: '#' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '18px', marginBottom: '20px' }}>Creative Offerings</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'UI/UX Design', page: 'service-ui-ux-design' },
                { label: 'Logo & Brand Identity', page: 'service-logo-brand-identity' },
                { label: 'Graphic Design', page: 'service-graphic-design' },
                { label: 'Video Production & Reels', page: 'service-video-production-reels' },
                { label: 'Services Catalog', page: 'services-overview' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(item.page)}
                    style={{ background: 'none', color: '#A0A09E', fontSize: '14px', transition: 'var(--transition)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A09E')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company Sitemap */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '18px', marginBottom: '20px' }}>Agency Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'About DS-Graphix', page: 'about' },
                { label: 'Case Studies Showcase', page: 'portfolio' },
                { label: 'Our 5-Step Process', page: 'process' },
                { label: 'Client Testimonials', page: 'testimonials' },
                { label: 'FAQs & Pricing', page: 'faqs' },
                { label: 'Careers (We are hiring)', page: 'careers' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(item.page)}
                    style={{ background: 'none', color: '#A0A09E', fontSize: '14px', transition: 'var(--transition)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#A0A09E')}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '18px', marginBottom: '20px' }}>Contact Direct</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#A0A09E', fontSize: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--color-primary)" />
                <a href={`mailto:${agencyInfo.email}`} style={{ color: '#A0A09E' }}>{agencyInfo.email}</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--color-primary)" />
                <a href={`tel:${agencyInfo.phone}`} style={{ color: '#A0A09E' }}>{agencyInfo.phone}</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="var(--color-primary)" style={{ marginTop: '3px' }} />
                <span>{agencyInfo.location}</span>
              </div>
              <div style={{ marginTop: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                  Founder & Creative Lead
                </span>
                <p style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '15px' }}>{agencyInfo.founder}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '13px',
            color: '#888'
          }}
        >
          <div>
            © {new Date().getFullYear()} DS-Graphix. All rights reserved. Designed for high performance & conversion.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button onClick={() => handleNav('legal-privacy')} style={{ background: 'none', color: '#888', cursor: 'pointer' }}>
              Privacy Policy
            </button>
            <button onClick={() => handleNav('legal-terms')} style={{ background: 'none', color: '#888', cursor: 'pointer' }}>
              Terms of Service
            </button>
            <button onClick={() => handleNav('legal-cookies')} style={{ background: 'none', color: '#888', cursor: 'pointer' }}>
              Cookie Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
