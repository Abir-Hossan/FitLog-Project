'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, CalendarPlus, ChevronLeft } from 'lucide-react';
import { useFitLog } from './FitLogProvider';
import type { Workout } from '@/lib/types';

export function WorkoutDetails({ workout }: { workout: Workout }) {
  const { addToPlan, saveWorkout, plan, saved } = useFitLog();
  const alreadyPlanned = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);

  return (
    <main className="container-shell py-8 lg:py-12">
      <Link href="/" className="mb-7 inline-flex items-center gap-1 text-sm text-muted transition hover:text-white"><ChevronLeft size={17} /> Back to library</Link>
      <section className="grid gap-10 lg:grid-cols-[1.03fr_1fr] lg:items-start">
        <div className="relative aspect-[0.95] overflow-hidden rounded-2xl border border-border bg-card lg:sticky lg:top-6">
          <Image src={workout.image || '/banner.png'} alt={workout.name} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" unoptimized={workout.image.startsWith('http')} priority />
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">{workout.name}</h1>
          <p className="mt-5 text-base leading-7 text-muted">{workout.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">{workout.categories.map((category) => <span className="tag" key={category}>{category}</span>)}</div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            {[['Equipment', workout.equipment], ['Difficulty', workout.difficulty], ['Sets', String(workout.sets)], ['Reps', workout.reps], ['Duration', `${workout.duration} min`], ['Calories', `${workout.calories} kcal`], ['Rating', String(workout.rating)]].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-border px-5 py-4 last:border-b-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
                <span className="text-sm text-white">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">Instructions</h2>
            <ol className="mt-4 space-y-4 text-sm leading-6 text-muted">
              {workout.instructions.slice(0, 4).map((instruction, index) => <li key={`${index}-${instruction}`} className="flex gap-4"><span className="font-display text-base text-lime">{index + 1}.</span><span>{instruction}</span></li>)}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn-primary flex-1" disabled={alreadyPlanned} onClick={() => addToPlan(workout)}><CalendarPlus size={17} /> {alreadyPlanned ? "Already in today's plan" : 'Add to today&apos;s plan'}</button>
            <button type="button" className="btn-secondary flex-1" disabled={alreadySaved} onClick={() => saveWorkout(workout)}><Bookmark size={17} /> {alreadySaved ? 'Saved' : 'Save for later'}</button>
          </div>
        </div>
      </section>
    </main>
  );
}
