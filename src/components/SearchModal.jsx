import React, { useState } from 'react';
import { Search, X, ArrowRight, Layout, Sparkles, Palette, Video, FileText, HelpCircle } from 'lucide-react';
import { servicesData, portfolioData, blogPosts, faqsData } from '../data/mockData';

export default function SearchModal({ isOpen, onClose, setCurrentPage }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredServices = servicesData.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) || s.shortDesc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPortfolio = portfolioData.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlog = blogPosts.filter(b =>
    b.title.toLowerCase().includes(query.toLowerCase()) || b.snippet.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFaqs = faqsData.filter(f =>
    f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (pageId) => {
    setCurrentPage(pageId);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(26, 26, 25, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'float 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input Bar */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <Search size={22} color="var(--color-primary)" />
          <input
            type="text"
            placeholder="Search DS-Graphix services, portfolio, blog, or FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '18px',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-dark)'
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Search Results Container */}
        <div style={{ maxHeight: '460px', overflowY: 'auto', padding: '20px' }}>
          {!query && (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '30px 0' }}>
              <Sparkles size={32} color="var(--color-primary)" style={{ marginBottom: '10px' }} />
              <p style={{ fontWeight: '600' }}>Search across all 15 agency pages & capabilities</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '14px', flexWrap: 'wrap' }}>
                {['UI/UX Design', 'Branding', 'Motion Reels', 'Process', 'Pricing'].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(tag)}
                    style={{
                      background: 'var(--color-bg-section)',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '13px',
                      color: 'var(--color-text-dark)',
                      cursor: 'pointer'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Services Results */}
              {filteredServices.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Services ({filteredServices.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredServices.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleSelect(`service-${s.id}`)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          background: '#F8FAFC',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '15px' }}>{s.title}</div>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{s.shortDesc}</div>
                        </div>
                        <ArrowRight size={16} color="var(--color-primary)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Results */}
              {filteredPortfolio.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Case Studies ({filteredPortfolio.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredPortfolio.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect('portfolio')}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          background: '#F8FAFC',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '15px' }}>{p.title}</div>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{p.overview}</div>
                        </div>
                        <span style={{ fontSize: '12px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: '700' }}>
                          {p.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Results */}
              {filteredBlog.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Articles ({filteredBlog.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredBlog.map(b => (
                      <div
                        key={b.id}
                        onClick={() => handleSelect('blog')}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-sm)',
                          background: '#F8FAFC',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '15px' }}>{b.title}</div>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{b.readTime} • {b.category}</div>
                        </div>
                        <FileText size={16} color="var(--color-primary)" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredServices.length === 0 && filteredPortfolio.length === 0 && filteredBlog.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)' }}>
                  No results found for "{query}". Try searching for UI/UX, Logo, or Pricing.
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
