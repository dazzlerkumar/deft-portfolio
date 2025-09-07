import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChapterPage from "../page";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
    notFound: vi.fn(),
    useRouter: vi.fn(() => ({
        push: vi.fn(),
    })),
}));

// Mock the story components
vi.mock("@/components/story/chapter-one", () => ({
    ChapterOne: vi.fn(({ onChapterComplete }) => (
        <div data-testid="chapter-one">
            Chapter One
            <button onClick={onChapterComplete}>Complete</button>
        </div>
    )),
}));

vi.mock("@/components/story/chapter-two", () => ({
    ChapterTwo: vi.fn(({ onChapterComplete }) => (
        <div data-testid="chapter-two">
            Chapter Two
            <button onClick={onChapterComplete}>Complete</button>
        </div>
    )),
}));

vi.mock("@/components/story/chapter-three", () => ({
    ChapterThree: vi.fn(({ onChapterComplete }) => (
        <div data-testid="chapter-three">
            Chapter Three
            <button onClick={onChapterComplete}>Complete</button>
        </div>
    )),
}));

vi.mock("@/components/story/chapter-four", () => ({
    ChapterFour: vi.fn(({ onChapterComplete }) => (
        <div data-testid="chapter-four">
            Chapter Four
            <button onClick={onChapterComplete}>Complete</button>
        </div>
    )),
}));

vi.mock("@/components/layout", () => ({
    StoryLayout: vi.fn(({ children }) => (
        <div data-testid="story-layout">{children}</div>
    )),
}));

describe("ChapterPage", () => {
    it('should render chapter one when params.id is "1"', () => {
        const mockParams = Promise.resolve({ id: "1" });

        render(<ChapterPage params={mockParams} />);

        expect(screen.getByTestId("chapter-one")).toBeInTheDocument();
        expect(screen.getByText("Chapter One")).toBeInTheDocument();
    });

    it('should render chapter two when params.id is "2"', () => {
        const mockParams = Promise.resolve({ id: "2" });

        render(<ChapterPage params={mockParams} />);

        expect(screen.getByTestId("chapter-two")).toBeInTheDocument();
        expect(screen.getByText("Chapter Two")).toBeInTheDocument();
    });

    it('should render chapter three when params.id is "3"', () => {
        const mockParams = Promise.resolve({ id: "3" });

        render(<ChapterPage params={mockParams} />);

        expect(screen.getByTestId("chapter-three")).toBeInTheDocument();
        expect(screen.getByText("Chapter Three")).toBeInTheDocument();
    });

    it('should render chapter four when params.id is "4"', () => {
        const mockParams = Promise.resolve({ id: "4" });

        render(<ChapterPage params={mockParams} />);

        expect(screen.getByTestId("chapter-four")).toBeInTheDocument();
        expect(screen.getByText("Chapter Four")).toBeInTheDocument();
    });
});
