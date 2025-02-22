'use client';

import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
export default function NavItem({ href, text }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? 'font-semibold text-dark dark:text-light underline decoration-indigo-500'
          : 'font-normal text-dark dark:text-light',
        'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-md hover:underline hover:decoration-pink-500 transition-all'
      )}
    >
      <span className="capsize">{text}</span>
    </Link>
  );
}
