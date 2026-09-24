"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${encodeURIComponent(workout.id)}`}
      className="group card overflow-hidden"
    >
      <div className="relative aspect-[1.78] overflow-hidden bg-card">
        <Image
          src={workout.image || "/banner.png"}
          alt={workout.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          unoptimized={workout.image.startsWith("http")}
        />
      </div>
      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {workout.categories.slice(0, 3).map((category) => (
            <span className="tag" key={category}>
              {category}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-xs text-muted">
          <span className="stat-inline">
            <Clock3 size={13} /> {workout.duration} min
          </span>
          <span className="stat-inline">
            <Flame size={13} /> {workout.calories} kcal
          </span>
          <span className="stat-inline">
            <Star size={13} /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
