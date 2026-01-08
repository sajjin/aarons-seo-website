import styles from './page.module.css';
import Header from '@/app/components/Header/Header';
import HeroSection from '@/app/components/HeroSection/HeroSection';
import BrandsSection from '@/app/components/BrandSection/BrandsSection';
import ProjectsSection from '@/app/components/ProjectsSection/ProjectsSection';
import ServicesSection from '@/app/components/ServicesSection/ServicesSection';
import ProductSection from '@/app/components/ProductSection/ProductSection';
import AnnouncementBanner from '@/app/components/AnnouncementBanner/AnnouncementBanner';
import BackToTop from '@/app/components/BackToTop/BackToTop';
import Footer from '@/app/components/Footer/Footer';
import { SUSPENSION_ITEMS, SUSPENSION_PRODUCTS } from '../../data/site';
import VehicleSelector from '@/app/components/VehicleSelector/VehicleSelector';


export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={styles.mainContent}>
        <VehicleSelector />
        <HeroSection />
        <BrandsSection />
        <ServicesSection heading="Our Services" />

        <ProjectsSection />
        <ProductSection
          title="Merch"
          viewMoreHref="#"
          menuItems={SUSPENSION_ITEMS}
          products={SUSPENSION_PRODUCTS}
          heroImage="/assets/img/Product-hero-image.jpeg"
          heroImageAlt="Merch Showcase"
          sectionId="merch"
        />
        <Footer />
        <BackToTop />
      </main>

    </>
  );
}
