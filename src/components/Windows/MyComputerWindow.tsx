import { memo, useState, useCallback } from 'react'
import styles from './MyComputerWindow.module.css'
import { event } from '../../lib/gtag'

type SidebarItem =
  | 'products'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'awards'
  | 'contact'

const SIDEBAR_ITEMS: { id: SidebarItem; label: string; icon: string }[] = [
  { id: 'products', label: 'PRODUCTS', icon: '🚀' },
  { id: 'experience', label: 'EXPERIENCE', icon: '💼' },
  { id: 'education', label: 'EDUCATION', icon: '🎓' },
  { id: 'certifications', label: 'CERTS', icon: '📜' },
  { id: 'awards', label: 'AWARDS', icon: '🏆' },
  { id: 'contact', label: 'CONTACT', icon: '📧' }
]

/* ---------------- EXPERIENCE ---------------- */

const EXPERIENCE = [
  {
    company: 'XENRIQ SYSTEMS',
    icon: '🚀',
    role: 'Founder & AI Product Manager',
    location: 'Global / Remote',
    date: 'Jan 2024 - Present',
    bullets: [
      'Shipped 3 AI products (Promptive Sentry, Piqque) reaching <strong class="digit-clear">1000+</strong> users across <strong class="digit-clear">60+</strong> countries',
      'Designed and implemented a multimodal voice AI pipeline achieving ~1.0–1.5s perceived end-to-end latency',
      'Architected privacy-first, on-device AI systems including a full HIPAA-compliant mode with zero cloud dependency',
      'Owned complete product lifecycle: discovery, architecture, implementation, GTM, and post-launch iteration'
    ],
    tech: '0-to-1 Product Development, Voice AI, System Architecture'
  },
  {
    company: 'NEXT SQUARE TECHNOLOGIES',
    icon: '🤖',
    role: 'AI Product Manager',
    location: 'Gurugram, India',
    date: 'Dec 2023 - Present',
    bullets: [
      'Led end-to-end product discovery and delivery for an internal AI productivity platform',
      'Conducted structured user interviews, synthesizing findings into an opportunity matrix for the product roadmap',
      'Owned AI output quality standards, engineered prompt templates, and defined pass/fail evaluation criteria',
      'Designed human-in-the-loop guardrails for compliance-sensitive content generation'
    ],
    tech: 'AI Product Strategy, LLM Workflows, Prompt Engineering'
  },
  {
    company: 'AITHENT TECHNOLOGIES',
    icon: '💻',
    role: 'Senior Software Engineer',
    location: 'Gurugram, India',
    date: 'Dec 2022 - Sep 2023',
    bullets: [
      'Shipped LLM-assisted intelligent search reducing support tickets by <strong class="digit-clear">12%</strong>',
      'Built a structured model evaluation framework using click-through rate, helpfulness ratings, and fallback frequency',
      'Improved platform reliability by <strong class="digit-clear">22%</strong> through SLO definition and monitoring instrumentation'
    ],
    tech: 'LLM Integration, Model Evaluation, SLO Design'
  },
  {
    company: 'XORIANT SOLUTIONS',
    icon: '⚙️',
    role: 'Software Engineer',
    location: 'Gurugram, India',
    date: 'Nov 2021 - Dec 2022',
    bullets: [
      'Delivered intelligent spending categorization feature reaching <strong class="digit-clear">20%</strong> DAU adoption within 3 months',
      'Partnered with PMs on PRDs, user stories, and acceptance criteria across multiple sprint cycles',
      'Built and maintained scalable backend services and data processing pipelines'
    ],
    tech: 'Backend Development, APIs, Data Pipelines'
  },
  {
    company: 'HEXAWARE TECHNOLOGIES',
    icon: '📊',
    role: 'Associate Software Engineer',
    location: 'Gurugram, India',
    date: 'Jun 2019 - Nov 2021',
    bullets: [
      'Designed and deployed real-time KPI dashboards improving operational efficiency by <strong class="digit-clear">30%</strong>',
      'Synthesised user interviews and support ticket data into backlog inputs, contributing to <strong class="digit-clear">20%</strong> CSAT improvement'
    ],
    tech: 'Java, SQL, User Research'
  },
  {
    company: 'IBM',
    icon: '🏢',
    role: 'Engineering Intern',
    location: 'Bangalore, India',
    date: 'Jun 2018 - Aug 2018',
    bullets: [
      'Implemented backend business logic for ERP modules managing educational assets and events',
      'Improved system performance through debugging and query optimisation'
    ],
    tech: 'ERP Systems, Backend Development'
  }
]

/* ---------------- PRODUCTS ---------------- */

