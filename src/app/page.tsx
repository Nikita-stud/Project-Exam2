import Link from 'next/link';

export default function Home() {
  return (
    <section>
      <h1>Book your stay</h1>
      {venues.map((venue) => (
        <Link key={venue.title} href={`/blog/${venue.id}`}>
          {venue.description}
        </Link>
      ))}
    </section>
  );
}
