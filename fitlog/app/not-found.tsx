import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[calc(100vh-210px)] flex-col items-center justify-center text-center">
      <p className="eyebrow">FITLOG</p>
      <h1 className="font-display mt-3 text-8xl font-bold leading-none text-white">404</h1>
      <p className="mt-3 text-muted">Workout not found</p>
      <Link href="/" className="btn-primary mt-7">Return Home</Link>
    </main>
  );
}
