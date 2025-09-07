import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, chapterSEOConfigs } from "@/lib/utils/seo";
import { generateChapterStructuredData, generateBreadcrumbStructuredData } from "@/lib/utils/structured-data";
import { EpiloguePageClient } from "@/components/pages/epilogue-client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";

export const metadata: Metadata = generateSEOMetadata({
  ...chapterSEOConfigs.epilogue,
  url: `${siteUrl}/epilogue`,
  image: `${siteUrl}/api/og?title=${encodeURIComponent(chapterSEOConfigs.epilogue.title)}&description=${encodeURIComponent(chapterSEOConfigs.epilogue.description)}&chapter=epilogue`,
});

export default function EpiloguePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  
  // Generate structured data for epilogue
  const epilogueStructuredData = generateChapterStructuredData(
    "epilogue",
    chapterSEOConfigs.epilogue.title,
    chapterSEOConfigs.epilogue.description
  );
  
  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: siteUrl },
    { name: "Epilogue: The Code", url: `${siteUrl}/epilogue` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(epilogueStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      
      <EpiloguePageClient />
    </>
  );
}