import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectsSection.module.css';
import individualProjects from '../../data/individualProjects.json';

interface ProjectsSectionProps {
  showAll?: boolean; // if true render all projects, otherwise render a default subset
  limit?: number; // optional explicit limit overrides showAll logic
  heading?: string; // allow custom heading text
  hideViewAllLink?: boolean; // option to hide the View All link when already on projects page
}

export default function ProjectsSection({ showAll, limit, heading, hideViewAllLink }: ProjectsSectionProps) {
  const effectiveProjects = (() => {
    const list = individualProjects as Array<{
      id: string;
      title: string;
      heroImage: string;
    }>;
    if (typeof limit === 'number') return list.slice(0, limit);
    if (showAll) return list;
    return list.slice(0, 6);
  })();

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>{heading || 'Projects'}</h2>
          {!hideViewAllLink && (
            <Link href="/pages/projects" className={styles.textLink}>
              View All
            </Link>
          )}
        </div>
        <div className={styles.haloRow}>
          {effectiveProjects.map((project) => (
            <div key={project.id} className={styles.haloItem}>
              <div className={styles.cardTextOverlay}>
                <div className={styles.projectImage}>
                  <Link href={`/pages/projects/${project.id}`} className={styles.projectImage}>
                    <Image src={(project as any).heroImage} alt={project.title} fill className={styles.projectImageTag} />
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
