import { memo, useState, useCallback } from 'react'
import styles from './MyComputerWindow.module.css'

type SidebarItem = 'projects' | 'experience' | 'education' | 'certifications' | 'awards' | 'contact'

const SIDEBAR_ITEMS: { id: SidebarItem; label: string; icon: string }[] = [
  { id: 'projects', label: 'PROJECTS', icon: '🚀' },
  { id: 'experience', label: 'EXPERIENCE', icon: '💼' },
  { id: 'education', label: 'EDUCATION', icon: '🎓' },
  { id: 'certifications', label: 'CERTS', icon: '📜' },
  { id: 'awards', label: 'AWARDS', icon: '🏆' },
  { id: 'contact', label: 'CONTACT', icon: '📧' },
]

// Work Experience Data
const EXPERIENCE = [
  {
    company: 'SNABBITY',
    icon: '💼',
    role: 'AI Product Manager (Project-based)',
    location: 'Gurugram, India',
    date: 'Nov 2024 - Present',
    bullets: [
      'Launched AI-powered "Design Performance Insights" feature analyzing page layouts and funnel drop-offs',
      'Reduced funnel investigation time by <strong class="digit-clear">30%</strong> through standardized event tracking and automated drop-off identification',
      'Led AI-driven personalization initiative with product recommendations and behavior-based nudges',
      'Defined OKRs for AI features, aligning cross-functional teams on roadmap priorities'
    ],
    tech: 'LLM Integration, Analytics, Personalization'
  },
  {
    company: 'SOCIUS (STEALTH)',
    icon: '🚀',
    role: 'Founder',
    location: 'Bangalore, India',
    date: 'Sep 2023 - Oct 2024',
    bullets: [
      'Founded social discovery platform for hosting and discovering events (prototype stage)',
      'Conducted <strong class="digit-clear">200+</strong> user interviews across 6 customer segments using jobs-to-be-done framework',
      'Identified "discovery deadlock" as primary barrier through competitive analysis and user research',
      'Built clickable prototype and facilitated 12 moderated usability sessions'
    ],
    tech: 'Product Discovery, Prototyping, User Research'
  },
  {
    company: 'AITHENT TECHNOLOGIES',
    icon: '🤖',
    role: 'Senior Software Engineer',
    location: 'Gurugram, India',
    date: 'Dec 2022 - Sep 2023',
    bullets: [
      'Launched LLM-assisted help experience with intelligent search, reducing support tickets by <strong class="digit-clear">12%</strong>',
      'Improved answer quality through evaluation framework tracking CTR, helpfulness ratings, fallback frequency',
      'Increased system reliability by reducing recurring incidents by <strong class="digit-clear">22%</strong> via monitoring and SLOs',
      'Collaborated on PRDs for AI-powered features, translating business requirements to technical specs'
    ],
    tech: 'LLM Integration, Evaluation Frameworks, PRDs'
  },
  {
    company: 'XORIANT SOLUTIONS',
    icon: '💻',
    role: 'Software Engineer',
    location: 'Gurugram, India',
    date: 'Nov 2021 - Dec 2022',
    bullets: [
      'Owned intelligent spending categorization feature that grew to <strong class="digit-clear">20% DAU</strong> adoption in 3 months',
      'Developed backend services and APIs, improving reliability and response times',
      'Partnered with PMs on PRDs, user stories, and acceptance criteria aligned with product strategy'
    ],
    tech: 'Backend Development, API Design, Product Delivery'
  },
  {
    company: 'HEXAWARE TECHNOLOGIES',
    icon: '⚙️',
    role: 'Associate Software Engineer',
    location: 'Gurugram, India',
    date: 'Jun 2019 - Nov 2021',
    bullets: [
      'Designed real-time KPI dashboards (Java, SQL) that streamlined operational efficiency by <strong class="digit-clear">30%</strong>',
      'Empowered stakeholders with data-driven insights for product decisions'
    ],
    tech: 'Java, SQL, Dashboard Development, Analytics'
  },
  {
    company: 'IBM',
    icon: '🏢',
    role: 'Intern',
    location: 'Dehradun, India',
    date: 'Jun 2018 - Aug 2018',
    bullets: [
      'Contributed to ERP platform for educational asset management across multi-partner environment',
      'Designed backend business logic, improving application performance through debugging'
    ],
    tech: 'ERP, Backend Development, Business Logic'
  }
]

