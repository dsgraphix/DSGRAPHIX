import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

export function InstagramCarousel({
  images = [],
  alt = "Project Preview",
  aspectRatio = "aspect-16/10",
  className = "",
  showBadge = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}) {
  // Normalize images array
  const imageList = Array.isArray(images) && images.length > 0 
    ? images.filter(Boolean).slice(0, 10) 
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null);

  const total = imageList.length;

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // minimum swipe distance in px

    if (diff > threshold) {
      goToNext(); // Swiped left -> next
    } else if (diff < -threshold) {
      goToPrev(); // Swiped right -> prev
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Optional auto-play
  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, goToNext, total]);

  if (total === 0) {
    return (
      <div className={`relative ${aspectRatio} bg-[#1F1F1E] flex items-center justify-center text-white/40 ${className}`}>
        <p className="text-xs uppercase font-bold font-mono">No Image</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative ${aspectRatio} overflow-hidden bg-black select-none group focus:outline-none ${className}`}
      aria-label="Project images carousel"
    >
      {/* Slider Track */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {imageList.map((imgUrl, idx) => (
          <div
            key={`${imgUrl}-${idx}`}
            className="h-full w-full shrink-0 relative overflow-hidden bg-[#1a1a19]"
          >
            <img
              src={imgUrl}
              alt={`${alt} — slide ${idx + 1}`}
              loading={idx === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src = "/assets/fintech_app.png";
              }}
            />
          </div>
        ))}
      </div>

      {/* Multi-image indicator & Instagram Counter Badge */}
      {total > 1 && showBadge && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#2A2A29]/85 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-wider brutalist-border shadow-lg">
          <Layers className="h-3 w-3 text-[#FF6636]" />
          <span>
            {currentIndex + 1}/{total}
          </span>
        </div>
      )}

      {/* Navigation Arrows (Only shown when multiple images exist) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 flex items-center justify-center brutalist-border bg-[#2A2A29]/90 text-white backdrop-blur-md transition-all duration-200 cursor-pointer ${
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80 hover:opacity-100 hover:bg-[#FF6636] hover:text-[#2A2A29]"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            disabled={currentIndex === total - 1}
            aria-label="Next slide"
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 flex items-center justify-center brutalist-border bg-[#2A2A29]/90 text-white backdrop-blur-md transition-all duration-200 cursor-pointer ${
              currentIndex === total - 1
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80 hover:opacity-100 hover:bg-[#FF6636] hover:text-[#2A2A29]"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Instagram Bottom Dots Pagination Indicator */}
      {total > 1 && (
        <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
          <div className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1.5 pointer-events-auto">
            {imageList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? "w-5 h-1.5 bg-[#FF6636]"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
