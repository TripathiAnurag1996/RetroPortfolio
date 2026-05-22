import { memo, useCallback } from 'react'
import OptimizedImage from '../Common/OptimizedImage'
import styles from './AboutWindow.module.css'
import { event } from '../../lib/gtag'

// Skills categorized
const SKILLS = {
  aiMl: [
    'LLMs & GENERATIVE AI',
    'RAG ARCHITECTURE',
    'MODEL EVALUATION',
    'PROMPT ENGINEERING',
    'HUMAN-IN-THE-LOOP',
    'MULTIMODAL AI',
    'VOICE AI (STT/TTS)',
    'ON-DEVICE AI'
  ],
  product: [
    '0-to-1 PRODUCT DEV',
    'PRODUCT STRATEGY',
    'GTM STRATEGY',
    'ROADMAP PLANNING',
    'DISCOVERY',
    'KPIS/OKRS',
    'MVP SCOPING',
    'PRDS',
    'STAKEHOLDER MGMT',
    'USER RESEARCH'
  ],
  analytics: ['SQL', 'A/B TESTING', 'GOOGLE ANALYTICS', 'AMPLITUDE', 'FUNNEL ANALYSIS'],
  technical: ['TYPESCRIPT', 'ELECTRON', 'PYTHON', 'JAVA', 'WEBSOCKETS', 'CHROME APIS', 'VS CODE APIS', 'CLOUDFLARE'],
  execution: ['AGILE', 'SCRUM', 'JIRA', 'LINEAR', 'GITHUB']
}

const ANALYTICS_TECH = [...SKILLS.analytics, ...SKILLS.technical]

function AboutWindow() {
  const handleExternalClick = useCallback((label: string) => {
    event('external_link_clicked', {
      category: 'navigation',
      label: label.toUpperCase(),
      source: 'about_window'
    })
  }, [])

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
          <p className={styles.title}>AI Product Manager & Founder</p>

          <p className={styles.tagline}>
            I build AI products from 0→1 | LLM Systems | Voice AI | 6+ Years Experience
          </p>

          <p className={styles.bio}>
            AI Product Manager and Founder with 6+ years of experience. Independently conceived, built, and shipped multiple production AI products reaching <strong>1000+</strong> users across <strong>60+</strong> countries. Deep hands-on expertise in generative AI, LLM product design, prompt engineering, RAG, and multimodal voice AI pipelines.
          </p>
        </div>
      </header>

      {/* Skills sections (lines 71-112) remain unchanged */}
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
            <a 
              href="mailto:anurag.akt@gmail.com" 
              className={styles.contactLink}
              onClick={() => handleExternalClick('EMAIL')}
            >
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
              onClick={() => handleExternalClick('LINKEDIN')}
            >
              LINKEDIN <span className={styles.externalIcon}>↗</span>
            </a>

            <a
              href="https://github.com/TripathiAnurag1996/"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalClick('GITHUB')}
            >
              GITHUB <span className={styles.externalIcon}>↗</span>
            </a>

            <a
              href="https://x.com/anuragships"
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalClick('TWITTER')}
            >
              X (TWITTER) <span className={styles.externalIcon}>↗</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}

export default memo(AboutWindow)