import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

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
      <body className="min-h-full flex flex-col">
        <header>
          <nav>
            <Link href="/">Saved</Link>
            <Link href="/">Search</Link>
            <Link href="/">Bookings</Link>
            <Link href="/">Login</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2026 Holidaze</p>
        </footer>
      </body>
    </html>
  );
}
