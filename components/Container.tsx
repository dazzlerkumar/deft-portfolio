import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import cn from 'classnames';

import Footer from 'components/Footer';
import MobileMenu from 'components/MobileMenu';
//Assets
import { TbBulb, TbBulbOff } from 'react-icons/tb';
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
  const meta = {
    title: 'Deepak Kumar – Developer',
    description: `Front-end developer`,
    image: 'https://leerob.io/static/images/lee-banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Deepak Kumar" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="fixed top-[20px] flex flex-col justify-center px-8 w-full z-30">
        <nav className="flex items-center justify-between w-full max-w-2xl mx-auto  sm:pb-16  text-gray-900 bg-transparent dark:text-gray-100">
          <a href="#skip" className="skip-nav">
            Skip to content
          </a>
          <div className="backdrop-blur-[15px] bg-white/50 dark:bg-black/50 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)] relative">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/about" text="About Me" />
            <NavItem href="/projects" text="Projects" />
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="backdrop-blur-[15px] bg-white/50 dark:bg-black/50 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)] p-1"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {mounted && resolvedTheme === 'dark' ? (
              <TbBulbOff size={24} />
            ) : (
              <TbBulb size={24} />
            )}
          </button>
        </nav>
      </div>
      <main id="skip" className="flex flex-col justify-center px-8 pt-24">
        {children}
        <Footer />
      </main>
    </div>
  );
}
