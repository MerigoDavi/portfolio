import { useRef } from 'react';
import { useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

interface MagneticEffectOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticEffect<T extends HTMLElement>({
  strength = 0.3,
  radius = 100,
}: MagneticEffectOptions = {}) {
  const ref = useRef<T>(null);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 300, friction: 30 },
  }));

  useGesture(
    {
      onMove: ({ xy: [mx, my] }) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = mx - centerX;
        const distanceY = my - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < radius) {
          const factor = (1 - distance / radius) * strength;
          api.start({
            x: distanceX * factor,
            y: distanceY * factor,
          });
        } else {
          api.start({ x: 0, y: 0 });
        }
      },
      onHover: ({ hovering }) => {
        if (!hovering) {
          api.start({ x: 0, y: 0 });
        }
      },
    },
    {
      target: ref,
      eventOptions: { passive: true },
    }
  );

  return { ref, style: { x, y } };
}
