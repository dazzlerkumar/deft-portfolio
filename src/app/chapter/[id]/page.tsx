import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as generateSEOMetadata, chapterSEOConfigs } from "@/lib/utils/seo";
import { generateChapterStructuredData, generateBreadcrumbStructuredData } from "@/lib/utils/structured-data";
import { ChapterPageClient } from "@/components/pages/chapter-client";

interface ChapterPageProps {
  params: Promise<{
    id: string;
  }>;
}

const chapters = {
  "1": {
    title: "The Beginning",
    theme: "chapter1" as const,
  },
  "2": {
    title: "The Challenges", 
    theme: "chapter2" as const,
  },
  "3": {
    title: "The Leadership",
    theme: "chapter3" as const,
  },
  "4": {
    title: "The Vision",
    theme: "chapter4" as const,
  },
} as const;

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const chapterConfig = chapterSEOConfigs[resolvedParams.id];
  
  if (!chapterConfig) {
    return {
      title: "Chapter Not Found | Storytelling Portfolio",
      description: "The requested chapter could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  
  return generateSEOMetadata({
    ...chapterConfig,
    url: `${siteUrl}/chapter/${resolvedParams.id}`,
    image: `${siteUrl}/api/og?title=${encodeURIComponent(chapterConfig.title)}&description=${encodeURIComponent(chapterConfig.description)}&chapter=${resolvedParams.id}`,
  });
}

export async function generateStaticParams() {
  return Object.keys(chapters).map((id) => ({
    id,
  }));
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params;
  const chapter = chapters[resolvedParams.id as keyof typeof chapters];
  
  if (!chapter) {
    notFound();
  }

  const chapterNumber = parseInt(resolvedParams.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  
  // Generate structured data for this chapter
  const chapterConfig = chapterSEOConfigs[resolvedParams.id];
  const chapterStructuredData = generateChapterStructuredData(
    resolvedParams.id,
    chapterConfig?.title || chapter.title,
    chapterConfig?.description || ""
  );
  
  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: siteUrl },
    { name: `Chapter ${chapterNumber}: ${chapter.title}`, url: `${siteUrl}/chapter/${resolvedParams.id}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(chapterStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      
      <ChapterPageClient 
        chapterNumber={chapterNumber}
        chapterTitle={chapter.title}
      />
    </>
  );
}