'use client';

import { useEffect, useMemo, useState } from 'react';
import { Hero } from '@/components/Hero';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { WorkoutGrid } from '@/components/WorkoutGrid';
import { getWorkouts } from '@/lib/api';
import type { SortOption, Workout } from '@/lib/types';

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState<SortOption>('duration');

  useEffect(() => {
    const controller = new AbortController();
    getWorkouts(controller.signal)
      .then(setWorkouts)
      .catch((err: unknown) => {
        if ((err as Error)?.name !== 'AbortError') setError('We could not load the workout library. Please try again.');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const sorted = useMemo(() => [...workouts].sort((a, b) => b[sort] - a[sort]), [workouts, sort]);

  return (
    <main>
      <div className="container-shell py-6 lg:py-8"><Hero /></div>
      <section id="library" className="container-shell scroll-mt-8 py-10 lg:py-14">
        <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase leading-none">THE LIBRARY</h2>
            <p className="mt-1 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
          </div>
          <label className="flex items-center gap-3 text-sm text-muted">
            <span>Sort By</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-white outline-none focus:border-lime">
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
        {loading ? <LoadingSpinner /> : error ? (
          <div className="empty-state"><h2 className="font-display text-2xl font-bold">LIBRARY UNAVAILABLE</h2><p className="mt-2 text-sm text-muted">{error}</p><button className="btn-primary mt-6" onClick={() => window.location.reload()}>Try Again</button></div>
        ) : sorted.length === 0 ? <div className="empty-state"><h2 className="font-display text-2xl font-bold">NO WORKOUTS FOUND</h2><p className="mt-2 text-sm text-muted">The API returned an empty workout library.</p></div> : <WorkoutGrid workouts={sorted} />}
      </section>
    </main>
  );
}
