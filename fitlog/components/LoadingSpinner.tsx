export function LoadingSpinner({ label = 'Loading workouts…' }: { label?: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-4 text-muted">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
