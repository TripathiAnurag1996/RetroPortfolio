import { memo, useState, useCallback } from 'react'
import styles from './MyComputerWindow.module.css'

type SidebarItem =
  | 'projects'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'awards'
  | 'contact'

const SIDEBAR_ITEMS: { id: SidebarItem; label: string; icon: string }[] = [
  { id: 'projects', label: 'PROJECTS', icon: '🚀' },
  { id: 'experience', label: 'EXPERIENCE', icon: '💼' },
  { id: 'education', label: 'EDUCATION', icon: '🎓' },
  { id: 'certifications', label: 'CERTS', icon: '📜' },
  { id: 'awards', label: 'AWARDS', icon: '🏆' },
  { id: 'contact', label: 'CONTACT', icon: '📧' }
]

/* ---------------- EXPERIENCE ---------------- */

const EXPERIENCE = [
  {
    company: 'NEXT SQUARE TECHNOLOGIES',
    icon: '🤖',
    role: 'AI Product Manager',
    location: 'Gurugram, India',
    date: 'Dec 2023 - Present',
    bullets: [
      'Owned end-to-end product delivery of an internal AI productivity tool embedding LLM-powered workflows for consulting teams',
      'Scoped AI opportunities through structured discovery interviews with consultants and delivery managers',
      'Engineered prompt templates across multiple use cases and established AI output evaluation criteria',
      'Designed human-in-the-loop guardrails for compliance-sensitive AI outputs',
      'Maintained post-launch AI failure logs to prioritize product improvements'
    ],
    tech: 'LLM Workflows, Prompt Engineering, AI Evaluation'
  },
  {
    company: 'AITHENT TECHNOLOGIES',
    icon: '💻',
    role: 'Senior Software Engineer',
    location: 'Gurugram, India',
    date: 'Dec 2022 - Sep 2023',
    bullets: [
      'Launched LLM-assisted help experience with intelligent search reducing support tickets by <strong class="digit-clear">12%</strong>',
      'Built model evaluation framework using CTR, helpfulness ratings and fallback frequency',
      'Improved reliability by reducing recurring incidents by <strong class="digit-clear">22%</strong>',
      'Collaborated with product managers on PRDs and AI feature specifications'
    ],
    tech: 'LLM Integration, Evaluation Frameworks, PRDs'
  },
  {
    company: 'XORIANT SOLUTIONS',
    icon: '⚙️',
    role: 'Software Engineer',
    location: 'Gurugram, India',
    date: 'Nov 2021 - Dec 2022',
    bullets: [
      'Delivered intelligent spending categorization feature reaching <strong class="digit-clear">20%</strong> DAU adoption',
      'Built backend APIs and services supporting financial product features',
      'Partnered with PMs on PRDs, user stories, and acceptance criteria'
    ],
    tech: 'Backend Development, APIs, Product Delivery'
  },
  {
    company: 'HEXAWARE TECHNOLOGIES',
    icon: '📊',
    role: 'Associate Software Engineer',
    location: 'Gurugram, India',
    date: 'Jun 2019 - Nov 2021',
    bullets: [
      'Built real-time KPI dashboards using Java and SQL improving operational efficiency by <strong class="digit-clear">30%</strong>',
      'Analyzed user feedback and support data to guide backlog prioritization'
    ],
    tech: 'Java, SQL, Analytics'
  },
  {
    company: 'IBM',
    icon: '🏢',
    role: 'Engineering Intern',
    location: 'Bangalore, India',
    date: 'Jun 2018 - Aug 2018',
    bullets: [
      'Contributed to ERP platform managing educational assets and events',
      'Implemented backend business logic and improved application performance'
    ],
    tech: 'ERP Systems, Backend Development'
  }
]

/* ---------------- PROJECTS ---------------- */

const PROJECTS = [
  {
    title: 'AI Productivity Tool for Consulting Workflows',
    company: 'Next Square Technologies',
    role: 'AI Product Manager',
    date: '2023 - Present',
    description:
      'Internal AI tool embedding LLM workflows to automate documentation and improve delivery team productivity.',
    impact: [
      'Defined AI evaluation framework and prompt standards',
      'Implemented human-in-the-loop guardrails',
      'Enabled scalable AI workflow adoption across delivery teams'
    ],
    tech: 'LLM Workflows, Prompt Engineering, AI Evaluation'
  },
  {
    title: 'LLM-Assisted Help Experience',
    company: 'Aithent Technologies',
    role: 'Senior Software Engineer',
    date: '2023',
    description:
      'AI-powered help system with contextual suggested answers reducing support effort.',
    impact: [
      '<strong class="digit-clear">12%</strong> reduction in support tickets',
      '<strong class="digit-clear">10%</strong> increase in self-service usage',
      'Evaluation framework for response quality'
    ],
    tech: 'LLM Integration, APIs, Analytics'
  },
  {
    title: 'Intelligent Spending Categorization',
    company: 'Xoriant Solutions',
    role: 'Software Engineer',
    date: '2022',
    description:
      'AI-driven spending categorization and analytics feature for financial products.',
    impact: [
      '<strong class="digit-clear">20%</strong> DAU adoption within 3 months',
      'Top engagement driver for the platform'
    ],
    tech: 'Java, Backend APIs'
  }
]

/* ---------------- EDUCATION ---------------- */

const EDUCATION = {
  degree: 'B.Tech in Computer Science and Engineering',
  institution: 'University of Petroleum and Energy Studies (UPES)',
  location: 'Dehradun, India',
  date: 'Jul 2015 - Jun 2019'
}

/* ---------------- CERTIFICATIONS ---------------- */

const CERTIFICATIONS = [
  { name: 'AI Product Management Certificate', issuer: 'IBM | Sep 2025' },
  { name: 'McKinsey Forward Program', issuer: 'McKinsey & Company' }
]

/* ---------------- AWARDS ---------------- */

const AWARDS = [
  {
    name: 'Texas Instruments Innovation Challenge',
    desc: 'Qualifier – National level engineering design competition'
  }
]

/* ---------------- COMPONENT ---------------- */

function MyComputerWindow() {
  const [activeItem, setActiveItem] = useState<SidebarItem>('projects')

  const handleItemClick = useCallback((id: SidebarItem) => {
    setActiveItem(id)
  }, [])

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
                  <span className={styles.techLabel}>🔧 Tech: </span>
                  {project.tech}
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
                  <span className={styles.techLabel}>🔧 </span>
                  {exp.tech}
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
            <h2 className={styles.contentTitle}>🏆 Awards</h2>

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
            <h2 className={styles.contentTitle}>📧 Contact</h2>

            <div className={styles.contactLinks}>
              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>📧</span>
                <a
                  href="mailto:anurag.akt@gmail.com"
                  className={styles.contactLink}
                >
                  anurag.akt@gmail.com
                </a>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>📱</span>
                <span className={`${styles.contactValue} digit-clear`}>
                  +91 8979975078
                </span>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>📍</span>
                <span className={styles.contactValue}>Gurugram, India</span>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>🔗</span>

                <a
                  href="https://www.linkedin.com/in/anuragtripathi-pm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  LinkedIn Profile ↗
                </a>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>💻</span>

                <a
                  href="https://github.com/TripathiAnurag1996/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  GitHub Repository ↗
                </a>
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
      <nav className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img
            src="/profile.png"
            alt="Anurag Kumar Tripathi"
            className={styles.avatarMiniImage}
          />

          <div className={styles.sidebarUserName}>PORTFOLIO</div>
        </div>

        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            aria-label={item.label}
            className={`${styles.sidebarItem} ${
              activeItem === item.id ? styles.active : ''
            }`}
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