const PRODUCTS = [
  {
    title: 'Promptive Sentry',
    company: 'Xenriq Systems',
    role: 'Chrome Extension',
    date: '2024',
    url: 'https://chromewebstore.google.com/detail/promptive-sentry-%E2%80%93-author/ikbkijdgnelcijmdkcaaoabmobagakim',
    description:
      'A dual-engine Chrome extension solving the AI prompt quality problem at the browser layer.',
    impact: [
      'Live — <strong class="digit-clear">500+</strong> users, 60+ countries',
      'Transforms vague prompts into structured, role-defined AI instructions across Claude, ChatGPT, and Gemini',
      'Sentry Memory saves full conversation context as an AI-readable structured handoff'
    ],
    tech: 'Chrome Extension APIs, JavaScript, Local Storage'
  },
  {
    title: 'Promptive Sentry for IDE',
    company: 'Xenriq Systems',
    role: 'VS Code Extension',
    date: '2024',
    url: 'https://open-vsx.org/extension/xenriq/promptive-sentry-ide/',
    description:
      'The AI prompt layer your IDE was missing. Automatically rewrites developer prompts with rich context before the AI model sees them.',
    impact: [
      'Live — <strong class="digit-clear">500+</strong> active users',
      'Silent context collection pipeline capturing 7 IDE environment layers in under <strong class="digit-clear">800ms</strong>',
      'Zero setup, zero API keys, zero friction'
    ],
    tech: 'VS Code APIs, TypeScript, AST Parsing'
  },
  {
    title: 'Piqque',
    company: 'Xenriq Systems',
    role: 'Windows Desktop Application',
    date: 'Beta',
    description:
      'Ambient, screen-aware AI assistant with a hotkey-triggered voice interface. Captures screen in real time and responds by voice instantly.',
    impact: [
      'Push-to-talk voice interface with under <strong class="digit-clear">200ms</strong> streaming transcription latency',
      'Multi-model orchestration: Claude, Gemini, and GPT-4o',
      'Full on-device HIPAA mode with zero cloud dependency'
    ],
    tech: 'Electron, WebSockets, AssemblyAI, Kokoro ONNX'
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
  const [activeItem, setActiveItem] = useState<SidebarItem>('products')

  const handleItemClick = useCallback((id: SidebarItem) => {
    setActiveItem(id)
    event('content_tab_switched', {
      category: 'portfolio',
      label: id.toUpperCase(),
      tab_name: id
    })
  }, [])

  const handleExternalClick = useCallback((label: string) => {
    // event call can be before or after here as handleExternalClick is just a wrapper, 
    // but we'll put it after the logic (which is empty here, but consistent)
    event('external_link_clicked', {
      category: 'navigation',
      label: label.toUpperCase(),
      source: 'my_computer'
    })
  }, [])

  const renderContent = () => {
    switch (activeItem) {
      case 'products':
        return (
          <div>
            <h2 className={styles.contentTitle}>🚀 Featured Products</h2>
            {PRODUCTS.map((product, idx) => (
              <div key={idx} className={styles.projectCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className={styles.projectTitle}>{product.title}</div>
                  {product.url && (
                    <a 
                      href={product.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        padding: '4px 12px',
                        background: '#c0c0c0',
                        borderLeft: '2px solid #ffffff',
                        borderTop: '2px solid #ffffff',
                        borderRight: '2px solid #808080',
                        borderBottom: '2px solid #808080',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        color: 'inherit',
                        textDecoration: 'none',
                        fontSize: '12px'
                      }}
                      onMouseDown={(e) => {
                        e.currentTarget.style.borderLeft = '2px solid #808080';
                        e.currentTarget.style.borderTop = '2px solid #808080';
                        e.currentTarget.style.borderRight = '2px solid #ffffff';
                        e.currentTarget.style.borderBottom = '2px solid #ffffff';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.borderLeft = '2px solid #ffffff';
                        e.currentTarget.style.borderTop = '2px solid #ffffff';
                        e.currentTarget.style.borderRight = '2px solid #808080';
                        e.currentTarget.style.borderBottom = '2px solid #808080';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeft = '2px solid #ffffff';
                        e.currentTarget.style.borderTop = '2px solid #ffffff';
                        e.currentTarget.style.borderRight = '2px solid #808080';
                        e.currentTarget.style.borderBottom = '2px solid #808080';
                      }}
                      onClick={() => {
                        // Optional: emit an event for analytics
                        handleExternalClick(product.title);
                      }}
                    >
                      🔗 Open Link
                    </a>
                  )}
                </div>
                <div className={styles.projectMeta}>
                  {product.company} | {product.role} | {product.date}
                </div>
                <p className={styles.projectDesc}>{product.description}</p>

                <ul className={styles.impactList}>
                  {product.impact.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: `✓ ${item}` }} />
                  ))}
                </ul>

                <div className={styles.expTech}>
                  <span className={styles.techLabel}>🔧 Tech: </span>
                  {product.tech}
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
                  onClick={() => handleExternalClick('EMAIL')}
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
                  onClick={() => handleExternalClick('LINKEDIN')}
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
                  onClick={() => handleExternalClick('GITHUB')}
                >
                  GitHub Repository ↗
                </a>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowIcon}>🐦</span>

                <a
                  href="https://x.com/anuragships"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  onClick={() => handleExternalClick('TWITTER')}
                >
                  X (Twitter) Profile ↗
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