import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-inter'});

export const metadata: Metadata = {
  title: 'ContentPH – AI Social Media Content for Filipinos',
  description:
    'Stop stressing about what to post. ContentPH generates captions, content calendars, and social posts in your brand voice — made for Filipino businesses and creators.',
  keywords: 'social media, content generator, AI, Philippines, Filipino, small business, caption generator',
  openGraph: {
    title: 'ContentPH – AI Social Media Content for Filipinos',
    description: 'AI-powered content planning for Filipino businesses and creators.',
    url: 'https://contentph.com',
    siteName: 'ContentPH',
    locale: 'en_PH',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
