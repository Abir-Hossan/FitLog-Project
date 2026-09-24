import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-shell flex min-h-18.5 items-center justify-between gap-4 py-5 text-xs text-muted">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span className="font-display text-sm font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
