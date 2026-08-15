import { useEffect } from 'react';
import { getLenis } from '@/lib/smooth-scroll';

/**
 * Custom hook to lock body scrolling & stop Lenis smooth scroll
 * whenever a modal/dialog is open. Restores scroll on close.
 */
export function useModalScrollLock(isOpen = true) {
  useEffect(() => {
    if (!isOpen) return;

    // 1. Lock document body overflow
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 2. Stop Lenis smooth scroll loop from moving background page
    const lenis = getLenis();
    if (lenis) {
      lenis.stop();
    }

    return () => {
      // Restore original body overflow
      document.body.style.overflow = originalOverflow;

      // Resume Lenis smooth scroll loop
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen]);
}
