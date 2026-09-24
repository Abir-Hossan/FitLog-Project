'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock3, Flame, Star, X } from 'lucide-react';
import type { PlanWorkout, Workout } from '@/lib/types';
import { useFitLog } from './FitLogProvider';

export function PlanCard({ workout, savedOnly = false }: { workout: PlanWorkout | Workout; savedOnly?: boolean }) {
  const { removeFromPlan, removeSaved, toggleCompleted } = useFitLog();
  const planWorkout = workout as PlanWorkout;
  const completed = !savedOnly && Boolean(planWorkout.completed);

  return (
    <article className={`plan-card ${completed ? 'opacity-70' : ''}`}>
      <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-xl bg-card sm:h-20 sm:w-36">
        <Image src={workout.image || '/banner.png'} alt={workout.name} fill sizes="144px" className="object-cover" unoptimized={workout.image.startsWith('http')} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className={`font-display text-lg font-bold uppercase tracking-wide text-white ${completed ? 'line-through' : ''}`}>{workout.name}</h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="stat-inline"><Clock3 size={13} /> {workout.duration} min</span>
          <span className="stat-inline"><Flame size={13} /> {workout.calories} kcal</span>
          <span className="stat-inline"><Star size={13} /> {workout.rating}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
        <Link href={`/workout/${encodeURIComponent(workout.id)}`} className="btn-secondary hidden sm:inline-flex">View Details</Link>
        {!savedOnly && <button type="button" className="btn-primary hidden sm:inline-flex" onClick={() => toggleCompleted(workout.id)}>{completed ? <><Check size={15} /> Done</> : <><Check size={15} /> Mark as Done</>}</button>}
        <button type="button" aria-label={`Remove ${workout.name}`} className="icon-button" onClick={() => savedOnly ? removeSaved(workout.id) : removeFromPlan(workout.id)}><X size={18} /></button>
      </div>
      <div className="flex basis-full gap-2 sm:hidden">
        <Link href={`/workout/${encodeURIComponent(workout.id)}`} className="btn-secondary flex-1">View Details</Link>
        {!savedOnly && <button type="button" className="btn-primary flex-1" onClick={() => toggleCompleted(workout.id)}>{completed ? 'Done' : 'Mark as Done'}</button>}
      </div>
    </article>
  );
}
