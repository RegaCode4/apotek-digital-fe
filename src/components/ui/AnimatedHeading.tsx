import React, { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { animate, splitText, stagger } from 'animejs';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Komponen AnimatedHeading
 * Membungkus elemen heading (h1-h6) dengan efek animasi teks masuk.
 * Menggunakan library animejs untuk memecah teks dan memberikan animasi stagger saat elemen muncul di layar.
 */
export default function AnimatedHeading({ children, className = "", as: Component = 'h2' }: AnimatedHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let isMounted = true;
    let split: any = null;
    
    if (isInView && ref.current) {
      document.fonts.ready.then(() => {
        if (!isMounted || !ref.current) return;
        
        split = splitText(ref.current, {
          lines: { wrap: 'clip' },
        });

        split.addEffect(({ lines }: any) => animate(lines, {
          y: ['100%', '0%'],
          duration: 750,
          ease: 'out(3)',
          delay: stagger(200),
        }));
      });
    }

    return () => {
      isMounted = false;
      if (split) {
        split.revert();
      }
    };
  }, [isInView]);

  return (
    <Component ref={ref as any} className={className}>
      {children}
    </Component>
  );
}
