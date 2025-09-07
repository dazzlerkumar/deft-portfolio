import { lazy } from 'react';
import type { ComponentType } from 'react';

// Dynamic imports for chapter components with loading states
export const ChapterOne = lazy(() => 
  import('../../components/story/chapter-one').then(module => ({
    default: module.ChapterOne
  }))
);

export const ChapterTwo = lazy(() => 
  import('../../components/story/chapter-two').then(module => ({
    default: module.ChapterTwo
  }))
);

export const ChapterThree = lazy(() => 
  import('../../components/story/chapter-three').then(module => ({
    default: module.ChapterThree
  }))
);

export const ChapterFour = lazy(() => 
  import('../../components/story/chapter-four').then(module => ({
    default: module.ChapterFour
  }))
);

// Dynamic imports for 3D components (heavy dependencies)
export const GrowingTree = lazy(() => 
  import('../../components/three/growing-tree').then(module => ({
    default: module.GrowingTree
  }))
);

export const PuzzlePieces = lazy(() => 
  import('../../components/three/puzzle-pieces').then(module => ({
    default: module.PuzzlePieces
  }))
);

export const Network3D = lazy(() => 
  import('../../components/three/network-3d').then(module => ({
    default: module.Network3D
  }))
);

export const SpaceEnvironment = lazy(() => 
  import('../../components/three/space-environment').then(module => ({
    default: module.SpaceEnvironment
  }))
);

// Dynamic imports for project showcase components
export const ProjectShowcase = lazy(() => 
  import('../../components/projects/project-showcase').then(module => ({
    default: module.ProjectShowcase
  }))
);

export const ProjectModal = lazy(() => 
  import('../../components/projects/project-modal').then(module => ({
    default: module.ProjectModal
  }))
);

// Utility function to create dynamic component with error boundary
export function createDynamicComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
) {
  return lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Failed to load component:', error);
      return { default: fallback || (() => null) };
    }
  });
}

// Chapter loading utilities
export const chapterImports = {
  1: () => import('../../components/story/chapter-one'),
  2: () => import('../../components/story/chapter-two'),
  3: () => import('../../components/story/chapter-three'),
  4: () => import('../../components/story/chapter-four'),
} as const;

export type ChapterNumber = keyof typeof chapterImports;

export async function loadChapter(chapterNumber: ChapterNumber) {
  try {
    const importFn = chapterImports[chapterNumber];
    if (!importFn) {
      throw new Error(`Invalid chapter number: ${chapterNumber}`);
    }
    const module = await importFn();
    return module;
  } catch (error) {
    console.error(`Failed to load chapter ${chapterNumber}:`, error);
    throw error;
  }
}