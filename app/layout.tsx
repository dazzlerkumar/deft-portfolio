import './globals.css';
import NavBar from '@components/Navbar/NavBar';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col bg-bg-light dark:bg-bg-dark">
        <NavBar />
        <main id="skip" className="flex flex-col justify-center px-8 pt-24">
          {children}
          {/*   <Footer /> */}
        </main>
      </body>
      <Analytics />
    </html>
  );
}
