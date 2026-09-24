import type { Workout } from '@/lib/types';
import { WorkoutCard } from './WorkoutCard';

export function WorkoutGrid({ workouts }: { workouts: Workout[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => <WorkoutCard workout={workout} key={workout.id} />)}
    </div>
  );
}
