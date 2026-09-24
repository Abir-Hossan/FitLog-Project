"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { EmptyState } from "@/components/EmptyState";
import { PlanCard } from "@/components/PlanCard";
import { StatsCard } from "@/components/StatsCard";
import { useFitLog } from "@/components/FitLogProvider";
import type { SortOption, Workout } from "@/lib/types";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  useEffect(() => {
    setTab(
      new URLSearchParams(window.location.search).get("tab") === "saved"
        ? "saved"
        : "plan",
    );
  }, []);
  const [sort, setSort] = useState<SortOption>("duration");

  const visible = useMemo<Workout[]>(() => {
    const list = tab === "plan" ? plan : saved;
    return [...list].sort((a, b) => b[sort] - a[sort]);
  }, [tab, plan, saved, sort]);

  const minutes = plan.reduce((total, item) => total + item.duration, 0);
  const calories = plan.reduce((total, item) => total + item.calories, 0);

  return (
    <main className="container-shell py-9 lg:py-12">
      <header>
        <h1 className="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
          MY PLAN
        </h1>
        <p className="mt-2 text-sm text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      <section className="mt-6 flex overflow-hidden rounded-2xl border border-border bg-card">
        <StatsCard label="Exercises" value={plan.length} />
        <div className="my-7 w-px bg-border" />
        <StatsCard label="Minutes" value={minutes} />
        <div className="my-7 w-px bg-border" />
        <StatsCard label="Calories" value={calories} />
      </section>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-xl border border-border bg-card p-1">
          <button
            type="button"
            className={`rounded-lg px-5 py-2 text-xs font-semibold ${tab === "plan" ? "bg-[#242a35] text-white" : "text-muted"}`}
            onClick={() => setTab("plan")}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            className={`rounded-lg px-5 py-2 text-xs font-semibold ${tab === "saved" ? "bg-[#242a35] text-white" : "text-muted"}`}
            onClick={() => setTab("saved")}
          >
            Saved
          </button>
        </div>
        <label className="flex items-center gap-3 text-sm text-muted">
          <span>Sort By</span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-white outline-none focus:border-lime"
          >
            <option value="duration" className="bg-white text-black">
              Duration
            </option>

            <option value="calories" className="bg-white text-black">
              Calories
            </option>

            <option value="rating" className="bg-white text-black">
              Rating
            </option>
          </select>
        </label>
      </div>

      <section className="mt-6 space-y-4">
        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          visible.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              savedOnly={tab === "saved"}
            />
          ))
        )}
      </section>
    </main>
  );
}
