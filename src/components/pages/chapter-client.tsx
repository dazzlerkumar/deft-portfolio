"use client";

import { useRouter } from "next/navigation";
import { StoryLayout } from "@/components/layout";
import { ChapterOne } from "@/components/story/chapter-one";
import { ChapterTwo } from "@/components/story/chapter-two";
import { ChapterThree } from "@/components/story/chapter-three";
import { ChapterFour } from "@/components/story/chapter-four";

interface ChapterPageClientProps {
  chapterNumber: number;
  chapterTitle: string;
}

const chapterComponents = {
  1: ChapterOne,
  2: ChapterTwo,
  3: ChapterThree,
  4: ChapterFour,
} as const;

export function ChapterPageClient({ chapterNumber, chapterTitle }: ChapterPageClientProps) {
  const router = useRouter();

  const handleChapterComplete = () => {
    const nextChapter = chapterNumber + 1;
    if (nextChapter <= 4) {
      router.push(`/chapter/${nextChapter}`);
    } else {
      router.push('/epilogue');
    }
  };

  // Render implemented chapters with full interactive experience
  const ChapterComponent = chapterComponents[chapterNumber as keyof typeof chapterComponents];
  
  if (ChapterComponent) {
    return (
      <StoryLayout currentChapter={chapterNumber}>
        <ChapterComponent onChapterComplete={handleChapterComplete} />
      </StoryLayout>
    );
  }

  // Fallback for other chapters (to be implemented in future tasks)
  return (
    <StoryLayout currentChapter={chapterNumber}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Chapter {chapterNumber}: {chapterTitle}
          </h2>
          <p className="text-lg opacity-70 text-gray-300 mb-8">
            Coming soon...
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </StoryLayout>
  );
}