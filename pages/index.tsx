import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import FeaturedProject from '@components/FeaturedProject';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="flex flex-col-reverse sm:flex-row items-start">
            <div className="flex flex-col pr-8">
              <div className="overflow-hidden h-16 border-red-100">
                <div className="string">
                  <h1
                    className="font-bold relative t-0 l-0 text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white"
                    style={{
                      cursor: 'pointer',
                      lineHeight: '1.5',
                      userSelect: 'none'
                    }}
                  >
                    Deepak Kumar
                  </h1>
                  <h1
                    className="font-bold relative t-0 l-0 text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white"
                    style={{
                      cursor: 'pointer',
                      lineHeight: '1.5',
                      userSelect: 'none'
                    }}
                  >
                    दीपक कुमार
                  </h1>
                </div>
              </div>

              <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                Frontend Engineer at{' '}
                <span className="font-semibold">Doorpix Pvt Ltd.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-16">
                Building Next.Js/React applications. Learning, sharing, and
                writing about web development.
              </p>
            </div>
            <div className="w-[80px] sm:w-[200px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt="Deepak Kumar | Frontend Engineer | Software Engineer | NextJS | ReactJS | React Native | Web Developer | Web Designer | Lucknow | India"
                height={200}
                width={200}
                src="/avatar.png"
                sizes="30vw"
                priority
                className="rounded-full filter"
              />
            </div>
          </div>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            Featured Posts
          </h3>
          <div className="flex gap-6 flex-col md:flex-row">
            <BlogPostCard
              title="How to Create a Loading Screen for Client-side Fetching in NextJs"
              slug="https://medium.com/better-programming/how-to-create-a-loading-screen-for-client-side-fetching-in-nextjs-eaede11c0921"
              gradient="from-[#D8B4FE] to-[#818CF8]"
            />
            <BlogPostCard
              title="Custom Password Revealing in ReactJS using Hooks"
              slug="https://medium.com/@dazzlerkumar/custom-password-revealing-in-reactjs-using-hooks-1b46b51af13f"
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
            <BlogPostCard
              title="Level Up Your Frontend Developer Portfolio using these Console APIs"
              slug="https://medium.com/@dazzlerkumar/level-up-your-frontend-developer-portfolio-using-these-console-apis-371911bc5562"
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
          </div>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight my-6 text-black dark:text-white">
            Featured Projects
          </h3>
          <FeaturedProject />
          <Link
            href="https://medium.com/@dazzlerkumar"
            target={'_blank'}
            className="flex items-center mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
          >
            <>
              {'Read all posts'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-1"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </>
          </Link>

          {/*  <Subscribe /> */}
        </div>
      </Container>
    </Suspense>
  );
}
