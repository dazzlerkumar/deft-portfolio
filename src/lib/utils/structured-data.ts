export interface PersonStructuredData {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs: string[];
  worksFor: {
    "@type": "Organization";
    name: string;
  };
  knowsAbout: string[];
  alumniOf?: {
    "@type": "EducationalOrganization";
    name: string;
  }[];
}

export interface WebSiteStructuredData {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  author: {
    "@type": "Person";
    name: string;
  };
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface CreativeWorkStructuredData {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  url: string;
  author: {
    "@type": "Person";
    name: string;
  };
  dateCreated: string;
  dateModified: string;
  genre: string[];
  keywords: string[];
  isPartOf: {
    "@type": "WebSite";
    name: string;
    url: string;
  };
}

export function generatePersonStructuredData(): PersonStructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lead Frontend Engineer",
    jobTitle: "Lead Frontend Engineer",
    description: "Experienced frontend engineer specializing in React, Next.js, and interactive web experiences. Passionate about storytelling through technology and leading high-performing development teams.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app"}/profile-image.jpg`,
    sameAs: [
      "https://github.com/frontend-engineer", // Replace with actual profiles
      "https://linkedin.com/in/frontend-engineer",
      "https://twitter.com/frontend_engineer",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Tech Company", // Replace with actual company
    },
    knowsAbout: [
      "Frontend Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Performance",
      "User Experience",
      "Team Leadership",
      "Mentorship",
      "Agile Development",
      "Three.js",
      "Animation",
      "Responsive Design",
      "Accessibility",
    ],
  };
}

export function generateWebSiteStructuredData(): WebSiteStructuredData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Storytelling Portfolio",
    description: "An immersive journey through the career of a lead frontend engineer, told through interactive storytelling and creative presentation.",
    url: siteUrl,
    author: {
      "@type": "Person",
      name: "Lead Frontend Engineer",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateChapterStructuredData(
  chapterNumber: string,
  title: string,
  description: string
): CreativeWorkStructuredData {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  const chapterUrl = `${siteUrl}/chapter/${chapterNumber}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: chapterUrl,
    author: {
      "@type": "Person",
      name: "Lead Frontend Engineer",
    },
    dateCreated: "2024-01-01", // Replace with actual dates
    dateModified: new Date().toISOString().split('T')[0],
    genre: ["Portfolio", "Interactive Story", "Professional Showcase"],
    keywords: [
      "frontend development",
      "career journey",
      "interactive storytelling",
      "web development",
      "professional portfolio",
    ],
    isPartOf: {
      "@type": "WebSite",
      name: "Storytelling Portfolio",
      url: siteUrl,
    },
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}