# Portfolio Data Structure

This directory contains the data structure and management utilities for Deepak Kumar's portfolio website.

## Overview

The portfolio data is structured to support:
- **Bilingual support** (English/Hindi names)
- **Featured projects** (Angularly Ecommerce, Config Gen, Next JS Template)
- **Featured blog posts** from Medium
- **Professional information** (Frontend Engineer at Techpix Software Solutions)
- **Skills and experience** data
- **Easy content management** through utilities

## Files Structure

```
src/data/
├── portfolio.ts          # Main portfolio data with Deepak's information
├── index.ts             # Exports all data and utilities
└── README.md           # This file

src/utils/
├── content-manager.ts   # Content management utilities
└── data-validation.ts   # Data validation functions

src/examples/
└── content-usage.ts     # Usage examples
```

## Key Features

### 1. Bilingual Name Support
```typescript
const personalInfo = {
  name: "Deepak Kumar",
  nameHindi: "दीपक कुमार", // Hindi name support
  // ...
}
```

### 2. Featured Projects
- **Angularly Ecommerce**: Angular-based e-commerce platform
- **Config Gen**: Configuration generator tool
- **Next JS Template**: Reusable Next.js template

### 3. Featured Blog Posts
- "How to Create a Loading Screen for Client-side Fetching in NextJs"
- "Custom Password Revealing in ReactJS using Hooks"
- "Level Up Your Frontend Developer Portfolio using these Console APIs"

### 4. Professional Information
- Current role: Frontend Engineer at Techpix Software Solutions
- Focus: Next.js/React applications
- Expertise: Modern web development practices

## Usage

### Getting Data
```typescript
import { getPersonalInfo, getFeaturedProjects, getFeaturedPosts } from '@/data';

// Get personal information
const personalInfo = getPersonalInfo();
console.log(personalInfo.name, personalInfo.nameHindi);

// Get featured projects
const projects = getFeaturedProjects();

// Get featured posts
const posts = getFeaturedPosts();
```

### Managing Content
```typescript
import { contentManager } from '@/data';

// Add new project
contentManager.addProject(newProject);

// Update existing content
contentManager.updatePersonalInfo({ tagline: 'New tagline' });

// Search and filter
const reactProjects = contentManager.searchProjects('react');
```

### Data Validation
```typescript
import { validatePortfolioData } from '@/data';

const validation = validatePortfolioData(portfolioData);
if (!validation.isValid) {
  console.log('Errors:', validation.errors);
}
```

## Content Management

The `ContentManager` class provides methods for:
- **CRUD operations** for all content types
- **Search and filtering** capabilities
- **Data validation** and error checking
- **Export/import** functionality
- **Statistics** and analytics

## Data Validation

All data structures include validation to ensure:
- Required fields are present
- Data types are correct
- URLs are valid
- Dates are logical
- Relationships are maintained

## Updating Content

To update Deepak's portfolio content:

1. **Personal Info**: Edit `personalInfo` in `src/data/portfolio.ts`
2. **Projects**: Add/modify entries in `featuredProjects` array
3. **Blog Posts**: Update `featuredPosts` array with new Medium posts
4. **Skills**: Modify `skills` array with current skill levels
5. **Experience**: Update `experience` array with job history

## TypeScript Support

All data structures are fully typed with TypeScript interfaces defined in `src/types/portfolio.ts`. This ensures type safety and better developer experience.

## Requirements Fulfilled

This implementation satisfies the following requirements:

- ✅ **6.1**: Professional information (name, role at Techpix Software Solutions)
- ✅ **6.2**: Featured projects (Angularly Ecommerce, Config Gen, Next JS Template)
- ✅ **6.3**: Featured blog posts from Medium
- ✅ **6.4**: Bilingual name support (English/Hindi)
- ✅ **Content management utilities** for easy updates

## Next Steps

The data structure is ready for use in React components. You can now:
1. Import data in your components
2. Use the content manager for dynamic updates
3. Implement the UI components that consume this data
4. Add more content as needed

For usage examples, see `src/examples/content-usage.ts`.