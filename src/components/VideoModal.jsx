import React, { useEffect } from 'react';
import { X, Film } from 'lucide-react';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';

export default function VideoModal({ isOpen, videoData, onClose }) {
  useModalScrollLock(Boolean(isOpen && videoData));

  // Escape key close listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !videoData) return null;

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-4xl brutalist-border bg-[#2A2A29] text-white overflow-hidden shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 bg-[#1F1F1E] border-b-2 border-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="h-5 w-5 text-[#FF6636]" />
            <span className="font-display font-black uppercase text-base tracking-tight">
              {videoData.title || 'DS-Graphix Motion Reel Showcase'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[44px] min-h-[44px] inline-flex items-center justify-center brutalist-border bg-[#2A2A29] text-white hover:bg-white hover:text-[#2A2A29] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            className="absolute inset-0 w-full h-full border-none"
            src={videoData.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
            title="Video Reel Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info */}
        <div className="p-5 sm:p-6 bg-[#1F1F1E] border-t-2 border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-display font-black uppercase text-sm text-white">
              {videoData.client || 'DS-Graphix Production'}
            </div>
            <div className="text-xs font-sans text-white/70 mt-0.5">
              {videoData.overview || '3D Motion graphics, viral social reels, and high-impact promo video editing.'}
            </div>
          </div>
          <div className="inline-flex items-center justify-center px-4 py-1.5 brutalist-border bg-[#FF6636] text-[#2A2A29] font-display text-xs font-black uppercase tracking-wider shrink-0">
            {videoData.category || 'Motion Reels'}
          </div>
        </div>
      </div>
    </div>
  );
}
