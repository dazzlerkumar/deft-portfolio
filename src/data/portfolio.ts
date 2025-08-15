/**
 * Portfolio data for Deepak Kumar
 * Contains all the content and information for the portfolio website
 */

import { PortfolioData, PersonalInfo, Project, BlogPost, Experience, Skill, ContactInfo } from '@/types/portfolio';

// Personal Information
export const personalInfo: PersonalInfo = {
  name: "Deepak Kumar",
  nameHindi: "दीपक कुमार", // Hindi name for bilingual support
  title: "Frontend Engineer",
  company: "Techpix Software Solutions",
  tagline: "Building Next.js/React applications with passion for learning and sharing web development knowledge",
  bio: "Frontend Engineer at Techpix Software Solutions with expertise in Next.js, React, and modern web development. Passionate about creating engaging user experiences and sharing knowledge through blog posts and open-source projects.",
  location: {
    city: "India", // Update with specific city if needed
    country: "India",
    timezone: "Asia/Kolkata"
  },
  avatar: {
    url: "/images/deepak-avatar.jpg", // Update with actual avatar path
    alt: "Deepak Kumar - Frontend Engineer"
  },
  availability: {
    status: "available",
    message: "Open to new opportunities and collaborations"
  },
  philosophy: [
    "Clean, maintainable code is the foundation of great applications",
    "Continuous learning and sharing knowledge drives innovation",
    "User experience should be at the center of every development decision",
    "Modern web technologies enable incredible user experiences"
  ],
  interests: [
    "Next.js and React ecosystem",
    "Modern web development practices",
    "Performance optimization",
    "Developer experience",
    "Open source contributions",
    "Technical writing and blogging"
  ]
};

