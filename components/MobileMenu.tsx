import cn from 'classnames';
import Link from 'next/link';
//import useDelayedRender from 'use-delayed-render';
import { useState, useEffect } from 'react';
import styles from 'styles/mobile-menu.module.css';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      console.log('open');
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>

      {isMenuOpen && (
        <div>
          <ul
            className={cn(
              styles.menu,
              'flex flex-col bg-white dark:bg-black rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)]',
              styles.menuRendered
            )}
          >
            <li
              className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold"
              style={{ transitionDelay: '150ms' }}
            >
              <Link href="/" className="flex w-auto pb-4">
                Home
              </Link>
            </li>
            <li
              className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100  font-semibold"
              style={{ transitionDelay: '175ms' }}
            >
              <Link href="/guestbook" className="flex w-auto pb-4">
                About Me
              </Link>
            </li>
            <li
              className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100  font-semibold"
              style={{ transitionDelay: '200ms' }}
            >
              <Link href="/dashboard" className="flex w-auto pb-4">
                Projects
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
