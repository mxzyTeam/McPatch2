import {useState, useCallback, useRef} from 'react';

/**
 * Hook for button click bounce animation.
 * Returns: { bounceClass, handleBounceClick }
 * - bounceClass: string to add to className
 * - handleBounceClick: call in onClick handler
 */
export function useBounceClick() {
  const [bounceClass, setBounceClass] = useState('');
  const timerRef = useRef(null);

  const handleBounceClick = useCallback((e) => {
    // Clear any pending cleanup
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setBounceClass('');
    }

    // Force reflow to restart animation
    requestAnimationFrame(() => {
      setBounceClass('neu-btn-bounce');
      timerRef.current = setTimeout(() => {
        setBounceClass('');
        timerRef.current = null;
      }, 500);
    });
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setBounceClass('');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return { bounceClass, handleBounceClick, handleAnimationEnd };
}

/**
 * Hook for ripple click effect.
 * Returns: { ripples, addRipple }
 * - ripples: array of ripple objects to render
 * - addRipple: call in onClick with the event
 */
export function useRipple() {
  const [ripples, setRipples] = useState([]);
  const counterRef = useRef(0);

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const id = counterRef.current++;

    setRipples(prev => [...prev, { id, x, y, size }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  }, []);

  return { ripples, addRipple };
}
