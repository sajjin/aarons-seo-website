'use client';

import styles from '../homepage/page.module.css';
import AnnouncementBanner from '../../components/AnnouncementBanner/AnnouncementBanner';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';
import ServicesSection from '../../components/ServicesSection/ServicesSection';

export default function Services() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={styles.mainContent}>
        <ServicesSection showAll heading="Our Services" hideViewAllLink />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
