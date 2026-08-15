import React from 'react';
import { X, Play, Volume2, Film } from 'lucide-react';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

export default function VideoModal({ isOpen, videoData, onClose }) {
  useModalScrollLock(Boolean(isOpen && videoData));

  if (!isOpen || !videoData) return null;

  return (
    <div
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 15, 14, 0.92)',
        backdropFilter: 'blur(16px)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        style={{
          width: '100%',
          maxWidth: '850px',
          background: '#1E1E1D',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 102, 54, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          style={{
            padding: '16px 24px',
            background: '#151514',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Film size={20} color="var(--color-primary)" />
            <span style={{ fontWeight: '700', fontSize: '16px' }}>{videoData.title || 'DS-Graphix Motion Reel Showcase'}</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000000' }}>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            src={videoData.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
            title="Video Reel Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        <div style={{ padding: '20px 24px', background: '#1E1E1D', color: '#A0A09E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: '700' }}>{videoData.client || 'DS-Graphix Production'}</div>
            <div style={{ fontSize: '13px' }}>{videoData.overview || '3D Motion graphics, viral social reels, and high-impact promo video editing.'}</div>
          </div>
          <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: '700', fontSize: '13px' }}>
            {videoData.category || 'Motion Reels'}
          </div>
        </div>
      </div>
    </div>
  );
}
