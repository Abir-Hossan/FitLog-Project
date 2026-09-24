import type { PlanWorkout, Workout } from './types';

const PLAN_KEY = 'fitlog:todayPlan';
const SAVED_KEY = 'fitlog:savedWorkouts';

function read<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, value: T[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('fitlog-storage-change'));
}

export function loadPlan(): PlanWorkout[] { return read<PlanWorkout>(PLAN_KEY); }
export function loadSaved(): Workout[] { return read<Workout>(SAVED_KEY); }
export function savePlan(value: PlanWorkout[]) { write(PLAN_KEY, value); }
export function saveSaved(value: Workout[]) { write(SAVED_KEY, value); }
