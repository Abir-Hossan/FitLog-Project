import type { Workout } from './types';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.abcz.workers.dev/api/fitlog').replace(/\/$/, '');
const FALLBACK_IMAGE = '/banner.png';

function firstDefined<T>(...values: T[]): T | undefined {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

function numberValue(value: unknown, fallback = 0): number {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value ?? ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function stringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : value == null ? fallback : String(value);
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => stringValue(item)).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((item) => item.trim()).filter(Boolean);
  return [];
}

function normalizeInstructions(value: unknown): string[] {
  const list = stringArray(value);
  return list.length ? list : ['Follow the movement with controlled form.', 'Keep your core braced throughout the set.', 'Use a comfortable range of motion.', 'Stop if you feel sharp or unusual pain.'];
}

export function normalizeWorkout(raw: Record<string, unknown>): Workout {
  const id = stringValue(firstDefined(raw.id, raw._id, raw.slug), cryptoSafeId(raw));
  const categories = stringArray(firstDefined(raw.categories, raw.category, raw.muscles, raw.muscleGroups, raw.targetMuscle));
  const image = stringValue(firstDefined(raw.image, raw.imageUrl, raw.thumbnail, raw.photo), FALLBACK_IMAGE);
  const instructions = normalizeInstructions(firstDefined(raw.instructions, raw.steps, raw.howTo));

  return {
    id,
    name: stringValue(firstDefined(raw.name, raw.title), 'Untitled workout'),
    description: stringValue(firstDefined(raw.description, raw.summary), 'A focused workout from the FitLog library.'),
    categories: categories.length ? categories : ['Workout'],
    equipment: stringValue(firstDefined(raw.equipment, raw.equipmentName), 'Bodyweight'),
    difficulty: stringValue(firstDefined(raw.difficulty, raw.level), 'Intermediate'),
    sets: firstDefined(raw.sets, raw.set) as number | string ?? 3,
    reps: stringValue(firstDefined(raw.reps, raw.repRange), '8-12'),
    duration: numberValue(firstDefined(raw.duration, raw.durationMinutes, raw.minutes)),
    calories: numberValue(firstDefined(raw.calories, raw.caloriesBurned)),
    rating: numberValue(firstDefined(raw.rating, raw.score), 0),
    instructions,
    image,
  };
}

function cryptoSafeId(raw: Record<string, unknown>): string {
  const text = JSON.stringify(raw);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) | 0;
  return `workout-${Math.abs(hash)}`;
}

function extractArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  const object = payload as Record<string, unknown>;
  const nested = firstDefined(object.data, object.workouts, object.results, object.items);
  return Array.isArray(nested) ? nested : [];
}

export async function getWorkouts(signal?: AbortSignal): Promise<Workout[]> {
  const response = await fetch(API_BASE, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error(`Workout API returned ${response.status}`);
  const payload: unknown = await response.json();
  return extractArray(payload)
    .filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
    .map(normalizeWorkout);
}

export async function getWorkout(id: string, signal?: AbortSignal): Promise<Workout> {
  const response = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error(`Workout API returned ${response.status}`);
  const payload: unknown = await response.json();
  const raw = payload && typeof payload === 'object' && !Array.isArray(payload)
    ? ((payload as Record<string, unknown>).data && typeof (payload as Record<string, unknown>).data === 'object'
      ? (payload as Record<string, unknown>).data as Record<string, unknown>
      : payload as Record<string, unknown>)
    : null;
  if (!raw) throw new Error('Workout was not found');
  return normalizeWorkout(raw);
}