// Projects Data
const PROJECTS = [
  {
    title: 'AI-Powered Design Performance Insights',
    company: 'Snabbity',
    role: 'AI Product Manager',
    date: 'Nov 2024 - Present',
    description: 'Launched AI feature analyzing page layouts and design iterations across funnel steps (product page → add to cart → checkout), identifying drop-off points with actionable explanations.',
    impact: ['<strong class="digit-clear">30%</strong> reduction in funnel investigation time', 'Automated drop-off identification for each design change', 'Standardized event tracking framework'],
    tech: 'LLM Integration, Analytics, Event Tracking'
  },
  {
    title: 'LLM-Assisted Help Experience',
    company: 'Aithent Technologies',
    role: 'Senior Software Engineer',
    date: 'Dec 2022 - Sep 2023',
    description: 'Intelligent search system with contextually suggested answers powered by LLM, reducing support burden and improving self-service adoption.',
    impact: ['<strong class="digit-clear">12%</strong> reduction in support ticket volume', '<strong class="digit-clear">10%</strong> increase in self-service feature usage', 'Evaluation framework with CTR, helpfulness ratings'],
    tech: 'LLM, Evaluation Frameworks, API Design'
  },
  {
    title: 'Intelligent Spending Categorization',
    company: 'Xoriant Solutions',
    role: 'Software Engineer',
    date: 'Nov 2021 - Dec 2022',
    description: 'End-to-end delivery of AI-powered spending categorization and trend analysis feature.',
    impact: ['<strong class="digit-clear">20%</strong> DAU adoption within 3 months', 'Top-3 engagement driver on platform', 'Improved backend reliability and API response times'],
    tech: 'Java, Backend Services, REST APIs'
  },
  {
    title: 'Socius - Social Discovery Platform',
    company: 'Self-Founded',
    role: 'Founder',
    date: 'Sep 2023 - Oct 2024',
    description: 'Social discovery platform for hosting and discovering events, addressing "discovery deadlock" identified through extensive user research.',
    impact: ['<strong class="digit-clear">200+</strong> user interviews across 6 segments', 'Validated prototype through 12 usability sessions', 'Jobs-to-be-done framework adoption'],
    tech: 'Product Discovery, Prototyping, User Research'
  }
]

// Education Data
const EDUCATION = {
  degree: 'B.Tech. in Computer Science',
  institution: 'University of Petroleum And Energy Studies (UPES)',
  location: 'Dehradun, India',
  date: 'Jul 2015 - Jun 2019',
  coursework: ['Data Structures & Algorithms', 'Database Management', 'Software Engineering', 'AI/ML Fundamentals']
}

// Certifications
const CERTIFICATIONS = [
  { name: 'McKinsey Forward Program', issuer: 'McKinsey & Company' },
  { name: 'AI Product Management Certificate', issuer: 'IBM | Sep 2025' }
]

// Awards
const AWARDS = [
  { name: 'ACE Award for Product Excellence', desc: 'Recognized for proactive contributions to product stability, reducing downtime by 20%' },
  { name: 'SPOT Award for Operational Efficiency', desc: 'Awarded for initiatives that improved user retention and streamlined support processes' },
  { name: 'Product Innovation Award', desc: 'Acknowledged for process improvements that decreased response time to customer queries by 35%' },
  { name: 'Client Excellence Recognition', desc: 'Commended for consistently delivering high-quality solutions that boosted user satisfaction by 25%' }
]

