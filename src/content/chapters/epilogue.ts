import type { ArchitectureNode } from "@/components/story/architecture-diagram";
import type { BestPracticeExample } from "@/components/story/best-practices-showcase";

export const epilogueContent = {
  title: "Epilogue: The Code",
  subtitle: "Behind the Scenes of Modern Frontend Development",
  introduction: `
    Welcome to the technical heart of this portfolio. Here, we pull back the curtain 
    to reveal the engineering decisions, architectural patterns, and best practices 
    that power this storytelling experience. This isn't just a showcase—it's a 
    deep dive into modern frontend development.
  `,
  
  architectureNodes: [
    {
      id: "nextjs",
      label: "Next.js App",
      type: "component" as const,
      description: "Next.js 15 with App Router providing server-side rendering, routing, and performance optimizations.",
      technologies: ["Next.js 15", "React 18", "TypeScript"],
      connections: ["components", "api", "styling"],
      position: { x: 50, y: 50 }
    },
    {
      id: "components",
      label: "React Components",
      type: "component" as const,
      description: "Modular, reusable components built with modern React patterns and TypeScript.",
      technologies: ["React", "TypeScript", "Framer Motion"],
      connections: ["styling", "state", "three"],
      position: { x: 250, y: 50 }
    },
    {
      id: "styling",
      label: "Tailwind CSS",
      type: "service" as const,
      description: "Utility-first CSS framework with custom animations and responsive design.",
      technologies: ["Tailwind CSS", "PostCSS", "CSS Variables"],
      connections: ["components"],
      position: { x: 450, y: 50 }
    },
    {
      id: "three",
      label: "Three.js",
      type: "external" as const,
      description: "3D graphics library for immersive visual elements and interactive experiences.",
      technologies: ["Three.js", "React Three Fiber", "WebGL"],
      connections: ["components", "performance"],
      position: { x: 250, y: 150 }
    },
    {
      id: "state",
      label: "State Management",
      type: "data" as const,
      description: "Local state with React hooks and context for user progress tracking.",
      technologies: ["React Context", "Local Storage", "Custom Hooks"],
      connections: ["components", "api"],
      position: { x: 50, y: 150 }
    },
    {
      id: "performance",
      label: "Performance",
      type: "service" as const,
      description: "Code splitting, lazy loading, and Core Web Vitals optimization.",
      technologies: ["Dynamic Imports", "Image Optimization", "Bundle Analysis"],
      connections: ["nextjs", "three"],
      position: { x: 450, y: 150 }
    },
    {
      id: "api",
      label: "Content API",
      type: "data" as const,
      description: "Static content management with TypeScript interfaces and validation.",
      technologies: ["TypeScript", "Static Generation", "Content Validation"],
      connections: ["nextjs", "state"],
      position: { x: 150, y: 250 }
    }
  ] as ArchitectureNode[],

  codeExamples: [
    {
      name: "StoryChapter.tsx",
      path: "src/components/story/story-chapter.tsx",
      language: "tsx",
      description: "Base component for story chapters with theme switching and animations",
      content: `interface StoryChapterProps {
  chapterNumber: number;
  title: string;
  theme: ChapterTheme;
  children: React.ReactNode;
}

export function StoryChapter({ 
  chapterNumber, 
  title, 
  theme, 
  children 
}: StoryChapterProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <motion.section
      className={\`min-h-screen \${getThemeClasses(theme)}\`}
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Chapter {chapterNumber}: {title}
        </motion.h1>
        {children}
      </div>
    </motion.section>
  );
}`
    },
    {
      name: "performance-monitor.ts",
      path: "src/lib/utils/performance-monitor.ts",
      language: "typescript",
      description: "Core Web Vitals monitoring and performance tracking utilities",
      content: `export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  
  constructor() {
    this.initializeCoreWebVitals();
  }
  
  private initializeCoreWebVitals() {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.set('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
  }
  
  public getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
}`
    },
    {
      name: "dynamic-imports.ts",
      path: "src/lib/utils/dynamic-imports.ts",
      language: "typescript",
      description: "Dynamic component loading with error boundaries and loading states",
      content: `export function createDynamicComponent<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    loading?: React.ComponentType;
    error?: React.ComponentType<{ error: Error }>;
  } = {}
) {
  return dynamic(importFn, {
    loading: options.loading || (() => <LoadingSpinner />),
    ssr: false
  });
}

// Usage example
export const ThreeScene = createDynamicComponent(
  () => import('@/components/three/space-environment'),
  {
    loading: () => <div>Loading 3D scene...</div>,
    error: ({ error }) => <div>Failed to load 3D scene: {error.message}</div>
  }
);`
    }
  ],

  bestPractices: [
    {
      id: "performance-optimization",
      title: "Component Code Splitting",
      category: "performance" as const,
      description: "Optimize bundle size by splitting components and loading them dynamically when needed.",
      language: "tsx",
      badExample: {
        code: `// Loading all components upfront
import { HeavyChart } from './heavy-chart';
import { ThreeScene } from './three-scene';
import { VideoPlayer } from './video-player';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div>
      {activeTab === 'charts' && <HeavyChart />}
      {activeTab === 'scene' && <ThreeScene />}
      {activeTab === 'video' && <VideoPlayer />}
    </div>
  );
}`,
        explanation: "All components are loaded immediately, increasing initial bundle size even when not used."
      },
      goodExample: {
        code: `// Dynamic imports with lazy loading
const HeavyChart = lazy(() => import('./heavy-chart'));
const ThreeScene = lazy(() => import('./three-scene'));
const VideoPlayer = lazy(() => import('./video-player'));

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        {activeTab === 'charts' && <HeavyChart />}
        {activeTab === 'scene' && <ThreeScene />}
        {activeTab === 'video' && <VideoPlayer />}
      </Suspense>
    </div>
  );
}`,
        explanation: "Components are loaded only when needed, reducing initial bundle size and improving performance."
      },
      benefits: [
        "Reduced initial bundle size",
        "Faster page load times",
        "Better Core Web Vitals scores",
        "Improved user experience on slower connections"
      ]
    },
    {
      id: "accessibility-focus",
      title: "Focus Management in Modals",
      category: "accessibility" as const,
      description: "Properly manage focus when opening and closing modal dialogs for screen reader users.",
      language: "tsx",
      badExample: {
        code: `function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}`,
        explanation: "No focus management - screen readers lose context and keyboard users can't navigate properly."
      },
      goodExample: {
        code: `function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocus.current?.focus();
    }
  }, [isOpen]);
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        className="modal-content"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <button onClick={onClose} aria-label="Close modal">×</button>
        {children}
      </div>
    </div>
  );
}`,
        explanation: "Proper focus management ensures accessibility compliance and better user experience."
      },
      benefits: [
        "Screen reader compatibility",
        "Keyboard navigation support",
        "WCAG compliance",
        "Better user experience for all users"
      ]
    },
    {
      id: "testing-integration",
      title: "Component Integration Testing",
      category: "testing" as const,
      description: "Test components in realistic scenarios with proper mocking and user interactions.",
      language: "tsx",
      goodExample: {
        code: `describe('ProjectShowcase Integration', () => {
  it('should display project details when clicked', async () => {
    const mockProject = {
      id: '1',
      title: 'Test Project',
      description: 'A test project',
      technologies: ['React', 'TypeScript']
    };
    
    render(<ProjectShowcase project={mockProject} />);
    
    const projectCard = screen.getByRole('button', { name: /test project/i });
    await user.click(projectCard);
    
    expect(screen.getByText('A test project')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
  
  it('should handle keyboard navigation', async () => {
    render(<ProjectShowcase project={mockProject} />);
    
    const projectCard = screen.getByRole('button');
    projectCard.focus();
    
    await user.keyboard('{Enter}');
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});`,
        explanation: "Comprehensive testing covers user interactions, accessibility, and realistic usage scenarios."
      },
      benefits: [
        "Catches integration issues early",
        "Ensures accessibility compliance",
        "Validates user workflows",
        "Provides confidence in deployments"
      ]
    }
  ] as BestPracticeExample[]
};

export default epilogueContent;