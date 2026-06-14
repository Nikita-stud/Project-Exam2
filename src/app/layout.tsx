import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home Page || Holidaze',
  description:
    'Your favorite destinations and vanues in one place. Book your next trip with us and experience the best of venues and sights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Script
          src="https://kit.fontawesome.com/54f19440a6.js"
          crossOrigin="anonymous"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