function MyComputerWindow() {
  const [activeItem, setActiveItem] = useState<SidebarItem>('projects')
  
  const handleItemClick = useCallback((id: SidebarItem) => {
    setActiveItem(id)
  }, [])
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }
  
  const renderContent = () => {
    switch (activeItem) {
      case 'projects':
        return (
          <div>
            <h2 className={styles.contentTitle}>🚀 Featured Projects</h2>
            {PROJECTS.map((project, idx) => (
              <div key={idx} className={styles.projectCard}>
                <div className={styles.projectTitle}>{project.title}</div>
                <div className={styles.projectMeta}>
                  {project.company} | {project.role} | {project.date}
                </div>
                <p className={styles.projectDesc}>{project.description}</p>
                <ul className={styles.impactList}>
                  {project.impact.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: `✓ ${item}` }} />
                  ))}
                </ul>
                <div className={styles.expTech}>
                  <span className={styles.techLabel}>🔧 Tech: </span>{project.tech}
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'experience':
        return (
          <div>
            <h2 className={styles.contentTitle}>💼 Work Experience</h2>
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className={styles.experienceCard}>
                <div className={styles.expHeader}>
                  <div className={styles.expCompany}>
                    <span className={styles.expIcon}>{exp.icon}</span>
                    {exp.company}
                  </div>
                  <div className={styles.expDate}>{exp.date}</div>
                </div>
                <div className={styles.expRole}>{exp.role}</div>
                <div className={styles.expLocation}>{exp.location}</div>
                <ul className={styles.expBullets}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                  ))}
                </ul>
                <div className={styles.expTech}>
                  <span className={styles.techLabel}>🔧 </span>{exp.tech}
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'education':
        return (
          <div>
            <h2 className={styles.contentTitle}>🎓 Education</h2>
            <div className={styles.eduCard}>
              <div className={styles.eduTitle}>{EDUCATION.degree}</div>
              <div className={styles.eduInstitution}>{EDUCATION.institution}</div>
              <div className={styles.eduDetails}>
                {EDUCATION.location} | {EDUCATION.date}
              </div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '11px', color: '#888' }}>Relevant Coursework:</span>
                <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {EDUCATION.coursework.map((course, i) => (
                    <span key={i} style={{ 
                      fontSize: '11px', 
                      padding: '2px 8px', 
                      background: '#f0f0f0', 
                      borderRadius: '3px' 
                    }}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'certifications':
        return (
          <div>
            <h2 className={styles.contentTitle}>📜 Certifications</h2>
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className={styles.certItem}>
                <span className={styles.certIcon}>✓</span>
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.certIssuer}>{cert.issuer}</span>
              </div>
            ))}
          </div>
        )
      
      case 'awards':
        return (
          <div>
            <h2 className={styles.contentTitle}>🏆 Awards & Recognition</h2>
            {AWARDS.map((award, idx) => (
              <div key={idx} className={styles.awardCard}>
                <span className={styles.awardIcon}>🥇</span>
                <div>
                  <div className={styles.awardName}>{award.name}</div>
                  <div className={styles.awardDesc}>{award.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'contact':
        return (
          <div className={styles.contactContent}>
            <h2 className={styles.contentTitle}>📧 Get In Touch</h2>
            <p className={styles.contactIntro}>
              Interested in working together on AI-powered products? Feel free to reach out for 
              collaborations, freelance opportunities, or just to chat about product strategy.
            </p>
            <div className={styles.contactLinks}>
              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>📧</span>
                <a href="mailto:anurag.akt@gmail.com" className={`${styles.contactRowText} ${styles.contactLink}`}>
                  anurag.akt@gmail.com
                </a>
                <button className={styles.copyBtn} onClick={() => copyToClipboard('anurag.akt@gmail.com')}>
                  COPY
                </button>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>📱</span>
                <span className={`${styles.contactRowText} digit-clear`}>+91 8979975078</span>
                <button className={styles.copyBtn} onClick={() => copyToClipboard('+91 8979975078')}>
                  COPY
                </button>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>📍</span>
                <span className={styles.contactRowText}>Gurugram, India (Open to remote)</span>
              </div>
              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>🔗</span>
                <a 
                  href="https://www.linkedin.com/in/anuragtripathi-pm/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${styles.contactRowText} ${styles.contactLink}`}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className={styles.availability}>
              <div className={styles.availTitle}>⏰ AVAILABILITY</div>
              <div className={styles.availText}>
                Currently open to: Full-time roles, Contract work, Consulting projects in AI Product Management
              </div>
            </div>
          </div>
        )
      
      default:
        return <div className={styles.placeholder}>SELECT A FOLDER</div>
    }
  }
  
  return (
    <div className={styles.myComputer}>
      <nav className={styles.sidebar} aria-label="File navigation">
        <div className={styles.sidebarHeader}>
          <div className={styles.avatarMini}>
            <img src="/profile.jpg" alt="Anurag" className={styles.avatarMiniImage} />
          </div>
          <div className={styles.sidebarUserName}>ANURAG.AKT</div>
        </div>
        <button className={styles.backBtn}>← PORTFOLIO</button>
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.sidebarItem} ${activeItem === item.id ? styles.active : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className={styles.itemIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <main className={styles.content}>{renderContent()}</main>
    </div>
  )
}

export default memo(MyComputerWindow)
