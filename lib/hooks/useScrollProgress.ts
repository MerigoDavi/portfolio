import { useEffect } from 'react';
import { useStore } from '@/lib/store/useStore';

export function useScrollProgress() {
  const setScrollY = useStore((state) => state.setScrollY);
  const setScrollProgress = useStore((state) => state.setScrollProgress);
  const setScrollDirection = useStore((state) => state.setScrollDirection);
  const setIsScrolling = useStore((state) => state.setIsScrolling);

  useEffect(() => {
    let lastScrollY = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;

      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [setScrollY, setScrollProgress, setScrollDirection, setIsScrolling]);
}
