'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { loadPlan, loadSaved, savePlan, saveSaved } from '@/lib/storage';
import type { PlanWorkout, Workout } from '@/lib/types';

interface FitLogContextValue {
  plan: PlanWorkout[];
  saved: Workout[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: string) => void;
  toggleCompleted: (id: string) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (id: string) => void;
}

const FitLogContext = createContext<FitLogContextValue | null>(null);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(loadPlan());
    setSaved(loadSaved());
    setHydrated(true);

    const sync = () => {
      setPlan(loadPlan());
      setSaved(loadSaved());
    };
    window.addEventListener('storage', sync);
    window.addEventListener('fitlog-storage-change', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('fitlog-storage-change', sync);
    };
  }, []);

  const addToPlan = useCallback((workout: Workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast('Already in today\'s plan');
      return false;
    }
    if (plan.length >= 5) {
      toast.error('Today\'s plan is full (5 lifts)');
      return false;
    }
    const next = [...plan, { ...workout, completed: false }];
    setPlan(next);
    savePlan(next);
    toast.success('Added to today\'s plan');
    return true;
  }, [plan]);

  const removeFromPlan = useCallback((id: string) => {
    const next = plan.filter((item) => item.id !== id);
    setPlan(next);
    savePlan(next);
    toast.success('Removed from today\'s plan');
  }, [plan]);

  const toggleCompleted = useCallback((id: string) => {
    const next = plan.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
    setPlan(next);
    savePlan(next);
    toast.success(next.find((item) => item.id === id)?.completed ? 'Workout marked as done' : 'Workout reopened');
  }, [plan]);

  const saveWorkout = useCallback((workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast('Already saved');
      return false;
    }
    const next = [...saved, workout];
    setSaved(next);
    saveSaved(next);
    toast.success('Saved workout');
    return true;
  }, [saved]);

  const removeSaved = useCallback((id: string) => {
    const next = saved.filter((item) => item.id !== id);
    setSaved(next);
    saveSaved(next);
    toast.success('Removed from saved');
  }, [saved]);

  const value = useMemo(() => ({ plan, saved, hydrated, addToPlan, removeFromPlan, toggleCompleted, saveWorkout, removeSaved }), [plan, saved, hydrated, addToPlan, removeFromPlan, toggleCompleted, saveWorkout, removeSaved]);

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error('useFitLog must be used inside FitLogProvider');
  return context;
}
