import { Project } from '@/lib/types/project';

export const projectData: Record<string, Project> = {
  "first-website": {
    id: "first-website",
    title: "Personal Portfolio v1",
    description: "My first attempt at creating a professional web presence. Built with pure HTML, CSS, and vanilla JavaScript, this project taught me the fundamentals of web development and responsive design.",
    storyIntegration: "This was where it all began - the project that transformed me from a curious beginner into a passionate developer. Every pixel was carefully crafted, every animation meticulously timed.",
    technologies: [
      { name: "HTML5", category: "frontend", proficiency: "intermediate" },
      { name: "CSS3", category: "frontend", proficiency: "intermediate" },
      { name: "JavaScript", category: "frontend", proficiency: "beginner" },
      { name: "Responsive Design", category: "frontend", proficiency: "intermediate" }
    ],
    demoUrl: "https://example.com/first-portfolio",
    codeUrl: "https://github.com/example/first-portfolio",
    images: ["/projects/first-website-hero.jpg", "/projects/first-website-mobile.jpg"],
    impact: {
      timeframe: "3 months",
      businessValue: "Landed first freelance client",
      performanceImprovement: "100% improvement in personal branding"
    },
    featured: true,
    category: "web-application"
  },
  
  "javascript-calculator": {
    id: "javascript-calculator",
    title: "Interactive Calculator",
    description: "A fully functional calculator built with vanilla JavaScript. Features include basic arithmetic operations, keyboard support, and a clean, intuitive interface inspired by modern design principles.",
    storyIntegration: "This project marked my transition from static websites to interactive applications. Each button click represented a small victory in understanding event handling and state management.",
    technologies: [
      { name: "JavaScript", category: "frontend", proficiency: "intermediate" },
      { name: "CSS Grid", category: "frontend", proficiency: "intermediate" },
      { name: "Event Handling", category: "frontend", proficiency: "intermediate" }
    ],
    demoUrl: "https://example.com/calculator",
    codeUrl: "https://github.com/example/calculator",
    images: ["/projects/calculator-main.jpg", "/projects/calculator-operations.jpg"],
    impact: {
      timeframe: "2 weeks",
      performanceImprovement: "Learned state management fundamentals"
    },
    featured: false,
    category: "tool"
  },

  "react-todo": {
    id: "react-todo",
    title: "React Task Manager",
    description: "A sophisticated task management application built with React. Features include drag-and-drop functionality, local storage persistence, and a beautiful, animated interface.",
    storyIntegration: "My first React application opened my eyes to component-based architecture. This project taught me about the power of declarative programming and reusable components.",
    technologies: [
      { name: "React", category: "frontend", proficiency: "intermediate" },
      { name: "React Hooks", category: "frontend", proficiency: "intermediate" },
      { name: "Local Storage", category: "frontend", proficiency: "intermediate" },
      { name: "CSS Animations", category: "frontend", proficiency: "advanced" }
    ],
    demoUrl: "https://example.com/react-todo",
    codeUrl: "https://github.com/example/react-todo",
    images: ["/projects/todo-dashboard.jpg", "/projects/todo-mobile.jpg"],
    impact: {
      timeframe: "1 month",
      performanceImprovement: "50% faster development with component reuse"
    },
    featured: true,
    category: "web-application"
  },

  "ecommerce-platform": {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and real-time order tracking.",
    storyIntegration: "This project challenged me to think beyond individual features and consider the entire user journey. It was my first taste of leading a technical project from conception to deployment.",
    technologies: [
      { name: "React", category: "frontend", proficiency: "advanced" },
      { name: "Node.js", category: "backend", proficiency: "advanced" },
      { name: "MongoDB", category: "database", proficiency: "intermediate" },
      { name: "Stripe API", category: "tool", proficiency: "intermediate" },
      { name: "JWT", category: "backend", proficiency: "intermediate" }
    ],
    demoUrl: "https://example.com/ecommerce",
    codeUrl: "https://github.com/example/ecommerce-platform",
    images: ["/projects/ecommerce-home.jpg", "/projects/ecommerce-checkout.jpg"],
    impact: {
      userReach: 5000,
      teamSize: 3,
      timeframe: "6 months",
      businessValue: "$50K in first quarter sales"
    },
    featured: true,
    category: "web-application"
  },

  "design-system": {
    id: "design-system",
    title: "Component Design System",
    description: "A comprehensive design system and component library built with React and Storybook. Includes 50+ reusable components, design tokens, and comprehensive documentation.",
    storyIntegration: "Leading the creation of our design system taught me about scalability, consistency, and the importance of developer experience. This project became the foundation for all future development.",
    technologies: [
      { name: "React", category: "frontend", proficiency: "expert" },
      { name: "TypeScript", category: "frontend", proficiency: "advanced" },
      { name: "Storybook", category: "tool", proficiency: "advanced" },
      { name: "CSS-in-JS", category: "frontend", proficiency: "advanced" },
      { name: "Design Tokens", category: "frontend", proficiency: "expert" }
    ],
    demoUrl: "https://example.com/design-system",
    codeUrl: "https://github.com/example/design-system",
    images: ["/projects/design-system-overview.jpg", "/projects/design-system-components.jpg"],
    impact: {
      teamSize: 8,
      timeframe: "4 months",
      performanceImprovement: "60% faster feature development",
      businessValue: "Reduced design-to-development time by 40%"
    },
    featured: true,
    category: "library"
  },

  "performance-optimization": {
    id: "performance-optimization",
    title: "Performance Optimization Initiative",
    description: "Led a comprehensive performance optimization project that improved Core Web Vitals across multiple applications. Implemented code splitting, lazy loading, and advanced caching strategies.",
    storyIntegration: "This project taught me that great code isn't just about functionality - it's about creating experiences that feel instant and effortless for users.",
    technologies: [
      { name: "Webpack", category: "tool", proficiency: "advanced" },
      { name: "Service Workers", category: "frontend", proficiency: "advanced" },
      { name: "Web Performance API", category: "frontend", proficiency: "expert" },
      { name: "Lighthouse", category: "tool", proficiency: "expert" }
    ],
    codeUrl: "https://github.com/example/performance-optimization",
    images: ["/projects/performance-before.jpg", "/projects/performance-after.jpg"],
    impact: {
      userReach: 100000,
      teamSize: 5,
      timeframe: "3 months",
      performanceImprovement: "70% improvement in load times",
      businessValue: "15% increase in conversion rates"
    },
    featured: true,
    category: "leadership"
  }
};

export const getProjectsByChapter = (chapterId: string): Project[] => {
  const chapterProjects: Record<string, string[]> = {
    "1": ["first-website", "javascript-calculator", "react-todo"],
    "2": ["ecommerce-platform", "performance-optimization"],
    "3": ["design-system"],
    "4": []
  };
  
  return (chapterProjects[chapterId] || [])
    .map(id => projectData[id])
    .filter(Boolean);
};

export const getFeaturedProjects = (): Project[] => {
  return Object.values(projectData).filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return Object.values(projectData).filter(project => project.category === category);
};