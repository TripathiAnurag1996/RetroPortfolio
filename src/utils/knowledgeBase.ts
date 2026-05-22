export const anuragContext = {

  basics: {
    name: "Anurag Kumar Tripathi",
    title: "AI Product Manager & Founder",
    tagline: "I build AI products from 0→1 — shipping LLM systems, voice AI, and ambient intelligence that real users depend on.",
    location: "Gurugram, India",
    email: "anurag.akt@gmail.com",
    linkedin: "https://www.linkedin.com/in/anuragtripathi-pm/",
    github: "https://github.com/TripathiAnurag1996/",
    twitter: "https://x.com/anuragships",
    website: "https://anuragtripathi.pro",
    yearsExperience: 6
  },

  professionalSummary:
    "AI Product Manager and Founder with 6+ years of experience spanning software engineering, embedded product ownership, and end-to-end AI product development. Independently conceived, built, and shipped multiple production AI products — a Chrome extension, a VS Code extension, and a Windows ambient AI assistant — reaching 1000+ users across 60+ countries within weeks of launch, with zero paid acquisition. Deep hands-on expertise in generative AI, LLM product design, prompt engineering, retrieval-augmented generation, model evaluation, human-in-the-loop systems, multimodal AI, and voice AI pipelines. Combines a strong computer science foundation with OKR-driven roadmapping, data-driven prioritisation, and a consistent track record of shipping measurable outcomes. Equally comfortable defining product strategy with senior stakeholders and reviewing system architecture with engineering teams.",

  recruiterQuickPitch:
    "AI Product Manager with a software engineering foundation who ships — not just plans. I've independently launched multiple AI-native products used by 1000+ users globally, designed LLM evaluation frameworks in production, and built voice AI and ambient intelligence systems from scratch. I bring rare technical depth to product roles: I've written the TypeScript, wired the IPC pipelines, and optimised latency to under 200ms — while also owning the roadmap, the GTM, and the metrics. If you're hiring an AI PM who can hold their own with any engineering team and still drive product strategy, that's the intersection I operate in.",

  domainFocus: [
    "AI Product Management",
    "Generative AI Products",
    "LLM Workflow Design",
    "Voice AI & Multimodal Systems",
    "On-Device AI & Ambient Intelligence",
    "B2B SaaS AI Tools",
    "Developer Tooling",
    "0-to-1 Product Development"
  ],

  primaryExpertise: [
    "AI Product Strategy & Roadmapping",
    "LLM Feature Development",
    "Prompt Engineering & Optimisation",
    "Model Evaluation Frameworks",
    "Human-in-the-Loop AI Design",
    "Retrieval-Augmented Generation (RAG)",
    "Voice AI Pipelines (STT / TTS)",
    "Multimodal AI Systems",
    "On-Device AI & Privacy-First Architecture",
    "AI Behaviour Definition & Safety Guardrails",
    "Go-to-Market for AI Products",
    "Data-Driven Prioritisation"
  ],

  currentStatus: {
    role: "AI Product Manager",
    company: "Next Square Technologies",
    parallel: "Founder, Xenriq Systems",
    focus:
      "Leading development of internal AI productivity tools embedding LLM workflows for consulting and delivery teams, while concurrently building and shipping AI-native products under Xenriq Systems."
  },

  currentInterests: {
    openTo:
      "Senior AI Product Manager, Generative AI Product Lead, and AI Platform Product roles at companies building AI-first products, LLM-powered platforms, or developer/productivity tooling at scale.",
    collaborationStyle:
      "Thrives in product environments where teams solve ambiguous problems, run fast experiments, maintain high technical bar, and work closely with engineering to ship real AI systems — not just roadmaps."
  },

  impactHighlights: [
    "Shipped 3 production AI products independently — 1000+ users across 60+ countries within weeks, zero paid acquisition.",
    "Achieved sub-200ms streaming transcription latency and ~1.0–1.5s perceived end-to-end response on a voice AI pipeline.",
    "Reduced LLM-assisted support ticket volume by 12% and increased self-service resolution by 10% within 90 days of launch.",
    "Delivered intelligent spending categorisation feature reaching 20% DAU adoption, top-3 engagement driver on the platform.",
    "Improved platform reliability by 22% through SLO definition, monitoring instrumentation, and incident review processes.",
    "Improved operational efficiency by 30% using real-time KPI dashboards.",
    "Engineered a 7-layer IDE context collection pipeline executing in under 800ms with zero setup friction."
  ],

  products: [
    {
      name: "Promptive Sentry",
      type: "Chrome Extension",
      company: "Xenriq Systems",
      status: "Live — 1000+ users, 60+ countries, 3 weeks post-launch",
      url: "https://chromewebstore.google.com/detail/promptive-sentry/ikbkijdgnelcijmdkcaaoabmobagakim",
      tagline: "Most AI extensions add buttons. Promptive Sentry adds intelligence.",
      summary:
        "Identified a high-friction gap in AI power-user workflows: professionals using Claude, ChatGPT, and Gemini lose context on every tab switch and start from zero at every session restart. Designed and shipped a dual-engine Chrome extension addressing this at the browser layer.",
      features: [
        "Prompt Enhancement Engine — one-click transforms vague prompts into structured, role-defined, constraint-aware AI instructions across Claude, ChatGPT, and Gemini.",
        "Sentry Memory — saves full conversation context as an AI-readable structured handoff, resumable on any platform instantly.",
        "Claude Usage Monitor — real-time 5-hour and 7-day quota HUD with zero backend dependency."
      ],
      architecture: "Privacy-first, zero data retention, no account required. Operates entirely at the browser layer.",
      techStack: ["Chrome Extension APIs", "JavaScript", "Content Scripts", "Local Storage"]
    },
    {
      name: "Promptive Sentry for IDE",
      type: "VS Code Marketplace Extension",
      company: "Xenriq Systems",
      status: "Live — 1000+ active users, 1 week post-launch",
      url: "https://open-vsx.org/extension/xenriq/promptive-sentry-ide/",
      tagline: "The AI prompt layer your IDE was missing.",
      summary:
        "Solved the developer AI prompt quality problem at the IDE layer: prompts sent to AI coding tools are context-poor, producing generic responses that require multiple iteration rounds per session — compounding productivity cost at scale.",
      features: [
        "Silent context collection pipeline capturing 7 IDE environment layers in under 800ms.",
        "Layers captured: active file and inferred role, imports, open tabs, terminal errors, git branch, commit history, diffs, and full tech stack.",
        "Automatically rewrites developer prompts with rich context before the AI model sees them.",
        "Zero setup, zero API keys, zero friction."
      ],
      compatibility: ["VS Code", "Cursor", "Windsurf", "Kiro", "Warp", "Antigravity", "All VS Code-compatible editors"],
      techStack: ["VS Code Extension APIs", "TypeScript", "AST Parsing", "Git APIs"]
    },
    {
      name: "Piqque",
      type: "Windows Desktop Application",
      company: "Xenriq Systems",
      status: "Private Beta — Built and Shipping",
      url: "https://xenriq.com",
      tagline: "Piqque doesn't feel like a tool you use. It feels like your screen got smarter.",
      summary:
        "Ambient, screen-aware AI assistant with a hotkey-triggered voice interface. No subscriptions, no window switching, no context loss. Captures screen in real time, understands context via a multimodal AI pipeline, and responds by voice instantly.",
      features: [
        "Single hotkey activation — ambient by design, invisible when idle.",
        "Push-to-talk voice interface with under 200ms streaming transcription latency.",
        "Real-time screen capture with two-pass coordinate refinement engine.",
        "Multi-model orchestration: Claude, Gemini, and GPT-4o.",
        "Full on-device HIPAA mode with zero cloud dependency.",
        "Kokoro ONNX local TTS with ElevenLabs Flash as optional premium voice.",
        "No subscription model."
      ],
      architecture: "Electron/TypeScript, WebSocket audio streaming, Cloudflare Worker backend, AssemblyAI v3 streaming STT, Gemini multimodal primary LLM, ResilientProvider with three-tier STT fallback.",
      techStack: ["Electron", "TypeScript", "WebSockets", "Cloudflare Workers", "AssemblyAI", "Gemini API", "Kokoro ONNX", "ElevenLabs", "Sharp", "PCM Audio Streaming"]
    }
  ],

  experience: [
    {
      company: "Next Square Technologies",
      role: "AI Product Manager",
      duration: "Dec 2023 – Present",
      summary:
        "Leading end-to-end product discovery, design, and delivery for an internal AI productivity platform targeting consulting and delivery teams.",
      highlights: [
        "Led discovery for an internal AI productivity platform: conducted 6 structured user interviews, mapped high-frequency workflows against AI suitability, synthesised findings into an opportunity matrix that became the approved product roadmap.",
        "Owned AI output quality standards for 3 core use cases — automated status reporting, SOP generation, client documentation: engineered prompt templates, defined pass/fail evaluation criteria, reviewed 12 pre-launch samples per use case.",
        "Designed human-in-the-loop guardrails for compliance-sensitive content generation as explicit product policy, reducing compliance exposure and building measurable stakeholder trust pre-launch.",
        "Led cross-functional adoption rollout across 3 delivery teams; maintained a structured AI output failure log that directly informed the v2 backlog and secured senior leadership approval for the next product cycle.",
        "Translated business requirements into development-ready PRDs with standardised acceptance criteria, reducing product-engineering ambiguity across sprint cycles."
      ],
      skills: [
        "AI Product Strategy", "LLM Workflows", "Prompt Engineering",
        "Model Evaluation", "Human-in-the-Loop Design", "PRDs",
        "Stakeholder Management", "Agile / Scrum"
      ]
    },

    {
      company: "Xenriq Systems",
      role: "Founder & AI Product Manager",
      duration: "Jan 2024 – Present",
      type: "Entrepreneurial — concurrent with full-time role",
      summary:
        "Independently conceived, designed, built, and shipped 3 production AI-native products from zero to global traction. Operated across the full stack: product strategy, system architecture, LLM integration, GTM, and distribution — all solo.",
      highlights: [
        "Shipped 3 AI products — Chrome extension, VS Code extension, Windows desktop app — reaching 1000+ users across 60+ countries with zero paid acquisition.",
        "Designed and implemented a multimodal voice AI pipeline achieving ~1.0–1.5s perceived end-to-end latency (down from 12–17s baseline) through 7-phase optimisation.",
        "Built a 7-layer IDE context collection pipeline in under 800ms using VS Code Extension APIs and AST parsing.",
        "Architected privacy-first, on-device AI systems including a full HIPAA-compliant mode with zero cloud dependency.",
        "Owned complete product lifecycle: discovery, architecture, implementation, evaluation, GTM, and post-launch iteration.",
        "Managed multi-model LLM orchestration across Claude, Gemini, and GPT-4o with resilient fallback provider design."
      ],
      skills: [
        "0-to-1 Product Development", "LLM Integration", "Voice AI", "Multimodal AI",
        "On-Device AI", "Prompt Engineering", "System Architecture", "Electron/TypeScript",
        "Chrome Extension APIs", "VS Code Extension APIs", "Go-to-Market", "Product Marketing"
      ]
    },

    {
      company: "Aithent Technologies",
      role: "Senior Software Engineer",
      duration: "Dec 2022 – Sep 2023",
      summary:
        "Product-embedded engineering role with full ownership of an LLM-powered intelligent search product — from model evaluation to production launch.",
      highlights: [
        "Shipped LLM-assisted intelligent search end-to-end: reduced support ticket volume by 12% and increased self-service resolution by 10% within 90 days.",
        "Built a structured model evaluation framework from scratch using click-through rate, helpfulness ratings, and fallback frequency as primary quality signals.",
        "Improved platform reliability by 22% through SLO definition, monitoring instrumentation, proactive alerting, and structured post-incident reviews."
      ],
      skills: [
        "LLM Integration", "Model Evaluation Frameworks",
        "Backend Systems", "SLO Design", "Intelligent Search"
      ]
    },
    {
      company: "Xoriant Solutions Pvt. Ltd.",
      role: "Software Engineer",
      duration: "Nov 2021 – Dec 2022",
      summary:
        "Built backend services and data-driven product features for financial platforms.",
      highlights: [
        "Delivered intelligent spending categorisation and automated trend analysis feature reaching 20% DAU adoption within 3 months — top-3 engagement driver on the platform.",
        "Partnered with PMs on PRDs, user stories, and acceptance criteria across multiple sprint cycles.",
        "Built and maintained scalable backend services and data processing pipelines."
      ],
      skills: [
        "Backend Development", "APIs", "Data Pipelines",
        "Product Delivery", "Agile"
      ]
    },
    {
      company: "Hexaware Technologies",
      role: "Associate Software Engineer",
      duration: "Jun 2019 – Nov 2021",
      summary:
        "Built operational analytics systems and contributed to user-research-driven product improvements.",
      highlights: [
        "Designed and deployed real-time KPI dashboards using Java and SQL, improving operational efficiency by 30%.",
        "Synthesised user interviews, support ticket analysis, and NPS survey data into backlog inputs, contributing to 20% improvement in CSAT scores across two consecutive product cycles.",
        "Developed product intuition through direct involvement in user research synthesis, feature backlog discussions, and stakeholder feedback sessions."
      ],
      skills: ["Java", "SQL", "Analytics Dashboards", "User Research", "KPI Reporting"]
    },
    {
      company: "IBM",
      role: "Engineering Intern",
      duration: "Jun 2018 – Aug 2018",
      summary: "Worked on ERP systems for educational asset and event management.",
      highlights: [
        "Implemented backend business logic for ERP modules.",
        "Improved system performance through debugging and query optimisation."
      ],
      skills: ["ERP Systems", "Backend Development", "Java"]
    }
  ],

  skills: {
    aiAndGenAI: [
      "Large Language Models (LLMs)",
      "Generative AI",
      "Prompt Engineering & Optimisation",
      "Retrieval-Augmented Generation (RAG)",
      "Model Evaluation & QA",
      "Human-in-the-Loop (HITL) Design",
      "AI Behaviour Definition",
      "Multimodal AI",
      "Voice AI (STT / TTS)",
      "On-Device AI Pipelines",
      "Screen-Aware AI",
      "Ambient AI Systems",
      "LLM Orchestration & Fallback Design"
    ],
    productManagement: [
      "AI Product Strategy",
      "0-to-1 Product Development",
      "Product Discovery & User Research",
      "Roadmapping & OKRs / KPIs",
      "PRDs & User Stories",
      "Feature Prioritisation (RICE, MoSCoW)",
      "Jobs-to-Be-Done (JTBD)",
      "MVP Scoping & Iteration",
      "Go-to-Market Strategy",
      "A/B Testing",
      "Stakeholder Management",
      "Agile & Scrum"
    ],
    technical: [
      "TypeScript", "Python", "JavaScript", "Java",
      "Electron", "WebSockets", "PCM Audio Streaming",
      "Chrome Extension APIs", "VS Code Extension APIs",
      "REST APIs", "Supabase", "SQL", "Git",
      "Cloudflare Workers", "ONNX Runtime", "Sharp"
    ],
    analytics: [
      "Google Analytics", "Mixpanel", "Amplitude",
      "Funnel Analysis", "Cohort Analysis",
      "Data-Driven Prioritisation", "SQL"
    ],
    tools: [
      "Figma", "Jira", "Linear", "Notion",
      "Postman", "GitHub", "AssemblyAI", "ElevenLabs"
    ]
  },

  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "University of Petroleum and Energy Studies (UPES)",
    location: "Dehradun, India",
    duration: "Jul 2015 – Jun 2019"
  },

  certifications: [
    {
      name: "AI Product Management Certificate",
      issuer: "IBM",
      date: "September 2025"
    },
    {
      name: "McKinsey Forward Program",
      issuer: "McKinsey & Company"
    }
  ],

  careerPhilosophy:
    "I believe the best AI PMs build conviction through code, not just frameworks. I ship production systems, review architecture with engineering teams, and hold myself to the same standard I'd hold any engineer — because I've been one. My edge is the ability to move fluidly between defining product strategy and debugging a WebSocket audio pipeline at 2am. That's not a background detail. That's the job.",

  differentiators: [
    "Founder who ships: 3 AI products in production, 1000+ users globally, zero paid acquisition.",
    "Technical depth that goes beyond credentials: built voice AI, ambient intelligence, and LLM orchestration systems from scratch in TypeScript and Python.",
    "Full-stack AI PM: discovery → architecture → evaluation → GTM → post-launch iteration — owned end-to-end across every product.",
    "Proven in enterprise and solo-founder contexts: trusted by senior stakeholders at corporate scale and by users who pay nothing but keep coming back.",
    "Latency obsession: reduced voice AI pipeline from 12–17s to ~1.0–1.5s perceived response through systematic, phased engineering."
  ],

  commonQuestions: {
    whyAIProductManagement:
      "My engineering background gives me credibility with the teams building the systems, while my product experience keeps me focused on outcomes that matter to users. I got into AI PM because I could see that most 'AI features' were being built without understanding either the failure modes or the human workflow they were interrupting. I wanted to fix that — and the fastest way was to ship products myself.",

    strongestAIWork:
      "The voice AI pipeline optimisation on Piqque — reducing perceived end-to-end latency from 12–17 seconds to under 1.5 seconds through a seven-phase overhaul covering audio streaming, STT provider resilience, LLM response streaming with sentence-boundary buffering, and barge-in interruption. And the model evaluation and HITL guardrail design work at Next Square, where I turned vague 'AI quality' concerns into a repeatable, measurable QA process before go-live.",

    differentiation:
      "I combine structured product thinking with genuine technical execution. I don't just write the PRD — I've shipped the product. That changes how I think about feasibility, trade-offs, and what 'done' actually means. Most AI PMs can describe a RAG pipeline. I've debugged one at midnight.",

    openToOpportunities:
      "Yes — actively open to Senior AI PM, Generative AI Product Lead, and AI Platform Product roles at companies building AI-first products or developer tooling at scale. Particularly interested in roles where product and engineering work closely together and where the team's ambition matches the problem size."
  },

  socialProof: {
    totalUsers: "1000+",
    countriesReached: "60+",
    timeToTraction: "Within weeks of launch per product",
    paidAcquisition: "Zero",
    productsShipped: 3,
    platforms: ["Chrome Web Store", "VS Code Marketplace", "Open VSX Registry", "Windows Desktop"]
  }

};