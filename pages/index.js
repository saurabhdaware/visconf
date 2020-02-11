import Link from 'next/link';

export default function Index() {
  return (
    <div>
      <Link href="/create">
        <a>Create</a>
      </Link>
      <p>Hello Next.js</p>
    </div>
  );
}