// Featured Projects
export const featuredProjects: Project[] = [
  {
    id: "angularly-ecommerce",
    title: "Angularly Ecommerce",
    description: "A comprehensive e-commerce platform built with Angular, featuring modern UI/UX and robust functionality",
    longDescription: "A full-featured e-commerce application showcasing advanced Angular development skills with state management, routing, and responsive design.",
    category: "web-app",
    featured: true,
    status: "completed",
    images: {
      thumbnail: "/images/projects/angularly-ecommerce-thumb.jpg",
      gallery: [
        "/images/projects/angularly-ecommerce-1.jpg",
        "/images/projects/angularly-ecommerce-2.jpg",
        "/images/projects/angularly-ecommerce-3.jpg"
      ],
      hero: "/images/projects/angularly-ecommerce-hero.jpg"
    },
    technologies: [
      { name: "Angular", category: "frontend", icon: "angular", color: "#DD0031" },
      { name: "TypeScript", category: "frontend", icon: "typescript", color: "#3178C6" },
      { name: "RxJS", category: "frontend", icon: "rxjs", color: "#B7178C" },
      { name: "Angular Material", category: "frontend", icon: "material", color: "#FF6F00" },
      { name: "SCSS", category: "frontend", icon: "sass", color: "#CF649A" }
    ],
    features: [
      "Product catalog with search and filtering",
      "Shopping cart and checkout process",
      "User authentication and profiles",
      "Responsive design for all devices",
      "Admin dashboard for product management"
    ],
    challenges: [
      "Implementing complex state management with NgRx",
      "Optimizing performance for large product catalogs",
      "Creating reusable component architecture"
    ],
    learnings: [
      "Advanced Angular patterns and best practices",
      "State management with reactive programming",
      "E-commerce UX/UI design principles"
    ],
    links: {
      live: "https://angularly-ecommerce.vercel.app", // Update with actual URL
      github: "https://github.com/deepakkumar/angularly-ecommerce", // Update with actual URL
      demo: "https://angularly-ecommerce-demo.vercel.app" // Update with actual URL
    },
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-06-01"),
    duration: "6 months",
    teamSize: 1,
    role: "Full Stack Developer",
    slug: "angularly-ecommerce",
    tags: ["angular", "ecommerce", "typescript", "rxjs", "material-ui"],
    priority: 1
  },
  {
    id: "config-gen",
    title: "Config Gen",
    description: "A powerful configuration generator tool that simplifies the creation and management of application configurations",
    longDescription: "An intelligent configuration generator that helps developers quickly create and manage configuration files for various frameworks and tools.",
    category: "tool",
    featured: true,
    status: "completed",
    images: {
      thumbnail: "/images/projects/config-gen-thumb.jpg",
      gallery: [
        "/images/projects/config-gen-1.jpg",
        "/images/projects/config-gen-2.jpg"
      ],
      hero: "/images/projects/config-gen-hero.jpg"
    },
    technologies: [
      { name: "Node.js", category: "backend", icon: "nodejs", color: "#339933" },
      { name: "TypeScript", category: "frontend", icon: "typescript", color: "#3178C6" },
      { name: "CLI", category: "other", icon: "terminal", color: "#000000" },
      { name: "JSON Schema", category: "other", icon: "json", color: "#000000" }
    ],
    features: [
      "Interactive CLI for configuration generation",
      "Support for multiple frameworks and tools",
      "Template-based configuration creation",
      "Validation and error checking",
      "Export to various formats"
    ],
    challenges: [
      "Creating flexible template system",
      "Handling complex configuration schemas",
      "Building intuitive CLI interface"
    ],
    learnings: [
      "CLI development best practices",
      "Template engine implementation",
      "Configuration management patterns"
    ],
    links: {
      github: "https://github.com/deepakkumar/config-gen", // Update with actual URL
      demo: "https://config-gen-demo.vercel.app" // Update with actual URL
    },
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-09-01"),
    duration: "3 months",
    teamSize: 1,
    role: "Developer",
    slug: "config-gen",
    tags: ["nodejs", "cli", "typescript", "configuration", "developer-tools"],
    priority: 2
  },
  {
    id: "nextjs-template",
    title: "Next JS Template",
    description: "A comprehensive Next.js template with modern tooling, best practices, and ready-to-use components",
    longDescription: "A production-ready Next.js template featuring TypeScript, Tailwind CSS, and modern development practices to kickstart new projects.",
    category: "library",
    featured: true,
    status: "completed",
    images: {
      thumbnail: "/images/projects/nextjs-template-thumb.jpg",
      gallery: [
        "/images/projects/nextjs-template-1.jpg",
        "/images/projects/nextjs-template-2.jpg",
        "/images/projects/nextjs-template-3.jpg"
      ],
      hero: "/images/projects/nextjs-template-hero.jpg"
    },
    technologies: [
      { name: "Next.js", category: "frontend", icon: "nextjs", color: "#000000" },
      { name: "React", category: "frontend", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", category: "frontend", icon: "typescript", color: "#3178C6" },
      { name: "Tailwind CSS", category: "frontend", icon: "tailwind", color: "#06B6D4" },
      { name: "Framer Motion", category: "frontend", icon: "framer", color: "#0055FF" }
    ],
    features: [
      "Next.js 15 with App Router",
      "TypeScript configuration",
      "Tailwind CSS with custom design system",
      "Framer Motion animations",
      "ESLint and Prettier setup",
      "Component library with Storybook",
      "Testing setup with Jest and Testing Library"
    ],
    challenges: [
      "Creating flexible component architecture",
      "Setting up comprehensive tooling",
      "Optimizing for performance and SEO"
    ],
    learnings: [
      "Next.js App Router patterns",
      "Modern React development practices",
      "Build tool optimization"
    ],
    links: {
      live: "https://nextjs-template-demo.vercel.app", // Update with actual URL
      github: "https://github.com/deepakkumar/nextjs-template", // Update with actual URL
    },
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-01"),
    duration: "3 months",
    teamSize: 1,
    role: "Developer",
    slug: "nextjs-template",
    tags: ["nextjs", "react", "typescript", "tailwind", "template"],
    priority: 3
  }
];

// Featured Blog Posts from Medium
export const featuredPosts: BlogPost[] = [
  {
    id: "loading-screen-nextjs",
    title: "How to Create a Loading Screen for Client-side Fetching in NextJs",
    url: "https://medium.com/@deepakkumar/loading-screen-client-side-fetching-nextjs", // Update with actual URL
    platform: "medium",
    publishDate: new Date("2023-08-15"),
    tags: ["nextjs", "react", "loading", "ux", "frontend"],
    category: "tutorial",
    featured: true,
    readTime: 8,
    gradient: "from-blue-500 to-purple-600",
    excerpt: "Learn how to implement elegant loading screens for better user experience during client-side data fetching in Next.js applications.",
    image: {
      url: "/images/blog/loading-screen-nextjs.jpg",
      alt: "Loading screen implementation in Next.js"
    }
  },
  {
    id: "custom-password-revealing",
    title: "Custom Password Revealing in ReactJS using Hooks",
    url: "https://medium.com/@deepakkumar/custom-password-revealing-reactjs-hooks", // Update with actual URL
    platform: "medium",
    publishDate: new Date("2023-09-20"),
    tags: ["react", "hooks", "ui", "forms", "javascript"],
    category: "tutorial",
    featured: true,
    readTime: 6,
    gradient: "from-green-500 to-teal-600",
    excerpt: "Build a custom password reveal component using React hooks with smooth animations and accessibility features.",
    image: {
      url: "/images/blog/password-revealing-react.jpg",
      alt: "Custom password reveal component in React"
    }
  },
  {
    id: "console-apis-portfolio",
    title: "Level Up Your Frontend Developer Portfolio using these Console APIs",
    url: "https://medium.com/@deepakkumar/console-apis-frontend-portfolio", // Update with actual URL
    platform: "medium",
    publishDate: new Date("2023-10-10"),
    tags: ["javascript", "console", "portfolio", "developer-tools", "frontend"],
    category: "tips",
    featured: true,
    readTime: 10,
    gradient: "from-orange-500 to-red-600",
    excerpt: "Discover powerful Console APIs that can add interactive elements to your portfolio and showcase your JavaScript skills.",
    image: {
      url: "/images/blog/console-apis-portfolio.jpg",
      alt: "Console APIs for developer portfolios"
    }
  }
];

// Experience
export const experience: Experience[] = [
  {
    id: "techpix-frontend-engineer",
    company: "Techpix Software Solutions",
    position: "Frontend Engineer",
    type: "full-time",
    location: {
      city: "India", // Update with specific city
      country: "India",
      remote: false
    },
    startDate: new Date("2022-01-01"), // Update with actual start date
    duration: "2+ years", // Update based on actual duration
    description: "Frontend Engineer specializing in Next.js and React applications, focusing on building scalable web applications and sharing knowledge through technical content.",
    responsibilities: [
      "Develop and maintain React/Next.js applications",
      "Collaborate with design and backend teams",
      "Implement responsive and accessible user interfaces",
      "Optimize application performance and user experience",
      "Mentor junior developers and conduct code reviews",
      "Write technical documentation and blog posts"
    ],
    achievements: [
      "Successfully delivered multiple client projects using Next.js",
      "Improved application performance by 40% through optimization",
      "Created reusable component library used across projects",
      "Published technical articles reaching 10k+ developers"
    ],
    technologies: [
      { name: "Next.js", category: "frontend", icon: "nextjs", color: "#000000" },
      { name: "React", category: "frontend", icon: "react", color: "#61DAFB" },
      { name: "TypeScript", category: "frontend", icon: "typescript", color: "#3178C6" },
      { name: "Tailwind CSS", category: "frontend", icon: "tailwind", color: "#06B6D4" },
      { name: "JavaScript", category: "frontend", icon: "javascript", color: "#F7DF1E" }
    ],
    companyInfo: {
      website: "https://techpixsolutions.com", // Update with actual URL
      industry: "Software Development",
      size: "50-100 employees"
    },
    featured: true,
    order: 1
  }
];

// Skills
export const skills: Skill[] = [
  // Frontend Skills
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    level: 90,
    yearsOfExperience: 3,
    icon: "nextjs",
    color: "#000000",
    description: "Expert in Next.js App Router, SSR, SSG, and performance optimization",
    projects: ["nextjs-template", "angularly-ecommerce"]
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    level: 95,
    yearsOfExperience: 4,
    icon: "react",
    color: "#61DAFB",
    description: "Advanced React development with hooks, context, and modern patterns",
    projects: ["nextjs-template", "angularly-ecommerce"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    level: 85,
    yearsOfExperience: 3,
    icon: "typescript",
    color: "#3178C6",
    description: "Strong TypeScript skills for type-safe application development",
    projects: ["nextjs-template", "config-gen", "angularly-ecommerce"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: 90,
    yearsOfExperience: 2,
    icon: "tailwind",
    color: "#06B6D4",
    description: "Expert in utility-first CSS framework and custom design systems",
    projects: ["nextjs-template"]
  },
  {
    id: "angular",
    name: "Angular",
    category: "frontend",
    level: 80,
    yearsOfExperience: 2,
    icon: "angular",
    color: "#DD0031",
    description: "Solid Angular development skills with RxJS and state management",
    projects: ["angularly-ecommerce"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "frontend",
    level: 95,
    yearsOfExperience: 5,
    icon: "javascript",
    color: "#F7DF1E",
    description: "Expert JavaScript developer with ES6+ and modern web APIs",
    projects: ["nextjs-template", "config-gen", "angularly-ecommerce"]
  },
  
  // Backend Skills
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    level: 80,
    yearsOfExperience: 3,
    icon: "nodejs",
    color: "#339933",
    description: "Server-side JavaScript development with Express and modern frameworks",
    projects: ["config-gen"]
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    level: 75,
    yearsOfExperience: 2,
    icon: "express",
    color: "#000000",
    description: "RESTful API development and middleware implementation",
    projects: []
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    level: 70,
    yearsOfExperience: 2,
    icon: "mongodb",
    color: "#47A248",
    description: "NoSQL database design and optimization",
    projects: []
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    level: 65,
    yearsOfExperience: 1,
    icon: "postgresql",
    color: "#336791",
    description: "Relational database design and query optimization",
    projects: []
  },
  
  // Tools & DevOps
  {
    id: "git",
    name: "Git",
    category: "other",
    level: 90,
    yearsOfExperience: 5,
    icon: "git",
    color: "#F05032",
    description: "Version control, branching strategies, and collaborative development",
    projects: ["nextjs-template", "config-gen", "angularly-ecommerce"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    level: 70,
    yearsOfExperience: 2,
    icon: "docker",
    color: "#2496ED",
    description: "Containerization and deployment optimization",
    projects: []
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "devops",
    level: 85,
    yearsOfExperience: 3,
    icon: "vercel",
    color: "#000000",
    description: "Serverless deployment and edge functions",
    projects: ["nextjs-template"]
  },
  {
    id: "figma",
    name: "Figma",
    category: "design",
    level: 75,
    yearsOfExperience: 2,
    icon: "figma",
    color: "#F24E1E",
    description: "UI/UX design and prototyping",
    projects: []
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "other",
    level: 95,
    yearsOfExperience: 5,
    icon: "vscode",
    color: "#007ACC",
    description: "Advanced IDE usage with extensions and customization",
    projects: ["nextjs-template", "config-gen", "angularly-ecommerce"]
  }
];

// Contact Information
export const contactInfo: ContactInfo = {
  email: "deepak@example.com", // Update with actual email
  location: {
    city: "India", // Update with specific city
    country: "India",
    timezone: "Asia/Kolkata"
  },
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/deepakkumar", // Update with actual URL
      username: "deepakkumar",
      icon: "github",
      primary: true
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/deepakkumar", // Update with actual URL
      username: "deepakkumar",
      icon: "linkedin",
      primary: true
    },
    {
      platform: "Medium",
      url: "https://medium.com/@deepakkumar", // Update with actual URL
      username: "@deepakkumar",
      icon: "medium",
      primary: true
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/deepakkumar", // Update with actual URL
      username: "@deepakkumar",
      icon: "twitter",
      primary: false
    }
  ],
  availability: {
    status: "available",
    message: "Open to new opportunities and collaborations",
    preferredContactMethod: "email",
    responseTime: "within 24 hours"
  }
};

// Main Portfolio Data
export const portfolioData: PortfolioData = {
  personal: personalInfo,
  projects: featuredProjects,
  featuredPosts: featuredPosts,
  skills: skills,
  experience: experience,
  education: [], // Add education data if needed
  certifications: [], // Add certifications if needed
  testimonials: [], // Add testimonials if needed
  contact: contactInfo,
  lastUpdated: new Date(),
  version: "1.0.0"
};

export default portfolioData;