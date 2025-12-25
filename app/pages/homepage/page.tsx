import styles from './page.module.css';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import BrandsSection from '../../components/BrandSection/BrandsSection';
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection';
import ProductSection from '../../components/ProductSection/ProductSection';
import AnnouncementBanner from '../../components/AnnouncementBanner/AnnouncementBanner';
import BackToTop from '../../components/BackToTop/BackToTop';
import Footer from '../../components/Footer/Footer';
import { SUSPENSION_ITEMS, SUSPENSION_PRODUCTS } from '../../data/site';


export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
        <BrandsSection />
        <ProductSection
          title="Merch"
          viewMoreHref="#"
          menuItems={SUSPENSION_ITEMS}
          products={SUSPENSION_PRODUCTS}
          heroImage="/assets/img/products/Fortune_Auto_Pic_450x.webp"
          heroImageAlt="Suspension Showcase"
          sectionId="suspension"
        />
  
      </main>
      <ProjectsSection />
      <Footer />
      <BackToTop />
    </>
  );
}
