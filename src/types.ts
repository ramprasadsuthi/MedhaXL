export interface Course {
  id: string;
  title: string;
  category: "development" | "testing" | "data" | "cloud" | "creative" | "programs";
  duration: string;
  mode: "Live Online" | "Hybrid" | "Classroom" | "Self-Paced";
  trainer: string;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  highlights: string[];
  price: number;
  originalPrice: number;
  syllabus: string[];
  image: string;
}

export interface Trainer {
  name: string;
  role: string;
  experience: string;
  avatar: string;
  company: string;
  bio: string;
}

export interface StudentStory {
  id: string;
  name: string;
  course: string;
  previousSalary: string;
  placedSalary: string;
  company: string;
  companyLogo: string;
  quote: string;
  avatar: string;
}

export interface LiveProject {
  title: string;
  category: string;
  techStack: string[];
  description: string;
  difficulty: "Medium" | "High" | "Enterprise";
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

// Full course dataset containing Java Full Stack, Python Full Stack, MERN Stack, UI UX, Digital Marketing, DevOps, Data Analytics, Automation Testing, QA, Software development, and the Career Launch Program.
export const COURSES: Course[] = [
  {
    id: "java-fs",
    title: "Java Enterprise Full Stack Developer",
    category: "development",
    duration: "6 Months",
    mode: "Live Online",
    trainer: "Dr. Srinivas Rao (Technical Architect)",
    rating: 4.9,
    level: "Intermediate",
    highlights: ["Spring Boot & Microservices", "Spring Security & OAuth2", "MySQL & PostgreSQL Integration", "AWS Deployment", "Docker & CI/CD Pipelines"],
    price: 49999,
    originalPrice: 79999,
    syllabus: [
      "Core Java (OOPs, Collections, Multithreading)",
      "Advanced Java (JDBC, Servlets, JSP)",
      "Hibernate ORM & JPA",
      "Spring Framework (IoC, DI, MVC, Security)",
      "Spring Boot & RESTful Microservices",
      "React Frontend Integration",
      "CI/CD, Git, GitHub & AWS Deployment"
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "mern-fs",
    title: "MERN Stack Web Development (AI-Powered)",
    category: "development",
    duration: "5 Months",
    mode: "Live Online",
    trainer: "Anil Kumar (Founder & Principal Architect)",
    rating: 4.95,
    level: "Beginner",
    highlights: ["React 19 & Next.js 15", "Express & Node.js Rest APIs", "MongoDB & Mongoose schemas", "AI Assistant Integrations", "Redux Toolkit & Tailwind CSS"],
    price: 44999,
    originalPrice: 69999,
    syllabus: [
      "HTML5, CSS3, ES6+ JavaScript, Tailwind CSS",
      "React.js (Hooks, Context, Custom Hooks, Performance)",
      "State Management (Redux Toolkit & Zustand)",
      "Node.js Core & Express.js Framework",
      "MongoDB Database Modeling & Aggregations",
      "JSON Web Tokens (JWT) & Session Authentication",
      "Gemini AI SDK Integration for smart features",
      "Vercel, Render & Docker Deployments"
    ],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "python-fs",
    title: "Python Full Stack & Django Professional",
    category: "development",
    duration: "5 Months",
    mode: "Hybrid",
    trainer: "Meera Nair (Senior Python Dev)",
    rating: 4.8,
    level: "Beginner",
    highlights: ["Django & Django REST Framework", "Python Scripting & OOPs", "React Integration", "SQLAlchemy & SQLite/Postgres", "AI Coding practices"],
    price: 39999,
    originalPrice: 59999,
    syllabus: [
      "Python Basics to Advanced (Data Structures, Decorators)",
      "Object-Oriented Programming (OOP) in Python",
      "SQL Foundations (PostgreSQL)",
      "Django Web Framework (MVT, ORM, Admin Portal)",
      "Django REST Framework for APIs",
      "React Frontend Essentials",
      "Git, Docker & Heroku Deployment"
    ],
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "automation-testing",
    title: "SDET: Automation Testing Masterclass",
    category: "testing",
    duration: "4 Months",
    mode: "Live Online",
    trainer: "Vikram Malhotra (QA Lead, Ex-Infosys)",
    rating: 4.85,
    level: "All Levels",
    highlights: ["Selenium WebDriver with Java/Python", "Playwright with TypeScript", "Cypress E2E Testing", "Postman & RestAssured API Testing", "Jenkins & GitHub Actions CI/CD"],
    price: 29999,
    originalPrice: 49999,
    syllabus: [
      "Manual Testing Concepts & SDLC/STLC Models",
      "Core Java & TypeScript for Automation Engineers",
      "Selenium WebDriver (Page Object Model, Grid)",
      "Cypress & Playwright E2E frameworks",
      "API Testing (Postman, RestAssured)",
      "Performance Testing (JMeter foundations)",
      "CI/CD Integration with Jenkins & Pipelines"
    ],
    image: "https://images.unsplash.com/photo-1516116211223-4c359a36beec?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Business Intelligence",
    category: "data",
    duration: "4 Months",
    mode: "Hybrid",
    trainer: "Dr. Rajesh Sharma (Ex-Data Scientist, Microsoft)",
    rating: 4.9,
    level: "Beginner",
    highlights: ["Advanced Excel & SQL Queries", "Power BI Dashboards", "Tableau Visualizations", "Python for Data Analysis (Pandas, Numpy)", "Statistics for Decision Making"],
    price: 34999,
    originalPrice: 54999,
    syllabus: [
      "Advanced Excel (Pivot, VLOOKUP, PowerQuery)",
      "SQL databases (Complex Joins, Window Functions)",
      "Data Visualisation with Microsoft Power BI",
      "Tableau Desktop BI Analytics",
      "Python Scripting for Pandas & Matplotlib",
      "Descriptive & Inferential Statistics",
      "Interactive Capstone Portfolios"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "prompt-eng-ai",
    title: "AI, Machine Learning & Prompt Engineering",
    category: "data",
    duration: "4 Months",
    mode: "Live Online",
    trainer: "Anil Kumar & Gemini AI",
    rating: 4.97,
    level: "Advanced",
    highlights: ["Prompt Engineering Techniques", "Machine Learning Algorithms", "Neural Networks & TensorFlow", "Gemini, OpenAI, & Claude SDKs", "LangChain & RAG Architectures"],
    price: 49999,
    originalPrice: 79999,
    syllabus: [
      "Mathematics for Machine Learning (Linear Algebra, Calculus)",
      "Supervised & Unsupervised Learning Models (Scikit-Learn)",
      "Deep Learning with TensorFlow & PyTorch",
      "LLM Architectures & Advanced Prompt Engineering",
      "LangChain: Agents, Tools & Vectors",
      "Retrieval-Augmented Generation (RAG)",
      "Deploying Generative AI Agents on Cloud"
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "devops-cloud",
    title: "Cloud DevOps Architect (AWS, Docker, K8s)",
    category: "cloud",
    duration: "5 Months",
    mode: "Classroom",
    trainer: "Suresh Pillai (DevOps Lead, AWS Certified)",
    rating: 4.88,
    level: "Intermediate",
    highlights: ["AWS & Azure Cloud Services", "Docker Containerization", "Kubernetes Orchestration", "Terraform IaC (Infrastructure as Code)", "Jenkins, GitLab & GitHub Actions"],
    price: 44999,
    originalPrice: 69999,
    syllabus: [
      "Linux System Administration & Shell Scripting",
      "AWS Cloud Engineering (EC2, VPC, S3, IAM, RDS)",
      "Docker & Container Security",
      "Kubernetes Clustering & Scaling",
      "Terraform Infrastructure Provisioning",
      "CI/CD Orchestration (Jenkins, Gitlab CI, ArgoCD)",
      "Prometheus & Grafana Monitoring"
    ],
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "uiux-design",
    title: "UI/UX & Product Design Professional",
    category: "creative",
    duration: "3 Months",
    mode: "Hybrid",
    trainer: "Siddharth Sen (Lead Designer, Ex-Zomato)",
    rating: 4.92,
    level: "Beginner",
    highlights: ["Figma Mastery & Component Libraries", "User Research & Persona Mapping", "Wireframing & Prototyping", "Design Systems Construction", "Portfolio Building & Review"],
    price: 24999,
    originalPrice: 39999,
    syllabus: [
      "Design Thinking Principles & Double Diamond Strategy",
      "User Research, Surveying & Card Sorting",
      "Information Architecture & User Journeys",
      "Figma Advanced Tooling (Auto-layout, Components, Variants)",
      "High-Fidelity UI Prototyping & Microinteractions",
      "Design Systems & Developer Handoffs",
      "Real-world Portfolio Design Projects"
    ],
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "career-launch",
    title: "100% Placement Support Career Launch Program",
    category: "programs",
    duration: "9 Months",
    mode: "Hybrid",
    trainer: "MEDHA XL Placement & Trainer Panel",
    rating: 4.98,
    level: "All Levels",
    highlights: ["Guaranteed Internships", "1-on-1 Placement Mentoring", "Unlimited Mock Interviews", "Professional Portfolios", "Direct Hiring Partner Access"],
    price: 74999,
    originalPrice: 119999,
    syllabus: [
      "Phase 1: Foundation Skills (Programming & Web)",
      "Phase 2: Core Domain Specialisation (Full Stack or DevOps)",
      "Phase 3: Comprehensive Enterprise Live Projects",
      "Phase 4: DSA & Advanced Problem Solving bootcamp",
      "Phase 5: Tech Resume Optimization & Portfolio Host",
      "Phase 6: Simulated Mock HR & Technical Interviews",
      "Phase 7: Recruitment drives with 200+ partner companies"
    ],
    image: "https://images.unsplash.com/photo-1521791136364-7286475269a9?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "internship-pg",
    title: "Medha XL Industry Internship Program",
    category: "programs",
    duration: "3 Months",
    mode: "Classroom",
    trainer: "IT Project Managers",
    rating: 4.9,
    level: "Intermediate",
    highlights: ["Work on Live Medha XL Client Projects", "Experienced Mentorship", "Software Development Lifecycle Exposure", "Experience Letter & Certificate", "Paid Internship Opportunities"],
    price: 14999,
    originalPrice: 24999,
    syllabus: [
      "Medha XL Engineering Onboarding",
      "Agile/Scrum Framework Workshops",
      "Collaborative Coding on Git/GitHub Enterprise",
      "Software Development Sprint Lifecycles",
      "Unit Testing, Peer Reviews & Bug Scopes",
      "Final Client Handoff & Presentation",
      "LMS Certificate and Recommendation Letter"
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60"
  }
];

export const TRAINERS: Trainer[] = [
  {
    name: "Anil Kumar",
    role: "Founder, CEO & Principal Architect",
    experience: "15+ Years",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
    company: "Ex-Google / Tech Advisor",
    bio: "Anil is a technical pioneer who has trained over 5000+ engineers globally and built high-performance enterprise systems."
  },
  {
    name: "Dr. Srinivas Rao",
    role: "Senior Enterprise Java Architect",
    experience: "18+ Years",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    company: "Ex-Oracle Consultant",
    bio: "Expert in distributed systems, Spring Boot microservices, high-volume database administration, and containerization."
  },
  {
    name: "Meera Nair",
    role: "Senior AI & Data Analyst",
    experience: "10+ Years",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60",
    company: "Ex-IBM Architect",
    bio: "Meera teaches Python Full Stack, Machine Learning, and prompt engineering, combining industrial projects with practical research."
  },
  {
    name: "Vikram Malhotra",
    role: "Director of Software Testing",
    experience: "12+ Years",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60",
    company: "Ex-Infosys QA Principal",
    bio: "Vikram is a pioneer in Playwright and Selenium test automation pipelines with an extensive database of industrial testing suites."
  }
];

export const STUDENT_STORIES: StudentStory[] = [
  {
    id: "story-1",
    name: "Rohan Deshmukh",
    course: "MERN Stack Web Development",
    previousSalary: "3.2 LPA (Non-Tech)",
    placedSalary: "12.4 LPA",
    company: "TCS / Tech Mahindra",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60",
    quote: "MEDHA XL turned my non-tech career around. The AI doubts assistant, 1-on-1 resume building, and placement calls got me multiple offer letters within 4 months of completing my MERN Stack course!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=60"
  },
  {
    id: "story-2",
    name: "Aanya Verma",
    course: "Java Enterprise Full Stack",
    previousSalary: "Fresh Graduate",
    placedSalary: "9.6 LPA",
    company: "Cognizant / Accenture",
    companyLogo: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=80&auto=format&fit=crop&q=60",
    quote: "The live projects like Hospital Management and Vendor Marketplace in my Java Full Stack course gave me real engineering experience that helped me breeze through technical and HR rounds easily.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=60"
  },
  {
    id: "story-3",
    name: "Karthik Raja",
    course: "Cloud DevOps Architect",
    previousSalary: "4.5 LPA (Support)",
    placedSalary: "14.8 LPA",
    company: "AWS / Cloud Solutions",
    companyLogo: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=80&auto=format&fit=crop&q=60",
    quote: "The absolute highlight of MEDHA XL is the hands-on labs. We literally built, containerized, orchestrated and deployed full CI/CD pipelines to AWS live. That made me very confident in cloud architecture.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=60"
  }
];

export const LIVE_PROJECTS: LiveProject[] = [
  {
    title: "Enterprise Student LMS Portal",
    category: "Full Stack Development",
    techStack: ["React", "Express", "Node.js", "MongoDB", "Tailwind"],
    description: "Real-time educational platform with quiz engine, progress tracking, dynamic certifications, and secure payment gate.",
    difficulty: "Enterprise"
  },
  {
    title: "AI-Powered Vendor Marketplace",
    category: "AI Integration",
    techStack: ["React", "Python", "Django", "PostgreSQL", "Gemini AI"],
    description: "E-Commerce portal with smart product categorization, automated descriptions, and intelligent search recommendation systems.",
    difficulty: "High"
  },
  {
    title: "Multi-tenant Hospital Management System",
    category: "Java Enterprise",
    techStack: ["Java Boot", "Spring Security", "MySQL", "React", "Docker"],
    description: "Highly secure clinical management solution covering billing systems, lab reports, doctor schedules and OAuth2 auth.",
    difficulty: "Enterprise"
  },
  {
    title: "Cloud Migration & Automation Pipeline",
    category: "DevOps & Cloud",
    techStack: ["AWS Services", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    description: "Automatic provisioning of AWS infrastructure with load balancing, auto-scaling and zero-downtime microservice orchestration.",
    difficulty: "Enterprise"
  },
  {
    title: "Fintech Banking System with Audit Log",
    category: "Data & Security",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Jest"],
    description: "Simulation of banking transaction portal with state-of-the-art security, audit trials, digital signatures and fraud logs.",
    difficulty: "Enterprise"
  },
  {
    title: "Automated Regression Testing Suite",
    category: "QA & Testing",
    techStack: ["TypeScript", "Playwright", "Cypress", "Jenkins", "RestAssured"],
    description: "Parallel execution test automation suite checking UI responsiveness, load stability, API endpoints, and continuous integrations.",
    difficulty: "Medium"
  }
];

export const SERVICES: Service[] = [
  {
    title: "Corporate Training & Upskilling",
    description: "High-impact technical training modules for corporate cohorts to master emerging technologies and optimize team output.",
    icon: "Briefcase"
  },
  {
    title: "Software & Web Development",
    description: "Custom enterprise application development, cloud-native website portals, and digital workflow automations built to scale.",
    icon: "Code2"
  },
  {
    title: "QA Testing Outsourcing",
    description: "Comprehensive automated and manual software QA suites to speed up deployments, eradicate bugs, and ensure standard compliancy.",
    icon: "ShieldCheck"
  },
  {
    title: "Generative AI Solutions",
    description: "Custom RAG installations, LLM prompt customization, and automated content engines integrated into pre-existing workflows.",
    icon: "Cpu"
  },
  {
    title: "Cloud Infrastructure Setup",
    description: "Zero-downtime cloud migration, Dockerization, Kubernetes setups, and infrastructure orchestration using Terraform.",
    icon: "Cloud"
  },
  {
    title: "Recruitment & Placement Staffing",
    description: "Curated matchmaking linking elite IT industry talent and certified trainees directly with pre-screened partner companies.",
    icon: "Users"
  }
];

export const FAQS = [
  {
    question: "Does Medha XL guarantee job placements?",
    answer: "Our Career Launch Program features intensive, 100% placement assistance. This includes guaranteed corporate interviews, resume analysis, technical certifications, and extensive 1-on-1 mock interviews. We have 150+ corporate hiring partners who actively recruit our students."
  },
  {
    question: "Can I enroll if I have a non-tech background?",
    answer: "Absolutely! Many of our most successful students come from non-tech streams (B.Com, Mech, Civil, etc.). We start all core courses from absolute scratch (HTML, basic logic building) and ramp up incrementally to expert enterprise standards."
  },
  {
    question: "Is there a flexible payment or EMI option?",
    answer: "Yes, we support card payments, bank transfers, and convenient 0% interest monthly EMI installments across 3, 6, or 9 months. You can use our interactive EMI Fee Calculator on the Course Catalog tab to see precise monthly costs."
  },
  {
    question: "How do the AI Features inside the platform work?",
    answer: "We have fully integrated Gemini AI models directly into our server-side architecture! Students can use the AI Career Counselor for step-by-step roadmap generation, the AI Resume Analyzer for live grading, the AI Coding Mentor in our interactive Code Playground to trace execution bugs, and the Doubt Solver inside their learning workspace."
  },
  {
    question: "Do you offer offline classroom training?",
    answer: "Yes, we have state-of-the-art classroom labs and hybrid modules. Students can attend classroom lectures, work directly on live corporate projects inside our IT division, or opt for 100% live interactive online batches with recorded portal access."
  }
];
