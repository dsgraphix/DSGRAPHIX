import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, PhoneCall, Sparkles, ChevronDown } from 'lucide-react';
import { agencyInfo } from '../data/mockData';

export default function Header({ currentPage, setCurrentPage, openSearch, openQuoteModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services-overview', hasDropdown: true },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Process', id: 'process' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  const serviceSubItems = [
    { name: 'UI/UX Design', id: 'service-ui-ux-design' },
    { name: 'Logo & Brand Identity', id: 'service-logo-brand-identity' },
    { name: 'Graphic Design', id: 'service-graphic-design' },
    { name: 'Video Production & Reels', id: 'service-video-production-reels' },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        padding: scrolled ? '14px 0' : '22px 0',
        borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF6636 0%, #2A2A29 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '20px',
              fontFamily: 'var(--font-heading)',
              boxShadow: 'var(--shadow-orange)'
            }}
          >
            DS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '22px', letterSpacing: '-0.5px', color: 'var(--color-dark-neutral)' }}>
              DS-GRAPHIX
            </span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--color-primary)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '-4px' }}>
              Creative Studio
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', gap: '28px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (link.hasDropdown && currentPage.startsWith('service-'));
            if (link.hasDropdown) {
              return (
                <div
                  key={link.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    style={{
                      background: 'none',
                      fontSize: '15px',
                      fontWeight: isActive ? '700' : '600',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-dark-neutral)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 0'
                    }}
                  >
                    {link.name} <ChevronDown size={14} style={{ transform: servicesDropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                  </button>

                  {/* Dropdown Menu */}
                  {servicesDropdown && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-10px',
                        width: '250px',
                        background: '#FFFFFF',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-lg)',
                        padding: '12px',
                        border: '1px solid var(--color-border-light)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <div
                        onClick={() => handleNavClick('services-overview')}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '14px',
                          fontWeight: '700',
                          color: 'var(--color-primary)',
                          cursor: 'pointer',
                          background: 'var(--color-primary-light)'
                        }}
                      >
                        All Services Overview
                      </div>
                      {serviceSubItems.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => handleNavClick(sub.id)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '14px',
                            fontWeight: currentPage === sub.id ? '700' : '500',
                            color: currentPage === sub.id ? 'var(--color-primary)' : 'var(--color-text-dark)',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F8FAFC';
                            e.currentTarget.style.color = 'var(--color-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = currentPage === sub.id ? 'var(--color-primary)' : 'var(--color-text-dark)';
                          }}
                        >
                          {sub.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  fontSize: '15px',
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-dark-neutral)',
                  padding: '8px 0',
                  position: 'relative'
                }}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--color-primary)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            title="Search Website (Ctrl+K)"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: scrolled ? '#F1F5F9' : 'rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-dark-neutral)',
              transition: 'var(--transition)'
            }}
          >
            <Search size={18} />
          </button>

          {/* Book Call Outline Button */}
          <button
            onClick={() => handleNavClick('get-quote')}
            className="btn-outline"
            style={{ padding: '10px 20px', fontSize: '14px', display: 'none' }}
            className="desktop-btn"
          >
            <PhoneCall size={15} /> Book Call
          </button>

          {/* Get Quote Primary Button */}
          <button
            onClick={openQuoteModal}
            className="btn-primary"
            style={{ padding: '10px 22px', fontSize: '14px' }}
          >
            <Sparkles size={16} /> Get a Quote
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-dark-neutral)',
              padding: '6px'
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#FFFFFF',
            zIndex: 999,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto'
          }}
        >
          {navLinks.map((link) => (
            <div key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: currentPage === link.id ? 'var(--color-primary)' : 'var(--color-dark-neutral)',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 0',
                  borderBottom: '1px solid #F1F5F9'
                }}
              >
                {link.name}
              </button>
              {link.hasDropdown && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {serviceSubItems.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => handleNavClick(sub.id)}
                      style={{ fontSize: '15px', color: 'var(--color-text-muted)', fontWeight: '600', padding: '4px 0' }}
                    >
                      • {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); openQuoteModal(); }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Get a Project Quote <ArrowRight size={16} />
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setCurrentPage('get-quote'); }}
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Schedule Discovery Call
            </button>
          </div>
        </div>
      )}

      {/* Style block for responsive nav elements */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-btn { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
