/**
 * Content Management Usage Examples
 * Demonstrates how to use the content management utilities
 */

import { 
  contentManager, 
  getPersonalInfo, 
  getFeaturedProjects, 
  getFeaturedPosts,
  validatePortfolioData 
} from '@/data';
import { Project, BlogPost } from '@/types/portfolio';

// Example: Getting data
export function exampleGetData() {
  // Get personal information
  const personalInfo = getPersonalInfo();
  console.log('Personal Info:', personalInfo.name, personalInfo.nameHindi);

  // Get featured projects
  const featuredProjects = getFeaturedProjects();
  console.log('Featured Projects:', featuredProjects.map(p => p.title));

  // Get featured posts
  const featuredPosts = getFeaturedPosts();
  console.log('Featured Posts:', featuredPosts.map(p => p.title));

  // Get skills by category
  const frontendSkills = contentManager.getSkills('frontend');
  console.log('Frontend Skills:', frontendSkills.map(s => s.name));
}

// Example: Adding new content
export function exampleAddContent() {
  // Add a new project
  const newProject: Project = {
    id: 'new-project',
    title: 'New Amazing Project',
    description: 'A description of the new project',
    category: 'web-app',
    featured: true,
    status: 'completed',
    images: {
      thumbnail: '/images/new-project-thumb.jpg',
      gallery: ['/images/new-project-1.jpg']
    },
    technologies: [
      { name: 'React', category: 'frontend', icon: 'react', color: '#61DAFB' }
    ],
    features: ['Feature 1', 'Feature 2'],
    links: {
      github: 'https://github.com/user/new-project'
    },
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-01'),
    duration: '3 months',
    slug: 'new-amazing-project',
    tags: ['react', 'typescript'],
    priority: 1
  };

  contentManager.addProject(newProject);
  console.log('Added new project:', newProject.title);

  // Add a new featured post
  const newPost: BlogPost = {
    id: 'new-post',
    title: 'My Latest Blog Post',
    url: 'https://medium.com/@deepakkumar/new-post',
    platform: 'medium',
    publishDate: new Date('2024-01-15'),
    tags: ['react', 'tutorial'],
    category: 'tutorial',
    featured: true,
    readTime: 5,
    gradient: 'from-purple-500 to-pink-600',
    excerpt: 'Learn something new in this post'
  };

  contentManager.addFeaturedPost(newPost);
  console.log('Added new featured post:', newPost.title);
}

// Example: Updating content
export function exampleUpdateContent() {
  // Update personal information
  contentManager.updatePersonalInfo({
    tagline: 'Updated tagline showcasing new skills'
  });

  // Update a project
  contentManager.updateProject('nextjs-template', {
    description: 'Updated description with new features'
  });

  // Update a skill level
  contentManager.updateSkill('react', {
    level: 98,
    description: 'Expert React developer with advanced patterns'
  });

  console.log('Content updated successfully');
}

// Example: Searching and filtering
export function exampleSearchAndFilter() {
  // Search projects
  const reactProjects = contentManager.searchProjects('react');
  console.log('React Projects:', reactProjects.map(p => p.title));

  // Get projects by technology
  const nextjsProjects = contentManager.getProjectsByTechnology('Next.js');
  console.log('Next.js Projects:', nextjsProjects.map(p => p.title));

  // Get skills by category
  const frontendSkills = contentManager.getSkillsByCategory('frontend');
  console.log('Frontend Skills:', frontendSkills.map(s => s.name));

  // Search featured posts
  const tutorialPosts = contentManager.searchFeaturedPosts('tutorial');
  console.log('Tutorial Posts:', tutorialPosts.map(p => p.title));
}

// Example: Data validation
export function exampleDataValidation() {
  // Validate the entire portfolio data
  const fullData = contentManager.getFullData();
  const validation = validatePortfolioData(fullData);

  if (validation.isValid) {
    console.log('✅ Portfolio data is valid!');
  } else {
    console.log('❌ Portfolio data has errors:');
    validation.errors.forEach(error => console.log(`  - ${error}`));
  }

  if (validation.warnings.length > 0) {
    console.log('⚠️ Portfolio data has warnings:');
    validation.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
}

// Example: Export and import data
export function exampleDataExportImport() {
  // Export data as JSON
  const exportedData = contentManager.exportData();
  console.log('Data exported successfully');

  // Import data from JSON
  const importSuccess = contentManager.importData(exportedData);
  if (importSuccess) {
    console.log('Data imported successfully');
  } else {
    console.log('Failed to import data');
  }
}

// Example: Statistics
export function exampleStatistics() {
  console.log('Portfolio Statistics:');
  console.log(`- Total Projects: ${contentManager.getProjectCount()}`);
  console.log(`- Featured Projects: ${contentManager.getFeaturedProjectCount()}`);
  console.log(`- Featured Posts: ${contentManager.getFeaturedPostCount()}`);
  console.log(`- Skills: ${contentManager.getSkillCount()}`);
  console.log(`- Experience Entries: ${contentManager.getExperienceCount()}`);
  console.log(`- Total Years of Experience: ${contentManager.getTotalYearsOfExperience()}`);
}

// Run all examples (for testing purposes)
export function runAllExamples() {
  console.log('=== Portfolio Content Management Examples ===\n');
  
  console.log('1. Getting Data:');
  exampleGetData();
  
  console.log('\n2. Adding Content:');
  exampleAddContent();
  
  console.log('\n3. Updating Content:');
  exampleUpdateContent();
  
  console.log('\n4. Searching and Filtering:');
  exampleSearchAndFilter();
  
  console.log('\n5. Data Validation:');
  exampleDataValidation();
  
  console.log('\n6. Export/Import:');
  exampleDataExportImport();
  
  console.log('\n7. Statistics:');
  exampleStatistics();
}