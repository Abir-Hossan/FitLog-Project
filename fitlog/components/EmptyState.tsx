import Link from 'next/link';

export function EmptyState({ title = 'NOTHING HERE YET', description = 'Browse the library and add a lift to get today moving.' }: { title?: string; description?: string }) {
  return (
    <div className="empty-state">
      <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <Link href="/" className="btn-primary mt-7">Go to workouts</Link>
    </div>
  );
}
