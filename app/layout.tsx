import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Automicle',
  description: 'Automicle Admin Dashboard'
};
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-background`}>{children}</body>
    </html>
  );
}
