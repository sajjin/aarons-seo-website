'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import styles from './HeroSection.module.css';

// You can swap / extend this list with any images placed in public/assets/img
const HERO_IMAGES = [
  '/assets/img/try_four.webp',
  '/assets/img/subby.jpeg',
  '/assets/img/tri-side.jpeg',
  '/assets/img/tri-open-hood.jpeg'
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return; // do not advance while paused
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2000); // advance every 2 seconds
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.containerFluid}>
        <div
          className={styles.hero}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-label="Showcasing featured Boost Barn vehicles"
        >
          <div className={styles.heroImageWrapper}>
            {HERO_IMAGES.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Hero slide ${i + 1}`}
                fill
                priority={i === 0}
                className={
                  i === index
                    ? `${styles.heroImage} ${styles.heroImageActive}`
                    : `${styles.heroImage} ${styles.heroImageInactive}`
                }
              />
            ))}
            {/* Simple progress dots */}
            <div className={styles.heroDots} role="tablist" aria-label="Hero slides">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={i === index ? styles.heroDotActive : styles.heroDot}
                  onClick={() => setIndex(i)}
                  type="button"
                />
              ))}
            </div>
          </div>
          <div className={styles.heroContent}>
            <h2 className={styles.megaTitleMedium}>Welcome to Boost Barn Motorsports</h2>
            <div className={styles.description}>
              <p>
                <strong>
                  We are a Subaru specialty shop located in Langley BC, Canada. We can help you
                  accomplish your dream Subaru build from start to finish.
                </strong>
              </p>
              <p>
                <strong>
                  We provide you with parts, services, fabrication, dyno tuning, start to finish
                  projects and maintenance. We are appointment based only, please contact us if you
                  need anything.
                </strong>
              </p>
              <p>
                <strong>
                  We also offer regular maintenance and repairs on your daily driver or street car.
                  Contact us to book an appointment.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
