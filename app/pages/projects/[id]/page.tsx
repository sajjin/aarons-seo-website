'use client';

import { useParams } from 'next/navigation';
import AnnouncementBanner from '../../../components/AnnouncementBanner/AnnouncementBanner';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import BackToTop from '../../../components/BackToTop/BackToTop';
import IndividualProject from '../indivprojects';
import styles from '../../homepage/page.module.css';

export default function DynamicProjectPage() {
  const params = useParams();
  const projectId = params?.id as string;

  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={styles.mainContent}>
        <IndividualProject projectId={projectId} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
