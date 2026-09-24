'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WorkoutDetails } from '@/components/WorkoutDetails';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { getWorkout } from '@/lib/api';
import type { Workout } from '@/lib/types';

export default function WorkoutPageClient() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getWorkout(decodeURIComponent(params.id), controller.signal)
      .then(setWorkout)
      .catch((err: unknown) => {
        if ((err as Error)?.name !== 'AbortError') setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [params.id]);

  if (loading) return <main className="container-shell py-10"><LoadingSpinner label="Loading workout…" /></main>;
  if (error || !workout) return <main className="container-shell flex min-h-[calc(100vh-210px)] flex-col items-center justify-center text-center"><p className="eyebrow">FITLOG</p><h1 className="font-display mt-3 text-7xl font-bold">404</h1><p className="mt-3 text-muted">Workout not found</p><a href="/" className="btn-primary mt-7">Return Home</a></main>;
  return <WorkoutDetails workout={workout} />;
}
