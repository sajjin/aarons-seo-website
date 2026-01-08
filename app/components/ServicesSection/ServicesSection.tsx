import Image from 'next/image';
import Link from 'next/link';
import styles from './ServicesSection.module.css';
import servicesData from '../../data/services.json';

export interface ServicesSectionProps {
  heading?: string;
  limit?: number;
  sectionId?: string;
  showAll?: boolean;
  hideViewAllLink?: boolean;
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  features: string[];
}

export default function ServicesSection({ 
  heading = "Our Services", 
  limit,
  sectionId = "services",
  showAll = false,
  hideViewAllLink = false
}: ServicesSectionProps) {
  const services = servicesData as Service[];
  const displayedServices = showAll ? services : (limit ? services.slice(0, limit) : services);

  return (
    <section className={styles.servicesSection} id={sectionId}>
      <div className={styles.servicesSectionContainer}>
        <div className={styles.servicesSectionHeader}>
          <h2>{heading}</h2>
          {!hideViewAllLink && (
            <Link href="/pages/services" className={styles.viewAllLink}>
              View All Services
            </Link>
          )}
        </div>
        
        <div className={styles.servicesGrid}>
          {displayedServices.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <Link href={`/pages/services/${service.id}`} className={styles.serviceCardLink}>
                <div className={styles.serviceImageWrapper}>
                  <Image 
                    src={service.heroImage} 
                    alt={service.title} 
                    fill
                    className={styles.serviceImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.serviceOverlay}></div>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <ul className={styles.serviceFeatures}>
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className={styles.featureItem}>
                          <span className={styles.featureIcon}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <span className={styles.learnMore}>
                    Learn More →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
