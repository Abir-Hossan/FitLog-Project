export function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 px-6 py-5 first:pl-6 last:pr-6 sm:px-7">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-4xl font-bold leading-none text-white">
        {value}
      </p>
    </div>
  );
}
