import type { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url = "",
    type = "website",
    publishedTime,
    modifiedTime,
    author = "Lead Frontend Engineer",
    section,
  } = config;

  // Generate dynamic OG image if not provided
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  const ogImage = image || `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  const fullTitle = title.includes("Storytelling Portfolio") 
    ? title 
    : `${title} | Storytelling Portfolio`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "frontend engineer",
      "portfolio",
      "storytelling",
      "interactive",
      "Next.js",
      "React",
      "TypeScript",
      "leadership",
      "web development",
      ...keywords,
    ],
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Storytelling Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [author],
        section,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@frontend_engineer", // Replace with actual Twitter handle
    },
    alternates: {
      canonical: url,
    },
    other: {
      "web-vitals": "enabled",
    },
  };
}

export const defaultSEOConfig: SEOConfig = {
  title: "Storytelling Portfolio | Lead Frontend Engineer",
  description: "An immersive journey through the career of a lead frontend engineer, told through interactive storytelling and creative presentation. Explore technical skills, leadership experience, and innovative projects.",
  keywords: [
    "portfolio",
    "career journey",
    "technical skills",
    "innovation",
  ],
};

export const chapterSEOConfigs: Record<string, SEOConfig> = {
  "1": {
    title: "Chapter 1: The Beginning | Storytelling Portfolio",
    description: "Discover the early career journey and learning milestones of a frontend engineer. Interactive storytelling showcasing growth, curiosity, and foundational skills.",
    keywords: ["career beginning", "learning journey", "growth", "frontend basics"],
    section: "Career Journey",
  },
  "2": {
    title: "Chapter 2: The Challenges | Storytelling Portfolio", 
    description: "Explore key projects and problem-solving approaches that shaped a frontend engineer's expertise. Interactive showcases of technical challenges and creative solutions.",
    keywords: ["problem solving", "technical challenges", "projects", "innovation"],
    section: "Technical Challenges",
  },
  "3": {
    title: "Chapter 3: The Leadership | Storytelling Portfolio",
    description: "Experience the evolution into leadership roles and team impact. Interactive visualizations of collaboration, mentorship, and organizational influence.",
    keywords: ["leadership", "team management", "mentorship", "collaboration"],
    section: "Leadership Journey",
  },
  "4": {
    title: "Chapter 4: The Vision | Storytelling Portfolio",
    description: "Discover future aspirations and innovative visions for technology. Interactive exploration of goals, contact opportunities, and forward-thinking perspectives.",
    keywords: ["future vision", "innovation", "contact", "opportunities"],
    section: "Future Vision",
  },
  epilogue: {
    title: "Epilogue: The Code | Storytelling Portfolio",
    description: "Dive deep into the technical implementation and architecture behind this storytelling portfolio. Interactive code exploration and best practices showcase.",
    keywords: ["source code", "architecture", "technical documentation", "best practices"],
    section: "Technical Showcase",
  },
};

// Helper function to generate chapter-specific OG image URLs
export function getChapterOGImageUrl(chapterId: string, title: string, description: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  return `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&chapter=${chapterId}`;
}