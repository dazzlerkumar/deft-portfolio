export const chapter2MarkdownContent = `---
title: "The Challenges"
subtitle: "Solving problems, one pixel at a time"
chapterNumber: 2
visualTheme: "problem-solving"
projects: ["ecommerce-platform", "performance-optimization"]
---

Real growth happens when you face real challenges. This chapter showcases the complex problems I've tackled and the creative solutions I've built.

## The E-commerce Challenge

When tasked with redesigning a major e-commerce platform, I learned that performance and user experience go hand in hand.

## Building for Scale

Creating a design system that serves multiple teams taught me about architecture, collaboration, and the importance of documentation.

<!-- interactive: problem-solution-pairs -->
Discover how each challenge led to innovative solutions.`;

export const chapter2ProblemSolutions = [
  {
    id: "performance",
    problem: "E-commerce site loading in 8+ seconds, causing 40% bounce rate",
    solution: "Implemented code splitting, lazy loading, and optimized images",
    impact: "Reduced load time to 2.1s, increased conversions by 15%",
    projectId: "performance-optimization"
  },
  {
    id: "scalability", 
    problem: "Monolithic codebase becoming unmaintainable with team growth",
    solution: "Architected modular component system with clear boundaries",
    impact: "60% faster feature development, reduced bugs by 30%",
    projectId: "ecommerce-platform"
  },
  {
    id: "user-experience",
    problem: "Complex checkout flow with 70% abandonment rate", 
    solution: "Redesigned UX with progressive disclosure and smart defaults",
    impact: "Reduced abandonment to 25%, improved user satisfaction",
    projectId: "ecommerce-platform"
  },
  {
    id: "cross-browser",
    problem: "Inconsistent behavior across different browsers and devices",
    solution: "Implemented comprehensive testing suite and polyfills", 
    impact: "99.9% cross-browser compatibility, reduced support tickets by 50%"
  }
];