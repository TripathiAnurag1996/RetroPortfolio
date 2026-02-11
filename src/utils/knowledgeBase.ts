export const anuragContext = {
  /**
   * Core identity and contact
   * These are factual and stable.
   */
  basics: {
    name: 'Anurag Kumar Tripathi',
    title: 'AI Product Manager',
    tagline: 'Building and scaling AI-powered products from 0→1',
    location: 'Gurgaon, India',
    email: 'anurag.akt@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anuragtripathi-pm/'
  },

  /**
   * One-paragraph professional summary.
   * This should be treated as the default mental model.
   */
  professionalSummary:
    'AI Product Manager with a background in software engineering, focused on turning ambiguous AI capabilities into user-loved products through strong discovery, clear product decisions, and measurable business impact.',

  /**
   * Current professional status
   */
  currentStatus: {
    role: 'AI Product Manager',
    company: 'Snabbity',
    focus:
      'Shipping AI-powered features that help teams understand funnel performance and make faster, data-backed product decisions.'
  },

  /**
   * Current interests and openness
   * IMPORTANT: Mention only when relevant or asked.
   */
  currentInterests: {
    openTo:
      'AI / Tech Product Management roles, selective product consulting, and startup co-founder opportunities where product, AI, and 0→1 execution intersect.',
    collaborationStyle:
      'Most interested in roles or collaborations involving real ownership, early problem definition, and close work with engineering and design.'
  },

  /**
   * High-signal impact highlights
   * Used for quick answers and summaries.
   */
  impactHighlights: [
    'Shipped LLM-powered product features that reduced support load and improved self-service adoption.',
    'Built AI-driven design and funnel insights that reduced investigation time by ~30%.',
    'Led 0→1 discovery and validation as a founder through 200+ user interviews.',
    'Brings strong technical credibility from years of hands-on engineering experience.'
  ],

  /**
   * Professional experience
   */
  experience: [
    {
      company: 'Snabbity',
      role: 'AI Product Manager (Project-based)',
      duration: 'Nov 2024 - Present',
      focus:
        'AI-powered insights for design performance and funnel optimization.',
      achievements: [
        'Launched AI-driven Design Performance Insights to analyze page layouts across funnel steps.',
        'Identified key drop-off causes such as CTA placement, form friction, and missing delivery information.',
        'Reduced funnel investigation time by ~30% through standardized tracking and automated analysis.',
        'Led personalization initiatives including recommendations, trending designs, and cart reminders.',
        'Defined product vision, OKRs, and success metrics with engineering and design.'
      ]
    },
    {
      company: 'Socius (Stealth)',
      role: 'Founder',
      duration: 'Sep 2023 - Oct 2024',
      focus:
        'Social discovery platform for events (prototype stage).',
      achievements: [
        'Conducted 200+ user interviews across six customer segments.',
        'Used jobs-to-be-done to synthesize insights and define personas.',
        'Identified “discovery deadlock” as the core user problem.',
        'Built and validated a clickable prototype through 12 moderated usability tests.'
      ]
    },
    {
      company: 'Aithent Technologies',
      role: 'Senior Software Engineer',
      duration: 'Dec 2022 - Sep 2023',
      focus:
        'LLM-assisted support and internal tooling.',
      achievements: [
        'Launched an LLM-assisted help experience with intelligent search and contextual answers.',
        'Reduced support ticket volume by 12% and increased self-service usage by 10%.',
        'Introduced evaluation metrics including CTR, helpfulness, and fallback rate.',
        'Reduced recurring production incidents by 22% through better monitoring and SLOs.'
      ]
    },
    {
      company: 'Xoriant Solutions Pvt. Ltd.',
      role: 'Software Engineer',
      duration: 'Nov 2021 - Dec 2022',
      focus:
        'Data-driven product features and backend systems.',
      achievements: [
        'Owned intelligent spending categorization and trend analysis features.',
        'Achieved 20% DAU adoption within three months.',
        'Built and maintained backend services and REST APIs.',
        'Worked closely with PMs on PRDs and acceptance criteria.'
      ]
    },
    {
      company: 'Hexaware Technologies Limited',
      role: 'Associate Software Engineer',
      duration: 'Jun 2019 - Nov 2021',
      focus:
        'Operational analytics and reporting.',
      achievements: [
        'Analyzed customer feedback to inform backlog prioritization.',
        'Improved CSAT scores by ~20%.',
        'Built real-time KPI dashboards using Java and SQL.',
        'Improved operational efficiency by ~30% through reporting.'
      ]
    },
    {
      company: 'IBM',
      role: 'Intern',
      duration: 'Jun 2018 - Aug 2018',
      focus:
        'ERP systems for educational asset management.',
      achievements: [
        'Implemented backend business logic.',
        'Improved application performance through debugging and optimization.'
      ]
    }
  ],

  /**
   * Skills grouped for retrieval and paraphrasing
   */
  skills: {
    aiProduct: [
      'LLM Product Strategy',
      'Generative AI',
      'RAG Architectures',
      'Agentic Workflows',
      'Model Evaluation Frameworks',
      'Prompt Engineering'
    ],
    productManagement: [
      'Product Strategy',
      'Discovery',
      'Roadmapping',
      'PRDs',
      'GTM Strategy',
      'Stakeholder Management',
      'Feature Prioritization',
      'User Research',
      'KPIs & OKRs'
    ],
    analytics: ['SQL', 'A/B Testing', 'Mixpanel', 'Google Analytics'],
    technical: ['Python', 'Java', 'Git', 'REST APIs', 'API Design', 'Supabase'],
    execution: ['Agile', 'Scrum', 'Cross-functional Collaboration']
  },

  education: {
    degree: 'B.Tech in Computer Science',
    institution:
      'University of Petroleum and Energy Studies (UPES), Dehradun',
    duration: 'Jul 2015 - Jun 2019'
  },

  certifications: [
    'McKinsey Forward Program',
    'AI Product Management Certificate – IBM'
  ],

  awards: [
    'ACE Award for Product Excellence – Reduced downtime by 20%',
    'SPOT Award for Operational Efficiency',
    'Product Innovation Award – Reduced customer response time by 35%',
    'Client Excellence Recognition – Improved user satisfaction by 25%'
  ],

  /**
   * Persona-aligned strengths
   */
  strengthsByPersona: {
    recruiter:
      'Strong fit for AI and GenAI Product Manager roles with a track record of shipping AI features and delivering measurable business impact.',
    hiring_manager:
      'Excels at converting ambiguous AI capabilities into clear product decisions grounded in user research, metrics, and feasibility.',
    founder:
      'Demonstrated 0→1 ownership through founding Socius, deep discovery, and decision-making under uncertainty.',
    engineer:
      'Technically credible product partner with hands-on engineering experience in LLM systems and evaluation.',
    student:
      'Provides a practical, honest path into AI Product Management grounded in real experience.'
  },

  careerPhilosophy:
    'I focus on translating ambiguous AI capabilities into products people actually use by grounding decisions in user research, metrics, and technical constraints.',

  commonQuestions: {
    'Why AI Product Management?':
      'My engineering background combined with hands-on experience shipping LLM-powered features lets me bridge AI capabilities with real user and business outcomes.',
    'Strongest AI work?':
      'Building LLM-assisted help experiences and AI-driven design insights that reduced support effort and improved decision-making.',
    'What differentiates you?':
      'I combine deep discovery, structured product thinking, and technical credibility to ship AI features that create real impact — not demos.'
  }
};