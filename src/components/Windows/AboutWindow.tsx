import { memo } from 'react'
import styles from './AboutWindow.module.css'

// Skills categorized
const SKILLS = {
  aiMl: [
    'LLM PRODUCT STRATEGY', 'MODEL EVALUATION', 'GENERATIVE AI',
    'AGENTIC WORKFLOWS', 'RAG ARCHITECTURES', 'PROMPT ENGINEERING'
  ],
  product: [
    'PRODUCT STRATEGY', 'PRODUCT LIFECYCLE', 'DISCOVERY', 'GTM STRATEGY',
    'ROADMAP PLANNING', 'MARKET RESEARCH', 'KPIS/OKRS', 'MVP', 'PRDS',
    'WIREFRAMING', 'STAKEHOLDER MGMT', 'RICE/MOSCOW', 'USER RESEARCH'
  ],
  analytics: ['SQL', 'A/B TESTING', 'GOOGLE ANALYTICS', 'MIXPANEL'],
  technical: ['PYTHON', 'JAVA', 'GIT', 'SUPABASE', 'JIRA', 'FIGMA', 'API DESIGN', 'REST APIS'],
  execution: ['AGILE', 'SCRUM', 'CROSS-FUNCTIONAL COLLABORATION']
}

function AboutWindow() {
  return (
    <div className={styles.about}>
      {/* Header with Avatar and Name */}
      <header className={styles.header}>
        <div className={styles.avatar}>
          <img 
            src="/profile.jpg" 
            alt="Anurag Kumar Tripathi" 
            className={styles.avatarImage}
          />
        </div>
        
        <div className={styles.info}>
          <h1 className={styles.name}>Anurag Kumar Tripathi</h1>
          <p className={styles.title}>AI Product Manager</p>
          <p className={styles.tagline}>
            Building AI-powered products from 0-to-1 | LLM Product Strategy | 5+ Years Experience
          </p>
          <p className={styles.bio}>
            AI Product Manager with 5+ years of experience across Product Management and Software Engineering, 
            building and scaling AI-powered products from 0-to-1. Proven track record launching LLM-integrated 
            features that drive measurable adoption, reduce support costs by <strong>12%</strong>, improve 
            operational efficiency by <strong>30%</strong>, and achieve <strong>20% DAU</strong> adoption.
          </p>
        </div>
      </header>
      
      {/* Skills Section */}
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
            {[...SKILLS.analytics, ...SKILLS.technical].map((skill) => (
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
      
      {/* Contact Section */}
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
              href="https://www.linkedin.com/in/anurag-tripathi" 
              className={styles.socialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN <span className={styles.externalIcon}>↗</span>
            </a>
            <a 
              href="https://github.com/anurag-tripathi" 
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
