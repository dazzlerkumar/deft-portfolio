import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import {
    generateMetadata as generateSEOMetadata,
    defaultSEOConfig,
} from "@/lib/utils/seo";
import {
    generatePersonStructuredData,
    generateWebSiteStructuredData,
} from "@/lib/utils/structured-data";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
    ...defaultSEOConfig,
    url:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://storytelling-portfolio.vercel.app",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const personStructuredData = generatePersonStructuredData();
    const websiteStructuredData = generateWebSiteStructuredData();

    return (
        <html
            lang="en"
            className={`${inter.variable} ${jetbrainsMono.variable}`}
        >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personStructuredData),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteStructuredData),
                    }}
                />

                {/* Additional SEO Meta Tags */}
                <meta name="theme-color" content="#1f2937" />
                <meta name="msapplication-TileColor" content="#1f2937" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="antialiased font-sans bg-white text-gray-900">
                {children}
            </body>
        </html>
    );
}
