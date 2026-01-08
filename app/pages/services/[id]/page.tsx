'use client';

import { useParams } from 'next/navigation';
import AnnouncementBanner from '../../../components/AnnouncementBanner/AnnouncementBanner';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import BackToTop from '../../../components/BackToTop/BackToTop';
import IndividualService from '../indivservices';
import styles from '../../homepage/page.module.css';

export default function DynamicServicePage() {
  const params = useParams();
  const serviceId = params?.id as string;

  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={styles.mainContent}>
        <IndividualService serviceId={serviceId} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
