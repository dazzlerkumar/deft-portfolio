import Link from "next/link";
import Particles from "@/components/particles";
export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <div className="hidden w-screen h-px animate-glow md:block fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-10 fade-in"
                quantity={100}
            />
            <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
                DEEPAK
            </h1>
            <div className="hidden w-screen h-px animate-glow md:block fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <div className="my-16 text-center animate-fade-in">
                <h2 className="text-sm text-zinc-500">
                    <Link
                        href="/profile"
                        className="underline duration-500 hover:text-zinc-300"
                    >
                        explore more about me
                    </Link>{" "}
                </h2>
            </div>
        </div>
    );
}
