import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.bgGlow}></div>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className={styles.heroBadge}>🚀 Join the Open Source Movement</div>
            <Heading as="h1" className={styles.heroTitle}>
              From First Commit to <span className={styles.gradientText}>Global Impact</span>
            </Heading>
            <p className={styles.heroSubtitle}>
              A structured path for African developers to master modern engineering, 
              build world-class software, and lead in the global open-source ecosystem.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.mainCta} to="/curriculum">
                Start Learning
              </Link>
              <Link className={styles.secondaryCta} to="/blog">
                Read the Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Real-World Experience',
    emoji: '🛠️',
    description: 'We don’t just teach syntax. Our curriculum is built around real pull requests and actual contributions to major projects.',
  },
  {
    title: 'Industry Ready',
    emoji: '📈',
    description: 'Learn the workflows used by top engineering teams globally—from deep architectural patterns to effective documentation.',
  },
  {
    title: 'A Community That Grows',
    emoji: '🌍',
    description: 'Connect with a network of African developers who are breaking barriers and building the future of technology in public.',
  },
];

function HomepageMain() {
  return (
    <main className={styles.mainContent}>
      <section className={styles.featuresSection}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <div key={idx} className="col col--4">
                <div className={styles.featureCard}>
                  <div className={styles.featureEmoji}>{props.emoji}</div>
                  <h3>{props.title}</h3>
                  <p>{props.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Build for the world, from Africa.</h2>
            <p>Our curriculum is open, free, and designed for your growth.</p>
            <Link className="button button--secondary button--lg" to="/curriculum">
              Browse the Curriculum
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Build for the World"
      description="Empowering African developers to lead in the global open-source ecosystem.">
      <HeroSection />
      <HomepageMain />
    </Layout>
  );
}