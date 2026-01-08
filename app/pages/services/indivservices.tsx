'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './indivservices.module.css';
import servicesData from '../../data/services.json';

interface ServiceSection {
  id: string;
  heading: string;
  text: string;
  image: string;
  layout: 'image-left' | 'image-right';
}

interface ServiceSpecs {
  [key: string]: string;
}

interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  sections: ServiceSection[];
  specs: ServiceSpecs;
  features: string[];
}

interface IndividualServiceProps {
  serviceId: string;
}

export default function IndividualService({ serviceId }: IndividualServiceProps) {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const service = servicesData.find((s) => s.id === serviceId) as ServiceData | undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (!service) {
    return (
      <div className={styles.notFound}>
        <h2>Service Not Found</h2>
        <p>The service you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/pages/services" className={styles.backLink}>
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.serviceContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection} data-animate id="hero">
        <div className={styles.heroImageWrapper}>
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className={`${styles.heroImage} ${isVisible['hero'] ? styles.zoomIn : ''}`}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${isVisible['hero'] ? styles.slideUp : ''}`}>
            {service.title}
          </h1>
          <p className={`${styles.heroSubtitle} ${isVisible['hero'] ? styles.slideUp : ''}`}>
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Specs Section */}
      <section
        className={`${styles.specsSection} ${isVisible['specs'] ? styles.fadeIn : ''}`}
        data-animate
        id="specs"
      >
        <div className={styles.specsContainer}>
          <h2 className={styles.specsHeading}>Service Details</h2>
          <div className={styles.specsGrid}>
            {Object.entries(service.specs).map(([key, value], index) => (
              <div
                key={key}
                className={`${styles.specCard} ${isVisible['specs'] ? styles.slideUp : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.specLabel}>{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</div>
                <div className={styles.specValue}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section
        className={`${styles.featuresSection} ${isVisible['features'] ? styles.fadeIn : ''}`}
        data-animate
        id="features"
      >
        <div className={styles.featuresContainer}>
          <h2 className={styles.featuresHeading}>What We Offer</h2>
          <div className={styles.featuresList}>
            {service.features.map((feature, index) => (
              <div
                key={index}
                className={`${styles.featureItem} ${isVisible['features'] ? styles.slideIn : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={styles.featureCheck}>✓</span>
                <span className={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {service.sections.map((section) => (
        <section
          key={section.id}
          className={`${styles.contentSection} ${
            section.layout === 'image-left' ? styles.imageLeft : styles.imageRight
          } ${isVisible[section.id] ? styles.visible : ''}`}
          data-animate
          id={section.id}
        >
          <div className={styles.contentContainer}>
            <div className={styles.imageColumn}>
              <div className={`${styles.imageWrapper} ${isVisible[section.id] ? styles.scaleIn : ''}`}>
                <Image
                  src={section.image}
                  alt={section.heading}
                  width={600}
                  height={400}
                  className={styles.sectionImage}
                />
              </div>
            </div>
            <div className={styles.textColumn}>
              <h2 className={`${styles.sectionHeading} ${isVisible[section.id] ? styles.slideIn : ''}`}>
                {section.heading}
              </h2>
              <p className={`${styles.sectionText} ${isVisible[section.id] ? styles.fadeInText : ''}`}>
                {section.text}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section
        className={`${styles.ctaSection} ${isVisible['cta'] ? styles.fadeIn : ''}`}
        data-animate
        id="cta"
      >
        <div className={styles.ctaContainer}>
          <h2>Ready to Get Started?</h2>
          <p>Contact us today to discuss your service needs.</p>
          <Link href="/pages/contact-us" className={styles.ctaButton}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
