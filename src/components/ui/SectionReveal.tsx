/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

/**
 * Komponen SectionReveal
 * Pembungkus (wrapper) animasi yang menampilkan elemen dengan efek transisi memudar (fade in) 
 * dan bergeser ke atas saat elemen tersebut terlihat di layar (scroll viewport).
 */
export default function SectionReveal({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  className = ""
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Kurva transisi (easing) cubic bezier yang halus (ease-out-expo)
      }}
    >
      {children}
    </motion.div>
  );
}
