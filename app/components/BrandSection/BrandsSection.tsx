import Image from 'next/image';
import Link from 'next/link';
import styles from './BrandsSection.module.css';
import { BRANDS } from '../../data/site';

export default function BrandsSection() {
  return (
    <section className={styles.brandsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Popular Brands</h2>
          <Link href="https://boostbarnmotorsports.com/pages/brands" className={styles.textLink}>
            view more
          </Link>
        </div>
        <div className={styles.logoList}>
          {BRANDS.map((brand) => (
            <div key={brand.name} className={styles.logoItem}>
              <Link href={brand.href} className={styles.logoLink}>
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={170}
                  height={170}
                  className={styles.logoImage}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
