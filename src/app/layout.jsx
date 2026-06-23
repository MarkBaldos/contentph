import './globals.css';

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
