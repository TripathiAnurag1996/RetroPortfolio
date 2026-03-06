import { memo } from 'react'
import OptimizedImage from '../Common/OptimizedImage'
import styles from './AboutWindow.module.css'

// Skills categorized
const SKILLS = {
  aiMl: [
    'LLM FEATURE STRATEGY',
    'MODEL EVALUATION',
    'GENERATIVE AI',
    'PROMPT ENGINEERING',
    'RAG-BASED SEARCH',
    'HUMAN-IN-THE-LOOP DESIGN'
  ],
  product: [
    'PRODUCT STRATEGY',
    'PRODUCT LIFECYCLE',
    'DISCOVERY',
    'GTM STRATEGY',
    'ROADMAP PLANNING',
    'MARKET RESEARCH',
    'KPIS/OKRS',
    'MVP',
    'PRDS',
    'WIREFRAMING',
    'STAKEHOLDER MGMT',
    'RICE/MOSCOW',
    'USER RESEARCH'
  ],
  analytics: ['SQL', 'A/B TESTING', 'GOOGLE ANALYTICS', 'MIXPANEL'],
  technical: ['PYTHON', 'JAVA', 'GIT', 'SUPABASE', 'JIRA', 'FIGMA', 'API DESIGN', 'REST APIS'],
  execution: ['AGILE', 'SCRUM', 'CROSS-FUNCTIONAL COLLABORATION']
}

const ANALYTICS_TECH = [...SKILLS.analytics, ...SKILLS.technical]

function AboutWindow() {
  return (
    <div className={styles.about}>
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.avatar}>
          <OptimizedImage
            src="/profile.png"
            alt="Anurag Kumar Tripathi"
            className={styles.avatarImage}
            width={140}
            height={140}
            loading="eager"
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>Anurag Kumar Tripathi</h1>
          <p className={styles.title}>AI Product Manager</p>

          <p className={styles.tagline}>
            Building AI-powered products from 0→1 | LLM Systems | Product Strategy | 5+ Years Experience
          </p>

          <p className={styles.bio}>
            AI Product Manager with 5+ years of experience across Product Management and Software Engineering,
            shipping LLM-powered and AI-driven product features. Delivered measurable outcomes including
            reducing support load by <strong>12%</strong>, improving operational efficiency by <strong>30%</strong>,
            and driving <strong>20% DAU</strong> adoption for data-driven product features.
          </p>
        </div>
      </header>

      {/* Skills */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>

        <div className={styles.skillCategory}>
          <span className={styles.categoryLabel}>AI/ML Product (Core)</span>
          <div className={styles.skills}>
            {SKILLS.aiMl.map((skill) => (
              <span key={skill} className={`${styles.skill} ${styles.primary}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.skillCategory}>
          <span className={styles.categoryLabel}>Product Management</span>
          <div className={styles.skills}>
            {SKILLS.product.map((skill) => (
              <span key={skill} className={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className={styles.skillCategory}>
          <span className={styles.categoryLabel}>Analytics & Technical</span>
          <div className={styles.skills}>
            {ANALYTICS_TECH.map((skill) => (
              <span key={skill} className={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className={styles.skillCategory}>
          <span className={styles.categoryLabel}>Execution</span>
          <div className={styles.skills}>
            {SKILLS.execution.map((skill) => (
              <span key={skill} className={styles.skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Contact</h2>

        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📧</span>
            <a href="mailto:anurag.akt@gmail.com" className={styles.contactLink}>
              anurag.akt@gmail.com
            </a>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📱</span>
            <span>+91 8979975078</span>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📍</span>
            <span>Gurugram, India</span>
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/in/anuragtripathi-pm/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN <span className={styles.externalIcon}>↗</span>
            </a>

            <a
              href="https://github.com/TripathiAnurag1996/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB <span className={styles.externalIcon}>↗</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default memo(AboutWindow)