'use client';
import { useState } from 'react';
import styles from './AnnouncementBanner.module.css';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return (
    <div className={styles.announcementBarWrapper}>
      <div className={styles.announcementBar}>
        With potential changes in parts pricing from tariffs, please be advised that pricing shown
        may not be accurate. If not, you will be updated as soon as your order is reviewed and you
        may cancel if needed.
      </div>
      <button className={styles.announcementBarClose} onClick={() => setIsVisible(false)} aria-label="close">
        ✕
      </button>
    </div>
  );
}
