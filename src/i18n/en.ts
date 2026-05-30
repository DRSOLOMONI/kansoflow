export const en = {
  dir: "ltr" as const,
  // Navigation
  nav: {
    home: "Home",
    services: "Services",
    caseStudies: "Case Studies",
    about: "About",
    insights: "Insights",
    contact: "Contact",
    getStarted: "Get Started",
  },
  // Footer
  footer: {
    description: "Transforming complex workflows into elegant, automated solutions. Simplicity is not the absence of complexity—it's mastery of it.",
    company: "Company",
    resources: "Resources",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: `© ${new Date().getFullYear()} Kanso Flow. All rights reserved.`,
    tagline: "Complexity, Simplified.",
  },
  // Hero
  hero: {
    badge: "AI Automation Consultancy",
    headline1: "Your business,",
    headline2: "finally flowing.",
    subheadline: "Hey — I'm building Kanso Flow to take the repetitive, tangled work off your team's plate. Real automations, set up by humans, that just work in the background.",
    cta: "Let's talk",
    ctaSecondary: "Explore Services",
  },
  // Value Proposition
  value: {
    title: "Why Choose",
    titleAccent: "Kanso Flow",
    subtitle: "We don't just automate—we simplify. Every solution is designed to reduce friction and amplify results.",
    benefits: [
      {
        title: "Lightning Fast Deployment",
        description: "Go from concept to production in weeks, not months. Our streamlined process eliminates bottlenecks.",
      },
      {
        title: "Enterprise-Grade Security",
        description: "Built with security-first principles. Your data stays protected at every layer of automation.",
      },
      {
        title: "Measurable ROI",
        description: "Average 340% ROI within the first year. We track every metric that matters to your business.",
      },
      {
        title: "Seamless Integration",
        description: "Works with your existing stack. No rip-and-replace—just intelligent enhancement.",
      },
    ],
  },
  // How It Works
  howItWorks: {
    title: "How It",
    titleAccent: "Works",
    subtitle: "Three steps from complexity to clarity.",
    steps: [
      {
        title: "Discover",
        description: "We map your workflows, identify bottlenecks, and uncover opportunities where AI creates the most impact.",
      },
      {
        title: "Design",
        description: "We architect elegant, scalable solutions tailored to your specific processes and technology stack.",
      },
      {
        title: "Deploy",
        description: "We implement, test, and launch your automation with continuous optimization for peak performance.",
      },
    ],
  },
  // Services Overview (Home)
  servicesOverview: {
    title: "Our",
    titleAccent: "Services",
    subtitle: "End-to-end AI automation solutions tailored to your business.",
    learnMore: "Learn more",
    items: [
      { title: "Workflow Automation", desc: "Eliminate repetitive tasks and streamline operations with intelligent automation." },
      { title: "AI Chatbots & Assistants", desc: "Deploy conversational AI that understands context and drives results." },
      { title: "Process Intelligence", desc: "Gain deep insights into your operations with AI-powered analytics." },
      { title: "Custom AI Integration", desc: "Seamlessly embed AI capabilities into your existing technology stack." },
      { title: "Data Pipeline Automation", desc: "Automate data collection, processing, and delivery at scale." },
    ],
  },
  // Metrics
  metrics: {
    items: [
      { value: "340%", label: "Average ROI" },
      { value: "60+", label: "Projects Delivered" },
      { value: "85%", label: "Time Saved" },
      { value: "98%", label: "Client Retention" },
    ],
    testimonials: [
      {
        quote: "Kanso Flow transformed our entire operations. What used to take days now takes minutes.",
        author: "Sarah Chen",
        role: "CTO, TechScale Inc.",
      },
      {
        quote: "The simplicity of their solutions is remarkable. They truly understand the art of removing complexity.",
        author: "Marcus Webb",
        role: "VP Operations, DataFlow",
      },
    ],
  },
  // Case Study Preview (Home)
  casePreview: {
    title: "Case",
    titleAccent: "Studies",
    subtitle: "Real results from real transformations.",
    readFullStory: "Read Full Story",
    cases: [
      { tag: "FinTech", title: "Automating Compliance Workflows", result: "72% reduction in processing time" },
      { tag: "Healthcare", title: "AI-Powered Patient Intake", result: "3x faster onboarding" },
      { tag: "E-Commerce", title: "Intelligent Inventory Management", result: "$2.1M in annual savings" },
    ],
  },
  // Final CTA
  finalCTA: {
    title: "Ready to",
    titleAccent: "Simplify",
    subtitle: "Let's transform your complex workflows into streamlined, intelligent systems that just work.",
    cta: "Start Your Flow",
  },
  // Services Page
  servicesPage: {
    heroTitle1: "From Chaos to",
    heroTitleAccent: "Clarity",
    heroSubtitle: "End-to-end AI automation solutions designed to simplify your most complex challenges.",
    theProblem: "The Problem",
    theOutcome: "The Outcome",
    ctaTitle: "Ready to Discover Your",
    ctaTitleAccent: "Flow",
    ctaSubtitle: "Book a free consultation and let us show you what's possible.",
    ctaButton: "Discover Your Flow",
    services: [
      {
        title: "Workflow Automation",
        description: "Eliminate repetitive tasks and streamline operations with intelligent, end-to-end automation that adapts to your business.",
        problems: ["Manual data entry consuming hours daily", "Inconsistent processes across teams", "Bottlenecks in approval chains"],
        outcomes: ["80% reduction in manual tasks", "Consistent, error-free processes", "Real-time workflow visibility"],
        industries: ["Finance", "Healthcare", "Manufacturing"],
      },
      {
        title: "AI Chatbots & Assistants",
        description: "Deploy conversational AI that understands context, handles complex queries, and delivers personalized experiences 24/7.",
        problems: ["Overwhelmed support teams", "Slow response times", "Inconsistent customer experience"],
        outcomes: ["60% reduction in support tickets", "< 2 second response times", "24/7 intelligent support"],
        industries: ["E-Commerce", "SaaS", "Hospitality"],
      },
      {
        title: "Process Intelligence",
        description: "Gain deep, actionable insights into your operations with AI-powered analytics and process mining.",
        problems: ["Lack of visibility into workflows", "Decisions based on gut feeling", "Hidden inefficiencies"],
        outcomes: ["360° operational visibility", "Data-driven decision making", "Continuous process optimization"],
        industries: ["Logistics", "Finance", "Enterprise"],
      },
      {
        title: "Custom AI Integration",
        description: "Seamlessly embed AI capabilities into your existing technology stack without disrupting current operations.",
        problems: ["Siloed tools and data", "Complex integration requirements", "Legacy system limitations"],
        outcomes: ["Unified data ecosystem", "Seamless API integrations", "Future-proof architecture"],
        industries: ["Tech", "Enterprise", "Retail"],
      },
      {
        title: "Data Pipeline Automation",
        description: "Automate data collection, transformation, and delivery at scale with intelligent pipeline orchestration.",
        problems: ["Manual data processing", "Data quality inconsistencies", "Delayed reporting"],
        outcomes: ["Real-time data processing", "99.9% data accuracy", "Automated quality checks"],
        industries: ["Analytics", "Finance", "Marketing"],
      },
    ],
  },
  // Case Studies Page
  caseStudiesPage: {
    heroTitle: "Complexity",
    heroTitleAccent: "Transformed",
    heroSubtitle: "Real stories of businesses that found their flow.",
    filters: ["All", "FinTech", "Healthcare", "E-Commerce", "SaaS", "Logistics"],
    theComplexity: "The Complexity",
    theFlow: "The Flow",
    ctaTitle: "Your Story Could Be",
    ctaTitleAccent: "Next",
    ctaButton: "Start Your Transformation",
    studies: [
      {
        tag: "FinTech",
        title: "Automating Compliance Workflows",
        complexity: "A leading fintech firm was drowning in manual compliance checks, with 12-person teams spending 60% of their time on repetitive documentation.",
        flow: "We deployed an AI-powered compliance automation system that intelligently routes, validates, and documents regulatory requirements in real-time.",
        metrics: [
          { value: "72%", label: "Reduction in processing time" },
          { value: "$1.8M", label: "Annual savings" },
          { value: "99.7%", label: "Compliance accuracy" },
        ],
      },
      {
        tag: "Healthcare",
        title: "AI-Powered Patient Intake",
        complexity: "A hospital network struggled with patient onboarding taking 45+ minutes, leading to frustrated patients and overwhelmed staff.",
        flow: "We built an intelligent intake system with AI-powered form processing, automated insurance verification, and smart scheduling.",
        metrics: [
          { value: "3x", label: "Faster onboarding" },
          { value: "92%", label: "Patient satisfaction" },
          { value: "$890K", label: "Annual savings" },
        ],
      },
      {
        tag: "E-Commerce",
        title: "Intelligent Inventory Management",
        complexity: "A fast-growing e-commerce brand faced constant stockouts and overstocking, losing millions in revenue and warehousing costs.",
        flow: "We implemented predictive AI that forecasts demand patterns, automates reordering, and optimizes warehouse allocation across 12 facilities.",
        metrics: [
          { value: "$2.1M", label: "Annual savings" },
          { value: "94%", label: "Forecast accuracy" },
          { value: "40%", label: "Less dead stock" },
        ],
      },
      {
        tag: "SaaS",
        title: "AI-Driven Customer Support",
        complexity: "A B2B SaaS platform with 50K+ users was overwhelmed by support tickets, with average resolution times exceeding 48 hours.",
        flow: "We deployed an AI assistant that handles tier-1 support, intelligently escalates complex issues, and provides proactive solutions.",
        metrics: [
          { value: "< 2min", label: "Avg response time" },
          { value: "60%", label: "Tickets auto-resolved" },
          { value: "$540K", label: "Support cost savings" },
        ],
      },
    ],
  },
  // About Page
  aboutPage: {
    heroTitle: "The Philosophy Behind",
    heroTitleAccent: "Kanso Flow",
    heroSubtitle: "Kanso (簡素) — the Japanese aesthetic of simplicity and removal of excess. We believe the most powerful solutions are the simplest ones.",
    philosophy1: "In a world obsessed with adding more, we focus on removing what's unnecessary. Every workflow we automate, every system we design follows one principle:",
    philosophyAccent: " simplicity is the ultimate sophistication.",
    philosophy2: "We founded Kanso Flow because we saw businesses drowning in complexity—tangled processes, siloed tools, and mountains of manual work. We knew AI could do more than just automate tasks. It could fundamentally simplify how businesses operate.",
    valuesTitle: "Our",
    valuesTitleAccent: "Values",
    values: [
      { title: "Simplicity", description: "We strip away complexity to reveal elegant solutions. Less noise, more clarity." },
      { title: "Transparency", description: "No black boxes. We explain every decision, share every metric, and keep you informed." },
      { title: "Excellence", description: "We hold ourselves to the highest standards. Every solution is crafted with precision." },
      { title: "Partnership", description: "Your success is our success. We work alongside you, not just for you." },
    ],
    teamTitle: "Our",
    teamTitleAccent: "Team",
    team: [
      { name: "Alex Kanso", role: "Founder & CEO", bio: "15+ years in AI and automation. Former lead at two Fortune 500 companies." },
      { name: "Yuki Tanaka", role: "Head of Engineering", bio: "PhD in Machine Learning. Built automation systems processing 1M+ daily transactions." },
      { name: "Marcus Chen", role: "Head of Strategy", bio: "Ex-McKinsey. Specializes in digital transformation for enterprise clients." },
      { name: "Priya Sharma", role: "Lead AI Architect", bio: "Pioneer in conversational AI. 20+ patents in natural language processing." },
    ],
    ctaTitle: "Work",
    ctaTitleAccent: "With Us",
    ctaSubtitle: "Join the companies that have found their flow.",
    ctaButton: "Get In Touch",
  },
  // Contact Page
  contactPage: {
    title: "Let's",
    titleAccent: "Simplify Together",
    subtitle: "Tell us about your challenges and we'll design the path to clarity.",
    successTitle: "Message Received",
    successMessage: "We'll review your message and get back to you within 24 hours.",
    name: "Name",
    email: "Email",
    company: "Company",
    industry: "Industry",
    selectIndustry: "Select industry",
    message: "How can we help?",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "Your company",
    messagePlaceholder: "Tell us about your challenges and what you'd like to achieve...",
    submit: "Send Message",
    required: "*",
    industries: ["Select industry", "FinTech", "Healthcare", "E-Commerce", "SaaS", "Logistics", "Manufacturing", "Other"],
    responseTime: "We respond within 24 hours",
    toastError: "Please fill in all required fields.",
    toastEmailError: "Please enter a valid email address.",
    toastSuccess: "Message sent! We'll be in touch soon.",
  },
  // Blog Page
  blogPage: {
    heroTitle: "Simplification",
    heroTitleAccent: "Insights",
    heroSubtitle: "Thoughts on AI, automation, and the art of simplification.",
    searchPlaceholder: "Search articles...",
    categories: ["All", "AI Strategy", "Automation", "Case Studies", "Industry Trends"],
    readCta: "Read",
    noResults: "No articles found matching your criteria.",
    articles: [
      {
        id: "future-of-workflow-automation",
        category: "Automation",
        title: "The Future of Workflow Automation in 2026",
        excerpt: "How AI-powered automation is reshaping enterprise operations and what leaders need to know to stay ahead.",
        date: "Feb 5, 2026",
        readTime: "6 min read",
      },
      {
        id: "ai-chatbots-beyond-support",
        category: "AI Strategy",
        title: "AI Chatbots: Beyond Customer Support",
        excerpt: "Discover how forward-thinking companies are using conversational AI for sales, operations, and internal knowledge management.",
        date: "Jan 28, 2026",
        readTime: "8 min read",
      },
      {
        id: "simplicity-competitive-advantage",
        category: "AI Strategy",
        title: "Why Simplicity Is Your Biggest Competitive Advantage",
        excerpt: "In a world of complex tools, the companies that simplify will win. Here's the data to prove it.",
        date: "Jan 15, 2026",
        readTime: "5 min read",
      },
      {
        id: "healthcare-ai-transformation",
        category: "Industry Trends",
        title: "Healthcare's AI Transformation: A 2026 Outlook",
        excerpt: "From patient intake to diagnostic support, AI is fundamentally changing healthcare delivery.",
        date: "Jan 8, 2026",
        readTime: "7 min read",
      },
      {
        id: "roi-of-process-automation",
        category: "Case Studies",
        title: "Measuring the True ROI of Process Automation",
        excerpt: "Beyond cost savings: how to measure the full impact of automation on your organization.",
        date: "Dec 20, 2025",
        readTime: "9 min read",
      },
      {
        id: "data-pipelines-best-practices",
        category: "Automation",
        title: "Building Resilient Data Pipelines: Best Practices",
        excerpt: "Practical guide to designing data pipelines that scale, self-heal, and deliver reliable insights.",
        date: "Dec 12, 2025",
        readTime: "10 min read",
      },
    ],
  },
  // Not Found
  notFound: {
    title: "404",
    message: "Oops! Page not found",
    link: "Return to Home",
  },
};
