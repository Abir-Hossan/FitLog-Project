export type SortOption = 'duration' | 'calories' | 'rating';

export interface Workout {
  id: string;
  name: string;
  description: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: number | string;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
  image: string;
}

export interface WorkoutListResponse {
  workouts: Workout[];
  total?: number;
}

export type PlanWorkout = Workout & { completed?: boolean };
