import React, { useState } from 'react';
import { Sliders, Eye, Code, Palette, Sparkles, X, Check } from 'lucide-react';

export default function CmsPreviewWidget() {
  const [open, setOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FF6636');
  const [activeTab, setActiveTab] = useState('inspector');

  const handleColorChange = (color) => {
    setPrimaryColor(color);
    document.documentElement.style.setProperty('--color-primary', color);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 1100 }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'var(--color-dark-neutral)',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-primary)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <Sliders size={16} color="var(--color-primary)" />
          CMS & Design Inspector
        </button>
      ) : (
        <div
          style={{
            width: '320px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border-light)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: 'var(--color-dark-neutral)',
              color: '#FFFFFF',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '14px' }}>
              <Sparkles size={16} color="var(--color-primary)" /> CMS Design System Control
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border-light)', background: '#F8FAFC' }}>
            <button
              onClick={() => setActiveTab('inspector')}
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeTab === 'inspector' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'inspector' ? 'var(--color-primary)' : '#666',
                border: 'none'
              }}
            >
              Palette Inspector
            </button>
            <button
              onClick={() => setActiveTab('cms')}
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeTab === 'cms' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'cms' ? 'var(--color-primary)' : '#666',
                border: 'none'
              }}
            >
              CMS Schema Ready
            </button>
          </div>

          <div style={{ padding: '16px' }}>
            {activeTab === 'inspector' ? (
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                  Live Primary Accent Palette:
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  {[
                    { name: 'DS Orange', hex: '#FF6636' },
                    { name: 'Electric Coral', hex: '#FF4757' },
                    { name: 'Violet Pulse', hex: '#8B5CF6' },
                    { name: 'Emerald', hex: '#10B981' }
                  ].map(c => (
                    <button
                      key={c.hex}
                      onClick={() => handleColorChange(c.hex)}
                      title={c.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: c.hex,
                        border: primaryColor === c.hex ? '3px solid #1A1A1A' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>

                <div style={{ background: 'var(--color-bg-section)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--color-text-dark)' }}>
                  <div><strong>Font Heading:</strong> Outfit</div>
                  <div><strong>Font Body:</strong> Plus Jakarta Sans</div>
                  <div><strong>Accent:</strong> {primaryColor}</div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--color-text-dark)' }}>
                <p style={{ marginBottom: '8px' }}>✅ Fully decoupled JSON schema architecture ready for Headless CMS integration (Strapi, Sanity, Contentful, WordPress).</p>
                <div style={{ background: '#1E1E1D', color: '#4ADE80', padding: '10px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '11px' }}>
                  &#123; "agency": "DS-Graphix", "status": "CMS_READY" &#125;
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
