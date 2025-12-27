import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductSection.module.css';

export interface ProductSectionProps {
  title: string;
  viewMoreHref: string;
  menuItems: Array<{ title: string; href: string }>;
  products: Array<{
    name: string;
    image: string;
    price: string;
    originalPrice?: string;
    href: string;
    onSale?: boolean;
  }>;
  heroImage?: string;
  heroImageAlt?: string;
  sectionId?: string;
}

export default function ProductSection({ title, viewMoreHref, menuItems, products, heroImage, heroImageAlt, sectionId }: ProductSectionProps) {
  return (
    <section className={styles.productSection} id={sectionId}>
      <div className={styles.productSectionContainer}>
        <div className={styles.productSectionHeader}>
          <h2>{title}</h2>
        </div>
        <div className={`${styles.productSectionContent} ${heroImage ? styles.hasFeatureImage : ''}`}>
          <aside className={styles.productSidebar} aria-label={`${title} subcategories`}>
            <ul className={styles.productMenuList}>
              {menuItems.map((item) => (
                <li key={item.title} className={styles.productMenuItem}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
          {heroImage && (
            <div className={styles.productFeatureImageWrapper}>
              <Image
                src={heroImage}
                alt={heroImageAlt || title}
                fill
                className={styles.productFeatureImage}
                sizes="(max-width: 900px) 100vw, 400px"
                priority={false}
              />
              <div className={styles.productFeatureBanner}>
                <span className={styles.productFeatureBannerText}>{title}</span>
              </div>
            </div>
          )}
          <div className={styles.productGrid}>
            {products.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <Link href={product.href} className={styles.productCardLink}>
                  <div className={styles.productImageWrapper}>
                    {product.onSale && <span className={styles.saleBadge}>Sale</span>}
                    <Image src={product.image} alt={product.name} width={300} height={300} className={styles.productImage} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <div className={styles.productPricing}>
                      {product.originalPrice && <span className={styles.originalPrice}>{product.originalPrice}</span>}
                      <span className={styles.productPrice}>{product.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
