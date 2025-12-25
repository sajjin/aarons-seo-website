'use client';

import styles from '../homepage/page.module.css';
import AnnouncementBanner from '../../components/AnnouncementBanner/AnnouncementBanner';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';

export default function Projects() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={styles.mainContent}>
        <ProjectsSection showAll heading="Our Projects" hideViewAllLink />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
