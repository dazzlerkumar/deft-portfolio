import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';

import Footer from 'components/Footer';
import MobileMenu from 'components/MobileMenu';

function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath.split('/')[1] === href.split('/')[1];

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-dark dark:text-light underline decoration-indigo-500'
          : 'font-normal text-dark dark:text-light',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:underline hover:decoration-pink-500 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function Container(props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Deepak Kumar – Developer',
    description: `Front-end developer`,
    image: 'https://leerob.io/static/images/lee-banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div
      className="bg-bg-light dark:bg-bg-dark" /* style={{
        backgroundImage: ' linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)'
      }} */
    >
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        {/* <meta property="og:url" content={`https://leerob.io${router.asPath}`} /> */}
        {/*   <link rel="canonical" href={`https://leerob.io${router.asPath}`} /> */}
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Deepak Kumar" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="fixed top-[20px] flex flex-col justify-center px-8 w-full z-30">
        <nav className="flex items-center justify-between w-full relative max-w-2xl mx-auto  sm:pb-16  text-gray-900 bg-transparent dark:text-gray-100">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <div className="backdrop-blur-[15px] bg-white/50 dark:bg-black/50 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/about" text="About Me" />
            <NavItem href="/projects" text="Projects" />
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-12 h-6 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && resolvedTheme === 'dark' ? (
              <div className="w-8 h-8 relative rounded-full transition duration-500 transform -translate-x-2 p-1 text-white bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white  translate-x-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            )}
          </button>
        </nav>
        {/*  <nav className="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-bg-light  dark:bg-bg-dark bg-opacity-60 dark:text-gray-100">
          

          <button
            aria-label="Toggle Dark Mode"
            type="button"
            
            className="w-12 h-6 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
           
            {mounted && resolvedTheme === 'dark' ? (
              <div className="w-8 h-8 relative rounded-full transition duration-500 transform -translate-x-2 p-1 text-white bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white  translate-x-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            )}
          </button>
        </nav> */}
      </div>
      <main
        id="skip"
        className="flex flex-col justify-center px-8 pt-24"
        /*   style={{
          backgroundImage: ' linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)'
        }} */
      >
        {children}
        <Footer />
      </main>
    </div>
  );
}
