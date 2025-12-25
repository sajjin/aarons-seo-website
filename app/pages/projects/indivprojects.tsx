'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './indivprojects.module.css';
import projectsData from '../../data/individualProjects.json';

interface ProjectSection {
  id: string;
  heading: string;
  text: string;
  image: string;
  layout: 'image-left' | 'image-right';
}

interface ProjectSpecs {
  [key: string]: string;
}

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  sections: ProjectSection[];
  specs: ProjectSpecs;
  link: string;
}

interface IndividualProjectProps {
  projectId: string;
}

export default function IndividualProject({ projectId }: IndividualProjectProps) {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const project = projectsData.find((p) => p.id === projectId) as ProjectData | undefined;

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

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>Project Not Found</h2>
        <p>The project you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/projects" className={styles.backLink}>
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.projectContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection} data-animate id="hero">
        <div className={styles.heroImageWrapper}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className={`${styles.heroImage} ${isVisible['hero'] ? styles.zoomIn : ''}`}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${isVisible['hero'] ? styles.slideUp : ''}`}>
            {project.title}
          </h1>
          <p className={`${styles.heroSubtitle} ${isVisible['hero'] ? styles.slideUp : ''}`}>
            {project.subtitle}
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
          <h2 className={styles.specsHeading}>Specifications</h2>
          <div className={styles.specsGrid}>
            {Object.entries(project.specs).map(([key, value], index) => (
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

      {/* Content Sections */}
      {project.sections.map((section) => (
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
          <h2 className={styles.ctaHeading}>Want to Learn More?</h2>
          <p className={styles.ctaText}>
            Read the full build story and see more photos of this incredible project.
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            View Full Build
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
