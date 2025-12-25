import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import projectsData from '../data/individualProjects.json';

interface EnhancedProjectsSectionProps {
  showAll?: boolean;
  limit?: number;
  heading?: string;
  hideViewAllLink?: boolean;
}

export default function EnhancedProjectsSection({
  showAll,
  limit,
  heading,
  hideViewAllLink,
}: EnhancedProjectsSectionProps) {
  const effectiveProjects = (() => {
    if (typeof limit === 'number') return projectsData.slice(0, limit);
    if (showAll) return projectsData;
    return projectsData.slice(0, 6);
  })();

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{heading || 'Projects'}</h2>
          {!hideViewAllLink && (
            <Link href="/projects" className={styles.textLink}>
              View All
            </Link>
          )}
        </div>
        <div className={styles.haloRow}>
          {effectiveProjects.map((project) => (
            <div key={project.id} className={styles.haloItem}>
              <div className={styles.cardTextOverlay}>
                <div className={styles.projectImage}>
                  <Link href={`/projects/${project.id}`} className={styles.projectImage}>
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className={styles.projectImageTag}
                    />
                  </Link>
                </div>
                <div className={styles.projectContent}>
                  <p className={styles.projectDescription}>
                    {project.title}
                    <span>›</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
